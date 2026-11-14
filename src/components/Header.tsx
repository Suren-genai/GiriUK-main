import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Truck, 
  User, 
  Heart, 
  ShoppingBag, 
  ChevronDown, 
  Tag, 
  Check, 
  X,
  Sparkles,
  LogIn,
  UserPlus,
  LogOut,
} from 'lucide-react';
import { CATEGORIES_TAXONOMY } from '../data/mockData';
import { Product } from '../types';

export type NavPage = 'home' | 'idols' | 'puja' | 'search' | 'on-demand' | 'contact' | 'about' | 'faq' | 'delivery' | 'category' | 'product';

interface HeaderProps {
  currentPage: NavPage;
  onNavigatePage: (page: NavPage, query?: string) => void;
  cartCount: number;
  cartTotal: number;
  wishlistCount: number;
  currentUser: { name: string; email: string } | null;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAccount: () => void;
  onOpenSignIn: () => void;
  onOpenSignUp: () => void;
  onSignOut: () => void;
  onOpenTrackOrder: () => void;
  onOpenOnDemand: () => void;
  onOpenAdmin: () => void;
  onSelectCategory: (categoryName: string, subcategoryName?: string) => void;
  onSelectProduct: (product: Product) => void;
  allProducts: Product[];
  currentCategory: string;
  currentSubcategory?: string | null;
  isSupabaseConnected?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigatePage,
  cartCount,
  cartTotal,
  wishlistCount,
  currentUser,
  onOpenCart,
  onOpenWishlist,
  onOpenAccount,
  onOpenSignIn,
  onOpenSignUp,
  onSignOut,
  onOpenTrackOrder,
  onOpenOnDemand,
  onOpenAdmin,
  onSelectCategory,
  onSelectProduct,
  allProducts,
  currentCategory,
  currentSubcategory,
  isSupabaseConnected
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [copiedCoupon, setCopiedCoupon] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText('GIRIUK2026');
    setCopiedCoupon(true);
    setTimeout(() => setCopiedCoupon(false), 2500);
  };

  const filteredSearchResults = searchQuery.trim() === ''
    ? []
    : allProducts.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.tags && p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())))
      );

  const popularKeywords = ['Balaji', 'Diya', 'Dhoti', 'Puja Thali', 'Panchangam', 'Nataraja', 'Sandalwood'];

  return (
    <header className="sticky top-0 z-40 bg-[#FCF9F2] shadow-xs">
      {/* 1. Promotional Announcement Strip with Quick Page Switcher */}
      <div className="bg-[#00362f] text-white text-xs py-2 px-4 transition-colors">
        <div className="max-w-[1340px] mx-auto flex items-center justify-center gap-3 text-center flex-wrap">
          <button 
            onClick={handleCopyCoupon}
            className="inline-flex items-center gap-1.5 text-stone-100 hover:text-[#ffdb96] transition-colors cursor-pointer group"
            title="Click to copy promo code"
          >
            <Tag className="w-3.5 h-3.5 text-[#D4AF37] group-hover:rotate-12 transition-transform" />
            <span>Use Code <strong className="text-[#ffdb96] font-semibold tracking-wide">GIRIUK2026</strong> and Get 10% Off</span>
            {copiedCoupon ? (
              <span className="text-[10px] bg-[#cca730] text-[#00362f] px-1.5 py-0.2 rounded font-bold uppercase ml-1 flex items-center gap-0.5">
                <Check className="w-3 h-3" /> Copied
              </span>
            ) : (
              <span className="text-[10px] text-stone-300 underline underline-offset-2 ml-1">Copy</span>
            )}
          </button>

          <span className="hidden md:inline-block text-stone-400 opacity-60">|</span>

          <div className="inline-flex items-center gap-1.5 text-stone-200">
            <Truck className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Free UK Delivery on Orders Above £50</span>
          </div>

          {isSupabaseConnected && (
            <>
              <span className="hidden md:inline-block text-stone-400 opacity-60">|</span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Supabase Live
              </span>
            </>
          )}
        </div>
      </div>

      {/* 2. Main Utility Header Bar */}
      <div className="border-b border-[#EBE6DC] bg-white py-3.5 px-4 sm:px-6">
        <div className="max-w-[1340px] mx-auto flex items-center justify-between gap-4 lg:gap-8">
          {/* Logo & Co-Branding */}
          <div 
            onClick={() => onNavigatePage('home')} 
            className="flex items-center gap-2 sm:gap-3 cursor-pointer shrink-0 select-none group"
            title="Return to Home"
          >
            <img 
              src="/public/assets/aistudio/GiriUK_Logo_aae825c0.png" 
              alt="GIRI UK - The Culture & Tradition of Bharat - In UK & EU by SHIVAYAA" 
              className="h-10 sm:h-12 md:h-14 w-auto object-contain transition-transform group-hover:scale-[1.02]"
            />
          </div>

          {/* Expanded Search Bar */}
          <div className="relative flex-1 max-w-2xl mx-2 sm:mx-6" ref={searchRef}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsSearchFocused(false);
                onNavigatePage('search', searchQuery.trim() || 'Diya');
              }}
              className="relative flex items-center"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Search for Puja Items, Books, Idols, Jewellery..."
                className="w-full pl-4 pr-24 py-2 sm:py-2.5 rounded-full border border-stone-300 bg-[#FCF9F2]/70 text-sm text-[#1A2421] placeholder-stone-400 focus:outline-none focus:border-[#164E45] focus:ring-2 focus:ring-[#164E45]/15 focus:bg-white transition-all shadow-xs"
              />
              <button 
                type="submit"
                className="absolute right-1.5 px-3 py-1.5 rounded-full bg-[#164E45] text-white hover:bg-[#00362f] text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                aria-label="Search"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search</span>
              </button>
            </form>

            {/* Live Search Autocomplete Flyout */}
            {isSearchFocused && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-stone-200 p-4 z-50 text-left animate-in fade-in slide-in-from-top-2 duration-150">
                {searchQuery.trim() === '' ? (
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#B99A5B]" />
                      Popular Inquiries in the UK
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {popularKeywords.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => {
                            setSearchQuery(tag);
                          }}
                          className="px-2.5 py-1 text-xs font-medium rounded-full bg-stone-100 hover:bg-[#164E45]/10 hover:text-[#164E45] text-stone-700 transition-colors cursor-pointer"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between text-xs text-stone-500 mb-2.5 pb-1 border-b border-stone-100">
                      <span>Matches for &ldquo;{searchQuery}&rdquo;</span>
                      <span className="font-medium text-stone-700">{filteredSearchResults.length} results</span>
                    </div>

                    {filteredSearchResults.length === 0 ? (
                      <div className="py-4 text-center text-sm text-stone-500">
                        <p>No direct products found matching &ldquo;{searchQuery}&rdquo;</p>
                        <p className="text-xs text-stone-400 mt-1">Try searching &ldquo;Brass&rdquo;, &ldquo;Puja&rdquo;, &ldquo;Dhoti&rdquo;, or submit an <strong>On Demand</strong> request.</p>
                      </div>
                    ) : (
                      <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                        {filteredSearchResults.slice(0, 5).map((item) => (
                          <div
                            key={item.id}
                            onClick={() => {
                              onSelectProduct(item);
                              setIsSearchFocused(false);
                            }}
                            className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-stone-50 cursor-pointer transition-colors group"
                          >
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-12 h-12 object-cover rounded-md border border-stone-200 shrink-0" 
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-stone-800 truncate group-hover:text-[#164E45]">
                                {item.name}
                              </p>
                              <p className="text-[11px] text-stone-500 truncate">{item.category} · SKU: {item.sku}</p>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-xs font-bold text-[#164E45] tabular-nums">£{item.price.toFixed(2)}</span>
                                {item.inStock ? (
                                  <span className="text-[10px] text-emerald-700 font-medium">In Stock</span>
                                ) : (
                                  <span className="text-[10px] text-amber-700 font-medium">Backorder</span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Track Order */}
            <button
              onClick={onOpenTrackOrder}
              className="flex flex-col items-center justify-center text-stone-700 hover:text-[#164E45] transition-colors p-1 group"
              title="Track My Order"
            >
              <Truck className="w-5 h-5 group-hover:scale-105 transition-transform" />
              <span className="text-[11px] font-medium hidden sm:inline-block mt-0.5">Track Order</span>
            </button>

            {/* Auth: Sign In / Sign Up buttons when logged out, User menu when logged in */}
            {currentUser ? (
              /* Logged-in user menu */
              <div className="relative group">
                <button
                  onClick={onOpenAccount}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-stone-300 hover:border-[#164E45] hover:bg-[#F5F0E8] transition-all text-stone-700 hover:text-[#164E45] cursor-pointer group"
                  title={`Account: ${currentUser.name}`}
                >
                  <div className="w-6 h-6 rounded-full bg-[#164E45] text-white text-[10px] font-bold flex items-center justify-center uppercase shrink-0">
                    {currentUser.name.charAt(0)}
                  </div>
                  <span className="text-[12px] font-semibold hidden sm:inline-block max-w-[80px] truncate">
                    {currentUser.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-400 hidden sm:block group-hover:rotate-180 transition-transform" />
                </button>
                {/* Dropdown */}
                <div className="absolute right-0 top-full mt-1.5 w-44 bg-white rounded-xl shadow-xl border border-stone-200 py-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                  <button
                    onClick={onOpenAccount}
                    className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:bg-stone-50 hover:text-[#164E45] flex items-center gap-2 cursor-pointer"
                  >
                    <User className="w-3.5 h-3.5" /> My Account
                  </button>
                  <button
                    onClick={onOpenWishlist}
                    className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:bg-stone-50 hover:text-[#164E45] flex items-center gap-2 cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5" /> My Wishlist
                  </button>
                  <div className="border-t border-stone-100 my-1" />
                  <button
                    onClick={onSignOut}
                    className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Sign Out
                  </button>
                </div>
              </div>
            ) : (
              /* Logged-out: Sign In + Sign Up buttons */
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenSignIn}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-300 hover:border-[#164E45] text-stone-700 hover:text-[#164E45] text-xs font-semibold transition-all cursor-pointer"
                  title="Sign In"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  Sign In
                </button>
                <button
                  onClick={onOpenSignUp}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#164E45] hover:bg-[#00362f] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                  title="Create Account"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Sign Up</span>
                  <span className="sm:hidden">Join</span>
                </button>
              </div>
            )}

            {/* Wishlist (shown for all when logged in, hidden on small when logged out) */}
            {currentUser && (
              <button
                onClick={onOpenWishlist}
                className="relative flex flex-col items-center justify-center text-stone-700 hover:text-[#164E45] transition-colors p-1 group"
                title="Saved Items"
              >
                <Heart className="w-5 h-5 group-hover:scale-105 transition-transform" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#B99A5B] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
                <span className="text-[11px] font-medium hidden sm:inline-block mt-0.5">Wishlist</span>
              </button>
            )}

            {/* Cart with count badge & total */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 bg-[#164E45] hover:bg-[#00362f] text-white px-3 py-2 rounded-full transition-all shadow-xs cursor-pointer group"
              title="View Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-[#ffdb96]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#cca730] text-[#00362f] text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs sm:text-sm font-semibold tabular-nums hidden sm:inline-block">
                £{cartTotal.toFixed(2)}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Category Navigation Bar (As shown in GIRI_UK_Header_Navigation_1962px_37dd75ba.png) */}
      <nav className="bg-[#FAF7F0] border-b border-[#E8E3D7] px-4 hidden lg:block">
        <div className="max-w-[1340px] mx-auto flex items-center justify-between text-xs font-semibold text-[#1A2421]">
          <ul className="flex items-center gap-1 sm:gap-2">
            {CATEGORIES_TAXONOMY.map((cat) => {
              const hasSubs = cat.subcategories && cat.subcategories.length > 0;
              const isActive = currentCategory === cat.name;

              const isCatActive = (currentPage === 'category' && currentCategory === cat.name) ||
                                  (currentPage === 'home' && isActive);

              return (
                <li 
                  key={cat.name} 
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(cat.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    onClick={() => {
                      if (cat.name === 'On Demand') {
                        onNavigatePage('on-demand');
                      } else {
                        onSelectCategory(cat.name);
                      }
                    }}
                    className={`flex items-center gap-1 px-3 py-3 transition-colors uppercase tracking-wider text-[12px] whitespace-nowrap cursor-pointer ${
                      (currentPage === 'on-demand' && cat.name === 'On Demand') || isCatActive
                        ? 'text-[#164E45] font-bold border-b-2 border-[#164E45]' 
                        : 'text-stone-800 hover:text-[#164E45]'
                    }`}
                  >
                    <span>{cat.name}</span>
                    {hasSubs && (
                      <ChevronDown className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#164E45] transition-transform group-hover:rotate-180" />
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  {hasSubs && activeDropdown === cat.name && (
                    <div className="absolute top-full left-0 w-64 bg-white rounded-b-xl shadow-xl border border-stone-200 py-2.5 z-50 animate-in fade-in duration-100">
                      <div className="px-3 py-1 mb-1 border-b border-stone-100 text-[10px] font-bold uppercase tracking-wider text-[#B99A5B] flex items-center justify-between">
                        <span>{cat.name} Subcategories</span>
                        <span className="text-[9px] font-normal lowercase text-stone-400">SEO Page</span>
                      </div>
                      {cat.subcategories.map((sub) => {
                        const isSubActive = currentPage === 'category' && currentCategory === cat.name && currentSubcategory === sub;
                        return (
                          <button
                            key={sub}
                            onClick={() => {
                              onSelectCategory(cat.name, sub);
                              setActiveDropdown(null);
                            }}
                            className={`w-full text-left px-3.5 py-1.5 text-xs transition-colors flex items-center justify-between cursor-pointer ${
                              isSubActive 
                                ? 'bg-[#164E45]/10 text-[#164E45] font-bold'
                                : 'text-stone-700 hover:bg-[#FCF9F2] hover:text-[#164E45]'
                            }`}
                          >
                            <span>{sub}</span>
                            {isSubActive && <Check className="w-3 h-3 text-[#164E45]" />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

        </div>
      </nav>

      {/* Mobile Horizontal Navigation Scroller */}
      <div className="lg:hidden bg-[#FAF7F0] border-b border-[#E8E3D7] px-2 overflow-x-auto scrollbar-none flex items-center gap-1 py-1.5 text-xs whitespace-nowrap">
        <button
          onClick={() => onSelectCategory('All')}
          className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
            currentCategory === 'All' ? 'bg-[#164E45] text-white' : 'text-stone-700'
          }`}
        >
          All
        </button>
        {CATEGORIES_TAXONOMY.map((cat) => (
          <button
            key={cat.name}
            onClick={() => onSelectCategory(cat.name)}
            className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${
              currentCategory === cat.name ? 'bg-[#164E45] text-white' : 'text-stone-700 hover:bg-stone-200/60'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </header>
  );
};
