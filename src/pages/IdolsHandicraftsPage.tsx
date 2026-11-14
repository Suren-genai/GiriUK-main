import React, { useState } from 'react';
import { 
  Home, 
  ChevronRight, 
  Search, 
  Star, 
  ShoppingBag, 
  Heart, 
  HelpCircle, 
  Truck, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  ChevronDown,
  RotateCcw,
  Check,
  X,
  MessageCircle,
  Eye
} from 'lucide-react';
import { Product } from '../types';

interface IdolsHandicraftsPageProps {
  onAddToCart: (product: Product, quantity?: number) => void;
  onToggleWishlist: (product: Product) => void;
  onOpenProduct: (product: Product) => void;
  onOpenOnDemand: () => void;
  onNavigateHome: () => void;
  wishlist: Product[];
}

export const IdolsHandicraftsPage: React.FC<IdolsHandicraftsPageProps> = ({
  onAddToCart,
  onToggleWishlist,
  onOpenProduct,
  onOpenOnDemand,
  onNavigateHome,
  wishlist
}) => {
  const [selectedMedium, setSelectedMedium] = useState<string>('All');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [active360, setActive360] = useState<string | null>(null);
  const [addedIds, setAddedIds] = useState<{ [key: string]: boolean }>({});

  const handleAdd = (prod: any) => {
    onAddToCart({
      id: prod.id,
      name: prod.name,
      category: 'Idols & Handicrafts',
      subcategory: prod.lineage,
      sku: prod.sku,
      price: prod.price,
      inStock: true,
      stockCount: 10,
      rating: prod.rating,
      reviewCount: prod.reviews,
      image: prod.image,
      description: prod.desc,
      dimensions: prod.height,
      weight: prod.weight
    }, 1);

    setAddedIds(prev => ({ ...prev, [prod.id]: true }));
    setTimeout(() => {
      setAddedIds(prev => ({ ...prev, [prod.id]: false }));
    }, 1800);
  };

  const bentoCategories = [
    {
      title: 'Brass Idols & Vigrahams',
      count: '184 Vigrahams',
      desc: 'Solid brass Ganesha, Nataraja, Murugan, Krishna, and Goddess Mahalakshmi.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_vgCqGhDAOUqNuTbrNehRuEEHPUnzI2xx78bd0bdmXEZ9WQigcuzOqRH3eEFNCJSZgrJaCz2dixpjsFd55Yrqiswr092dGeXgFvPxRFFKfCoDPYAtSGNbxyxvn-ieybyLAY7ahys-olMet14puO1jiI3AddlMOa4nS_U1xB0qsVgWikvvlivQDOySR7ZP_1Suu0jUviccddAwaRG60wqZjlJXFJtwWvNzu71IfEgU'
    },
    {
      title: 'Lost-Wax Bronze Murtis',
      count: '62 Heirloom Casts',
      desc: 'Swamimalai heirloom bronze, authentic Panchaloha and Ashtadhatu ritual statues.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB45Gt42EAb0JamCuREMXv1_2OqcjEbhuEeCHwCHUBwFACMaMFc4KreJpfolRyXZgaW2b6D3Q_g3wuCKTl2YadirEeun57p3fB2q21FqvrqUcUTkONwKP0FubwkE1hKi0e_p0mrEEhqUIW-jGGsYibg-QY0Z59_0RC1Clx8Xoz6etZFuHPYzSxUsNpYSF-IJCtUsyVE7LsxvZOhQ6XkZWtwZ7oqKrRtYBwjLqYLin7D'
    },
    {
      title: 'Black Stone & Krishna Shila',
      count: '34 Stone Statues',
      desc: 'Temple-grade granite deities chiseled for rigorous daily abhishekam rituals.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCieXYqhy4axbUTY2FOVtSrhkohsVa0nB6I-nOcVEmXUqu1vRxdAXJsDb1T0vv9kIpFpVthC7Zqrc4ymDy1PBLjELVMuX4XO1_gBhXrxYpywMHVZZj0NZ2wHW4Q5L97_8Q4Sw89niUV-F0f8GUfhQ5OyUZVRfrlqyzVlB3YqO5KQG_edK0k7IBRjbfJexKUlZzDQSjVmh8ojwqLS2qvh6SIKir1uVr4npxPR1Nejdb_'
    },
    {
      title: 'Marble & Gemstone Statues',
      count: '45 Statues',
      desc: 'Pure Makrana white marble, rose quartz, and carved jade auspicious forms.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqv-3BK2taTYN1zR7t7O6MKNWXTOS5NvUbg6wCrMZif0nObdan5W84_vSHY9FJjtDZUYodnugD4rG_fNFjXya3BJ1CaB77UE506Qh-4Q3jKKtzwIp14qd_aN-R9gQs21ukaCkmd0cZ736sPwPy96AsagU1ylvHCkgkspS2-p-oAO47KE-YxT644X6w13eitXyHfklgP8D-dwYLRpIKRaWcXxbesoSBnM9BjIoH5xc7'
    },
    {
      title: 'Sphatik & Spatika Lingams',
      count: '28 Energized',
      desc: 'Certified Himalayan quartz lingams, Meru peedams, and energized Sri Chakras.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOF2JEA0zLKN1c1t9C0Y1rr3sJkbKE_em9QsSh_YSS77Nh73Qaqk9IxsjUVOUpWJuV9WpTDidQ9xs5zBJFYaDtxbKjHv6bXZcpCtqm-t80XwiJXS22GeCIqBnxNbuEcFnOFFnu2ihBwzvfr5r3dk_A5RP2pVb3GbuDHxZInew-7YLDdSBPuZlYgrYhLNuvNTmHdmBAF48n4MP5U-Q2X8pVovJgZ1qvzJgePvki8IdN'
    },
    {
      title: 'Wooden Mandapams & Chowkis',
      count: '51 Altars & Woodcraft',
      desc: 'Hand-planed Teakwood & Rosewood altars, sacred deity Vahanas, and Puja chowkis.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0gY4E4O03VGJPvizyGOETx4DWfQ1pQ37RxpnLiIYO9gapR62fI1tGCcaH7-yAurVpu2n8lIYzLd_jXtAOMoIUTaXwydld1MhicZptviEDGRAznr6l9U6JPSgfmwHXNUnHkhv2ok586WqPUuS8QzC3aLL58CILXm17wRdVXFpCwq5H0xZapuCGyRcGA_dJ-oFdlpD1wFx8F6eAGOpFFOUAqckAI-Rp5W9a6hCw4tev'
    },
    {
      title: 'Prabhavali & Archways',
      count: '29 Sacred Arches',
      desc: 'Hand-beaten brass prabhavali haloes, Tiruvachi frames, and Kirtimukha crests.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDngsbq3LYdzjDD1cMubiVWuWygYCUJRVVV3Ell0d1WxGsOHGXc1yemOU6rDfTf62U8qtLci7zOT0EWYPfcbmfyCJmg5GL67tFxdYXfaC1Dzm49glYJPN13eZcu-Bf12LMKSWgJiRK0_W-LYxFYBPYDLXEGTtKXHjd7zZ29F9OEt4O74dm_i11a7T4dvHk_bFFQ86vGEmN6Rds32RwnU5Wuc5RzmzM-f8gNbg-k-VIG'
    },
    {
      title: 'Golu Dolls & Festive Sets',
      count: '95 Festive Dolls',
      desc: 'Handmade Marapachi pairs, Dashavatara clay sets, and Dasara heirloom assemblies.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_eoOSLL0nZnyVujOgaBPfYZc9Z6pZNtRPD3ticFbhOyE4UuKwYUUCxgAg0RGGGX0EiV2uSRBzTw0Wv0_IDY5vnPpeSoVATqTSLSzoGruwWx3zEr8PAOXeUmcKQJppiBd6Na1eR2WDMwh7WbVa1mFgQ1yFX1q6Bsvl99RlgbOnFhHv8FhfFsawFBglV3UNSfl8JyVWwYQTonXuM0dlJDEBlpPp9ntyoRSH6sRuQ_6h'
    }
  ];

  const masterpieceProducts = [
    {
      id: 'idl-nat-30',
      name: 'Ananda Tandava Nataraja',
      tag: 'Heirloom Grade',
      lineage: 'Swamimalai Lineage',
      rating: 4.9,
      reviews: 42,
      sku: 'GUK-NAT-30',
      desc: 'Solid Temple Brass • Cosmic dance of creation and dissolution with blazing Prabhamandala.',
      height: 'H: 30 cm',
      weight: 'Wt: 4.8 kg',
      price: 145.00,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDF1m-B0fi6z1zVeH_JzbKkGPQJzVqFrsULBxCffaVrOswDBfwgG1utcy-FRU-6B7MrxAxQg6b22CndoQOtPxX39wRSg3ZjBwQjxQvUsQtqH1U_VofXXYO8i50eQTr_VpWjuC1D-bCBs68yFwdvwrWyxuiESgnx1i2z36TMBsAstF5oMt0tDBzLeRpKYedN20TQ97WlO2_LvoXVUk4u2xUEh-zwZXYUektuS7Kc2ObO'
    },
    {
      id: 'idl-gan-20',
      name: 'Sri Maha Ganapati with Modakam',
      tag: 'Vighnaharta',
      lineage: 'Madurai Craft',
      rating: 5.0,
      reviews: 68,
      sku: 'GUK-GAN-20',
      desc: 'Antique Patina Brass • Seated Vighnaharta with modaka, pasha, ankusha and auspicious trunk turn.',
      height: 'H: 20 cm',
      weight: 'Wt: 2.3 kg',
      price: 68.50,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzo98lfGTSbwa17Na-9leL5CKftQlPFG5c7kb-FXdMB1qNg0P-SYtDe_BMmh5LGYNe7eMagKyemzG0BrCTkbWNHetG4KQ_zh-vVYSG2uvXguyDFpgKXyOWCSHTa1Mo08DErvXkUB019sjudOcKs83V4Q3xuKhpTq28X0QcVahDbzO0bEKadhMeXrnLPEwc6LoORwzGlkVWnUH-FDYZZWtCodwW6igzyJTG9KGfX9Nx'
    },
    {
      id: 'idl-bal-35',
      name: 'Sri Venkateswara Balaji',
      tag: 'Tirumala Canonical',
      lineage: 'Kumbakonam Guild',
      rating: 4.9,
      reviews: 53,
      sku: 'GUK-BAL-35',
      desc: 'Detailed Temple Brass • Exquisite representation of Lord of Seven Hills with full Vaikunta regalia.',
      height: 'H: 35 cm',
      weight: 'Wt: 6.2 kg',
      price: 185.00,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCon8pUpvrLuy9d6nk-9IdVWIqW3fTFjz4-20SBbXcDjTIwtAXKhZvdUGmqBXrTqVrSHissvqkH9U7xhvpcYbNfN7uy-Q806W7z3bcDw8ajcrioxG2Mr9wbxuvxgp-BxCarCsGLYsGu8j6PHxwjU9FBoVVUHOR8fzDEUtyAmnmU_cZuSHSpUwjGmtrjOFX1ikP139ksEf5EzpWgVWHHcf8dGMyLXIN_EoFlNOcFgwYC'
    },
    {
      id: 'idl-rad-25',
      name: 'Radha Krishna Yugala Murti',
      tag: 'Divine Couple',
      lineage: 'Vrindavan Tradition',
      rating: 4.8,
      reviews: 37,
      sku: 'GUK-RAD-25',
      desc: 'Polished Temple Brass • Graceful divine couple in Tribhanga pose with fluted Kadamba base.',
      height: 'H: 25 cm',
      weight: 'Wt: 3.1 kg',
      price: 89.00,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDG6cKvlCkhAN1eCoalB4b5W8D_5TUeUQm72RdkEoc8xeH3_aBFKIR0ssX7vAgjt6EMVEC_pdz2QGSM2psJEASY_HXQVEkVuP3BZhepZlD7_HtA2Y7bg1Tq7h85dDiLAy9CGxeS8WDuVfoQG34TZsPF_0hnzkrfjeoZU-5cEk6K-B7hVttQVOB088It_p1o5yqESsUtaxOwKIoKS7XN35De2jQm_MOvlCKn9E_wdr5s'
    },
    {
      id: 'idl-lak-18',
      name: 'Goddess Lakshmi Devi',
      tag: 'Ashta Lakshmi',
      lineage: 'Thanjavur Tradition',
      rating: 4.9,
      reviews: 49,
      sku: 'GUK-LAK-18',
      desc: 'Consecrated Solid Brass • Seated Gajalakshmi posture on double lotus with abundance mudras.',
      height: 'H: 18 cm',
      weight: 'Wt: 1.8 kg',
      price: 54.00,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIo5D1MLfKxB7eP49nZ-6kDoKigiHSFfHpL5i2At2TeS1I1yLEkDMBTulko50bem99zzniQmQKQTYpyOxOjKI2kFkz8cRjEwyRmM6KY-JMPD631F3XpKgzIBmoIfHeeuwWyGPy9918i7sOp7Tb5r3SgFVWArbhvgu_XUFkdwI4KIPAZyetuB2wMXQqTmDCQVXj5MnPGVGmtZe5YnI0H2utuIrgmPcp9OM8_YJfv3nR'
    },
    {
      id: 'idl-pan-22',
      name: 'Shiva Panchamukhi Lingam',
      tag: 'Panchamukha',
      lineage: 'Kashi Vishwanath Style',
      rating: 5.0,
      reviews: 29,
      sku: 'GUK-PAN-22',
      desc: 'Brass with Nagabharanam • Five sacred faces of Ishana, Tatpurusha, Aghora, Vamadeva, and Sadyojata.',
      height: 'H: 22 cm',
      weight: 'Wt: 2.8 kg',
      price: 76.00,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXy4Ezw1ZStg2mLPVFr7wS_444hxqt4NLvJvCqmhkux9miUMhQUNrOzw7gxrdeWkyYMM6KUQk2BOuiGbMRPwTABVsL-kPgmW31C9zNcUVOt28lmuwUkBm-r9BDylIr_8qMVbRH-C_OCEz2--TdJU7OyEs1426O0CPhUWbGpZbyLSLCdUPMytdjfPnIQbQIp_WNuwQyTRbx98MvsoPgRWXpp18QhXzrBV4Ke1GITjeT'
    }
  ];

  const faqs = [
    {
      q: 'How do I choose the correct height of a vigraham for my home mandir altar?',
      a: 'According to the Agama Shastras, murtis for domestic worship (Griha Puja) typically range between 7.5 cm (3 inches) to 30 cm (12 inches). Deities within this height can receive daily personal care, abhishekam, and aarti without overwhelming domestic altar architecture. Vigrahams larger than 45cm are considered Samashti or temple-grade and require dedicated daily Agamic rituals. Measure the internal ceiling height of your wooden mandir to guarantee at least 10 cm of clearance above the deity’s Kiritam for the Prabhavali.'
    },
    {
      q: 'What is the spiritual and ritual difference between brass, bronze, and panchaloha?',
      a: 'Solid Brass (Pithalai) is an alloy of copper and zinc, exceptionally durable, easy to clean with Pitambari powder, and well-suited for everyday home altars. Panchaloha (Five Sacred Metals) is a consecrated formula traditionally composed of Copper, Brass, Lead, Gold, and Silver. In Vedic philosophy, Panchaloha vigrahams possess unique vibrational conductivity, retaining consecrated energy and sanctified mantras during Panchamrita abhishekam.'
    },
    {
      q: 'Can I visit the Wembley Sanctum to inspect large vigrahams before ordering?',
      a: 'Yes. We welcome devotees and temple trustees by appointment at our Wembley Sanctum & Logistics Hub (London, UB2 / HA9 area). You may personally examine the facial features (Nayanodharana), exact weight, casting density, and finish of our signature bronze and stone vigrahams before finalizing your order. Call +44 (0) 20 8574 9120 or email care@giriuk.co.uk to reserve a viewing.'
    }
  ];

  return (
    <div className="w-full bg-[#FCF9F2]">
      {/* 1. Top Editorial Header & Breadcrumbs Section */}
      <section className="w-full bg-[#f6f3ec] py-8 border-b border-[#e5e2db]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Bar */}
          <nav className="flex items-center gap-2 text-xs text-stone-500 mb-4">
            <button onClick={onNavigateHome} className="hover:text-[#164E45] flex items-center gap-1 cursor-pointer">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <span>/</span>
            <span className="text-[#164E45] font-semibold">Idols &amp; Handicrafts</span>
          </nav>

          {/* Main Editorial Master Banner */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div className="max-w-3xl space-y-2">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-[#164E45]/10 text-[#164E45] text-[11px] font-bold uppercase tracking-widest">
                  Sacred Heritage Catalogue
                </span>
                <span className="text-[#745b22] font-serif text-base italic">
                  दिव्य विग्रह एवं प्राचीन शिल्पकला
                </span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#00362f] tracking-tight font-normal">
                Idols &amp; Sacred Handicrafts
              </h1>
              <p className="text-sm text-stone-600 leading-relaxed pt-1">
                Handcrafted lost-wax bronze, solid temple brass, black Krishna shila granite, certified Himalayan sphatik, and fragrant hand-carved wood vigrahams. Individually chiselled by 5th-generation hereditary <em className="font-serif not-italic text-[#745b22] font-medium">stapathis</em> of Swamimalai, Madurai, and Kumbakonam strictly conforming to the timeless canons of the <strong className="font-semibold text-stone-900">Shilpa Shastras</strong> and Agamic iconometry. Fully sanctified and inspected at our London Seva Sanctum.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <div className="p-4 rounded-xl bg-white shadow-xs flex items-center gap-3 border border-stone-200">
                <div className="w-10 h-10 rounded-full bg-[#164E45]/10 flex items-center justify-center text-[#164E45]">
                  <Sparkles className="w-5 h-5 text-[#B99A5B]" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-stone-900">530+ Vigrahams</span>
                  <span className="block text-[11px] text-stone-500">Conforming to Tala-mana rules</span>
                </div>
              </div>
              <a 
                href="#masterpieces" 
                className="px-6 py-3 rounded-full bg-[#164E45] hover:bg-[#00362f] text-white text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore Masterpieces</span>
                <ChevronDown className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Trust Badges Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white shadow-xs border border-stone-200">
              <div className="w-9 h-9 rounded-full bg-[#ffdea0]/60 flex items-center justify-center text-[#745b22] shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="block text-xs font-bold text-stone-900 truncate">100% Tala-mana Proportions</span>
                <span className="block text-[11px] text-stone-500 leading-tight">Shilpa Shastra verified</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-white shadow-xs border border-stone-200">
              <div className="w-9 h-9 rounded-full bg-[#ffdea0]/60 flex items-center justify-center text-[#745b22] shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="block text-xs font-bold text-stone-900 truncate">Lost-Wax &amp; Hand-Chiselled</span>
                <span className="block text-[11px] text-stone-500 leading-tight">Swamimalai artisanal casting</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-white shadow-xs border border-stone-200">
              <div className="w-9 h-9 rounded-full bg-[#ffdea0]/60 flex items-center justify-center text-[#745b22] shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="block text-xs font-bold text-stone-900 truncate">Double-Casket Transit Box</span>
                <span className="block text-[11px] text-stone-500 leading-tight">Reinforced shock-proof UK delivery</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-white shadow-xs border border-stone-200">
              <div className="w-9 h-9 rounded-full bg-[#ffdea0]/60 flex items-center justify-center text-[#745b22] shrink-0">
                <Eye className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="block text-xs font-bold text-stone-900 truncate">Wembley Sanctum Viewing</span>
                <span className="block text-[11px] text-stone-500 leading-tight">Private inspection by appointment</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Subcategory Visual Directory (Rich Bento Layout) */}
      <section className="w-full py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#745b22] block mb-1">
                Browse By Sacred Medium
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#00362f]">
                Curated Idol Traditions &amp; Materials
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 max-w-md">
              Explore by consecrated metallurgical casting, mountain-quarried shilas, or hand-planed sacred hardwoods crafted for sanctified home altars.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {bentoCategories.map((cat, idx) => (
              <div
                key={idx}
                className="group flex flex-col rounded-xl overflow-hidden bg-white shadow-xs hover:shadow-xl transition-all duration-300 border border-stone-200"
              >
                <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-[#00362f]/90 text-white text-[11px] font-bold backdrop-blur-xs">
                    {cat.count}
                  </span>
                </div>
                <div className="p-4 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-serif text-lg text-[#00362f] group-hover:text-[#745b22] transition-colors font-semibold">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-stone-600 mt-1 line-clamp-2">
                      {cat.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 flex items-center justify-between text-[#745b22] text-xs font-bold border-t border-stone-100">
                    <span>View Collection</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Filter & Interactive Sorting Toolbar */}
      <section className="w-full bg-[#f6f3ec] py-3 sticky top-36 z-20 border-y border-[#e5e2db] shadow-xs backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none text-xs">
            {['All Statues (530)', 'Solid Brass', 'Lost-Wax Bronze', 'Height: 15cm - 35cm', 'Temple Sanctum Size (>45cm)'].map((pill, i) => (
              <button
                key={i}
                onClick={() => setSelectedMedium(pill)}
                className={`px-3.5 py-1.5 rounded-full whitespace-nowrap cursor-pointer transition-colors font-semibold ${
                  selectedMedium === pill
                    ? 'bg-[#00362f] text-white shadow-xs'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                {pill}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 ml-auto text-xs">
            <div className="hidden sm:flex items-center gap-1.5 text-stone-600">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
              <span className="font-medium">London Dispatch Ready</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-stone-500 hidden md:inline">Sort:</span>
              <select className="px-3 py-1.5 rounded-full bg-white text-stone-800 text-xs focus:outline-none border border-stone-200 shadow-xs cursor-pointer">
                <option>Curated Highlights</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Height: Tallest First</option>
                <option>Heaviest Brass Cast</option>
                <option>Customer Rating</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured Masterpiece Collection (Product Grid) */}
      <section className="w-full py-12" id="masterpieces">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#745b22] block mb-1">
                Sanctum Highlight Castings
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#00362f]">
                Featured Sacred Vigrahams
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs text-stone-600">
              <ShieldCheck className="w-4 h-4 text-[#745b22]" />
              <span>Each piece includes physical Shilpa Shastra certificate of authenticity</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {masterpieceProducts.map((prod) => {
              const isWish = wishlist.some(w => w.id === prod.id);
              const is360 = active360 === prod.id;

              return (
                <div
                  key={prod.id}
                  className="group flex flex-col rounded-xl overflow-hidden bg-white shadow-xs hover:shadow-xl transition-all duration-300 border border-stone-200"
                >
                  <div className="relative h-80 w-full overflow-hidden bg-[#FAF7F0] p-4 flex items-center justify-center">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className={`w-full h-full object-contain transition-transform duration-500 ${
                        is360 ? 'rotate-12 scale-110' : 'group-hover:scale-105'
                      }`}
                    />

                    {/* 360 View Indicator */}
                    <button
                      type="button"
                      onClick={() => setActive360(is360 ? null : prod.id)}
                      className={`absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold shadow-xs flex items-center gap-1 transition-colors cursor-pointer ${
                        is360 ? 'bg-[#00362f] text-white' : 'bg-white/90 text-[#00362f] hover:bg-[#00362f] hover:text-white'
                      }`}
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{is360 ? 'Reset Angle' : 'View 360° Angle'}</span>
                    </button>

                    {/* Wishlist Floating Icon */}
                    <button
                      type="button"
                      onClick={() => onToggleWishlist({
                        id: prod.id,
                        name: prod.name,
                        category: 'Idols & Handicrafts',
                        subcategory: prod.lineage,
                        sku: prod.sku,
                        price: prod.price,
                        inStock: true,
                        stockCount: 10,
                        rating: prod.rating,
                        reviewCount: prod.reviews,
                        image: prod.image,
                        description: prod.desc
                      })}
                      className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow-xs transition-all cursor-pointer ${
                        isWish ? 'bg-red-50 text-red-600' : 'bg-white/90 text-stone-500 hover:text-red-600 hover:scale-110'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isWish ? 'fill-red-600' : ''}`} />
                    </button>

                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-[#00362f] text-white text-[11px] font-bold">
                      {prod.tag}
                    </span>
                  </div>

                  <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs text-stone-500">
                        <span className="text-[#745b22] font-semibold">{prod.tag}</span>
                        <span>{prod.lineage}</span>
                      </div>

                      <h3 className="font-serif text-lg font-bold text-[#00362f] group-hover:text-[#745b22] transition-colors">
                        {prod.name}
                      </h3>

                      <p className="text-xs text-stone-600 line-clamp-2">
                        {prod.desc}
                      </p>

                      <div className="flex items-center gap-2 pt-1 text-[11px] text-stone-500">
                        <span className="px-2 py-0.5 rounded bg-stone-100">{prod.height}</span>
                        <span className="px-2 py-0.5 rounded bg-stone-100">{prod.weight}</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold">● In UK Stock</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-4">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-stone-400">UK VAT Inc.</span>
                        <span className="font-mono text-xl font-bold text-[#00362f]">
                          £{prod.price.toFixed(2)}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleAdd(prod)}
                        className={`flex-1 py-2.5 px-4 rounded-full font-bold text-xs transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer ${
                          addedIds[prod.id] 
                            ? 'bg-emerald-700 text-white' 
                            : 'bg-[#164E45] hover:bg-[#00362f] text-white hover:shadow-md'
                        }`}
                      >
                        {addedIds[prod.id] ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Added to Cart</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-4 h-4 text-[#ffdb96]" />
                            <span>Add to Cart</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Artisan Lineage & Transit Assurance Storytelling Block */}
      <section className="w-full bg-[#f6f3ec] py-12 border-t border-[#e5e2db]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Story Card 1 */}
            <div className="p-8 rounded-2xl bg-white shadow-xs border border-stone-200 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#745b22] text-xs font-bold uppercase tracking-widest">
                  <Sparkles className="w-4 h-4" />
                  <span>Living Heritage Documentation</span>
                </div>
                <h3 className="font-serif text-2xl text-[#00362f]">
                  The Living Hands of Swamimalai
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Every bronze vigraham in our sacred vault is birthed through the ancient <strong className="font-semibold text-stone-900">cire-perdue</strong> (lost-wax) technique, practiced continuously on the banks of the sacred Kaveri river since the Chola Dynasty (9th Century CE).
                </p>

                <div className="space-y-2 pt-2 text-xs text-stone-600">
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#164E45] shrink-0 mt-0.5" />
                    <p>
                      <strong className="text-stone-900 font-semibold">Shilpa Shastra Adherence:</strong> Scaled according to <em className="font-serif text-[#745b22]">Dasa-Tala</em> measurement canons transcribed in the Brihat Samhita and Manasara treatises.
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#164E45] shrink-0 mt-0.5" />
                    <p>
                      <strong className="text-stone-900 font-semibold">Single Unique Casts:</strong> Because the bees-wax model melts away during casting, each vigraham possesses unique individual character, chiselled by hand for over 40 hours.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#ffdea0]/60 flex items-center justify-center text-[#745b22]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-stone-900">GI Tagged Authenticity</span>
                    <span className="block text-[11px] text-stone-500">Swamimalai Geographical Indication</span>
                  </div>
                </div>
                <button onClick={onOpenOnDemand} className="text-[#745b22] text-xs font-bold hover:underline cursor-pointer">
                  Custom Commission →
                </button>
              </div>
            </div>

            {/* Story Card 2 */}
            <div className="p-8 rounded-2xl bg-[#00362f] text-white shadow-xs flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#ffdea0] text-xs font-bold uppercase tracking-widest">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Sanctum Devotee Assurance</span>
                </div>
                <h3 className="font-serif text-2xl text-[#ffdea0]">
                  Double-Casket Transit Guarantee
                </h3>
                <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                  We recognize that an idol is not mere decor, but a living focus of worship (<em className="italic">Prana Pratishtha</em> vessel). Transporting heavy brass and sacred granite deities across the UK and Europe requires reverent, military-grade protection.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-[#164e45] text-white">
                    <h4 className="text-xs font-bold text-[#ffdea0]">Inner Velvet &amp; Saffron</h4>
                    <p className="text-[11px] text-stone-200 mt-1">Wrapped in unblemished saffron textile with custom foam molding contouring all mudras.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#164e45] text-white">
                    <h4 className="text-xs font-bold text-[#ffdea0]">Timber Casket Reinforce</h4>
                    <p className="text-[11px] text-stone-200 mt-1">Murtis exceeding 20cm are secured in rigid shock-absorbing double-wall wooden frames.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <span className="text-stone-300">
                  <strong className="text-white">100% Zero-Breakage Guarantee:</strong> Full immediate London sanctum replacement.
                </span>
                <button onClick={onOpenOnDemand} className="px-5 py-2 rounded-full bg-[#cca730] text-[#002b25] font-bold hover:bg-[#b89528] cursor-pointer">
                  Commission Idol
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Devotee FAQ Accordion */}
      <section className="w-full py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#745b22]">
              Pooja Room &amp; Agamic Guidance
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#00362f]">
              Frequently Asked Devotee Questions
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Practical advice from our Vedic consultants regarding altar placement, material sanctity, and viewing arrangements.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;

              return (
                <div key={idx} className="rounded-xl bg-white shadow-xs border border-stone-200 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 font-serif text-base text-[#00362f] hover:text-[#745b22] transition-colors cursor-pointer"
                  >
                    <span className="font-semibold">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-[#745b22] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                      <p>{faq.a}</p>
                    </div>
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
