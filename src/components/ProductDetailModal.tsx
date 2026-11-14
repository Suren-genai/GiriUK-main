import React, { useState } from 'react';
import { X, Heart, ShoppingBag, Truck, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  allProducts: Product[];
  isWishlisted: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  allProducts,
  isWishlisted,
  onClose,
  onAddToCart,
  onToggleWishlist,
  onSelectProduct
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [activeTab, setActiveTab] = useState<'details' | 'rituals' | 'shipping'>('details');
  const [isAdded, setIsAdded] = useState(false);

  const relatedProducts = allProducts
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  const handleAdd = () => {
    if (!product.inStock) return;
    onAddToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex justify-center items-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[94vh] flex flex-col">
        {/* Header Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer shadow-xs"
          aria-label="Close product view"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-stone-200 overflow-y-auto">
          {/* Left Column: Image Gallery */}
          <div className="p-6 bg-[#FAF7F0] flex flex-col justify-between">
            <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-white border border-stone-200 shadow-xs mb-4 flex items-center justify-center p-2">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full max-h-[320px] object-contain transition-all duration-300"
              />
              {product.isFestivalSpecial && (
                <div className="absolute top-3 left-3 bg-[#00362f] text-[#ffdb96] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                  Festival Special
                </div>
              )}
            </div>

            {/* Gallery Thumbnails */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => setSelectedImage(product.image)}
                className={`w-16 h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-all bg-white p-1 flex items-center justify-center ${
                  selectedImage === product.image ? 'border-[#164E45] shadow-xs' : 'border-stone-200 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={product.image} alt="Main view" className="w-full h-full object-contain" />
              </button>

              {product.additionalImages?.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-all bg-white p-1 flex items-center justify-center ${
                    selectedImage === img ? 'border-[#164E45] shadow-xs' : 'border-stone-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>

            {/* Temple Craft Guarantee note */}
            <div className="mt-4 p-3 bg-white rounded-lg border border-stone-200 flex items-center gap-2.5 text-xs text-stone-600">
              <ShieldCheck className="w-5 h-5 text-[#B99A5B] shrink-0" />
              <span>Certified authentic traditional Indian craft imported directly under GIRI UK standards.</span>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Category & SKU */}
              <div className="flex items-center gap-2 text-xs text-stone-500 mb-2 pr-10 flex-wrap">
                <span className="font-semibold text-[#164E45]">{product.category}</span>
                <span>/</span>
                <span>{product.subcategory}</span>
                <span>·</span>
                <span className="font-mono">{product.sku}</span>
              </div>

              {/* Title & Subtitle */}
              <h2 className="text-xl sm:text-2xl font-serif text-stone-900 leading-snug mb-1 font-semibold pr-10 break-words">
                {product.name}
              </h2>
              {product.subtitle && (
                <p className="text-xs sm:text-sm text-stone-600 mb-3 italic">{product.subtitle}</p>
              )}

              {/* Availability */}
              <div className="flex items-center gap-3 text-xs mb-4 pb-3 border-b border-stone-200">
                {product.inStock ? (
                  <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" /> In Stock ({product.stockCount} available in UK warehouse)
                  </span>
                ) : (
                  <span className="text-amber-700 font-semibold">Pre-order / Sourcing from India</span>
                )}
              </div>

              {/* Price */}
              <div className="mb-5">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-bold text-[#164E45] font-mono tabular-nums">
                    £{product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-stone-400 line-through font-mono tabular-nums">
                      £{product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                <p className="text-xs text-stone-500 mt-0.5">Price inclusive of UK VAT · Free UK shipping above £50</p>
              </div>

              {/* Specifications Pills */}
              <div className="grid grid-cols-2 gap-2 text-xs text-stone-600 bg-stone-50 p-3 rounded-lg mb-6 border border-stone-100">
                {product.material && (
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase">Material</span>
                    <span className="font-medium text-stone-800">{product.material}</span>
                  </div>
                )}
                {product.dimensions && (
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase">Dimensions</span>
                    <span className="font-medium text-stone-800">{product.dimensions}</span>
                  </div>
                )}
                {product.weight && (
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase">Weight</span>
                    <span className="font-medium text-stone-800">{product.weight}</span>
                  </div>
                )}
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Dispatch</span>
                  <span className="font-medium text-stone-800">1-2 Working Days (UK)</span>
                </div>
              </div>

              {/* Quantity Selector & Purchase Actions */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-stone-300 rounded-full bg-stone-50 px-2 py-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-7 h-7 flex items-center justify-center text-stone-600 hover:text-stone-900 rounded-full hover:bg-stone-200 transition-colors font-bold text-sm"
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-bold text-sm text-stone-800 tabular-nums">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-7 h-7 flex items-center justify-center text-stone-600 hover:text-stone-900 rounded-full hover:bg-stone-200 transition-colors font-bold text-sm"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAdd}
                    disabled={!product.inStock}
                    className={`flex-1 py-3 px-5 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer ${
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
                        <span>Added to Cart</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 text-[#ffdb96]" />
                        <span>Add {quantity} to Cart · £{(product.price * quantity).toFixed(2)}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => onToggleWishlist(product)}
                    className={`p-3 rounded-full border transition-all cursor-pointer ${
                      isWishlisted 
                        ? 'border-red-300 bg-red-50 text-red-600' 
                        : 'border-stone-300 text-stone-600 hover:text-red-600 hover:bg-stone-50'
                    }`}
                    title={isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-600' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Information Tabs */}
              <div>
                <div className="flex border-b border-stone-200 mb-3 text-xs font-semibold">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`pb-2 mr-4 transition-colors cursor-pointer ${
                      activeTab === 'details' ? 'border-b-2 border-[#164E45] text-[#164E45]' : 'text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    Product Description
                  </button>
                  <button
                    onClick={() => setActiveTab('rituals')}
                    className={`pb-2 mr-4 transition-colors cursor-pointer ${
                      activeTab === 'rituals' ? 'border-b-2 border-[#164E45] text-[#164E45]' : 'text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    Puja &amp; Care Guidance
                  </button>
                  <button
                    onClick={() => setActiveTab('shipping')}
                    className={`pb-2 transition-colors cursor-pointer ${
                      activeTab === 'shipping' ? 'border-b-2 border-[#164E45] text-[#164E45]' : 'text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    UK &amp; EU Shipping
                  </button>
                </div>

                <div className="text-xs text-stone-600 leading-relaxed max-h-36 overflow-y-auto pr-1">
                  {activeTab === 'details' && (
                    <p>{product.description}</p>
                  )}
                  {activeTab === 'rituals' && (
                    <p>
                      Before sanctifying in your home mandir, rinse with pure water or milk during the auspicious morning muhurtham. For brass care, use natural tamarind paste or lemon with salt. Never use steel wool or harsh chemical detergents.
                    </p>
                  )}
                  {activeTab === 'shipping' && (
                    <p>
                      Orders dispatched daily from our UK fulfillment center. Standard delivery via Royal Mail Tracked 48 (£3.99, or FREE on orders over £50). DPD Next Day Express available for £5.99. International tracked shipping across Europe.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Related recommendations */}
            {relatedProducts.length > 0 && (
              <div className="mt-6 pt-4 border-t border-stone-200">
                <p className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                  People Who Bought This Also Purchased
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {relatedProducts.map(rp => (
                    <div
                      key={rp.id}
                      onClick={() => onSelectProduct(rp)}
                      className="p-1.5 rounded-lg border border-stone-200 hover:border-[#164E45] cursor-pointer bg-stone-50 hover:bg-white transition-all group"
                    >
                      <img src={rp.image} alt={rp.name} className="w-full h-12 object-cover rounded-sm mb-1" />
                      <p className="text-[10px] font-semibold text-stone-800 truncate group-hover:text-[#164E45]">{rp.name}</p>
                      <p className="text-[10px] font-bold text-[#164E45]">£{rp.price.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
