-- Create the wishlist_items table
CREATE TABLE public.wishlist_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    short_description TEXT NOT NULL,
    full_description TEXT NOT NULL,
    why_we_need_it TEXT NOT NULL,
    image_url TEXT,
    image_urls TEXT[], -- Array of multiple image URLs
    purchase_link TEXT, -- Made optional since we'll handle internally
    category TEXT DEFAULT 'general',
    price DECIMAL(10,2), -- Suggested donation amount
    minimum_price DECIMAL(10,2) DEFAULT 0, -- Minimum donation
    inventory INTEGER DEFAULT 1, -- How many of this item needed
    inventory_remaining INTEGER DEFAULT 1, -- How many still needed
    is_featured BOOLEAN DEFAULT false,
    is_urgent BOOLEAN DEFAULT false,
    shipping_notes TEXT, -- Delivery/shipping information
    funding_goal DECIMAL(10,2), -- Total funding needed
    funding_raised DECIMAL(10,2) DEFAULT 0, -- Amount raised so far
    priority INTEGER NOT NULL DEFAULT 5,
    status TEXT NOT NULL DEFAULT 'needed' CHECK (status IN ('needed', 'in_progress', 'purchased', 'funded')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a trigger to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_wishlist_items_updated_at 
    BEFORE UPDATE ON public.wishlist_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create an admin_users table for authentication
CREATE TABLE public.admin_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE
);

-- Row Level Security (RLS) policies
ALTER TABLE public.wishlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Public read access for wishlist items (anyone can view)
CREATE POLICY "Public can view wishlist items" ON public.wishlist_items
    FOR SELECT USING (true);

-- Only authenticated admin users can modify wishlist items
CREATE POLICY "Admin can manage wishlist items" ON public.wishlist_items
    FOR ALL USING (
        auth.uid() IN (SELECT id FROM public.admin_users WHERE id = auth.uid())
    );

-- Only authenticated admin users can view admin_users table
CREATE POLICY "Admin can view admin users" ON public.admin_users
    FOR SELECT USING (
        auth.uid() = id OR auth.uid() IN (SELECT id FROM public.admin_users)
    );

-- Insert a default admin user (you'll need to update this with your actual auth user ID after creating an account)
-- INSERT INTO public.admin_users (id, email, full_name) 
-- VALUES ('your-auth-user-id-here', 'admin@dalinsi.com', 'DaLinSi Admin');

-- Create cart_sessions table for managing shopping carts
CREATE TABLE public.cart_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id TEXT NOT NULL,
    item_id UUID REFERENCES public.wishlist_items(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1,
    price_at_time DECIMAL(10,2), -- Price when added to cart
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create donor_intentions table for tracking checkout attempts
CREATE TABLE public.donor_intentions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id TEXT NOT NULL,
    donor_name TEXT,
    donor_email TEXT,
    is_anonymous BOOLEAN DEFAULT false,
    message TEXT, -- Dedication message
    total_amount DECIMAL(10,2) NOT NULL,
    items JSONB NOT NULL, -- Array of cart items with quantities
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create triggers for new tables
CREATE TRIGGER update_cart_sessions_updated_at 
    BEFORE UPDATE ON public.cart_sessions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_donor_intentions_updated_at 
    BEFORE UPDATE ON public.donor_intentions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create storage bucket for wishlist images
INSERT INTO storage.buckets (id, name, public) VALUES ('wishlist-images', 'wishlist-images', true);

-- Allow public access to view images in the bucket
CREATE POLICY "Public can view wishlist images" ON storage.objects
    FOR SELECT USING (bucket_id = 'wishlist-images');

-- Allow authenticated admin users to upload/manage images
CREATE POLICY "Admin can manage wishlist images" ON storage.objects
    FOR ALL USING (
        bucket_id = 'wishlist-images' AND
        auth.uid() IN (SELECT id FROM public.admin_users WHERE id = auth.uid())
    );

-- RLS policies for new tables
ALTER TABLE public.cart_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donor_intentions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to manage their own cart sessions
CREATE POLICY "Anyone can manage their cart session" ON public.cart_sessions
    FOR ALL USING (true);

-- Allow anyone to create donor intentions, admins to view all
CREATE POLICY "Anyone can create donor intentions" ON public.donor_intentions
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can view own intentions, admins view all" ON public.donor_intentions
    FOR SELECT USING (
        auth.uid() IN (SELECT id FROM public.admin_users WHERE id = auth.uid()) OR
        session_id = current_setting('request.jwt.claims', true)::json->>'session_id'
    );