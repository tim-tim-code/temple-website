import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const MOLLIE_API_KEY = Deno.env.get('MOLLIE_API_KEY') || ''
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || ''
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''

interface PaymentRequest {
  amount: number
  description: string
  redirectUrl: string
  webhookUrl: string
  metadata: {
    session_id: string
    donor_name?: string
    donor_email?: string
    is_anonymous: boolean
    message?: string
    items: any[]
  }
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const payload: PaymentRequest = await req.json()

    // Validate required fields
    if (!payload.amount || !payload.redirectUrl) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: amount, redirectUrl' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Create Mollie payment
    const mollieResponse = await fetch('https://api.mollie.com/v2/payments', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MOLLIE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: {
          currency: 'EUR',
          value: payload.amount.toFixed(2),
        },
        description: payload.description || 'Donation to Dalin Si Temple',
        redirectUrl: payload.redirectUrl,
        webhookUrl: payload.webhookUrl,
        metadata: payload.metadata,
      }),
    })

    if (!mollieResponse.ok) {
      const errorData = await mollieResponse.json()
      console.error('Mollie API error:', errorData)
      return new Response(
        JSON.stringify({ error: 'Failed to create payment', details: errorData }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const molliePayment = await mollieResponse.json()

    // Store donation in Supabase
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

    const { error: dbError } = await supabase.from('donations').insert({
      mollie_payment_id: molliePayment.id,
      session_id: payload.metadata.session_id,
      donor_name: payload.metadata.donor_name,
      donor_email: payload.metadata.donor_email,
      is_anonymous: payload.metadata.is_anonymous,
      message: payload.metadata.message,
      amount: payload.amount,
      currency: 'EUR',
      status: 'pending',
      items: payload.metadata.items,
      metadata: { mollie_status: molliePayment.status },
    })

    if (dbError) {
      console.error('Database error:', dbError)
      // Don't fail the payment, just log the error
    }

    // Return checkout URL to frontend
    return new Response(
      JSON.stringify({
        success: true,
        checkoutUrl: molliePayment._links.checkout.href,
        paymentId: molliePayment.id,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error', message: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
