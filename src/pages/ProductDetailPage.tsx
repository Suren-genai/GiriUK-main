import React, { useState, useEffect } from 'react';
import { 
  Home, 
  ChevronRight, 
  Star, 
  Truck, 
  ShieldCheck, 
  Check, 
  Heart, 
  ShoppingBag, 
  RotateCcw, 
  Sparkles, 
  Clock, 
  HelpCircle, 
  Share2, 
  ArrowRight,
  Package,
  Layers,
  Scale,
  Maximize2
} from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { 
  slugify, 
  updateDocumentSeo, 
  injectStructuredData, 
  buildBreadcrumbSchema, 
  buildProductSchema 
} from '../utils/seoUtils';

interface ProductDetailPageProps {
  product: Product;
  allProducts: Product[];
  wishlist: Product[];
  onAddToCart: (product: Product, quantity?: number) => void;
  onToggleWishlist: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onNavigateHome: () => void;
  onSelectCategory: (categoryName: string, subcategoryName?: string) => void;
  onOpenOnDemand: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  allProducts,
  wishlist,
  onAddToCart,
  onToggleWishlist,
  onSelectProduct,
  onNavigateHome,
  onSelectCategory,
  onOpenOnDemand
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [activeTab, setActiveTab] = useState<'description' | 'rituals' | 'shipping' | 'artisan'>('description');
  const [isAdded, setIsAdded] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Synchronize image if product changes
  useEffect(() => {
    setSelectedImage(product.image);
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product.id]);

  // Update SEO Title, Meta tags, and Schema.org Structured Data
  useEffect(() => {
    const canonicalPath = `/product/${slugify(product.name)}-${product.id}`;
    const seoData = {
      title: `${product.name} | GIRI UK London`,
      metaDescription: `Buy ${product.name} at GIRI UK. Authentic Indian devotional craftsmanship, £${product.price.toFixed(2)} with fast UK tracked delivery from London.`,
      h1: product.name,
      subheading: product.subtitle || `Authentic ${product.category} item`,
      introDescription: product.description,
      detailedGuide: { heading: '', paragraphs: [] },
      keywords: [product.name, product.category, product.subcategory, ...(product.tags || [])],
      faqs: []
    };

    updateDocumentSeo(seoData, canonicalPath);

    // Breadcrumb Schema
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: window.location.origin + '/' },
        { '@type': 'ListItem', position: 2, name: product.category, item: `${window.location.origin}/category/${slugify(product.category)}` },
        { '@type': 'ListItem', position: 3, name: product.subcategory, item: `${window.location.origin}/category/${slugify(product.category)}/${slugify(product.subcategory)}` },
        { '@type': 'ListItem', position: 4, name: product.name, item: window.location.href }
      ]
    };
    injectStructuredData('schema-breadcrumb', breadcrumbSchema);

    // Product Schema (JSON-LD)
    const productSchema = buildProductSchema(product);
    injectStructuredData('schema-product', productSchema);
  }, [product]);

  const isWishlisted = wishlist.some((w) => w.id === product.id);

  const handleAdd = () => {
    if (!product.inStock) return;
    onAddToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Related products from the same category
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && (p.category === product.category || p.subcategory === product.subcategory))
    .slice(0, 4);

  // Calculate discount percentage
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="min-h-screen bg-[#FCF9F2] pb-20">
      {/* 1. Breadcrumbs Trail */}
      <nav aria-label="Breadcrumbs" className="bg-[#FAF7F0] border-b border-[#E8E3D7] py-3.5 px-4 sm:px-6">
        <div className="max-w-[1340px] mx-auto flex items-center flex-wrap gap-2 text-xs text-stone-600">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-1 hover:text-[#164E45] font-medium transition-colors cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>

          <ChevronRight className="w-3 h-3 text-stone-400" />

          <button
            onClick={() => onSelectCategory(product.category)}
            className="hover:text-[#164E45] font-medium transition-colors cursor-pointer"
          >
            {product.category}
          </button>

          <ChevronRight className="w-3 h-3 text-stone-400" />

          <button
            onClick={() => onSelectCategory(product.category, product.subcategory)}
            className="hover:text-[#164E45] font-medium transition-colors cursor-pointer"
          >
            {product.subcategory}
          </button>

          <ChevronRight className="w-3 h-3 text-stone-400" />

          <span className="font-semibold text-[#164E45] truncate max-w-xs sm:max-w-md">
            {product.name}
          </span>
        </div>
      </nav>

      {/* 2. Main Product Showcase */}
      <main className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT: Visual Gallery (5 cols on lg) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-4/3 bg-white rounded-2xl border border-[#E8E3D7] overflow-hidden shadow-xs flex items-center justify-center p-4">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full max-h-[460px] object-contain transition-all duration-300"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                {product.isFestivalSpecial && (
                  <span className="bg-[#00362f] text-[#ffdb96] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                    Festival Special
                  </span>
                )}
                {product.isBestSeller && (
                  <span className="bg-[#cca730] text-[#00362f] text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    Best Seller
                  </span>
                )}
                {product.isNewArrival && (
                  <span className="bg-[#164E45] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    New Arrival
                  </span>
                )}
              </div>

              {/* Share Button */}
              <button
                onClick={handleCopyLink}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 hover:bg-white text-stone-700 shadow-sm border border-stone-200 transition-all cursor-pointer"
                title="Share product link"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              </button>
            </div>

            {/* Thumbnail Row */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              <button
                onClick={() => setSelectedImage(product.image)}
                className={`w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all bg-white p-1.5 flex items-center justify-center cursor-pointer ${
                  selectedImage === product.image ? 'border-[#164E45] shadow-sm scale-102' : 'border-stone-200 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
              </button>

              {product.additionalImages?.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all bg-white p-1.5 flex items-center justify-center cursor-pointer ${
                    selectedImage === img ? 'border-[#164E45] shadow-sm scale-102' : 'border-stone-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Angle ${i + 1}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>

            {/* Artisan Authentication Banner */}
            <div className="bg-white p-4 rounded-xl border border-[#E8E3D7] flex items-start gap-3 text-xs text-stone-700 leading-relaxed shadow-xs">
              <ShieldCheck className="w-5 h-5 text-[#B99A5B] shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 block font-serif text-sm mb-0.5">
                  Direct Artisan Heritage Guarantee
                </strong>
                Cast and crafted under traditional Vedic guidelines in Tamil Nadu and Karnataka. Certified authentic under GIRI UK spiritual provenance standards.
              </div>
            </div>
          </div>

          {/* RIGHT: Product Information & Purchase (7 cols on lg) */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-[#E8E3D7] shadow-sm space-y-6">
            <div>
              {/* Category & SKU Line */}
              <div className="flex items-center justify-between text-xs text-stone-500 mb-2 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#164E45] uppercase tracking-wider">{product.category}</span>
                  <span>·</span>
                  <span>{product.subcategory}</span>
                </div>
                <span className="font-mono bg-stone-100 px-2 py-0.5 rounded text-stone-600">SKU: {product.sku}</span>
              </div>

              {/* Semantic Product Title H1 */}
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1A2421] leading-tight mb-2">
                {product.name}
              </h1>

              {product.subtitle && (
                <p className="text-sm sm:text-base text-stone-600 font-serif italic mb-3">
                  {product.subtitle}
                </p>
              )}

              {/* Rating & Trustpilot Badge */}
              <div className="flex items-center gap-3 text-xs py-2 border-y border-stone-100 flex-wrap">
                <div className="flex items-center text-[#B99A5B]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#B99A5B]" />
                  ))}
                </div>
                <span className="font-bold text-stone-800 tabular-nums">{product.rating.toFixed(1)}</span>
                <span className="text-stone-400">·</span>
                <span className="text-stone-600 underline cursor-pointer">{product.reviewCount} Verified Devotee Reviews</span>
                <span className="text-stone-400">·</span>
                <span className="text-emerald-700 font-medium">Trustpilot 4.8/5</span>
              </div>
            </div>

            {/* Price & Savings Module */}
            <div className="bg-[#FAF7F0] p-4 rounded-xl border border-[#E8E3D7]/80">
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-3xl sm:text-4xl font-bold text-[#164E45] font-mono tabular-nums">
                  £{product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-stone-400 line-through font-mono tabular-nums">
                      £{product.originalPrice.toFixed(2)}
                    </span>
                    {discountPercent && (
                      <span className="bg-[#cca730]/20 text-[#00362f] font-bold text-xs px-2 py-0.5 rounded-full">
                        Save {discountPercent}%
                      </span>
                    )}
                  </>
                )}
              </div>
              <p className="text-xs text-stone-600">
                Price inclusive of UK VAT (20%) · <strong>Free UK Tracked Delivery</strong> on orders over £50
              </p>
            </div>

            {/* Live Inventory Status */}
            <div className="flex items-center gap-2 text-xs">
              {product.inStock ? (
                <div className="inline-flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 font-medium">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>In Stock — Ready for 24h dispatch from London Wembley warehouse ({product.stockCount} available)</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 text-amber-800 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200 font-medium">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>Available on Sourcing Backorder (Direct air consignment from India)</span>
                </div>
              )}
            </div>

            {/* Specifications Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs bg-stone-50 p-3.5 rounded-xl border border-stone-200">
              {product.material && (
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase tracking-wider">Material</span>
                  <span className="font-semibold text-stone-800 truncate block">{product.material}</span>
                </div>
              )}
              {product.dimensions && (
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase tracking-wider">Dimensions</span>
                  <span className="font-semibold text-stone-800 truncate block">{product.dimensions}</span>
                </div>
              )}
              {product.weight && (
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase tracking-wider">Weight</span>
                  <span className="font-semibold text-stone-800 truncate block">{product.weight}</span>
                </div>
              )}
              <div>
                <span className="text-stone-400 block text-[10px] uppercase tracking-wider">UK Dispatch</span>
                <span className="font-semibold text-[#164E45] block">Same / Next Day</span>
              </div>
            </div>

            {/* Quantity Stepper & CTAs */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-stone-300 rounded-full bg-stone-50 px-2 py-1.5 shadow-2xs">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center text-stone-600 hover:text-stone-900 rounded-full hover:bg-stone-200 transition-colors font-bold text-base cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-stone-800 tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-stone-600 hover:text-stone-900 rounded-full hover:bg-stone-200 transition-colors font-bold text-base cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Primary Add to Cart */}
                <button
                  onClick={handleAdd}
                  disabled={!product.inStock}
                  className={`flex-1 py-3.5 px-6 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer ${
                    !product.inStock
                      ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                      : isAdded
                      ? 'bg-emerald-700 text-white'
                      : 'bg-[#164E45] hover:bg-[#00362f] text-white hover:shadow-lg'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#ffdb96]" />
                      <span>Add {quantity} to Bag · £{(product.price * quantity).toFixed(2)}</span>
                    </>
                  )}
                </button>

                {/* Wishlist CTA */}
                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-3.5 rounded-full border transition-all cursor-pointer ${
                    isWishlisted 
                      ? 'border-red-300 bg-red-50 text-red-600' 
                      : 'border-stone-300 text-stone-600 hover:text-red-600 hover:bg-stone-50'
                  }`}
                  title={isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-600' : ''}`} />
                </button>
              </div>

              {/* Promo code hint */}
              <div className="flex items-center justify-between text-[11px] text-stone-500 px-1">
                <span>Have a discount code? Apply <strong>GIRIUK2026</strong> for 10% off at checkout.</span>
              </div>
            </div>

            {/* Delivery & Care Badges Strip */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-stone-100 text-xs text-stone-700">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#164E45] shrink-0" />
                <span>Royal Mail 48 &amp; DPD Express</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-[#164E45] shrink-0" />
                <span>14-Day Returns &amp; Jal Samadhi</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#164E45] shrink-0" />
                <span>UK VAT Invoice Included</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#164E45] shrink-0" />
                <span>Ritually Cleansed Packaging</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Deep Content & Editorial Tabs */}
        <section className="mt-14 bg-white rounded-2xl border border-[#E8E3D7] overflow-hidden shadow-xs">
          {/* Tab Navigation Headers */}
          <div className="flex border-b border-[#E8E3D7] bg-[#FAF7F0] overflow-x-auto text-xs sm:text-sm font-semibold">
            <button
              onClick={() => setActiveTab('description')}
              className={`py-4 px-6 transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'description'
                  ? 'border-[#164E45] text-[#164E45] bg-white font-bold'
                  : 'border-transparent text-stone-600 hover:text-stone-900'
              }`}
            >
              Detailed Description &amp; Symbolism
            </button>
            <button
              onClick={() => setActiveTab('rituals')}
              className={`py-4 px-6 transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'rituals'
                  ? 'border-[#164E45] text-[#164E45] bg-white font-bold'
                  : 'border-transparent text-stone-600 hover:text-stone-900'
              }`}
            >
              Puja, Care &amp; Altar Guidelines
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`py-4 px-6 transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'shipping'
                  ? 'border-[#164E45] text-[#164E45] bg-white font-bold'
                  : 'border-transparent text-stone-600 hover:text-stone-900'
              }`}
            >
              UK &amp; European Delivery Matrix
            </button>
            <button
              onClick={() => setActiveTab('artisan')}
              className={`py-4 px-6 transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'artisan'
                  ? 'border-[#164E45] text-[#164E45] bg-white font-bold'
                  : 'border-transparent text-stone-600 hover:text-stone-900'
              }`}
            >
              Artisan Guild Heritage
            </button>
          </div>

          {/* Tab Contents */}
          <div className="p-6 sm:p-10 text-stone-700 leading-relaxed text-sm">
            {activeTab === 'description' && (
              <div className="max-w-4xl space-y-4">
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#1A2421]">
                  About the {product.name}
                </h3>
                <p>{product.description}</p>
                {product.tags && product.tags.length > 0 && (
                  <div className="pt-4 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Catalog Tags:</span>
                    {product.tags.map((t) => (
                      <span key={t} className="bg-stone-100 text-stone-700 text-xs px-2.5 py-1 rounded-md font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'rituals' && (
              <div className="max-w-4xl space-y-4">
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#1A2421]">
                  Sanctification &amp; Temple Maintenance Guidelines
                </h3>
                <p>
                  Before installing any deity or sacred implement in your UK home altar (pooja mandir), it is traditional to perform a simple purification (<em>Shuddhi</em>):
                </p>
                <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
                  <li>
                    <strong>Morning Muhurtham:</strong> Unbox and wipe gently with a fresh clean cloth during Shukla Paksha or Brahma Muhurtham hours.
                  </li>
                  <li>
                    <strong>Brass &amp; Metal Care:</strong> Clean traditional virgin brass with Pitambari powder, lemon slices, or pure tamarind paste. Rinse with warm water and dry immediately with a microfiber cloth to prevent water spots in British damp conditions.
                  </li>
                  <li>
                    <strong>Abhishekam:</strong> Panchamrita, milk, and honey abhishekams are safely performed on solid cast brass vigrahams.
                  </li>
                </ul>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="max-w-4xl space-y-4">
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#1A2421]">
                  United Kingdom &amp; European Shipping Guarantees
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                    <strong className="block font-serif text-sm text-[#164E45] mb-1">UK Domestic Dispatch</strong>
                    <p>Royal Mail 48 Tracked (£3.99, FREE on orders over £50). DPD Next Day Express (£5.99) delivers within 24 hours when ordered before 1:00 PM GMT.</p>
                  </div>
                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                    <strong className="block font-serif text-sm text-[#164E45] mb-1">European Union &amp; Ireland</strong>
                    <p>Tracked international courier (£14.99). All import taxes, duties, and handling fees are prepaid—no unexpected customs charges on delivery.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'artisan' && (
              <div className="max-w-4xl space-y-4">
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#1A2421]">
                  The Legacy of Giri Trading (1950 – Present)
                </h3>
                <p>
                  For over seven decades, GIRI has remained the trusted custodian of South Asian spiritual traditions. Our European chapter, operated in partnership with SHIVAYAA, maintains direct contracts with traditional bronze casting guilds, handloom co-operatives, and Vedic publication houses across India.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* 4. Frequently Bought Together / Related Curations */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#B99A5B] block mb-1">
                  Sacred Complements
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1A2421]">
                  Related Auspicious Curations in {product.category}
                </h2>
              </div>
              <button
                onClick={() => onSelectCategory(product.category)}
                className="text-xs font-bold text-[#164E45] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View Full Collection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relProd) => (
                <ProductCard
                  key={relProd.id}
                  product={relProd}
                  onAddToCart={onAddToCart}
                  onToggleWishlist={onToggleWishlist}
                  onSelectProduct={onSelectProduct}
                  isWishlisted={wishlist.some((w) => w.id === relProd.id)}
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};
