-- Cart items table
CREATE TABLE public.cart_items (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  variant_id UUID NOT NULL REFERENCES public.product_variants(id) ON DELETE CASCADE,
  quantity   INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, variant_id)
);

-- Auto-update updated_at
CREATE TRIGGER trg_cart_items_updated_at
  BEFORE UPDATE ON public.cart_items
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

-- Row-Level Security
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;

-- Users can read their own cart
CREATE POLICY "Users can read own cart"
  ON public.cart_items
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can add to their own cart
CREATE POLICY "Users can insert own cart"
  ON public.cart_items
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own cart items
CREATE POLICY "Users can update own cart"
  ON public.cart_items
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can remove from their own cart
CREATE POLICY "Users can delete own cart"
  ON public.cart_items
  FOR DELETE
  USING (auth.uid() = user_id);
