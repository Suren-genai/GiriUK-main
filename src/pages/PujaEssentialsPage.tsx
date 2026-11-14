import React, { useState } from 'react';
import { 
  Home, 
  ChevronRight, 
  CheckCircle, 
  ShoppingBag, 
  Heart, 
  Star, 
  ShieldCheck, 
  Flame, 
  Truck, 
  Upload, 
  ChevronDown, 
  Sparkles, 
  Check, 
  Warehouse, 
  MessageCircle 
} from 'lucide-react';
import { Product } from '../types';

interface PujaEssentialsPageProps {
  onAddToCart: (product: Product, quantity?: number) => void;
  onToggleWishlist: (product: Product) => void;
  onOpenProduct: (product: Product) => void;
  onOpenOnDemand: () => void;
  onNavigateHome: () => void;
  wishlist: Product[];
}

export const PujaEssentialsPage: React.FC<PujaEssentialsPageProps> = ({
  onAddToCart,
  onToggleWishlist,
  onOpenProduct,
  onOpenOnDemand,
  onNavigateHome,
  wishlist
}) => {
  const [activeSeasonTab, setActiveSeasonTab] = useState<'pradosham' | 'griha' | 'devi'>('pradosham');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [priestUploaded, setPriestUploaded] = useState(false);
  const [addedIds, setAddedIds] = useState<{ [key: string]: boolean }>({});

  const handleAdd = (prod: any) => {
    onAddToCart({
      id: prod.id,
      name: prod.name,
      category: 'Puja',
      subcategory: prod.categoryTag || 'Puja Samagri',
      sku: prod.sku,
      price: prod.price,
      inStock: true,
      stockCount: 20,
      rating: prod.rating,
      reviewCount: prod.reviews,
      image: prod.image,
      description: prod.desc
    }, 1);

    setAddedIds(prev => ({ ...prev, [prod.id]: true }));
    setTimeout(() => {
      setAddedIds(prev => ({ ...prev, [prod.id]: false }));
    }, 1800);
  };

  const bentoSubcategories = [
    {
      title: 'Puja Samagri & Powders',
      count: '148 Items',
      desc: 'Pure Palani Vibhuti, Madurai Kumkum, Mysore Chandan, Raksha Sutra, and Kanku.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwFisGcGVku7Jokq8NUMtQfD_97HYAi3AZRWtA0dTd28ORO4euhFU1MINfixtzBSiYZmP_3xtQWA6KWe0TqV73KJgpovRQJbfw4cDN56n1gVHzEMzbXm-ETPrYbd6MN9ZEOH9iig-zxbRghJpgyVZCqKg5rp4nRw0PxM60VZgRVdkR7TafluBDIUcwHW7qWafibSD44Tb6UrQyHbzZoiL8B-jNTjlgr79m8zOYmgbX'
    },
    {
      title: 'Camphor & Low-Smoke Dhoop',
      count: '86 Items',
      badge: 'UK Apartment Safe',
      desc: 'Bhimseni Camphor, Pure Guggul Dhoop, and low-smoke cup sambrani calibrated for UK alarms.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA77g_hiJgwslNikU2NM-N7eg7RQgExPtt3DnDuInLGJsYRBjUIcbNQTL2vbuoSzQvCCxWJzwvHlX9CcWudaaPFZCl_7quevNgSaX4uWWVJjt2wGoAMEKlMmiZyPbwLn4Wsa9ksijhUMmTi5FMC3gYxJRgkjPTn6x04egZgefSPaUmeDUeUq6Ql6wTcSaCKeQiJesUPNd-ILKE8TfnNgHK0tJ4pVgzVXupnH4FdrPhO'
    },
    {
      title: 'Deepam Oils & Ghee Wicks',
      count: '42 Items',
      desc: 'Pancha Deepam Oil, cold-pressed Gingelly/Sesame oil, hand-rolled cotton & saffron thiri wicks.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDY-s76AgSOqKgZLqY-P3N0fMHsYVs-zyVmPPBtN0xEvNkLel57HbwNU6J8c0H_UAN1iE3Fo1_-L0FQI11V3tajclHwyaaLVERK8fzvdkS6Iih5OqgUZNTEP8GxtPWK5TC-khIi_j8f5lj4LEhzmEmTgIzUVINwL6-9B2W6zqe_3mNjn2dr5j2Y7uPCeeVb-vqjJ27bJjDass9S5f6hh6TIIPSet884_Vg7SiitCn9u'
    },
    {
      title: 'Aarti Items & Puja Thalis',
      count: '74 Items',
      desc: 'Solid heavy brass pancha patram, karpoor harathi holders, dhoop aarti handles, and embossed thalis.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMvdc3SwuyYW0RBwXNu_8o9k59HbsHtHNSKwIT7DMks4XYOTc_4qSWIdo9dKt2OWiCf24d-tkJuxkYroNu-TMyXRopEwk3-MFLPFoNbrMlobDOZWzwuZuj98akfptdTuQ5bGU2czOV1d3WYvPiZuoO5wS4YTdqPpBoS_QGPqDPRsEyU8aZPRjtMdevlY7Yv1oQTW2aRypT8678lCUVRR-g3lnRuCrX59hThkrhTCu-'
    },
    {
      title: 'Havan & Homam Samagri',
      count: '53 Items',
      desc: 'Pure copper Kunds, 108 herbs Ahuti mix, certified dry Samithu bundles, and consecrated Navadhanyam.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBM2ROAcqCf-Dh2Row--E18cUlEI5JBIUz-YCDNkIV7DhK1hnJQj9O6nPrIwlkwKMPaJzIi33apT6xbAArB6--_4CXr27qHTcWWbA2M-UgR828CRFIpF3cTPFvuJqvQzYRAmD7S1kISCNg5d7SkV3hAgs_nlE4ZybtHuwsrVF-T4c8p6QYiv3c_yci5KiZ9bdbrrsXlWCIQ5lERcA7zBk_HaKpCTRDUZgEgdYOU-Ym'
    },
    {
      title: 'Deity Vastras & Alankaram',
      count: '112 Items',
      desc: 'Woven deity silk shawls, stone kireetams, pearl malas, and ceremonial velvet embroidered asanas.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIBtbIdAg3HD5ohnTF-Ms9rAn-zEcxtmnVuYD7qRSaXZewGoB8PattVB4l__22D4q77Q87AGXsSjpSm1Yf_Jb-Y0M5U07zS_32HgzInoz8SccnWeAETpAiDwylvmuRQFw-vv5pX7oIZYRZRQe-BQ0zLqO6qVrHI_LAHbKiDV4MyQGiCF7HrG9GyUXKRW3aQg4Ck4uoVPey5GKj0a3tX2kByYqJ1ntnautl5kleondd'
    },
    {
      title: 'Kalash, Yantras & Shankh',
      count: '38 Items',
      desc: 'Consecrated copper Kalasham pots, Meru Sri Yantras, and verified natural blowing & puja Shankhs.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALEPQqDtTvLf91l5TtliOUIK6KXGwP-mrBRLEy8RNdSlys21rFBNs2_X5-5cOdVI8QWzlweLihppnwlorYlajcuEEe1eQSGHyycfiqJlxl0NYjl7punUuW0gNBBvO6yP0d7DGXdmJLMELmXSurzHP8tsbRvpdJ9rchMYyTbi9-FanC555biDcx_HfeDTkcvExm_86RRxHaZiTmlgYhPkyyvjULaJWNTSLtjaVeJR5H'
    },
    {
      title: 'Home Mandir & Decor',
      count: '65 Items',
      desc: 'Carved teak and sheesham puja chowkis, hanging brass bells with chains, and torans.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA83ULBIjrC-xhpxFyusn-1iSqKjvGvJ7TyAuyvd8wcNFwiFIi_4g2kQrtkbp91V-WMkfvEgluu_ODdAcG1UhcahTS1-q1FYSKawRM_jc7hwnTl-sdcrBIMfHd-8dLTL4kfd5Bwmq5kKv8hqb1GEbN8jW6jyDBLmjE5AujFM-mtQdJ2RgWDR8vlKgfViUmvYqTExNnUnrC863DnnWGr0eLnkYW9lAGsDENFxtWc4Tnh'
    }
  ];

  const seasonalProducts = [
    {
      id: 'puj-pan-01',
      name: 'Handcrafted Brass Pancha Patram with Udharani',
      categoryTag: 'Aarti Essentials',
      rating: 5.0,
      reviews: 48,
      sku: 'GUK-PAT-01',
      desc: 'Traditional solid brass Pancha Patram and Udharani spoon with holy cow and calf engraving.',
      price: 14.50,
      spec: '100% Solid Brass',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFAu7zd7Fm1DfDSecv9nJUvBi9J2nHgp_7wnkKACT16RhZQWZ3zs0NXQfeqej84m8YeaZXDJiZ8-7NC4lQGcC-KvFBfyOshZ3CP_OUs7ZHPIC_DBqomxDdC92Qp3dquBjJwYyn-n8UPDX_d-hNyTHmfGT2Fo6aGiggdSBWOf28xmLRFSovjmy5y1-P0sICZV_ImuVeMVJXuu_yawsbwP-g4RSS1LVPiYE5P8woFgp4'
    },
    {
      id: 'puj-cam-200',
      name: '100% Pure Bhimseni Pachai Karpooram (200g Jar)',
      categoryTag: 'Camphor',
      rating: 4.9,
      reviews: 132,
      sku: 'GUK-CAM-200',
      desc: 'Authentic unadulterated Bhimseni camphor crystalline flakes with an airtight golden seal.',
      price: 9.99,
      spec: 'Residue-Free Burn',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD31BObOZqZQ_JYcabePCElyh5k5RVXrGTbSNo7MwcuPt7BHHLLld875vexSbdGuIacfReAE6JwepXrXNqdBqAcoGtgJeZBbt6XV6EvJIOeDX-9r1mvEdeXS-mIOXR08iXiJicWzylUx36sWYUJ8Z2vg-7XQvbgmzmk25jzaSm1H1NQlZT_9ryV2vR9MMfm8tee9bsiV-XF3Oy1N2zC-AQ8izT3QBX9_5T03-Heg68C'
    },
    {
      id: 'puj-oil-1l',
      name: 'Sri Giri Pancha Deepam Temple Lamp Oil (1 Litre)',
      categoryTag: 'Sacred Lamps',
      rating: 4.9,
      reviews: 89,
      sku: 'GUK-OIL-1L',
      desc: 'Traditional 5-oil blend Pancha Deepam puja oil bottle with sacred herbs and auspicious sesame.',
      price: 8.25,
      spec: 'Sesame, Ghee, Mahua blend',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIwTy646fQJm6o4zDIZLHgw6SQxbt2bN2slkVhoWxkM7sNsBIK5je8hXco7c1Axj5F5NNTznlRM3VzoOFIW17FUYf2-8BMpxL8i53oA8mz3t4VUSdMXFOx54IX8s-RlXBGFMXdtB3xphgrSHFQ_qhj15cZIbryNR5mDYhdyWOOvLzGn5vdfKV1_z7C-v3e5oTQYSNkpmg1haSy-1tyEYyzmekCyoUi8bUGxNkhKmBJ'
    },
    {
      id: 'puj-nav-9',
      name: 'Shuddha Navadhanyam (9 Grains Kit for Homam)',
      categoryTag: 'Navagraha Samagri',
      rating: 4.8,
      reviews: 64,
      sku: 'GUK-NAV-9',
      desc: 'Traditional 9 sacred grains Navadhanyam packets neatly arranged in an eco-friendly palm tray.',
      price: 5.49,
      spec: 'Agama Certified',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDftJ0bb1LI4Bdq0BXx-tThGc7OeP9Y8ROf8mIfiSozcHj6qzwf0JrM2fELCueB_vj1kaMU8t-jffepmnHz_BdXw2Cr1dxHMdfzDcjnjDcEiWZIZpFOtgbUZkCphWt0fT_Zb9zR_z6U6MxdbRkUwr3x2UecwZ8-zOuN2VtbTLa8LDRdD_tyl8rUsuAcoB6b6Mxm-0ol76XWpG7PGKPklM5GuQdfsKCCqV7MqLCTUMBp'
    }
  ];

  const faqs = [
    {
      q: 'Are GIRI dhoop sticks and camphor safe for UK flats with optical smoke alarms?',
      a: 'Yes. Our Bhimseni camphor contains zero kerosene, waxes, or synthetic binders, sublimating completely into vapor without soot. For indoor dhoop offerings, we stock specialized micro-sambrani cups and low-smoke flora agarbattis designed specifically for British residential ventilation without setting off optical ionization smoke sensors.'
    },
    {
      q: 'How is sacred Ganga Jal bottled, tested, and imported into the UK?',
      a: 'Our Gangotri and Haridwar Ganga Jal is gathered under stringent priest supervision and bottled at source in tamper-evident, food-grade containers. All consignments undergo official UK Customs and Border clearance for spiritual water imports, preserving sanctity without chemical treatment.'
    },
    {
      q: 'Can I request customized samagri quantities for large home homams or pujas?',
      a: 'Certainly. We regularly customize bespoke homam parcels for Ganapathi Homam, Sudarshana Homam, Navagraha Shanti, and Grihapravesham according to regional traditions (Smartha, Vaishnava, Madhwa, Arya Samaj). Simply message our London Seva Desk via WhatsApp or upload your priest\'s list.'
    }
  ];

  return (
    <div className="w-full bg-[#FCF9F2]">
      {/* 1. Top Header & Contextual Hero Bar */}
      <section className="w-full bg-[#f6f3ec] py-8 border-b border-[#e5e2db]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-stone-500 mb-4">
            <button onClick={onNavigateHome} className="hover:text-[#164E45] flex items-center gap-1 cursor-pointer">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <span>/</span>
            <span className="text-[#164E45] font-semibold">Puja &amp; Ritual Essentials</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-2">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-[#ffdea0] text-[#745b22] text-[11px] font-bold uppercase tracking-widest">
                  Master Category Directory
                </span>
                <span className="text-[#745b22] font-serif text-base italic">
                  नित्य पूजा सामग्री एवं देव प्रतिष्ठा
                </span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#00362f] tracking-tight">
                Puja &amp; Ritual Essentials
              </h1>
              <p className="text-sm text-stone-600 leading-relaxed pt-1 max-w-3xl">
                Authentic, strictly unadulterated puja samagri, sacred havan dravyam, micro-flame dhoop tested for UK flats, handcrafted brass aarti vessels, and cold-pressed temple oils. Sourced directly from sanctified lineages in Tamil Nadu, Mysore, and Varanasi, dispatched directly from our London Wembley distribution hub.
              </p>
            </div>

            <div className="lg:col-span-4 bg-white p-5 rounded-xl shadow-xs border border-stone-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#745b22]">Verified Inventory</span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#00362f] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                  Live UK Warehouse
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-1">
                <div>
                  <div className="font-serif text-2xl font-bold text-[#00362f]">618+</div>
                  <div className="text-xs text-stone-500">Agamic Products</div>
                </div>
                <div>
                  <div className="font-serif text-2xl font-bold text-[#745b22]">4.9 / 5</div>
                  <div className="text-xs text-stone-500">UK Devotee Rating</div>
                </div>
              </div>
              <div className="pt-1 text-[11px] text-stone-600 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#745b22]" />
                <span>Zero chemical fillers or animal fats</span>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 bg-[#ebe8e1]/70 p-3.5 rounded-xl text-stone-800 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white text-[#00362f] flex items-center justify-center shadow-xs">
                <Sparkles className="w-4 h-4 text-[#745b22]" />
              </div>
              <span className="font-bold">100% Agamic Authenticity</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white text-[#745b22] flex items-center justify-center shadow-xs">
                <Flame className="w-4 h-4 text-[#745b22]" />
              </div>
              <span className="font-bold">Smoke-Safe Tested for UK Flats</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white text-[#00362f] flex items-center justify-center shadow-xs">
                <Truck className="w-4 h-4 text-[#00362f]" />
              </div>
              <span className="font-bold">Free UK Delivery over £50</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white text-[#745b22] flex items-center justify-center shadow-xs">
                <Warehouse className="w-4 h-4 text-[#745b22]" />
              </div>
              <span className="font-bold">London Wembley Fulfilment</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Subcategory Visual Grid */}
      <section className="w-full py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#745b22] block mb-1">Ritual Taxonomy</span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#00362f]">Browse by Puja Subcategory</h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 max-w-md">
              Explore specialized ritual essentials catalogued according to traditional Shaiva, Vaishnava, and Shakta tantra-agamas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {bentoSubcategories.map((cat, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between border border-stone-200"
              >
                <div className="relative h-48 overflow-hidden bg-stone-100">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 right-3 bg-white/95 text-[#00362f] px-2.5 py-0.5 rounded-full text-[11px] font-bold shadow-xs">
                    {cat.count}
                  </span>
                  {cat.badge && (
                    <span className="absolute bottom-3 left-3 bg-[#00362f] text-white px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">
                      {cat.badge}
                    </span>
                  )}
                </div>
                <div className="p-4 flex flex-col flex-1 justify-between space-y-3">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#00362f] group-hover:text-[#745b22] transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-stone-600 mt-1 line-clamp-2">
                      {cat.desc}
                    </p>
                  </div>
                  <div className="pt-2 flex items-center justify-between text-[#745b22] text-xs font-bold border-t border-stone-100">
                    <span>View Collection</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Feature Showcase: Essential Daily Nitya Puja Box */}
      <section className="w-full py-12 bg-[#f6f3ec]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="bg-white rounded-2xl overflow-hidden shadow-md grid grid-cols-1 lg:grid-cols-12 items-stretch border border-stone-200">
            <div className="lg:col-span-6 relative min-h-[340px]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjhVsVepPgCGz1R9VgjKAM8FjHPqLI1Dz2ys17M3HKdBBUzuGoQiquNSuolLJJoADJrH8QU79j8vlbnrL_AN-Jr4-iDPBsM0pIwmC-GpdHcFZtWXCUgyu-S1yW8198yM_kk_IVbqPzOtrC1hls-H7kBDUEGgOK4GwZNj77tWo_5bbhm6zkoGGwCp9nymrlVBl5481m_b_CTypyOMniAJLMmHaz-0P03y0IRUkZ_B9x"
                alt="Essential Daily Nitya Puja Box"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-[#00362f] text-[#ffdb96] px-3 py-1 rounded-full text-xs font-bold shadow-xs">
                Curated Devotee Essential
              </div>
            </div>

            <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#745b22]">
                    Complete 30-Day Ritual Solution
                  </span>
                  <span className="flex items-center text-[#745b22] text-xs font-bold">
                    <Star className="w-4 h-4 fill-[#cca730] text-[#cca730]" />
                    <span className="ml-1">4.96 (218 reviews)</span>
                  </span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl text-[#00362f] leading-tight font-bold">
                  Essential Daily Nitya Puja Box (UK Edition)
                </h2>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Every item required for complete daily Sandhyavandanam or morning deity worship. Packaged and sealed to retain fresh natural aromatics and ritual potency across changing British weather.
                </p>

                <div className="grid grid-cols-2 gap-2 pt-2 text-xs text-stone-700">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-[#164E45]" />
                    <span>Bhimseni Camphor (100g)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-[#164E45]" />
                    <span>Pure Madurai Kumkum (50g)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-[#164E45]" />
                    <span>Palani Temple Vibhuti (50g)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-[#164E45]" />
                    <span>Mysore Chandan Paste (40g)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-[#164E45]" />
                    <span>Cold-Pressed Til Oil (250ml)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-[#164E45]" />
                    <span>100 Cotton Flower Wicks</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] text-stone-400 block">All-Inclusive UK Price</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-2xl font-bold text-[#00362f]">£24.99</span>
                    <span className="text-xs text-stone-400 line-through">£32.50</span>
                    <span className="text-[10px] font-bold text-[#745b22] bg-[#ffdea0] px-2 py-0.5 rounded">Save 23%</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleAdd({
                    id: 'nitya-box-uk',
                    name: 'Essential Daily Nitya Puja Box (UK Edition)',
                    sku: 'GUK-NIT-01',
                    price: 24.99,
                    rating: 4.96,
                    reviews: 218,
                    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjhVsVepPgCGz1R9VgjKAM8FjHPqLI1Dz2ys17M3HKdBBUzuGoQiquNSuolLJJoADJrH8QU79j8vlbnrL_AN-Jr4-iDPBsM0pIwmC-GpdHcFZtWXCUgyu-S1yW8198yM_kk_IVbqPzOtrC1hls-H7kBDUEGgOK4GwZNj77tWo_5bbhm6zkoGGwCp9nymrlVBl5481m_b_CTypyOMniAJLMmHaz-0P03y0IRUkZ_B9x',
                    desc: 'Every item required for complete daily Sandhyavandanam or morning deity worship in the UK.'
                  })}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#164E45] hover:bg-[#00362f] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-[#ffdb96]" />
                  <span>{addedIds['nitya-box-uk'] ? 'Added to Bag ✓' : 'Add to Bag · £24.99'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Seasonal Ritual Recommendations */}
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#745b22] block mb-1">
                  Panchangam &amp; Vrat Focus
                </span>
                <h3 className="font-serif text-2xl text-[#00362f]">
                  Seasonal Ritual Recommendations
                </h3>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto text-xs">
                <button
                  onClick={() => setActiveSeasonTab('pradosham')}
                  className={`px-4 py-2 rounded-full font-bold whitespace-nowrap cursor-pointer transition-colors ${
                    activeSeasonTab === 'pradosham' ? 'bg-[#00362f] text-white' : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  Pradosham &amp; Ekadashi
                </button>
                <button
                  onClick={() => setActiveSeasonTab('griha')}
                  className={`px-4 py-2 rounded-full font-bold whitespace-nowrap cursor-pointer transition-colors ${
                    activeSeasonTab === 'griha' ? 'bg-[#00362f] text-white' : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  Grihapravesham Veda Kits
                </button>
                <button
                  onClick={() => setActiveSeasonTab('devi')}
                  className={`px-4 py-2 rounded-full font-bold whitespace-nowrap cursor-pointer transition-colors ${
                    activeSeasonTab === 'devi' ? 'bg-[#00362f] text-white' : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  Weekly Devi Puja Set
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {seasonalProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white rounded-xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between border border-stone-200"
                >
                  <div className="relative bg-[#FAF7F0] h-56 p-4 flex items-center justify-center">
                    <img src={prod.image} alt={prod.name} className="h-full object-contain" />
                    <button
                      type="button"
                      onClick={() => onToggleWishlist({
                        id: prod.id,
                        name: prod.name,
                        category: 'Puja',
                        subcategory: prod.categoryTag,
                        sku: prod.sku,
                        price: prod.price,
                        inStock: true,
                        stockCount: 20,
                        rating: prod.rating,
                        reviewCount: prod.reviews,
                        image: prod.image,
                        description: prod.desc
                      })}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 text-stone-500 hover:text-red-600 flex items-center justify-center shadow-xs transition-colors cursor-pointer"
                    >
                      <Heart className="w-4 h-4" />
                    </button>
                    <span className="absolute bottom-3 left-3 bg-white/95 text-[#00362f] text-[10px] font-bold px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                      In Stock - Wembley Hub
                    </span>
                  </div>

                  <div className="p-4 flex flex-col flex-1 justify-between space-y-3">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#745b22]">
                        {prod.categoryTag}
                      </span>
                      <h4 className="font-serif text-base font-bold text-[#00362f] leading-snug line-clamp-2">
                        {prod.name}
                      </h4>
                    </div>

                    <div>
                      <div className="flex items-baseline justify-between mb-2">
                        <span className="font-mono text-lg font-bold text-[#00362f]">
                          £{prod.price.toFixed(2)}
                        </span>
                        <span className="text-[11px] text-stone-500">{prod.spec}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleAdd(prod)}
                        className={`w-full py-2 rounded-full font-bold text-xs transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer ${
                          addedIds[prod.id] ? 'bg-emerald-700 text-white' : 'bg-[#164E45] hover:bg-[#00362f] text-white'
                        }`}
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>{addedIds[prod.id] ? 'Added' : 'Add to Basket'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Devotee Guidance & Mandir Bulk Order Desk */}
      <section className="w-full py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: The Agamic Guide to Sacred Purity */}
            <div className="lg:col-span-7 bg-[#00362f] text-white rounded-2xl p-8 shadow-md flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#ffdea0]">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-widest">Purity Standard</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl leading-tight">The Agamic Guide to Sacred Purity</h3>
                <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                  Every Vedic ritual specifies that Dravyam offered to Agni or deities must be free of chemical adulteration, bone-char filtering, and petroleum derivatives. GIRI UK upholds uncompromised standards tested and preserved across generations.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-[#164e45] space-y-1">
                    <div className="text-xs font-bold text-[#ffdea0] flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" />
                      <span>Natural Herbal Binders</span>
                    </div>
                    <p className="text-[11px] text-stone-200">Our sambrani and dhoop use pure jigat bark powder, frankincense, and guggul with zero artificial charcoal accelerators.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#164e45] space-y-1">
                    <div className="text-xs font-bold text-[#ffdea0] flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" />
                      <span>Direct Consecrated Jal</span>
                    </div>
                    <p className="text-[11px] text-stone-200">Haridwar &amp; Gangotri Ganga Jal sealed at certified source under lab testing for safe UK shipment.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-700 flex items-center justify-between text-xs text-stone-300">
                <span>Read our Agamic Sourcing Whitepaper</span>
                <span className="text-[#ffdea0] font-bold">Verified Lineages →</span>
              </div>
            </div>

            {/* Right: Mandir & Priest Bulk Order Services */}
            <div className="lg:col-span-5 bg-[#f6f3ec] rounded-2xl p-8 shadow-xs border border-stone-200 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <span className="px-3 py-1 rounded-full bg-[#745b22] text-white text-[11px] font-bold uppercase tracking-widest inline-block">
                  Mandir &amp; Vadhyar Seva
                </span>
                <h3 className="font-serif text-2xl text-[#00362f]">UK Temple Bulk Orders &amp; Priest Samagri Lists</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Are you organizing a temple Brahmotsavam, Grihapravesham, or Ganapathi Homam? Submit your Vadhyar&apos;s list in English, Tamil, Telugu, Hindi, or Sanskrit. We pack and dispatch consolidated sets across the UK &amp; EU.
                </p>

                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">
                    Trusted by priests serving across:
                  </span>
                  <div className="flex flex-wrap gap-1.5 text-[11px]">
                    <span className="px-2.5 py-1 bg-white text-stone-800 rounded-full border border-stone-200">SKLP Northolt</span>
                    <span className="px-2.5 py-1 bg-white text-stone-800 rounded-full border border-stone-200">High Wycombe Temple</span>
                    <span className="px-2.5 py-1 bg-white text-stone-800 rounded-full border border-stone-200">Leicester Sanatan Mandir</span>
                    <span className="px-2.5 py-1 bg-white text-stone-800 rounded-full border border-stone-200">London Sivan Kovil</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                {priestUploaded ? (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-emerald-800 text-xs font-bold flex items-center justify-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>Samagri list received! Our London Acharya will WhatsApp quotation.</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setPriestUploaded(true)}
                    className="w-full py-3 rounded-full bg-[#745b22] text-white text-xs font-bold hover:bg-[#5a430b] transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Upload Priest Samagri PDF / List</span>
                  </button>
                )}
                <p className="text-center text-[11px] text-stone-500">Dedicated WhatsApp Vadhyar Desk: +44 (0) 7891 234567</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Devotee Reviews & FAQ Accordions */}
      <section className="w-full py-12 bg-[#f6f3ec] border-t border-[#e5e2db]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#745b22]">Got Questions?</span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#00362f]">Puja Essentials FAQ for UK Residents</h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;

              return (
                <div key={idx} className="bg-white p-5 rounded-xl shadow-xs border border-stone-200">
                  <div
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <h4 className="font-serif text-base font-bold text-[#00362f]">{faq.q}</h4>
                    <ChevronDown className={`w-5 h-5 text-[#745b22] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </div>
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
  );
};
