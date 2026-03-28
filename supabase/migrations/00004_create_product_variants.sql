-- Product variants table
CREATE TABLE public.product_variants (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  size       TEXT NOT NULL,
  color      TEXT NOT NULL,
  color_hex  TEXT NOT NULL DEFAULT '#000000',
  sku        TEXT UNIQUE NOT NULL,
  stock      INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
  position   INT DEFAULT 0,
  UNIQUE (product_id, size, color)
);

-- Indexes
CREATE INDEX idx_product_variants_product_id ON public.product_variants (product_id);
CREATE INDEX idx_product_variants_sku        ON public.product_variants (sku);

-- Row-Level Security
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;

-- Anyone can read variants
CREATE POLICY "Public read access"
  ON public.product_variants
  FOR SELECT
  USING (true);

-- Admins can insert variants
CREATE POLICY "Admins can insert variants"
  ON public.product_variants
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Admins can update variants
CREATE POLICY "Admins can update variants"
  ON public.product_variants
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Admins can delete variants
CREATE POLICY "Admins can delete variants"
  ON public.product_variants
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
