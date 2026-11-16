import { supabase } from '../lib/supabase';
import { Product, Order, OnDemandRequest, OrderStatus } from '../types';

// Map database row to Product interface
export function mapRowToProduct(row: any): Product {
  return {
    id: row.id,
    name: row.name,
    subtitle: row.subtitle || undefined,
    category: row.category,
    subcategory: row.subcategory,
    sku: row.sku,
    price: Number(row.price),
    originalPrice: row.original_price ? Number(row.original_price) : undefined,
    inStock: Boolean(row.in_stock),
    stockCount: Number(row.stock_count || 0),
    rating: Number(row.rating || 5.0),
    reviewCount: Number(row.review_count || 0),
    image: row.image,
    additionalImages: row.additional_images || [],
    description: row.description,
    material: row.material || undefined,
    dimensions: row.dimensions || undefined,
    weight: row.weight || undefined,
    tags: row.tags || [],
    isNewArrival: Boolean(row.is_new_arrival),
    isBestSeller: Boolean(row.is_best_seller),
    isFestivalSpecial: Boolean(row.is_festival_special)
  };
}

// Map Product to database row
export function mapProductToRow(prod: Product): any {
  return {
    id: prod.id,
    name: prod.name,
    subtitle: prod.subtitle || null,
    category: prod.category,
    subcategory: prod.subcategory,
    sku: prod.sku,
    price: prod.price,
    original_price: prod.originalPrice || null,
    in_stock: prod.inStock,
    stock_count: prod.stockCount,
    rating: prod.rating,
    review_count: prod.reviewCount,
    image: prod.image,
    additional_images: prod.additionalImages || [],
    description: prod.description,
    material: prod.material || null,
    dimensions: prod.dimensions || null,
    weight: prod.weight || null,
    tags: prod.tags || [],
    is_new_arrival: prod.isNewArrival || false,
    is_best_seller: prod.isBestSeller || false,
    is_festival_special: prod.isFestivalSpecial || false
  };
}

// Map database row to Order interface
export function mapRowToOrder(row: any): Order {
  return {
    id: row.id,
    orderNumber: row.order_number,
    createdAt: row.created_at,
    items: row.items,
    subtotal: Number(row.subtotal),
    discount: Number(row.discount || 0),
    shippingFee: Number(row.shipping_fee || 0),
    total: Number(row.total),
    couponCode: row.coupon_code || undefined,
    status: row.status as OrderStatus,
    shippingAddress: row.shipping_address,
    shippingMethod: row.shipping_method,
    trackingNumber: row.tracking_number || '',
    estimatedDelivery: row.estimated_delivery || '',
    paymentMethod: row.payment_method
  };
}

// Map Order to database row
export function mapOrderToRow(order: Order): any {
  return {
    id: order.id,
    order_number: order.orderNumber,
    items: order.items,
    subtotal: order.subtotal,
    discount: order.discount,
    shipping_fee: order.shippingFee,
    total: order.total,
    coupon_code: order.couponCode || null,
    status: order.status,
    shipping_address: order.shippingAddress,
    shipping_method: order.shippingMethod,
    tracking_number: order.trackingNumber || null,
    estimated_delivery: order.estimatedDelivery || null,
    payment_method: order.paymentMethod,
    created_at: order.createdAt || new Date().toISOString()
  };
}

// Map database row to OnDemandRequest interface
export function mapRowToRequest(row: any): OnDemandRequest {
  return {
    id: row.id,
    fullName: row.full_name,
    email: row.email,
    phone: row.phone,
    itemCategory: row.item_category,
    productDescription: row.product_description,
    approximateBudget: row.approximate_budget || undefined,
    neededByDate: row.needed_by_date || undefined,
    status: row.status,
    createdAt: row.created_at
  };
}

// Map OnDemandRequest to database row
export function mapRequestToRow(req: OnDemandRequest): any {
  return {
    id: req.id,
    full_name: req.fullName,
    email: req.email,
    phone: req.phone,
    item_category: req.itemCategory,
    product_description: req.productDescription,
    approximate_budget: req.approximateBudget || null,
    needed_by_date: req.neededByDate || null,
    status: req.status || 'Received',
    created_at: req.createdAt || new Date().toISOString()
  };
}

/* =========================================================================
   Supabase Data API Methods
   ========================================================================= */

export async function fetchProductsFromSupabase(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching products from Supabase:', error);
    throw error;
  }
  return (data || []).map(mapRowToProduct);
}

export async function upsertProductInSupabase(product: Product): Promise<Product> {
  const row = mapProductToRow(product);
  const { data, error } = await supabase
    .from('products')
    .upsert(row)
    .select()
    .single();

  if (error) {
    console.error('Error saving product to Supabase:', error);
    throw error;
  }
  return mapRowToProduct(data);
}

export async function deleteProductInSupabase(productId: string): Promise<void> {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', productId);

  if (error) {
    console.error('Error deleting product from Supabase:', error);
    throw error;
  }
}

export async function fetchOrdersFromSupabase(): Promise<Order[]> {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching orders from Supabase:', error);
    throw error;
  }
  return (data || []).map(mapRowToOrder);
}

export async function insertOrderInSupabase(order: Order): Promise<Order> {
  const row = mapOrderToRow(order);
  const { data, error } = await supabase
    .from('orders')
    .insert(row)
    .select()
    .single();

  if (error) {
    console.error('Error inserting order into Supabase:', error);
    throw error;
  }
  return mapRowToOrder(data);
}

export async function updateOrderStatusInSupabase(orderId: string, status: OrderStatus): Promise<void> {
  const { error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId);

  if (error) {
    console.error('Error updating order status in Supabase:', error);
    throw error;
  }
}

export async function fetchOnDemandRequestsFromSupabase(): Promise<OnDemandRequest[]> {
  const { data, error } = await supabase
    .from('on_demand_requests')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching on-demand requests from Supabase:', error);
    throw error;
  }
  return (data || []).map(mapRowToRequest);
}

export async function insertOnDemandRequestInSupabase(req: OnDemandRequest): Promise<OnDemandRequest> {
  const row = mapRequestToRow(req);
  const { data, error } = await supabase
    .from('on_demand_requests')
    .insert(row)
    .select()
    .single();

  if (error) {
    console.error('Error inserting on-demand request into Supabase:', error);
    throw error;
  }
  return mapRowToRequest(data);
}

export async function updateOnDemandRequestStatusInSupabase(
  reqId: string,
  status: OnDemandRequest['status']
): Promise<void> {
  const { error } = await supabase
    .from('on_demand_requests')
    .update({ status })
    .eq('id', reqId);

  if (error) {
    console.error('Error updating request status in Supabase:', error);
    throw error;
  }
}
