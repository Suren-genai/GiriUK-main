import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Filter, 
  ArrowUpDown, 
  ChevronRight,
  BookOpen, 
  Award,
  CheckCircle,
  HelpCircle,
  Clock
} from 'lucide-react';
import { 
  INITIAL_PRODUCTS, 
  AVAILABLE_COUPONS, 
  BLOG_POSTS, 
  TESTIMONIALS, 
  INITIAL_ORDERS,
  CATEGORIES_TAXONOMY 
} from './data/mockData';
import { Product, CartItem, Coupon, Order, OnDemandRequest, BlogPost, OrderStatus } from './types';
import { Header, NavPage } from './components/Header';
import { HeroSlider } from './components/HeroSlider';
import { ProductCard } from './components/ProductCard';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { AccountModal } from './components/AccountModal';
import { AuthModal } from './components/AuthModal';
import { OnDemandModal } from './components/OnDemandModal';
import { BlogModal } from './components/BlogModal';
import { StaticPagesModal, StaticPageType } from './components/StaticPagesModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { Footer } from './components/Footer';
import { 
  fetchProductsFromSupabase, 
  upsertProductInSupabase, 
  fetchOrdersFromSupabase, 
  insertOrderInSupabase, 
  updateOrderStatusInSupabase, 
  fetchOnDemandRequestsFromSupabase, 
  insertOnDemandRequestInSupabase 
} from './services/supabaseService';
import { IdolsHandicraftsPage } from './pages/IdolsHandicraftsPage';
import { PujaEssentialsPage } from './pages/PujaEssentialsPage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { OnDemandBespokePage } from './pages/OnDemandBespokePage';
import { ContactUsSanctuaryPage } from './pages/ContactUsSanctuaryPage';
import { AboutHeritageStoryPage } from './pages/AboutHeritageStoryPage';
import FaqHelpCentrePage from './pages/FaqHelpCentrePage';
import DeliveryShippingReturnsPage from './pages/DeliveryShippingReturnsPage';
import { CategoryPage } from './pages/CategoryPage';
import { slugify, findCategoryBySlug, findSubcategoryBySlug } from './utils/seoUtils';
import { supabase } from './lib/supabase';

export default function App() {
  // Navigation Page State ('home' | 'idols' | 'puja' | 'search' | 'on-demand' | 'contact' | 'about' | 'faq' | 'delivery')
  const [currentPage, setCurrentPage] = useState<NavPage>('home');
  const [searchQueryParam, setSearchQueryParam] = useState<string>('Diya');

  // Products & Store State
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('giriuk_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('giriuk_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [onDemandRequests, setOnDemandRequests] = useState<OnDemandRequest[]>(() => {
    const saved = localStorage.getItem('giriuk_requests');
    return saved ? JSON.parse(saved) : [];
  });

  // Shopping State
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('giriuk_cart');
    return saved ? JSON.parse(saved) : [
      { product: INITIAL_PRODUCTS[1], quantity: 1 } // Pre-populated with 1 auspicious puja thali
    ];
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('giriuk_wishlist');
    return saved ? JSON.parse(saved) : [INITIAL_PRODUCTS[0]];
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    return AVAILABLE_COUPONS[0]; // GIRIUK2026 default applied for ease
  });

  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(null);

  // Auth modal state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  // Listen for Supabase auth state changes
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const name =
          session.user.user_metadata?.full_name ||
          session.user.user_metadata?.name ||
          session.user.email?.split('@')[0] ||
          'Customer';
        setCurrentUser({ name, email: session.user.email! });
      }
    });

    // Subscribe to future auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const name =
          session.user.user_metadata?.full_name ||
          session.user.user_metadata?.name ||
          session.user.email?.split('@')[0] ||
          'Customer';
        setCurrentUser({ name, email: session.user.email! });
        setIsAuthOpen(false);
      } else {
        setCurrentUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Navigation & Filtering State
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');
  const [onlyInStock, setOnlyInStock] = useState(false);

  // Modals State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [trackingInitialRef, setTrackingInitialRef] = useState('GIRI-UK-849201');
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isOnDemandOpen, setIsOnDemandOpen] = useState(false);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);
  const [staticPageType, setStaticPageType] = useState<StaticPageType | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Load live data from Supabase on mount
  useEffect(() => {
    let isMounted = true;
    async function loadSupabaseData() {
      try {
        setIsLoadingData(true);
        const [supaProducts, supaOrders, supaRequests] = await Promise.all([
          fetchProductsFromSupabase(),
          fetchOrdersFromSupabase(),
          fetchOnDemandRequestsFromSupabase()
        ]);
        if (!isMounted) return;
        if (supaProducts && supaProducts.length > 0) {
          setProducts(supaProducts);
        }
        if (supaOrders && supaOrders.length > 0) {
          setOrders(supaOrders);
        }
        if (supaRequests) {
          setOnDemandRequests(supaRequests);
        }
        setIsSupabaseConnected(true);
      } catch (err) {
        console.warn('Falling back to local cache/mock data:', err);
        setIsSupabaseConnected(false);
      } finally {
        if (isMounted) setIsLoadingData(false);
      }
    }
    loadSupabaseData();
    return () => { isMounted = false; };
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('giriuk_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('giriuk_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('giriuk_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('giriuk_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('giriuk_requests', JSON.stringify(onDemandRequests));
  }, [onDemandRequests]);

  // Cart Handlers
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added "${product.name.slice(0, 30)}..." to your bag`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i))
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`Removed from your wishlist`);
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast(`Saved to your wishlist`);
        return [...prev, product];
      }
    });
  };

  const handleApplyCoupon = (code: string) => {
    const found = AVAILABLE_COUPONS.find((c) => c.code === code);
    if (found) {
      setAppliedCoupon(found);
      return { success: true, message: `Coupon ${found.code} applied! ${found.discountPercent}% discount active.` };
    }
    return { success: false, message: 'Invalid or expired coupon code. Try GIRIUK2026.' };
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
  };

  // Open dedicated full Product Detail Page (no pop-up)
  const handleOpenProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product');
    const pSlug = `${slugify(product.name)}-${product.id}`;
    window.history.pushState({ productId: product.id }, '', `/product/${pSlug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Listen for Browser Back/Forward navigation and initial URL deep links
  useEffect(() => {
    const handleLocationChange = () => {
      const pathname = window.location.pathname;
      if (pathname.startsWith('/product/')) {
        const parts = pathname.replace('/product/', '').split('-');
        const idCandidate = parts[parts.length - 1];
        const found = products.find(
          (p) => p.id === idCandidate || pathname.includes(p.id) || pathname.includes(p.sku.toLowerCase())
        );
        if (found) {
          setSelectedProduct(found);
          setCurrentPage('product');
          return;
        }
      } else if (pathname.startsWith('/category/')) {
        const parts = pathname.replace('/category/', '').split('/').filter(Boolean);
        const catSlug = parts[0];
        const subSlug = parts[1];

        if (catSlug) {
          const matchedCat = findCategoryBySlug(catSlug);
          if (matchedCat) {
            setSelectedCategory(matchedCat.name);
            if (subSlug) {
              const matchedSub = findSubcategoryBySlug(matchedCat.name, subSlug);
              setSelectedSubcategory(matchedSub || null);
            } else {
              setSelectedSubcategory(null);
            }
            setCurrentPage('category');
            return;
          }
        }
      } else if (pathname === '/' || pathname === '') {
        setCurrentPage('home');
      }
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, [products]);

  const handleSelectCategory = (categoryName: string, subcategoryName?: string) => {
    if (categoryName === 'All') {
      setSelectedCategory('All');
      setSelectedSubcategory(null);
      setCurrentPage('home');
      window.history.pushState(null, '', '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setSelectedCategory(categoryName);
    setSelectedSubcategory(subcategoryName || null);
    setCurrentPage('category');

    const catSlug = slugify(categoryName);
    const subSlug = subcategoryName ? slugify(subcategoryName) : '';
    const newPath = subSlug ? `/category/${catSlug}/${subSlug}` : `/category/${catSlug}`;
    window.history.pushState({ category: categoryName, subcategory: subcategoryName }, '', newPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered & Sorted Products
  const filteredProducts = products.filter((p) => {
    if (selectedCategory !== 'All') {
      if (selectedCategory === 'Festival Special' && !p.isFestivalSpecial) return false;
      if (selectedCategory === 'New Arrivals' && !p.isNewArrival) return false;
      if (selectedCategory !== 'Festival Special' && selectedCategory !== 'New Arrivals' && p.category !== selectedCategory) {
        return false;
      }
    }
    if (selectedSubcategory && p.subcategory !== selectedSubcategory) {
      return false;
    }
    if (onlyInStock && !p.inStock) {
      return false;
    }
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
    return 0; // default featured
  });

  const cartTotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cartItems.reduce((c, i) => c + i.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FCF9F2]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#00362f] text-white px-4 py-2.5 rounded-xl shadow-xl border border-[#cca730]/40 text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle className="w-4 h-4 text-[#ffdb96]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <Header
        currentPage={currentPage}
        onNavigatePage={(page, query) => {
          setCurrentPage(page);
          if (query) setSearchQueryParam(query);
          if (page === 'home') {
            setSelectedCategory('All');
            setSelectedSubcategory(null);
            window.history.pushState(null, '', '/');
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        cartCount={cartCount}
        cartTotal={cartTotal}
        wishlistCount={wishlist.length}
        currentUser={currentUser}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsAccountOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenSignIn={() => { setAuthMode('signin'); setIsAuthOpen(true); }}
        onOpenSignUp={() => { setAuthMode('signup'); setIsAuthOpen(true); }}
        onSignOut={async () => {
          await supabase.auth.signOut();
          setCurrentUser(null);
          showToast('Signed out successfully');
        }}
        onOpenTrackOrder={() => setIsTrackingOpen(true)}
        onOpenOnDemand={() => setIsOnDemandOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onSelectCategory={handleSelectCategory}
        onSelectProduct={handleOpenProduct}
        allProducts={products}
        currentCategory={selectedCategory}
        currentSubcategory={selectedSubcategory}
        isSupabaseConnected={isSupabaseConnected}
      />

      {/* Conditional Rendering Based on Current Page */}
      {currentPage === 'product' && selectedProduct && (
        <ProductDetailPage
          product={selectedProduct}
          allProducts={products}
          wishlist={wishlist}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          onSelectProduct={handleOpenProduct}
          onNavigateHome={() => {
            setCurrentPage('home');
            window.history.pushState(null, '', '/');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onSelectCategory={handleSelectCategory}
          onOpenOnDemand={() => setIsOnDemandOpen(true)}
        />
      )}

      {currentPage === 'category' && (
        <CategoryPage
          categoryName={selectedCategory}
          subcategoryName={selectedSubcategory}
          allProducts={products}
          wishlist={wishlist}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          onOpenProduct={handleOpenProduct}
          onOpenOnDemand={() => setIsOnDemandOpen(true)}
          onNavigateHome={() => {
            setCurrentPage('home');
            setSelectedCategory('All');
            setSelectedSubcategory(null);
            window.history.pushState(null, '', '/');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onSelectCategory={handleSelectCategory}
        />
      )}

      {currentPage === 'idols' && (
        <IdolsHandicraftsPage
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          onOpenProduct={handleOpenProduct}
          onOpenOnDemand={() => setIsOnDemandOpen(true)}
          onNavigateHome={() => setCurrentPage('home')}
          wishlist={wishlist}
        />
      )}

      {currentPage === 'puja' && (
        <PujaEssentialsPage
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          onOpenProduct={handleOpenProduct}
          onOpenOnDemand={() => setIsOnDemandOpen(true)}
          onNavigateHome={() => setCurrentPage('home')}
          wishlist={wishlist}
        />
      )}

      {currentPage === 'search' && (
        <SearchResultsPage
          initialQuery={searchQueryParam}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          onOpenProduct={handleOpenProduct}
          onOpenOnDemand={() => setIsOnDemandOpen(true)}
          onNavigateHome={() => setCurrentPage('home')}
          onSelectCategory={(cat) => {
            if (cat === 'Idols & Handicrafts') {
              setCurrentPage('idols');
            } else if (cat === 'Puja') {
              setCurrentPage('puja');
            } else {
              setCurrentPage('home');
              handleSelectCategory(cat);
            }
          }}
          wishlist={wishlist}
        />
      )}

      {currentPage === 'on-demand' && (
        <OnDemandBespokePage
          onNavigateHome={() => {
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onSubmitRequest={(req) => {
            setOnDemandRequests((prev) => [req, ...prev]);
            showToast(`Bespoke commission request registered`);
            insertOnDemandRequestInSupabase(req).catch((err) =>
              console.error('Failed to sync on-demand request to Supabase:', err)
            );
          }}
        />
      )}

      {currentPage === 'contact' && (
        <ContactUsSanctuaryPage
          onNavigateHome={() => {
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {currentPage === 'about' && (
        <AboutHeritageStoryPage
          onNavigateHome={() => {
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onExploreCatalog={() => {
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {currentPage === 'faq' && (
        <FaqHelpCentrePage
          onNavigate={(p) => {
            setCurrentPage(p as NavPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenContact={() => {
            setCurrentPage('contact');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenOnDemand={() => {
            setCurrentPage('on-demand');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {currentPage === 'delivery' && (
        <DeliveryShippingReturnsPage
          onNavigate={(p) => {
            setCurrentPage(p as NavPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenTrackOrder={() => setIsTrackingOpen(true)}
        />
      )}

      {currentPage === 'home' && (
        <>
          {/* Hero Banner with Trustpilot Bar */}
          <HeroSlider onShopNow={(cat) => handleSelectCategory(cat || 'All')} />

          {/* Main Content Area */}
          <main className="flex-1 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-16">
            {/* Curated Products Catalog Section */}
            <section id="catalog-section" className="space-y-6">
          {/* Section Header & Department Filter Tabs */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#EBE6DC]">
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#164E45] font-semibold">
                {selectedCategory === 'All' ? 'Sacred Devotional Goods & Handcrafted Arts' : selectedCategory}
              </h2>
              {selectedSubcategory && (
                <p className="text-xs text-stone-500 mt-0.5">Showing subcategory: <strong>{selectedSubcategory}</strong></p>
              )}
            </div>

            {/* Sorting & Filter Controls */}
            <div className="flex items-center gap-3 flex-wrap">
              {/* In Stock Only Toggle */}
              <label className="flex items-center gap-2 text-xs text-stone-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="rounded text-[#164E45] focus:ring-[#164E45]"
                />
                <span>In Stock Only</span>
              </label>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-1.5 text-xs text-stone-600 bg-white border border-stone-200 px-3 py-1.5 rounded-full shadow-xs">
                <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
                <span className="font-medium">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent focus:outline-none font-semibold text-stone-800 cursor-pointer"
                >
                  <option value="featured">Featured Curations</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Latest Arrivals</option>
                </select>
              </div>
            </div>
          </div>

          {/* Subcategory Pills (if a category is chosen) */}
          {selectedCategory !== 'All' && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              <button
                onClick={() => setSelectedSubcategory(null)}
                className={`px-3 py-1 rounded-full whitespace-nowrap cursor-pointer transition-colors ${
                  selectedSubcategory === null
                    ? 'bg-[#164E45] text-white font-bold'
                    : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
                }`}
              >
                All in {selectedCategory}
              </button>
              {CATEGORIES_TAXONOMY.find((c) => c.name === selectedCategory)?.subcategories?.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubcategory(sub)}
                  className={`px-3 py-1 rounded-full whitespace-nowrap cursor-pointer transition-colors ${
                    selectedSubcategory === sub
                      ? 'bg-[#164E45] text-white font-bold'
                      : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}

          {/* Product Grid */}
          {sortedProducts.length === 0 ? (
            <div className="py-16 text-center bg-white rounded-2xl border border-stone-200 p-8 space-y-3">
              <p className="text-base font-serif text-stone-700">No items match the selected filters.</p>
              <p className="text-xs text-stone-500">
                You can reset your filters, browse all collections, or request an item directly from India.
              </p>
              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedSubcategory(null);
                    setOnlyInStock(false);
                  }}
                  className="px-5 py-2 rounded-full bg-[#164E45] text-white text-xs font-bold"
                >
                  Show All Products
                </button>
                <button
                  onClick={() => setIsOnDemandOpen(true)}
                  className="px-5 py-2 rounded-full border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50"
                >
                  Submit On-Demand Request
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isWishlisted={wishlist.some((w) => w.id === product.id)}
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                  onSelectProduct={handleOpenProduct}
                />
              ))}
            </div>
          )}
        </section>

        {/* Feature Spotlight Banner: On-Demand Custom Sourcing (SOW §15) */}
        <section className="bg-gradient-to-r from-[#00362f] via-[#164E45] to-[#002b25] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-lg border border-[#cca730]/30">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#ffdb96]">
              <Sparkles className="w-4 h-4 text-[#cca730]" />
              <span>Direct Temple Sourcing Desk</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-50 leading-tight">
              Can&apos;t Find a Specific Temple Idol or Rare Scripture in the UK?
            </h3>
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-normal">
              Whether you require a custom 24-inch lost-wax cast panchaloha murti for your home altar, bespoke Bharatanatyam dance costumes tailored in Chennai, or out-of-print Sanskrit and Tamil stotra publications, our team sources directly from master sthapatis and delivers to your British doorstep.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setIsOnDemandOpen(true)}
                className="px-6 py-3 rounded-full bg-[#cca730] hover:bg-[#b89528] text-[#002b25] text-xs font-bold transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <span>Request Custom Temple Item</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Customer Testimonials Section (SOW §5.8) */}
        <section className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B99A5B]">
              Devotee Experiences Across Britain
            </span>
            <h3 className="text-2xl font-serif font-semibold text-[#164E45]">
              Trusted by Thousands of Indian Households in the UK &amp; Europe
            </h3>
            <p className="text-xs text-stone-500">
              Verified customer feedback from London, Leicester, Birmingham, Manchester, and Edinburgh.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {TESTIMONIALS.map((test) => (
              <div
                key={test.id}
                className="p-5 rounded-2xl bg-white border border-[#ECE7DE] shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex text-[#B99A5B] text-xs">
                      {'★★★★★'.split('').map((s, idx) => (
                        <span key={idx}>{s}</span>
                      ))}
                    </div>
                    <span className="text-[10px] text-stone-400 font-mono">{test.date}</span>
                  </div>
                  <h4 className="text-xs font-bold text-stone-900 leading-snug">&ldquo;{test.title}&rdquo;</h4>
                  <p className="text-xs text-stone-600 leading-relaxed italic line-clamp-3">{test.content}</p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-[11px]">
                  <div>
                    <p className="font-bold text-stone-900">{test.name}</p>
                    <p className="text-stone-400">{test.location}</p>
                  </div>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded-full">
                    Verified Buyer
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Heritage Journal & Spiritual Insights (SOW §5.9 & §16) */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-3 border-b border-[#EBE6DC]">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#B99A5B]">
                Heritage Journal &amp; Spiritual Insights
              </span>
              <h3 className="text-2xl font-serif font-semibold text-[#164E45] mt-1">
                Sacred Traditions for Modern Living
              </h3>
            </div>
            <button
              onClick={() => setSelectedBlogPost(BLOG_POSTS[0])}
              className="text-xs font-bold text-[#164E45] hover:text-[#00362f] flex items-center gap-1 cursor-pointer"
            >
              <span>Explore All Articles</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post) => (
              <div
                key={post.id}
                onClick={() => setSelectedBlogPost(post)}
                className="group bg-white rounded-2xl border border-[#ECE7DE] hover:border-[#164E45]/40 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="aspect-16/10 bg-[#FAF7F0] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] text-stone-400 mb-1.5">
                      <span className="font-semibold text-[#B99A5B]">{post.category}</span>
                      <span>·</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h4 className="text-sm font-serif font-bold text-stone-900 group-hover:text-[#164E45] line-clamp-2 transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-xs text-stone-600 line-clamp-2 mt-1.5 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-[#164E45]">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  )}

      {/* Footer */}
      <Footer
        onOpenStaticPage={(page) => setStaticPageType(page)}
        onOpenTrackOrder={() => setIsTrackingOpen(true)}
        onSelectCategory={handleSelectCategory}
        onNavigatePage={(page) => {
          setCurrentPage(page as NavPage);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={handleApplyCoupon}
        onRemoveCoupon={handleRemoveCoupon}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        onContinueShopping={() => handleSelectCategory('All')}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        appliedCoupon={appliedCoupon}
        onOrderPlaced={(newOrder) => {
          setOrders((prev) => [newOrder, ...prev]);
          showToast(`Order ${newOrder.orderNumber} successfully placed!`);
          insertOrderInSupabase(newOrder).catch((err) =>
            console.error('Failed to sync order to Supabase:', err)
          );
        }}
        onClearCart={handleClearCart}
        onTrackOrder={(ordNum) => {
          setTrackingInitialRef(ordNum);
          setIsTrackingOpen(true);
        }}
      />

      {/* Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        orders={orders}
        initialOrderNumber={trackingInitialRef}
      />

      {/* Customer Account Modal */}
      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        currentUser={currentUser}
        onLogin={(name, email) => {
          setCurrentUser({ name, email });
          showToast(`Signed in as ${name}`);
        }}
        onLogout={async () => {
          await supabase.auth.signOut();
          setCurrentUser(null);
          showToast('Signed out of account');
        }}
        orders={orders}
        wishlist={wishlist}
        onSelectProduct={(p) => {
          setIsAccountOpen(false);
          handleOpenProduct(p);
        }}
        onTrackOrder={(ordNum) => {
          setTrackingInitialRef(ordNum);
          setIsTrackingOpen(true);
        }}
      />

      {/* Auth Modal (Sign In / Sign Up via Supabase Auth) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialMode={authMode}
        onAuthSuccess={(user) => {
          setCurrentUser(user);
          showToast(`Welcome back, ${user.name}!`);
        }}
      />

      {/* On-Demand Sourcing Modal */}
      <OnDemandModal
        isOpen={isOnDemandOpen}
        onClose={() => setIsOnDemandOpen(false)}
        onSubmitRequest={(req) => {
          setOnDemandRequests((prev) => [req, ...prev]);
          showToast(`Sourcing ticket ${req.id.toUpperCase()} logged`);
          insertOnDemandRequestInSupabase(req).catch((err) =>
            console.error('Failed to sync on-demand request to Supabase:', err)
          );
        }}
      />

      {/* Blog Reading Modal */}
      <BlogModal
        post={selectedBlogPost}
        onClose={() => setSelectedBlogPost(null)}
      />

      {/* Static Pages Modal */}
      <StaticPagesModal
        pageType={staticPageType}
        onClose={() => setStaticPageType(null)}
      />

      {/* Admin Store Manager Modal */}
      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        orders={orders}
        coupons={AVAILABLE_COUPONS}
        onDemandRequests={onDemandRequests}
        onUpdateProduct={(up) => {
          setProducts((prev) => prev.map((p) => (p.id === up.id ? up : p)));
          showToast(`Updated product "${up.name.slice(0, 20)}..."`);
          upsertProductInSupabase(up).catch((err) =>
            console.error('Failed to sync updated product to Supabase:', err)
          );
        }}
        onUpdateOrderStatus={(ordId, st) => {
          setOrders((prev) =>
            prev.map((o) => (o.id === ordId ? { ...o, status: st } : o))
          );
          showToast(`Order status updated to ${st}`);
          updateOrderStatusInSupabase(ordId, st).catch((err) =>
            console.error('Failed to sync order status to Supabase:', err)
          );
        }}
        onAddCoupon={(c) => {
          AVAILABLE_COUPONS.push(c);
          showToast(`Coupon ${c.code} created`);
        }}
      />
    </div>
  );
}
