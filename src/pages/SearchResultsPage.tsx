import React, { useState } from 'react';
import { 
  Home, 
  ChevronRight, 
  Search, 
  X, 
  Star, 
  ShoppingBag, 
  Heart, 
  HelpCircle, 
  Truck, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  ChevronDown,
  Check,
  CheckCircle2,
  SlidersHorizontal,
  Flame,
  MessageCircle,
  Clock,
  Phone,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { Product } from '../types';

interface SearchResultsPageProps {
  initialQuery?: string;
  onAddToCart: (product: Product, quantity?: number) => void;
  onToggleWishlist: (product: Product) => void;
  onOpenProduct: (product: Product) => void;
  onOpenOnDemand: () => void;
  onNavigateHome: () => void;
  onSelectCategory: (categoryName: string) => void;
  wishlist: Product[];
}

export const SearchResultsPage: React.FC<SearchResultsPageProps> = ({
  initialQuery = 'Diya',
  onAddToCart,
  onToggleWishlist,
  onOpenProduct,
  onOpenOnDemand,
  onNavigateHome,
  onSelectCategory,
  wishlist
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [activeQuery, setActiveQuery] = useState(initialQuery);
  const [isZeroMatchMode, setIsZeroMatchMode] = useState(
    initialQuery.toLowerCase().includes('shaligram') || initialQuery.toLowerCase().includes('90cm')
  );
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [priceMax, setPriceMax] = useState(45);
  const [expressOnly, setExpressOnly] = useState(true);
  const [showAutoSuggest, setShowAutoSuggest] = useState(false);
  const [quoteInput, setQuoteInput] = useState('');
  const [quoteSent, setQuoteSent] = useState(false);
  const [addedIds, setAddedIds] = useState<{ [key: string]: boolean }>({});

  const handleSearchSubmit = (newQ?: string) => {
    const q = newQ !== undefined ? newQ : query;
    setActiveQuery(q);
    setShowAutoSuggest(false);
    if (q.toLowerCase().includes('shaligram') || q.toLowerCase().includes('90cm') || q.toLowerCase().includes('consecrated') || q.trim() === 'rare') {
      setIsZeroMatchMode(true);
    } else {
      setIsZeroMatchMode(false);
    }
  };

  const handleAdd = (prod: any) => {
    onAddToCart({
      id: prod.id,
      name: prod.name,
      category: prod.category || 'Puja',
      subcategory: 'Diya & Lamps',
      sku: prod.sku,
      price: prod.price,
      inStock: true,
      stockCount: 15,
      rating: prod.rating,
      reviewCount: prod.reviews,
      image: prod.image,
      description: prod.desc || prod.name
    }, 1);

    setAddedIds(prev => ({ ...prev, [prod.id]: true }));
    setTimeout(() => {
      setAddedIds(prev => ({ ...prev, [prod.id]: false }));
    }, 1800);
  };

  // 9 Diya Products as in HTML 2
  const diyaProducts = [
    {
      id: 'guk-diy-042',
      name: 'Kamakshi Deepam / Vilakku (15 cm) with Traditional Gajalakshmi Motif',
      sku: 'GUK-DIY-042',
      badge: 'Best Seller',
      rating: 4.9,
      reviews: 86,
      spec: 'H: 15cm | Wt: 420g',
      price: 24.99,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyqbtgPNZEFGr757h59CxdaWW2F8xRuG3iaBCAYqA0ttLydkfS7IDY0qPNSJrtUMZRXaV9nnTf-FJ7A2EeU64GDo6Zyfj7b5c8Nif5685yiTVB4cJcnetqxE4Bt5Z0tDlkFRrj0FcCeaU-t2WRrZ4nn6Ycx0Qtaxn8-P36eDVQWUloLPa0-Gnz0mDVNGmkskiAS8O9_9E8RJ9BlpSClpGdSqtUXDlLVXsy2jrJviTZ'
    },
    {
      id: 'guk-diy-089',
      name: 'Akhand Jyoti Brass Diya with Borosilicate Glass Chimney',
      sku: 'GUK-DIY-089',
      badge: 'Temple Classic',
      rating: 4.8,
      reviews: 64,
      spec: 'H: 18cm | Wt: 580g',
      price: 32.50,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApl44oviXGOSz9eyW5aSDBz6vkMbJQtg55Rrw9U4LflZP_mefbUJio_vsuCOeOV8i5DX3YUunSsTf1zMfLc3zHr4WvFAyKXd4S19kyY5ZI73E4OWeNrwI0B6i1RIjoN1-mnQHRW3tO7n7nhtBeyFxLCDlWn_J_E8qAxuipk6i0SFhC1O1w-CW7q_9ePUA0xoMD2Daayd29NLoECYP3WnMfNFBCRbS0gYpB3hgteRVE'
    },
    {
      id: 'guk-diy-112',
      name: 'Handcrafted Mayur Brass Diya Pair (Set of 2)',
      sku: 'GUK-DIY-112',
      badge: 'Set of 2',
      rating: 5.0,
      reviews: 42,
      spec: 'H: 12cm | Wt: 640g',
      price: 28.00,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsqZ2rmEA7bDZ_HRl9y5dLsOotgG9ZH32d7pIhET5vLqgabOXf5bIu2BOQsHi1O3MKFFI6R1Z4TPn70wBj9bk3WewtLZnys8M7mojjXGh03Sh4wqqwR5y6C9-dpbxfrVMXPp3M4AP02D513v9Lyf682bSWxRo1FpPOTfdcuN-hSXgi-w3YfsCu8RKXLVMKRPJnTmJWZMA2wx9QwEFcL4CQjbAD715gLkdbDwga9Q6m'
    },
    {
      id: 'guk-diy-055',
      name: 'Pancha Aarti Diya with Carved Ganesha Handle',
      sku: 'GUK-DIY-055',
      badge: 'Puja Essential',
      rating: 4.7,
      reviews: 38,
      spec: 'L: 20cm | Wt: 350g',
      price: 18.00,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnO75NPbYseebEhp-AjwbCDxLBmksmPcHwvfObkpCMGOELn9shJHoAIPoq4tyvZdhHodcE-URsbrut4CFXHGKdJFOhAz-vdYJvfafoAUVaUn31gdcv0a9ss2jMjfimpdGmcm626EI7vROwlEUmPu6QphzDQR_oEO0yR50gFBgdDOZbwYkCxAA-2WrfUkhXzSe5gEXkFV-z-7NfreNn3Pr1OP3dElTtlp436CM1YDTd'
    },
    {
      id: 'guk-nil-030',
      name: 'Traditional Kerala Nilavilakku Brass Lamp (30 cm)',
      sku: 'GUK-NIL-030',
      badge: 'Low Stock: Only 3 left',
      rating: 4.9,
      reviews: 51,
      spec: 'H: 30cm | Wt: 1.2kg',
      price: 42.00,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYAyWMjd3ybEbHKidxBZGcYDNGue2s5-9oOMTJTj9a-Y5A2uZAlVJUelgyq-ufxq0Jp_31qNnNiP_DlphJYs38qXUnem7jPCJC2XDHbLQqvDXlDliPFhVxwD0dmTdQbP5kVDGoUiW3e_MVmpjlC-29yqiQY5mkRKyPVKCHN_OAmeZEXPqEpHgtF-Tb2FH0P_L1l0fZsE38L7cHZSFtB0sA-0GtTnUeDT2O7nTbJjTd'
    },
    {
      id: 'guk-diy-004',
      name: 'Kuber Brass Diya for Lakshmi Puja (Pack of 4)',
      sku: 'GUK-DIY-004',
      badge: 'Value Pack of 4',
      rating: 4.8,
      reviews: 110,
      spec: 'Dia: 6cm | Total: 280g',
      price: 12.50,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvSLv1sKLLh7fj3DV87GjwZbtwf6jDq7a1SJOqV6-fwGZFfntNNdWlCXsSoiydVnj2qG2VacbF-WJnK161oSK7yKjK3NyRQm21LXWa8TfE1EzLHUo2Dj_OF_jX9ZETi-EKHb5EdqhWuiOLlxn0uCMgI-5nteLKg6lMOoc8RmroL4SafPee13p3yC4zz0B3EBIEx7uE4k_dw75bgaN26lNuBPzLJx0e3GF6IQ1Ffk1l'
    },
    {
      id: 'guk-diy-071',
      name: 'Brass Hanging Diya with Chain & Auspicious Bell',
      sku: 'GUK-DIY-071',
      badge: 'Mandir Hanging',
      rating: 4.9,
      reviews: 29,
      spec: 'Chain: 45cm | Wt: 510g',
      price: 21.50,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIFdJCoDJiO2OZboQqdNUoubz3hOdWt8OSfat66TEzbTdsNvFQv7TWzbT_V4K5UFrW0YtY8i_xMcpNC0F-LpFGkjZd3nWgVPQGQCgIKHR5dIizzpZrOkBwDU5Vknh-WpQWnG55-4hE9GnLZvc88QUw5n4iLGxw3RAWXAAIXh01VFOxcIjy8Cgh9AWbvri8yuA4jgsffxQBehBGSHq__da2TGEJYoxN7GnR8ZWIMUwE'
    },
    {
      id: 'guk-diy-033',
      name: 'Pure Brass Agnihotra Aarti Diya with Nagas Prabhavali',
      sku: 'GUK-DIY-033',
      badge: 'Sacred Craft',
      rating: 4.8,
      reviews: 22,
      spec: 'H: 14cm | Wt: 460g',
      price: 19.99,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCbkVPCVRney0YrNBO20OQffZNDB1Nx3CRx6yb94Rwha1ULmtDqvcrcHek_-MmkyaxeJvT31zHY3IpLkkJuukGRsrSOhCb7_hRZSVvywRYypO7KdJ63ZRDXDP5v2fpMgfLQ2zWaYslzh_MWjgo2R2-zLO2JzXc102N6Ymus5hsEsmBCvTXGhLRkyxFKoS0z953U95znjFbkD6TZbJDrEAdEIVcKNNYwnSI7IAyZ_zX'
    },
    {
      id: 'guk-diy-098',
      name: 'Antique Patina Ashtalakshmi Deepam (20 cm)',
      sku: 'GUK-DIY-098',
      badge: 'Heritage Collector',
      rating: 5.0,
      reviews: 34,
      spec: 'H: 20cm | Wt: 880g',
      price: 45.00,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7iykdji92cZ0EJM-Wbmv1gtvd1UM7rgSoKFzzcxoXQXzHJ7e5r0bsDc9xZexwqO-hxlbcFxVDihaRIzlU-LEfb3__MJwbb5C_iNlCvJ35RarD2vqoEn9grNVWKJ1BLlC9_PUGjslOVVvMH6T2vZaF3Tm3WtBDz-w5PZn8xYX_v-3DdHr5ulwJ7t4ZrFZypiUW-wCRkrWjOgpnHaDj3Sw-hzG_A1KdAEMYkNVZ4E3Y'
    }
  ];

  // In-stock items for zero match recommendations as in HTML 1
  const zeroMatchAlternatives = [
    {
      id: 'guk-puj-088',
      name: 'Natural Gandaki Shaligram Shila & Gomati Chakra Sacred Set',
      sku: 'GUK-PUJ-088',
      price: 14.99,
      rating: 5.0,
      reviews: 42,
      tag: 'Vedic Sanctified',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAz7TTx057zOBhAiqCoJHMJcwmrmu0P28eHkAzl7yWlqLi5NVmQhYPMV11EE8tl8bifOXlHPdnzckNy6RyNtqzbqaeHDsvOWsEOZsHGkCU0JJsnAxIO9lg-n9Q7mAmWKd37aPO0J75SeDzvspW3bythEInsCv26rFb96KAESke3OwPF2f6QbQuJbpZJP_hl34FXVt0q1kDlA1lGuZObjkc-IveXpDbanDWUB4czymM'
    },
    {
      id: 'guk-idl-304',
      name: 'Himalayan Sphatik Shiva Lingam with Brass Peedam (3.5 Inch)',
      sku: 'GUK-IDL-304',
      price: 38.00,
      rating: 4.8,
      reviews: 28,
      tag: 'Hand-Carved Quartz',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMOsleraZxO_iTMudoOvPNv5eRZfEEGMbPmy4ab8ej80KcKzYDAeMKlsJPaDEspk-p8D2V9zs5RqijLoyxLeUW_59aZeWXHF68zkElQ70S3mawt7hihthRXsm2S4_8pNVSC8BICRRNfoPxllly9FP4dsPxLEOrZObxR9P70Z_joptLQLPYfdwcpajgyZr3-fMu023GGqwgAFIHN-9MbrImOwShlknKthK9jv0sPtQp'
    },
    {
      id: 'guk-idl-112',
      name: 'Handcrafted Black Krishna Shila Ganesha Murti (15cm)',
      sku: 'GUK-IDL-112',
      price: 52.00,
      rating: 5.0,
      reviews: 57,
      tag: 'Hand-Polished Stone',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjS2c-jKmBsWQHchrd4oDL0vvHl17DFA4BinfuKyFN03pfsPZpXHowQDYyvSrr-pUrgZW349NTXxyFCIV6gth88XsFGSpOxD-GKtnr4GWjTWlNWwF4jbj-ERNA6dzTqK1K0etwb5FrRuQGxflLFldPJJBdjVVICdTjYf2IQjPoYoIVzvU9lR-qsmPrfhKmQPmxb-KKFx7_5_NZIVWco9ms9C3q7AQvXpIH7b0-Msg5'
    },
    {
      id: 'guk-sam-015',
      name: 'Pure Bhimseni Pachai Karpooram (200g Jar - Low Smoke)',
      sku: 'GUK-SAM-015',
      price: 9.99,
      rating: 5.0,
      reviews: 114,
      tag: 'Aromatic & Pure',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDebAuQub5SU0n1rxVmzBkK6dKCNv0v7Ik7hNIXtUl_SPW2nb9nTz3Fimb00NSFOnCWfbF2sYFohqpnWtuuf6w-lwIgNnmYHBOG9mCqisJipY7aqVDtRrjEZT57WNZOjxa7ZhKpe2ZV7ff5qH5EWqmcnYSWzeL6TY2lWb9sWts29mzUlFV1DP1nhWfGgih_BzfaOX8cQ0DELBBVlyucSVFElPBo9fUBBiK0B8uK8gJJ'
    }
  ];

  const diyaFaqs = [
    {
      q: 'What is the difference between Kamakshi Vilakku and regular brass diyas?',
      a: 'The Kamakshi Vilakku (or Kamakshi Deepam) is imbued with sacred symbolism representing Goddess Kamakshi of Kanchipuram and Goddess Gajalakshmi flanked by elephants. Unlike everyday single-wick diyas, the Kamakshi lamp is traditionally lit during Sandhya Vandanam, Griha Pravesh, and auspicious temple pujas to welcome continuous spiritual illumination, prosperity, and peace into the household.'
    },
    {
      q: 'Which oil is most auspicious for daily morning and evening lighting?',
      a: 'According to the Agamas, pure cow ghee is considered supremely auspicious, dissipating all negative vibrations. Pure cold-pressed sesame oil (Til / Gingelly oil) is widely prescribed for daily sandhya worship to pacify malefic influences and bring enduring harmony. For specific remedies, Pancha Deepam oil (a blend of five sacred oils) is also available through our Wembley inventory.'
    },
    {
      q: 'Are all diyas and lamps shipped safely to prevent dents or transit damage?',
      a: 'Every brass and bronze lamp undergoes a meticulous multi-tier packing protocol at our London dispatch center. Items are enveloped in protective archival wraps, enclosed in impact-absorbing air cells, and secured in heavy-gauge corrugated cartons. In the rare event of transit damage, our London Seva Desk provides prompt replacement or refund under our UK Transit Guarantee.'
    }
  ];

  return (
    <div className="w-full bg-[#FCF9F2]">
      {/* Test Bar to toggle between Search Scenarios */}
      <div className="bg-[#00362f] text-white px-4 py-1.5 text-xs border-b border-[#cca730]/40 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="text-[#ffdb96] font-bold">Search Test Toggle:</span>
          <button
            onClick={() => {
              setQuery('Diya');
              handleSearchSubmit('Diya');
            }}
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold cursor-pointer ${
              !isZeroMatchMode ? 'bg-[#cca730] text-[#002b25]' : 'bg-white/15 hover:bg-white/25'
            }`}
          >
            Show Positive Matches (&lsquo;Diya&rsquo; - 48 items)
          </button>
          <button
            onClick={() => {
              setQuery('Shaligram Shila 90cm Consecrated');
              handleSearchSubmit('Shaligram Shila 90cm Consecrated');
            }}
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold cursor-pointer ${
              isZeroMatchMode ? 'bg-[#cca730] text-[#002b25]' : 'bg-white/15 hover:bg-white/25'
            }`}
          >
            Show Zero Matches State (Rare item &lsquo;Shaligram Shila 90cm&rsquo;)
          </button>
        </div>

        <span className="text-[11px] text-stone-300 hidden md:inline">
          Reflecting London Wembley Inventory · SOW §5.3 &amp; §8
        </span>
      </div>

      {isZeroMatchMode ? (
        /* ==================== ZERO DIRECT MATCHES VIEW (HTML 1) ==================== */
        <div className="flex flex-col w-full">
          {/* Breadcrumb */}
          <section className="w-full bg-[#f6f3ec] py-3 border-b border-[#e5e2db]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="flex items-center gap-2 text-xs text-stone-500">
                <button onClick={onNavigateHome} className="hover:text-[#164E45] flex items-center gap-1 cursor-pointer">
                  <Home className="w-3.5 h-3.5" />
                  <span>Home</span>
                </button>
                <span>/</span>
                <span>Search Results</span>
                <span>/</span>
                <span className="text-[#745b22] font-semibold">Zero Direct Matches</span>
              </nav>
            </div>
          </section>

          {/* Query Header & Intent Re-Search Surface */}
          <section className="w-full py-12 relative overflow-hidden">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              {/* Search Adjustment Card */}
              <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 mb-12 border border-stone-200">
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSearchSubmit();
                  }}
                  className="flex flex-col md:flex-row items-stretch md:items-center gap-3"
                >
                  <div className="relative flex-1">
                    <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#745b22]" />
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search sacred vigrahams, stotras, puja samagri..."
                      className="w-full pl-12 pr-10 py-3 bg-[#f6f3ec] text-stone-900 text-sm rounded-full focus:outline-none focus:bg-white border border-transparent focus:border-[#164E45] transition-all"
                    />
                    {query && (
                      <button
                        type="button"
                        onClick={() => setQuery('')}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="px-8 py-3 rounded-full bg-[#164E45] hover:bg-[#00362f] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Search className="w-4 h-4" />
                    <span>Search Again</span>
                  </button>
                </form>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-stone-100 text-xs text-stone-500 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#745b22]"></span>
                    <span>Query Catalog Filter: <strong>All Sacred Collections (UK &amp; EU)</strong></span>
                  </div>
                  <span className="text-stone-400 font-mono text-[11px]">Search ID: #LON-SRCH-9042</span>
                </div>
              </div>

              {/* Hero Empty State Visual Representation */}
              <div className="text-center flex flex-col items-center">
                <div className="relative mb-4">
                  <div className="w-24 h-24 rounded-full bg-[#f6f3ec] flex items-center justify-center shadow-inner border border-stone-200">
                    <Flame className="w-12 h-12 text-[#745b22]" />
                  </div>
                  <span className="absolute -bottom-1 -right-1 text-[#00362f] bg-[#ffdea0] text-xs p-1.5 rounded-full shadow-xs">
                    ✦
                  </span>
                </div>

                <span className="text-xs font-bold uppercase tracking-widest text-[#745b22] mb-1">
                  UK Wembley Store Inventory Notice
                </span>

                <h1 className="font-serif text-2xl sm:text-3xl text-[#00362f] max-w-2xl leading-tight mb-2">
                  No Exact Sacred Items Found for &ldquo;<span className="italic font-normal text-stone-800">{activeQuery}</span>&rdquo;
                </h1>

                <p className="text-xs sm:text-sm text-stone-600 max-w-2xl mb-8 leading-relaxed">
                  We could not locate an exact warehouse match in our London Wembley inventory for this specific deity dimension. Rare sacred Gandaki shilas and life-sized temple murtis are traditionally curated through custom sthapathi commissions or specialized agamic batches.
                </p>

                {/* Suggested Search Terms */}
                <div className="w-full bg-[#f6f3ec] rounded-xl p-4 mb-12 flex flex-col md:flex-row items-center gap-4 justify-between border border-[#e5e2db]">
                  <div className="flex items-center gap-2 text-stone-900 text-xs font-bold shrink-0">
                    <Sparkles className="w-4 h-4 text-[#745b22]" />
                    <span>Recommended Search Paths:</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 justify-center md:justify-end text-xs">
                    {[
                      'Shaligram Shila (Natural)',
                      'Black Krishna Shila',
                      'Sphatik Lingam',
                      'Abhishekam Samagri',
                      'Panchaloha Idols'
                    ].map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => {
                          setQuery(tag);
                          handleSearchSubmit(tag);
                        }}
                        className="px-3 py-1.5 rounded-full bg-white text-[#00362f] font-medium shadow-xs hover:bg-[#ffdea0] hover:text-[#261900] transition-colors border border-stone-200 cursor-pointer"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Helpful Tips Grid */}
          <section className="w-full bg-[#f6f3ec] py-12 border-t border-[#e5e2db]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-xs border border-stone-200 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#00362f] mb-1">Check Alternate Spellings</h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Sacred Sanskrit &amp; Tamil texts often have varied English transliterations. Try searching for <em>Saligramam</em>, <em>Gandaki Shila</em>, or <em>Narmada Banalingam</em>.
                    </p>
                  </div>
                  <div className="bg-[#f6f3ec] rounded-lg p-2.5 text-[11px] text-stone-700 font-mono">
                    e.g., &ldquo;Saligram&rdquo; instead of &ldquo;Shaligram&rdquo;
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-xs border border-stone-200 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#00362f] mb-1">Broaden Dimensions &amp; Terms</h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Exact measurements like &ldquo;90cm&rdquo; may exclude handcrafted pieces measuring between 75cm–100cm. Try general terms like <em>Large Stone Murti</em> or <em>Temple Vigraham</em>.
                    </p>
                  </div>
                  <div className="bg-[#f6f3ec] rounded-lg p-2.5 text-[11px] text-stone-700 font-mono">
                    e.g., Remove exact cm / inches filters
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-xs border border-stone-200 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#00362f] mb-1">London Wembley Seva Desk</h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Looking for a specific temple installation, Pranapratishtha deity, or authentic Gandaki riverbed certification? Our Wembley specialists can personally verify transit availability.
                    </p>
                  </div>
                  <button onClick={onOpenOnDemand} className="text-[#745b22] text-xs font-bold inline-flex items-center gap-1 hover:underline cursor-pointer">
                    <span>Consult Seva Desk</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* High-Conversion Bespoke Sourcing Banner */}
          <section className="w-full bg-[#164e45] text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00362f]/60 text-[#ffdea0] text-[11px] font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Bespoke Agamic Procurement</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#ffdea0] leading-tight">
                    Seeking a Specific Deity Dimension or Rare Sacred Consecration?
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-200 max-w-xl leading-relaxed">
                    For consecrated large shilas (50cm+), temple-grade black granite murtis, or bespoke panchaloha icons, our London Vedic desk liaises directly with hereditary master sthapathis across Swamimalai, Kumbakonam, and Varanasi.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-stone-200">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#ffdea0]" />
                      <span>100% Certified Agamic Provenance</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#ffdea0]" />
                      <span>Direct UK Air Freight &amp; Customs Cleared</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#ffdea0]" />
                      <span>Temple Mandir &amp; Home Sanctum Sizing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#ffdea0]" />
                      <span>Consecration Care &amp; Mantropadesham</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-4">
                    <button
                      onClick={onOpenOnDemand}
                      className="px-6 py-3 rounded-full bg-[#ffdea0] text-[#261900] text-xs font-bold shadow-md hover:bg-[#e4c27f] transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Commission Bespoke Sourcing Request</span>
                    </button>
                    <a
                      href="https://wa.me/442089038920"
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-3 rounded-full bg-[#00362f] hover:bg-[#00241f] text-white text-xs font-semibold flex items-center gap-2 border border-stone-600 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 text-[#ffdea0]" />
                      <span>WhatsApp Wembley Desk</span>
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="bg-[#00362f] rounded-2xl p-5 shadow-2xl space-y-4 border border-[#164e45]">
                    <div className="relative h-60 rounded-xl overflow-hidden">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1D0gkh8IDWAiHudJSdIWu6e-hPRGhY5JKCGXPhFQrGVh0wT_0FJS6fov3j73rlXciXDvPe76vNxDn5Y-vTtmInUS5u13Z6GrPIeycJnvGHGb41DaI2qXi5XV3Ize4r6GAqGuFq3Xg9LB_helFJ1-sQQ7WrMeHPAyHsdvXGKiJnLe8vtARXryaxKsUlj6uJBmkekc6-b5YczAq_9a7GxBdHUDQPF5wZcPNDRbt1bWb"
                        alt="Master artisan carving stone murti"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <span className="text-[10px] uppercase font-bold text-[#ffdea0]">Hereditary Craftsmanship</span>
                        <div className="text-xs font-semibold">Swamimalai &amp; Mahabalipuram Master Sculptors</div>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs">
                      <label className="block text-stone-300">Have specific dimensions in mind?</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={quoteInput}
                          onChange={(e) => setQuoteInput(e.target.value)}
                          placeholder="e.g., 60cm Granite Nandi, 18kg"
                          className="flex-1 px-3 py-2 rounded-lg bg-[#164e45] text-white placeholder-stone-400 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (quoteInput) {
                              setQuoteSent(true);
                              setQuoteInput('');
                            }
                          }}
                          className="px-4 py-2 rounded-lg bg-[#ffdea0] text-[#261900] font-bold cursor-pointer"
                        >
                          Request Call
                        </button>
                      </div>
                      {quoteSent && (
                        <p className="text-[11px] text-emerald-300 font-medium">Thank you. A London Seva Acharya will contact you shortly.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Curated Alternatives In Stock */}
          <section className="w-full py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1 text-[#745b22] text-xs font-bold uppercase tracking-widest">
                    <Sparkles className="w-4 h-4" />
                    <span>Devotee Reverence</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#00362f]">In-Stock Sacred Vigrahams &amp; Puja Samagri</h2>
                  <p className="text-xs text-stone-600 mt-1">Available immediately for next-day Royal Mail Special Delivery from our London Wembley repository.</p>
                </div>
                <button onClick={onNavigateHome} className="text-[#00362f] text-xs font-bold hover:underline flex items-center gap-1 cursor-pointer">
                  <span>Explore All 2,400+ Products</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {zeroMatchAlternatives.map((prod) => (
                  <div
                    key={prod.id}
                    className="bg-white rounded-xl shadow-xs border border-stone-200 overflow-hidden flex flex-col justify-between"
                  >
                    <div className="relative h-60 bg-[#FAF7F0] overflow-hidden">
                      <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                      <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-[#ffdea0] text-[#261900] text-[10px] font-bold">
                        {prod.tag}
                      </span>
                    </div>

                    <div className="p-4 flex flex-col flex-1 justify-between space-y-3">
                      <div>
                        <div className="flex justify-between text-[10px] text-stone-400 mb-1">
                          <span>SKU: {prod.sku}</span>
                          <span className="text-emerald-700 font-bold">● In Stock (London)</span>
                        </div>
                        <h3 className="font-serif text-sm font-bold text-stone-900 line-clamp-2">
                          {prod.name}
                        </h3>
                      </div>

                      <div>
                        <div className="flex items-baseline justify-between mb-2">
                          <span className="font-mono text-lg font-bold text-[#00362f]">£{prod.price.toFixed(2)}</span>
                          <span className="text-[10px] text-stone-400">Incl. UK VAT</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleAdd(prod)}
                          className={`w-full py-2 rounded-full font-bold text-xs transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer ${
                            addedIds[prod.id] ? 'bg-emerald-700 text-white' : 'bg-[#164E45] hover:bg-[#00362f] text-white'
                          }`}
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>{addedIds[prod.id] ? 'Added ✓' : 'Add to Basket'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Category Hub Shortcuts */}
          <section className="w-full bg-[#f6f3ec] py-12 border-t border-[#e5e2db]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="text-center max-w-xl mx-auto space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-[#745b22]">Authentic Department Hubs</span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#00362f]">Browse Verified Collections</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: 'Idols & Handicrafts', count: '530+ Vigrahams', desc: 'Hand-cast bronze, brass diyas, and sanctified stone murtis.' },
                  { title: 'Puja & Agamic Samagri', count: '618+ Sacred Items', desc: 'Gangajal, kumkum, pure dhoop cones, and havan woods.' },
                  { title: 'Sacred Books & Stotras', count: '400+ Publications', desc: 'Vedic publications, stotra malas, slokas, and panchangams.' },
                  { title: 'Home Mandir Accents', count: '180+ Sacred Accents', desc: 'Torans, carved asanas, brass bells, and mandir curtains.' }
                ].map((hub, idx) => (
                  <div
                    key={idx}
                    onClick={() => onSelectCategory(hub.title.includes('Idols') ? 'Idols & Handicrafts' : 'Puja')}
                    className="bg-white rounded-xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer border border-stone-200 group"
                  >
                    <div>
                      <h3 className="font-serif text-base font-bold text-[#00362f] group-hover:text-[#745b22] transition-colors">{hub.title}</h3>
                      <p className="text-xs text-stone-600 mt-1">{hub.desc}</p>
                    </div>
                    <span className="text-xs font-bold text-[#745b22] mt-4 flex items-center justify-between border-t border-stone-100 pt-2">
                      <span>{hub.count}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      ) : (
        /* ==================== POSITIVE MATCHES VIEW ('DIYA' - HTML 2) ==================== */
        <div className="flex flex-col w-full">
          {/* Query Breadcrumb & Editorial Header */}
          <section className="w-full bg-[#f6f3ec] py-6 border-b border-[#e5e2db]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="flex items-center gap-2 text-xs text-stone-500 mb-3">
                <button onClick={onNavigateHome} className="hover:text-[#164E45] flex items-center gap-1 cursor-pointer">
                  <span>Home</span>
                </button>
                <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                <span>Search</span>
                <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                <span className="text-[#00362f] font-semibold">Results for &lsquo;{activeQuery}&rsquo;</span>
              </nav>

              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h1 className="font-serif text-3xl sm:text-4xl text-[#00362f] tracking-tight">
                    Search Results for &lsquo;{activeQuery}&rsquo;
                  </h1>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1">
                    Showing 48 sacred items matching your inquiry across Brass Idols, Puja Samagri, and Deepam Essentials.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#ffdb96] text-[#795f26] text-xs font-bold">
                    48 Sacred Items Found
                  </span>
                  <span className="text-xs text-[#00362f] font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-[#745b22]" />
                    Direct Sanctum Sourcing
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Search Bar with Live Auto-Suggest Flyout */}
          <section className="w-full py-4 border-b border-stone-200 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              <div className="flex items-center w-full bg-[#f6f3ec] rounded-full shadow-xs p-1.5 focus-within:shadow-md transition-all border border-stone-300">
                <div className="pl-4 text-[#00362f]">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setShowAutoSuggest(true)}
                  placeholder="Search sacred books, brass idols, puja samagri, dance jewellery..."
                  className="flex-1 px-3 py-2 bg-transparent text-stone-900 text-sm focus:outline-none"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="p-1 text-stone-400 hover:text-stone-700 mr-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleSearchSubmit()}
                  className="px-6 py-2.5 rounded-full bg-[#164E45] hover:bg-[#00362f] text-white text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>Search</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* High-Fidelity Auto-Suggest Flyout Dropdown */}
              {showAutoSuggest && (
                <div className="absolute top-full left-4 right-4 sm:left-8 sm:right-8 mt-2 z-40 bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in duration-150">
                  <div className="grid grid-cols-1 lg:grid-cols-12 p-6 gap-6">
                    <div className="lg:col-span-4 space-y-4">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-[#745b22] mb-2 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Suggested Categories</span>
                        </div>
                        <ul className="space-y-1 text-xs">
                          {['Brass Diyas & Vilakkus (28 items)', 'Silver Finish Diyas (12 items)', 'Deepam Oils & Ghee Wicks (8 items)', 'Akhand Diyas (14 items)'].map((sc, i) => (
                            <li key={i}>
                              <button
                                onClick={() => handleSearchSubmit('Diya')}
                                className="w-full text-left py-1.5 px-2 rounded-lg hover:bg-[#f6f3ec] text-stone-700 flex justify-between cursor-pointer"
                              >
                                <span>{sc.split('(')[0]}</span>
                                <span className="text-[10px] bg-stone-100 px-2 py-0.5 rounded text-stone-500">
                                  {sc.split('(')[1]?.replace(')', '')}
                                </span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-[#745b22] mb-2">
                          Popular Trending Searches
                        </div>
                        <div className="flex flex-wrap gap-1.5 text-xs">
                          {['Brass Diya Lamp Set', 'Kuber Diya', 'Panchamukhi Diya', 'Akhand Jyoti Brass Diya', 'Kamakshi Vilakku'].map((pt) => (
                            <button
                              key={pt}
                              onClick={() => {
                                setQuery(pt);
                                handleSearchSubmit(pt);
                              }}
                              className="px-2.5 py-1 rounded-full bg-stone-100 hover:bg-[#164E45] hover:text-white transition-colors text-stone-700 cursor-pointer"
                            >
                              {pt} ↗
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-8 bg-[#f6f3ec] rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#745b22] flex items-center gap-1">
                          <Star className="w-3.5 h-3.5" />
                          <span>Quick Product Matches</span>
                        </span>
                        <span className="text-[11px] text-stone-400">Directly available from London Hub</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {diyaProducts.slice(0, 4).map((item) => (
                          <div
                            key={item.id}
                            onClick={() => {
                              setShowAutoSuggest(false);
                              handleAdd(item);
                            }}
                            className="flex items-center gap-3 p-2 bg-white rounded-lg hover:bg-stone-50 transition-colors border border-stone-200 cursor-pointer"
                          >
                            <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-md" />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-stone-900 truncate">{item.name}</p>
                              <span className="text-[10px] text-stone-400 font-mono">SKU: {item.sku}</span>
                              <div className="flex justify-between items-center mt-1">
                                <span className="font-mono text-xs font-bold text-[#00362f]">£{item.price.toFixed(2)}</span>
                                <span className="text-[10px] text-emerald-800 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">In Stock</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-stone-100 px-6 py-2 flex items-center justify-between text-xs text-stone-600">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#00362f]">Did you mean:</span>
                      <button onClick={() => handleSearchSubmit('Deepam')} className="underline hover:text-[#745b22]">Deepam</button>
                      <span>•</span>
                      <button onClick={() => handleSearchSubmit('Vilakku')} className="underline hover:text-[#745b22]">Vilakku</button>
                    </div>
                    <button onClick={() => setShowAutoSuggest(false)} className="text-[#00362f] font-bold">Close Preview ×</button>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Two-Column Discovery Layout (Sidebar 25% / Product Grid 75%) */}
          <main className="w-full py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Faceted Sidebar */}
                <aside className="lg:col-span-3 space-y-6 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                    <h2 className="font-serif text-lg font-bold text-[#00362f]">Refine Search</h2>
                    <SlidersHorizontal className="w-4 h-4 text-[#745b22]" />
                  </div>

                  {/* Express UK Delivery Toggle */}
                  <div className="p-3 rounded-xl bg-[#ffdea0]/40 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-stone-900 block">Express UK Delivery</span>
                      <span className="text-[11px] text-stone-600">Next-day dispatch eligible</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={expressOnly}
                      onChange={(e) => setExpressOnly(e.target.checked)}
                      className="w-4 h-4 rounded text-[#164E45]"
                    />
                  </div>

                  {/* Department */}
                  <div className="space-y-2 text-xs">
                    <h3 className="font-bold uppercase tracking-wider text-[#745b22]">Department</h3>
                    <div className="space-y-1.5 text-stone-700">
                      <label className="flex items-center justify-between cursor-pointer">
                        <span className="font-semibold text-[#00362f]">✓ Brass Diyas &amp; Vilakkus</span>
                        <span className="text-stone-400">(28)</span>
                      </label>
                      <label className="flex items-center justify-between cursor-pointer">
                        <span>Puja Samagri &amp; Oils</span>
                        <span className="text-stone-400">(12)</span>
                      </label>
                      <label className="flex items-center justify-between cursor-pointer">
                        <span>Idols &amp; Handicrafts</span>
                        <span className="text-stone-400">(5)</span>
                      </label>
                    </div>
                  </div>

                  {/* Price Range Slider */}
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <h3 className="font-bold uppercase tracking-wider text-[#745b22]">Price Range (£)</h3>
                      <span className="font-bold text-[#00362f]">£10 - £{priceMax}</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={60}
                      value={priceMax}
                      onChange={(e) => setPriceMax(Number(e.target.value))}
                      className="w-full accent-[#164E45]"
                    />
                  </div>

                  {/* Sacred Medium */}
                  <div className="space-y-2 text-xs">
                    <h3 className="font-bold uppercase tracking-wider text-[#745b22]">Sacred Medium</h3>
                    <div className="space-y-1 text-stone-700">
                      <p className="font-semibold text-[#00362f]">● Solid Brass (36)</p>
                      <p>● Bronze / Panchaloha (6)</p>
                      <p>● Clay / Terracotta (4)</p>
                    </div>
                  </div>

                  {/* Ritual Purpose */}
                  <div className="space-y-2 text-xs">
                    <h3 className="font-bold uppercase tracking-wider text-[#745b22]">Ritual Purpose</h3>
                    <div className="space-y-1 text-stone-700">
                      <p>Daily Sandhya Vilakku (18)</p>
                      <p>Akhand Jyoti (8)</p>
                      <p>Aarti &amp; Camphor Thali (12)</p>
                      <p>Hanging Mandir Diya (10)</p>
                    </div>
                  </div>
                </aside>

                {/* Right Product Grid (75%) */}
                <section className="lg:col-span-9 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {diyaProducts.map((prod) => (
                      <article
                        key={prod.id}
                        className="bg-white rounded-xl shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden border border-stone-200 group"
                      >
                        <div>
                          <div className="relative aspect-square w-full bg-[#f6f3ec] overflow-hidden">
                            <img
                              src={prod.image}
                              alt={prod.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                              <span className="px-2 py-0.5 rounded-full bg-[#00362f] text-white text-[10px] font-bold uppercase tracking-wider">
                                {prod.badge}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => onToggleWishlist({
                                id: prod.id,
                                name: prod.name,
                                category: 'Puja',
                                subcategory: 'Diya',
                                sku: prod.sku,
                                price: prod.price,
                                inStock: true,
                                stockCount: 15,
                                rating: prod.rating,
                                reviewCount: prod.reviews,
                                image: prod.image,
                                description: prod.name
                              })}
                              className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 text-stone-500 hover:text-red-600 flex items-center justify-center shadow-xs cursor-pointer"
                            >
                              <Heart className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="p-4 space-y-2">
                            <div className="flex items-center justify-between text-[11px] text-stone-400">
                              <span className="font-mono">{prod.sku}</span>
                              <span>{prod.spec}</span>
                            </div>

                            <h3 className="font-serif text-base font-bold text-stone-900 group-hover:text-[#00362f] transition-colors line-clamp-2 leading-snug">
                              {prod.name}
                            </h3>

                            <div className="text-[11px] text-[#00362f] font-semibold flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                              <span>In Stock - Wembley Hub (Dispatched today)</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 pt-0">
                          <div className="flex items-baseline justify-between mb-3 border-t border-stone-100 pt-2">
                            <div>
                              <span className="font-mono text-xl font-bold text-[#00362f]">£{prod.price.toFixed(2)}</span>
                              <span className="text-[10px] text-stone-400 block">VAT Included</span>
                            </div>
                            <span className="text-[11px] text-stone-500">Qty: 1</span>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleAdd(prod)}
                            className={`w-full py-2.5 rounded-full font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer ${
                              addedIds[prod.id] ? 'bg-emerald-700 text-white' : 'bg-[#164E45] hover:bg-[#00362f] text-white'
                            }`}
                          >
                            <ShoppingBag className="w-4 h-4" />
                            <span>{addedIds[prod.id] ? 'Added to Basket ✓' : 'Add to Basket'}</span>
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>

                  {/* Pagination */}
                  <div className="flex items-center justify-between text-xs text-stone-500 pt-4 border-t border-stone-200">
                    <span>Showing 1 – 9 of 48 sacred creations</span>
                    <div className="flex gap-1.5">
                      <span className="w-8 h-8 rounded-full bg-[#00362f] text-white flex items-center justify-center font-bold">1</span>
                      <button className="w-8 h-8 rounded-full bg-white hover:bg-stone-100 flex items-center justify-center border border-stone-200">2</button>
                      <button className="w-8 h-8 rounded-full bg-white hover:bg-stone-100 flex items-center justify-center border border-stone-200">3</button>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </main>

          {/* Frequently Asked Questions */}
          <section className="w-full py-12 bg-[#f6f3ec] border-t border-[#e5e2db]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="text-center space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-[#745b22]">Sacred Guidance</span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#00362f]">Frequently Asked Questions on Diyas &amp; Deepam</h2>
              </div>

              <div className="space-y-3">
                {diyaFaqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;

                  return (
                    <div key={idx} className="bg-white p-5 rounded-xl shadow-xs border border-stone-200">
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between text-left cursor-pointer"
                      >
                        <h4 className="font-serif text-base font-bold text-[#00362f]">{faq.q}</h4>
                        <ChevronDown className={`w-5 h-5 text-[#745b22] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isOpen && (
                        <p className="text-xs sm:text-sm text-stone-600 mt-3 leading-relaxed border-t border-stone-100 pt-3">
                          {faq.a}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
