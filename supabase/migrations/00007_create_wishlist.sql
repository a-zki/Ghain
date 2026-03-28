-- Wishlist items table
CREATE TABLE public.wishlist_items (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, product_id)
);

-- Row-Level Security
ALTER TABLE public.wishlist_items ENABLE ROW LEVEL SECURITY;

-- Users can read their own wishlist
CREATE POLICY "Users can read own wishlist"
  ON public.wishlist_items
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can add to their own wishlist
CREATE POLICY "Users can insert own wishlist"
  ON public.wishlist_items
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own wishlist items
CREATE POLICY "Users can update own wishlist"
  ON public.wishlist_items
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can remove from their own wishlist
CREATE POLICY "Users can delete own wishlist"
  ON public.wishlist_items
  FOR DELETE
  USING (auth.uid() = user_id);
