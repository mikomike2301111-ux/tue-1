/*
  # Create Cart and Wishlist Tables

  ## Overview
  Tables to manage user shopping cart and wishlist functionality.

  ## 1. New Tables
  
  ### `cart_items`
  Shopping cart for temporary storage of selected items
  - `id` (uuid, primary key)
  - `user_session_id` (text, not null) - Browser session identifier
  - `product_id` (uuid, not null) - Reference to product
  - `quantity` (integer, default 1) - Quantity selected
  - `selected_size` (text) - Size selected by user
  - `selected_color` (text) - Color selected by user
  - `created_at` (timestamptz) - When added to cart

  ### `wishlist_items`
  Wishlist for saving favorite items
  - `id` (uuid, primary key)
  - `user_session_id` (text, not null) - Browser session identifier
  - `product_id` (uuid, not null) - Reference to product
  - `created_at` (timestamptz) - When added to wishlist

  ## 2. Security
  - Enable RLS on all tables
  - Public read/write access (session-based, no authentication required)

  ## 3. Indexes
  - Index on user_session_id for fast lookups
*/

CREATE TABLE IF NOT EXISTS cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_session_id text NOT NULL,
  product_id uuid NOT NULL,
  quantity integer DEFAULT 1 CHECK (quantity > 0),
  selected_size text,
  selected_color text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS wishlist_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_session_id text NOT NULL,
  product_id uuid NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_cart_session ON cart_items(user_session_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_session ON wishlist_items(user_session_id);

ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Cart items are readable"
  ON cart_items
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Cart items are insertable"
  ON cart_items
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Cart items are updatable"
  ON cart_items
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Cart items are deletable"
  ON cart_items
  FOR DELETE
  TO anon, authenticated
  USING (true);

CREATE POLICY "Wishlist items are readable"
  ON wishlist_items
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Wishlist items are insertable"
  ON wishlist_items
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Wishlist items are deletable"
  ON wishlist_items
  FOR DELETE
  TO anon, authenticated
  USING (true);