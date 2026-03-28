-- Orders table
CREATE TABLE public.orders (
  id                       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number             TEXT UNIQUE NOT NULL,
  user_id                  UUID REFERENCES auth.users(id),
  email                    TEXT NOT NULL,
  status                   TEXT NOT NULL DEFAULT 'confirmed'
                           CHECK (status IN ('confirmed','processing','shipped','delivered','cancelled')),
  subtotal                 NUMERIC(10,2) NOT NULL,
  shipping                 NUMERIC(10,2) NOT NULL DEFAULT 0,
  tax                      NUMERIC(10,2) NOT NULL DEFAULT 0,
  total                    NUMERIC(10,2) NOT NULL,
  shipping_address         JSONB NOT NULL,
  stripe_session_id        TEXT,
  stripe_payment_intent_id TEXT,
  tracking_number          TEXT,
  notes                    TEXT,
  created_at               TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at               TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Order items table
CREATE TABLE public.order_items (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id      UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id    UUID REFERENCES public.products(id),
  variant_id    UUID REFERENCES public.product_variants(id),
  product_name  TEXT NOT NULL,
  product_image TEXT,
  variant_size  TEXT NOT NULL,
  variant_color TEXT NOT NULL,
  price         NUMERIC(10,2) NOT NULL,
  quantity      INT NOT NULL CHECK (quantity > 0)
);

-- Indexes
CREATE INDEX idx_orders_user_id            ON public.orders (user_id);
CREATE INDEX idx_orders_order_number       ON public.orders (order_number);
CREATE INDEX idx_orders_stripe_session_id  ON public.orders (stripe_session_id);
CREATE INDEX idx_order_items_order_id      ON public.order_items (order_id);

-- Auto-update updated_at on orders
CREATE TRIGGER trg_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

-- Row-Level Security: orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Users can read their own orders
CREATE POLICY "Users can read own orders"
  ON public.orders
  FOR SELECT
  USING (auth.uid() = user_id);

-- Admins can read all orders
CREATE POLICY "Admins can read all orders"
  ON public.orders
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Admins can insert orders
CREATE POLICY "Admins can insert orders"
  ON public.orders
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Admins can update orders
CREATE POLICY "Admins can update orders"
  ON public.orders
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

-- Admins can delete orders
CREATE POLICY "Admins can delete orders"
  ON public.orders
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Row-Level Security: order_items
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Users can read their own order items (via parent order)
CREATE POLICY "Users can read own order items"
  ON public.order_items
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
        AND orders.user_id = auth.uid()
    )
  );

-- Admins can read all order items
CREATE POLICY "Admins can read all order items"
  ON public.order_items
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Admins can insert order items
CREATE POLICY "Admins can insert order items"
  ON public.order_items
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Admins can update order items
CREATE POLICY "Admins can update order items"
  ON public.order_items
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

-- Admins can delete order items
CREATE POLICY "Admins can delete order items"
  ON public.order_items
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
