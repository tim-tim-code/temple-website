import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const MOLLIE_API_KEY = Deno.env.get('MOLLIE_API_KEY') || ''
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || ''
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''

serve(async (req) => {
  try {
    // Mollie sends payment ID in the body
    const formData = await req.formData()
    const paymentId = formData.get('id') as string

    if (!paymentId) {
      console.error('No payment ID received')
      return new Response('No payment ID', { status: 400 })
    }

    console.log('Webhook received for payment:', paymentId)

    // Fetch payment status from Mollie
    const mollieResponse = await fetch(`https://api.mollie.com/v2/payments/${paymentId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${MOLLIE_API_KEY}`,
      },
    })

    if (!mollieResponse.ok) {
      console.error('Failed to fetch payment from Mollie')
      return new Response('Failed to fetch payment', { status: 500 })
    }

    const payment = await mollieResponse.json()
    console.log('Payment status:', payment.status)

    // Update donation in database
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

    const updateData: any = {
      status: payment.status,
      payment_method: payment.method,
      updated_at: new Date().toISOString(),
      metadata: {
        mollie_status: payment.status,
        mollie_method: payment.method,
        mollie_details: payment.details || null,
      },
    }

    // If paid, record the payment time
    if (payment.status === 'paid') {
      updateData.paid_at = payment.paidAt || new Date().toISOString()
    }

    const { error: dbError } = await supabase
      .from('donations')
      .update(updateData)
      .eq('mollie_payment_id', paymentId)

    if (dbError) {
      console.error('Database update error:', dbError)
      return new Response('Database error', { status: 500 })
    }

    console.log('Donation updated successfully')

    // Return 200 to acknowledge webhook
    return new Response('OK', { status: 200 })

  } catch (error) {
    console.error('Webhook error:', error)
    return new Response('Internal error', { status: 500 })
  }
})
