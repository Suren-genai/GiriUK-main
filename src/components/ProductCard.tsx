import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onAddToCart: (product: Product, quantity?: number) => void;
  onToggleWishlist: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onAddToCart,
  onToggleWishlist,
  onSelectProduct
}) => {
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product.inStock) return;
    onAddToCart(product, 1);
    setIsAddedFeedback(true);
    setTimeout(() => setIsAddedFeedback(false), 1600);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(product);
  };

  return (
    <div
      onClick={() => onSelectProduct(product)}
      className="group relative bg-white rounded-lg border border-[#ECE7DE] hover:border-[#164E45]/40 transition-all duration-200 hover:-translate-y-1 shadow-xs hover:shadow-md flex flex-col justify-between overflow-hidden cursor-pointer"
    >
      {/* Top Image Container */}
      <div className="relative aspect-4/3 w-full bg-[#FAF7F0] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // CSS fallback
            (e.target as HTMLElement).style.display = 'none';
          }}
        />

        {/* Fallback pattern if image is hidden */}
        <div className="absolute inset-0 -z-10 bg-[#f4efe4] flex items-center justify-center p-4 text-center">
          <span className="text-xs text-stone-500 font-serif">{product.name}</span>
        </div>

        {/* Wishlist Button (Circular subtle pill) */}
        <button
          onClick={handleWishlist}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-xs transition-all shadow-xs cursor-pointer z-10 ${
            isWishlisted
              ? 'bg-red-50 text-red-600'
              : 'bg-white/85 text-stone-600 hover:text-red-600 hover:bg-white'
          }`}
          aria-label={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-600' : ''}`} />
        </button>

        {/* Badges: Quiet text indicator for specials */}
        {product.isFestivalSpecial && (
          <div className="absolute top-2.5 left-2.5 bg-[#00362f] text-[#ffdb96] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
            Festival Special
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata: Category & SKU */}
          <div className="flex items-center gap-1.5 text-[11px] text-[#5C6863] mb-1.5">
            <span className="truncate">{product.category}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">{product.sku}</span>
          </div>

          {/* Product Name */}
          <h3 className="text-sm font-semibold text-[#1A2421] group-hover:text-[#164E45] line-clamp-2 transition-colors mb-1.5">
            {product.name}
          </h3>

          {/* Availability */}
          <div className="flex items-center gap-1 text-xs text-stone-600 mb-2">
            {product.inStock ? (
              <span className="text-[11px] font-medium text-emerald-700 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block"></span>
                In Stock
              </span>
            ) : (
              <span className="text-[11px] font-medium text-amber-700">Out of Stock</span>
            )}
          </div>
        </div>

        {/* Pricing and Action */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2 mt-auto">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-[#164E45] font-mono tabular-nums">
                £{product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-stone-400 line-through font-mono tabular-nums">
                  £{product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <p className="text-[10px] text-stone-400">Incl. UK VAT</p>
          </div>

          {/* Add to Cart button */}
          <button
            onClick={handleAdd}
            disabled={!product.inStock}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              !product.inStock
                ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                : isAddedFeedback
                ? 'bg-emerald-700 text-white'
                : 'bg-[#164E45] hover:bg-[#00362f] text-white shadow-xs hover:shadow'
            }`}
          >
            {isAddedFeedback ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-[#ffdb96]" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
