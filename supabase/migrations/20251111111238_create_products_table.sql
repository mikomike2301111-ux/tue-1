/*
  # Create Products Table for eCommerce CMS

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text) - Product name
      - `description` (text) - Product description
      - `price` (numeric) - Product price in KSh
      - `image_url` (text) - Product image URL
      - `featured` (boolean) - Whether to show on home page
      - `discount_label` (text) - Discount label (e.g., "Save 50% Off")
      - `sort_order` (integer) - Display order
      - `in_stock` (boolean) - Availability status
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `hero_slides`
      - `id` (uuid, primary key)
      - `image_url` (text) - Slide image URL
      - `sort_order` (integer) - Display order
      - `active` (boolean) - Whether slide is active
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access (no auth required for CMS data)
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric NOT NULL DEFAULT 0,
  image_url text,
  featured boolean DEFAULT false,
  discount_label text DEFAULT 'Save 50% Off',
  sort_order integer DEFAULT 0,
  in_stock boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create hero slides table
CREATE TABLE IF NOT EXISTS hero_slides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  sort_order integer DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_slides ENABLE ROW LEVEL SECURITY;

-- Public read access for products
CREATE POLICY "Public can read products"
  ON products
  FOR SELECT
  TO anon
  USING (true);

-- Public read access for hero slides
CREATE POLICY "Public can read hero slides"
  ON hero_slides
  FOR SELECT
  TO anon
  USING (active = true);

-- Insert sample hero slides
INSERT INTO hero_slides (image_url, sort_order, active) VALUES
  ('https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=1920', 1, true),
  ('https://images.pexels.com/photos/2897883/pexels-photo-2897883.jpeg?auto=compress&cs=tinysrgb&w=1920', 2, true),
  ('https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=1920', 3, true),
  ('https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=1920', 4, true);

-- Insert sample featured products
INSERT INTO products (name, description, price, image_url, featured, sort_order, in_stock) VALUES
  ('Classic Black Polo', 'Premium cotton polo shirt with modern fit', 1999, 'https://images.pexels.com/photos/2897883/pexels-photo-2897883.jpeg?auto=compress&cs=tinysrgb&w=800', true, 1, true),
  ('Elegant Navy Blazer', 'Sophisticated blazer for any occasion', 4999, 'https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&w=800', true, 2, true),
  ('Casual Denim Jacket', 'Timeless denim jacket with comfort fit', 3499, 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=800', true, 3, true),
  ('Summer Floral Dress', 'Light and breezy dress for warm days', 2499, 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800', true, 4, true),
  ('Premium Wool Sweater', 'Soft wool sweater with elegant design', 2999, 'https://images.pexels.com/photos/1895943/pexels-photo-1895943.jpeg?auto=compress&cs=tinysrgb&w=800', true, 5, true);
