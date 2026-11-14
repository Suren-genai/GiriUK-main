import React, { useState, useEffect, useMemo } from 'react';
import { 
  Home, 
  ChevronRight, 
  SlidersHorizontal, 
  ArrowUpDown, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  Tag, 
  ArrowRight,
  Filter,
  Check
} from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES_TAXONOMY } from '../data/mockData';
import { 
  getCategorySeoData, 
  slugify, 
  updateDocumentSeo, 
  injectStructuredData, 
  buildBreadcrumbSchema, 
  buildCollectionSchema, 
  buildFaqSchema 
} from '../utils/seoUtils';

interface CategoryPageProps {
  categoryName: string;
  subcategoryName?: string | null;
  allProducts: Product[];
  wishlist: Product[];
  onAddToCart: (product: Product, quantity?: number) => void;
  onToggleWishlist: (product: Product) => void;
  onOpenProduct: (product: Product) => void;
  onOpenOnDemand: () => void;
  onNavigateHome: () => void;
  onSelectCategory: (categoryName: string, subcategoryName?: string) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  categoryName,
  subcategoryName,
  allProducts,
  wishlist,
  onAddToCart,
  onToggleWishlist,
  onOpenProduct,
  onOpenOnDemand,
  onNavigateHome,
  onSelectCategory
}) => {
  // Filtering & Sorting State
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [priceRange, setPriceRange] = useState<'all' | 'under-25' | '25-50' | '50-100' | '100-plus'>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Find Category from Taxonomy
  const categoryTaxonomy = CATEGORIES_TAXONOMY.find(
    (c) => c.name.toLowerCase() === categoryName.toLowerCase()
  ) || {
    name: categoryName,
    slug: slugify(categoryName),
    subcategories: []
  };

  // Generate dynamic SEO metadata
  const seoData = useMemo(() => {
    return getCategorySeoData(categoryName, subcategoryName || undefined);
  }, [categoryName, subcategoryName]);

  // Update Document Head & Structured Data for SEO on render / route change
  useEffect(() => {
    const categorySlug = slugify(categoryName);
    const subcategorySlug = subcategoryName ? slugify(subcategoryName) : '';
    const canonicalPath = subcategoryName
      ? `/category/${categorySlug}/${subcategorySlug}`
      : `/category/${categorySlug}`;

    // Update document title, meta description, keywords, OpenGraph tags
    updateDocumentSeo(seoData, canonicalPath);

    // Inject Schema.org JSON-LD structured data for Google Search
    const breadcrumbSchema = buildBreadcrumbSchema(categoryName, subcategoryName || undefined);
    injectStructuredData('schema-breadcrumb', breadcrumbSchema);

    const collectionSchema = buildCollectionSchema(
      categoryName,
      subcategoryName || undefined,
      allProducts,
      seoData
    );
    injectStructuredData('schema-collection', collectionSchema);

    if (seoData.faqs && seoData.faqs.length > 0) {
      const faqSchema = buildFaqSchema(seoData.faqs);
      injectStructuredData('schema-faq', faqSchema);
    }

    // Scroll to top on category change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [categoryName, subcategoryName, seoData, allProducts]);

  // Filter products for this Category and optional Subcategory
  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) => {
      // 1. Category Matching
      let matchesCategory = false;
      if (categoryName === 'Festival Special') {
        matchesCategory = Boolean(p.isFestivalSpecial);
      } else if (categoryName === 'New Arrivals') {
        matchesCategory = Boolean(p.isNewArrival);
      } else {
        matchesCategory = p.category.toLowerCase().includes(categoryName.toLowerCase()) ||
                          categoryName.toLowerCase().includes(p.category.toLowerCase());
      }

      if (!matchesCategory) return false;

      // 2. Subcategory Matching (if active)
      if (subcategoryName) {
        const subLower = subcategoryName.toLowerCase();
        const pSubLower = (p.subcategory || '').toLowerCase();
        const matchesSub = pSubLower.includes(subLower) || 
                           subLower.includes(pSubLower) ||
                           (p.tags && p.tags.some(t => t.toLowerCase().includes(subLower)));
        if (!matchesSub) return false;
      }

      // 3. In Stock Only Filter
      if (onlyInStock && !p.inStock) {
        return false;
      }

      // 4. Price Range Filter
      if (priceRange === 'under-25' && p.price >= 25) return false;
      if (priceRange === '25-50' && (p.price < 25 || p.price > 50)) return false;
      if (priceRange === '50-100' && (p.price < 50 || p.price > 100)) return false;
      if (priceRange === '100-plus' && p.price < 100) return false;

      return true;
    });
  }, [allProducts, categoryName, subcategoryName, onlyInStock, priceRange]);

  // Sort products
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 5) - (a.rating || 5);
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0); // default featured
    });
  }, [filteredProducts, sortBy]);

  // Sibling categories for internal linking
  const siblingCategories = CATEGORIES_TAXONOMY.filter(
    (c) => c.name.toLowerCase() !== categoryName.toLowerCase() && c.name !== 'On Demand'
  );

  return (
    <div className="min-h-screen bg-[#FCF9F2] pb-16">
      {/* 1. SEO Semantic Breadcrumbs Header */}
      <nav aria-label="Breadcrumb" className="bg-[#FAF7F0] border-b border-[#E8E3D7] py-3 px-4">
        <div className="max-w-[1340px] mx-auto flex items-center flex-wrap gap-2 text-xs text-stone-600">
          <button 
            onClick={onNavigateHome}
            className="flex items-center gap-1 hover:text-[#164E45] font-medium transition-colors cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>

          <ChevronRight className="w-3 h-3 text-stone-400" />

          {subcategoryName ? (
            <>
              <button 
                onClick={() => onSelectCategory(categoryName)}
                className="hover:text-[#164E45] font-medium transition-colors cursor-pointer"
              >
                {categoryName}
              </button>
              <ChevronRight className="w-3 h-3 text-stone-400" />
              <span className="font-bold text-[#164E45]">{subcategoryName}</span>
            </>
          ) : (
            <span className="font-bold text-[#164E45]">{categoryName}</span>
          )}
        </div>
      </nav>

      {/* 2. Hero Banner & Editorial Header */}
      <header className="bg-gradient-to-b from-[#FAF7F0] to-[#FCF9F2] border-b border-[#E8E3D7]/70 py-8 px-4">
        <div className="max-w-[1340px] mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#164E45]/10 text-[#164E45] text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#B99A5B]" />
                <span>
                  {subcategoryName ? `${categoryName} › ${subcategoryName}` : categoryName}
                </span>
              </div>

              {/* Semantic SEO H1 */}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1A2421] tracking-tight leading-tight mb-3">
                {seoData.h1}
              </h1>

              <p className="text-base text-stone-700 font-serif italic mb-3 text-balance">
                &ldquo;{seoData.subheading}&rdquo;
              </p>

              <p className="text-sm text-stone-600 leading-relaxed max-w-2xl">
                {seoData.introDescription}
              </p>
            </div>

            {/* Trust Assurances Card */}
            <div className="w-full md:w-auto shrink-0 bg-white p-4 rounded-xl shadow-xs border border-[#E8E3D7] flex flex-col gap-2.5 text-xs">
              <div className="flex items-center gap-2 text-stone-800 font-semibold">
                <Truck className="w-4 h-4 text-[#B99A5B]" />
                <span>London Warehouse: 24–48h UK Tracked</span>
              </div>
              <div className="flex items-center gap-2 text-stone-800 font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#164E45]" />
                <span>100% Traditional Artisan Authenticity</span>
              </div>
              <div className="flex items-center gap-2 text-stone-800 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Free UK Mainland Delivery Over £50</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 3. Subcategory Pills Navigation (Horizontal Traversal) */}
      {categoryTaxonomy.subcategories && categoryTaxonomy.subcategories.length > 0 && (
        <nav aria-label="Subcategories" className="bg-[#FAF7F0] border-b border-[#E8E3D7] py-3.5 px-4 sticky top-[106px] z-30 shadow-xs">
          <div className="max-w-[1340px] mx-auto flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 text-xs">
            <span className="font-bold text-stone-500 uppercase tracking-wider text-[11px] shrink-0 mr-1 hidden sm:inline-block">
              Filter by Subcategory:
            </span>

            {/* "All" Pill */}
            <button
              onClick={() => onSelectCategory(categoryName)}
              className={`px-3.5 py-1.5 rounded-full font-semibold transition-all shrink-0 cursor-pointer ${
                !subcategoryName
                  ? 'bg-[#164E45] text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              All {categoryName}
            </button>

            {/* Individual Subcategory Pills */}
            {categoryTaxonomy.subcategories.map((sub) => {
              const isSelected = subcategoryName?.toLowerCase() === sub.toLowerCase();
              return (
                <button
                  key={sub}
                  onClick={() => onSelectCategory(categoryName, sub)}
                  className={`px-3.5 py-1.5 rounded-full font-medium transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-[#164E45] text-white shadow-xs font-semibold'
                      : 'bg-white text-stone-700 hover:bg-[#FCF9F2] hover:text-[#164E45] border border-stone-200'
                  }`}
                >
                  <span>{sub}</span>
                  {isSelected && <Check className="w-3 h-3 text-[#ffdb96]" />}
                </button>
              );
            })}
          </div>
        </nav>
      )}

      {/* 4. Main Product Catalog & Filters */}
      <main className="max-w-[1340px] mx-auto px-4 pt-8">
        {/* Controls Bar: Counts, Filters, and Sorting */}
        <div className="bg-white p-4 rounded-xl border border-[#E8E3D7] mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center flex-wrap gap-4 text-xs">
            <span className="font-semibold text-stone-800">
              Showing <strong className="text-[#164E45]">{sortedProducts.length}</strong> items in{' '}
              <span className="italic">{subcategoryName || categoryName}</span>
            </span>

            {/* In Stock Toggle */}
            <label className="inline-flex items-center gap-2 cursor-pointer select-none text-stone-700 hover:text-stone-900">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="w-4 h-4 accent-[#164E45] rounded-xs cursor-pointer"
              />
              <span className="font-medium">In Stock Only</span>
            </label>
          </div>

          {/* Price Range & Sort Controls */}
          <div className="flex items-center flex-wrap gap-3 text-xs">
            {/* Price Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-stone-500 font-medium">Price:</span>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value as any)}
                className="bg-[#FCF9F2] border border-[#E8E3D7] rounded-lg px-2.5 py-1.5 text-stone-800 font-medium cursor-pointer focus:outline-[#164E45]"
              >
                <option value="all">All Prices</option>
                <option value="under-25">Under £25</option>
                <option value="25-50">£25 – £50</option>
                <option value="50-100">£50 – £100</option>
                <option value="100-plus">£100+</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-stone-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#FCF9F2] border border-[#E8E3D7] rounded-lg px-2.5 py-1.5 text-stone-800 font-medium cursor-pointer focus:outline-[#164E45]"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                onSelectProduct={onOpenProduct}
                isWishlisted={wishlist.some((w) => w.id === product.id)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-[#E8E3D7] p-10 text-center max-w-xl mx-auto my-8">
            <Sparkles className="w-10 h-10 text-[#B99A5B] mx-auto mb-3" />
            <h3 className="font-serif text-2xl font-bold text-stone-800 mb-2">
              No Direct Matches in this Subcategory
            </h3>
            <p className="text-sm text-stone-600 mb-6 leading-relaxed">
              We frequently receive fresh air consignments in London from our Indian artisan guilds.
              If the specific <strong>{subcategoryName || categoryName}</strong> item you seek is not in stock,
              our Wembley sourcing team can procure it for you.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => onSelectCategory(categoryName)}
                className="px-5 py-2.5 rounded-lg border border-[#164E45] text-[#164E45] font-semibold text-xs hover:bg-[#164E45]/5 cursor-pointer"
              >
                View All in {categoryName}
              </button>
              <button
                onClick={onOpenOnDemand}
                className="px-5 py-2.5 rounded-lg bg-[#164E45] text-white font-semibold text-xs hover:bg-[#123e37] shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <span>Request Custom Procurement</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* 5. Bespoke Sourcing Callout Banner */}
        <section className="mt-12 bg-gradient-to-r from-[#00362f] to-[#164E45] text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="max-w-2xl">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#D4AF37] mb-1.5 block">
              Bespoke Artisan Commission
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium mb-2">
              Seeking a Rare Vigraham or Specific {categoryName} Item?
            </h2>
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
              Speak directly with our UK Vedic sourcing specialists. We commission custom Swamimalai brass vigrahams,
              bespoke handloom silks, and rare Vedic publications directly from master artisans in Tamil Nadu and Karnataka.
            </p>
          </div>
          <button
            onClick={onOpenOnDemand}
            className="shrink-0 bg-[#cca730] hover:bg-[#b89528] text-[#00362f] font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-2"
          >
            <span>Inquire With Sourcing Team</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </section>

        {/* 6. In-Depth SEO Editorial & Buyer’s Guide */}
        <article className="mt-14 bg-white rounded-2xl border border-[#E8E3D7] p-6 sm:p-10">
          <div className="max-w-3xl">
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1A2421] mb-4">
              {seoData.detailedGuide.heading}
            </h2>
            <div className="space-y-4 text-sm text-stone-700 leading-relaxed">
              {seoData.detailedGuide.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-stone-100 flex flex-wrap gap-2 text-[11px] text-stone-500">
              <span className="font-semibold text-stone-700">Keywords:</span>
              {seoData.keywords.map((kw) => (
                <span key={kw} className="bg-stone-100 px-2.5 py-1 rounded-md text-stone-600">
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </article>

        {/* 7. SEO FAQ Accordion Section (Rich Snippet Optimization) */}
        {seoData.faqs && seoData.faqs.length > 0 && (
          <section className="mt-12">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B99A5B] mb-2">
              <HelpCircle className="w-4 h-4" />
              <span>Frequently Asked Questions</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1A2421] mb-6">
              Frequently Asked Questions About {subcategoryName || categoryName}
            </h2>

            <div className="space-y-3">
              {seoData.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-xl border border-[#E8E3D7] overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-stone-50/60"
                    >
                      <h3 className="text-sm sm:text-base font-semibold text-stone-900 font-serif">
                        {faq.question}
                      </h3>
                      <ChevronDown
                        className={`w-4 h-4 text-stone-500 shrink-0 transition-transform ${
                          isOpen ? 'rotate-180 text-[#164E45]' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* 8. SEO Silo / Internal Linking: Explore Related Categories */}
        <section className="mt-14 pt-8 border-t border-[#E8E3D7]">
          <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#1A2421] mb-4">
            Explore Related Spiritual Collections
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {siblingCategories.slice(0, 8).map((cat) => (
              <button
                key={cat.name}
                onClick={() => onSelectCategory(cat.name)}
                className="p-3 bg-white hover:bg-[#FAF7F0] border border-[#E8E3D7] rounded-xl text-left transition-all hover:border-[#164E45]/40 group cursor-pointer"
              >
                <span className="text-xs font-bold text-stone-800 group-hover:text-[#164E45] flex items-center justify-between">
                  <span>{cat.name}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
                </span>
                <span className="text-[11px] text-stone-500 mt-1 block">
                  {cat.subcategories.length} subcategories
                </span>
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
