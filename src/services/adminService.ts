import { supabase } from '../lib/supabase';

export { supabase };

// ─── Admin Check ──────────────────────────────────────────────────────────────

export async function checkIsAdmin(
  email: string
): Promise<{ isAdmin: boolean; role: string; name: string }> {
  const { data, error } = await supabase
    .from('admin_users')
    .select('role, name')
    .eq('email', email)
    .maybeSingle();

  if (error || !data) {
    return { isAdmin: false, role: '', name: '' };
  }
  return { isAdmin: true, role: data.role as string, name: data.name as string };
}

// ─── Admin Stats ─────────────────────────────────────────────────────────────

export async function fetchAdminStats(): Promise<{
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  pendingRequests: number;
  totalUsers: number;
}> {
  const [productsRes, ordersRes, requestsRes] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('total', { count: 'exact' }),
    supabase
      .from('on_demand_requests')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'Received'),
  ]);

  const totalProducts = productsRes.count ?? 0;
  const totalOrders = ordersRes.count ?? 0;
  const totalRevenue =
    ordersRes.data?.reduce((sum: number, o: { total: number }) => sum + (o.total ?? 0), 0) ?? 0;
  const pendingRequests = requestsRes.count ?? 0;

  // auth.users count via get_all_users()
  let totalUsers = 0;
  try {
    const { data: usersData } = await supabase.rpc('get_all_users');
    totalUsers = usersData?.length ?? 0;
  } catch {
    totalUsers = 0;
  }

  return { totalProducts, totalOrders, totalRevenue, pendingRequests, totalUsers };
}

// ─── All Users ────────────────────────────────────────────────────────────────

/**
 * Fetches registered users.
 * Note: auth.users is only accessible via service-role key on the server side.
 * Client-side anon key cannot query auth.users directly. This function attempts
 * to fetch from a `user_profiles` view/table if one exists; otherwise returns [].
 */
export async function fetchAllUsers(): Promise<
  Array<{
    id: string;
    email: string;
    created_at: string;
    email_confirmed_at: string | null;
  }>
> {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('id, email, created_at, email_confirmed_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn(
        'fetchAllUsers: user_profiles query failed — service role key required for auth.users.',
        error.message
      );
      return [];
    }
    return (data ?? []) as Array<{
      id: string;
      email: string;
      created_at: string;
      email_confirmed_at: string | null;
    }>;
  } catch (err) {
    console.warn('fetchAllUsers: unexpected error', err);
    return [];
  }
}

// ─── Update Last Login ────────────────────────────────────────────────────────

export async function updateAdminLastLogin(email: string): Promise<void> {
  const { error } = await supabase
    .from('admin_users')
    .update({ last_login: new Date().toISOString() })
    .eq('email', email);

  if (error) {
    console.error('updateAdminLastLogin error:', error.message);
  }
}
