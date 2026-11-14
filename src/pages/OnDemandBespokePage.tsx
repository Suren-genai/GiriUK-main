import React, { useState } from 'react';
import { 
  Home, 
  ChevronRight, 
  ShieldCheck, 
  Truck, 
  Tag, 
  CheckCircle, 
  Check, 
  Send, 
  Phone, 
  MessageCircle, 
  Calendar, 
  Upload, 
  ArrowRight,
  ChevronDown,
  Sparkles,
  Award
} from 'lucide-react';
import { OnDemandRequest } from '../types';

interface OnDemandBespokePageProps {
  onNavigateHome: () => void;
  onSubmitRequest: (req: OnDemandRequest) => void;
}

export const OnDemandBespokePage: React.FC<OnDemandBespokePageProps> = ({
  onNavigateHome,
  onSubmitRequest
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    postcode: '',
    sanctuaryType: 'Private Home Mandir',
    deityForm: '',
    medium: '',
    dimensions: '',
    finish: 'Antique Temple Patina',
    deadline: '',
    budget: '£300 – £600',
    notes: '',
    wembleyViewing: true
  });

  const [submittedRequest, setSubmittedRequest] = useState<OnDemandRequest | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const archetypes = [
    {
      id: 'arch-nat',
      name: 'Ananda Tandava Nataraja',
      badge: 'Temple Bronze',
      priceFrom: 'From £480',
      heightRange: 'Height Range: 45cm – 120cm',
      medium: 'Lost-Wax Bronze / Ashtadhatu',
      lineage: 'Swamimalai Guild',
      leadTime: '4–6 Weeks UK',
      deityVal: 'Shiva Nataraja',
      mediumVal: 'Lost-Wax Traditional Bronze (Vengalam)',
      dimVal: '30cm–45cm (Standard Home Mandir)',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAE97YxXciP1JXmrcFMYtzsj0bA9Resl2E9H5OYok9l7TwbncLzmXjrIGElJKI5AaJbuPc_zs4fVX4SdQi1gadBay9xr0Yumj-OUJJ2mE5AYJ8bGghnEHr_-OxXtm64A7PTwHb_uWEnHTHaw3OUsc-NYDYie_yaC6h9BsnWfkVFScy15RQPE82PtE-JRS8SoXTe856kRNpllaALcEGcxMa3hAPj1AL-f7jzW2WJsrB'
    },
    {
      id: 'arch-gan',
      name: 'Sri Maha Ganapati',
      badge: 'Temple Brass',
      priceFrom: 'From £320',
      heightRange: 'Height Range: 30cm – 90cm',
      medium: 'Solid Temple Brass / Antique Patina',
      lineage: 'Kumbakonam Sthapatis',
      leadTime: '3–4 Weeks UK',
      deityVal: 'Lord Ganesha',
      mediumVal: 'Solid Temple Brass (Pithalai)',
      dimVal: '30cm–45cm (Standard Home Mandir)',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkzo6WZ8eoq5_UDOtROYM-nZf14muJbdSX0r_7mNz3WFKLHhwRaGmwJr1iyIqb1LHnmDXrJ2qfBEkRyxXzF9pE3I5TNsinIfGDqCgxx0e-e37GAmtoK1lYo4Cqs6S-o7KxKUgwLcupzkr0nGGxSfUERlEx-yes8aRHR3xVdPkmm6WdVuyI4qHA2KMFDciRbku7Zcfk2TYT5Nr1yC663kwTMqVpaWMurSqaQ6grKcid'
    },
    {
      id: 'arch-bal',
      name: 'Sri Venkateswara Balaji',
      badge: 'Black Granite',
      priceFrom: 'From £750',
      heightRange: 'Height Range: 60cm – 150cm',
      medium: 'Black Granite (Krishna Shila)',
      lineage: 'Kanchipuram Stone Guild',
      leadTime: '6–8 Weeks UK',
      deityVal: 'Balaji / Venkateswara',
      mediumVal: 'Black Granite (Krishna Shila Stone)',
      dimVal: '60cm–90cm (Large Sanctum)',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACbE6BedisKVJniYIzohu0FIE5YeWiSEVpmFkE95dLACCKV2SX8yYlslfSE9v1mARvs94ydEdiAEI6b4twfjicgix62P_AcZDapMq2_5BD8_SkBzdlBb6Wd_lWB3BBGwaI-A7CE6ABjClHOXjWmZS0wRcY5uE-4BHqjwp8yH_PqJt8uVq4qVEr1sj7qLtQOTzhetxFqPmTQI0fCIrjuKauq6j0Mc4NcaQaS_klChTZ'
    },
    {
      id: 'arch-lal',
      name: 'Sri Lalitha Meru Peedam',
      badge: 'Panchaloha Sacred',
      priceFrom: 'From £540',
      heightRange: 'Height Range: 25cm – 50cm',
      medium: 'Panchaloha / 24K Gold Foil',
      lineage: 'Tanjore Agama Artisans',
      leadTime: '4–5 Weeks UK',
      deityVal: 'Devi / Durga / Lakshmi',
      mediumVal: 'Panchaloha (5-Metal Sacred Alloy)',
      dimVal: '30cm–45cm (Standard Home Mandir)',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKoBMhS1S37d3L7a9OE3qgtAurxDbwlLiK0PErSasVkDzf4GK0v_GICbk4hPs6vaDZvUIplmuMi-yOXwEcSlOBG5lHZAsS0TDd8YhrPQr8jDw8ABh3phNv8Rtgn0GeCGgU_9sEUgc1qnUvKjI55RWfbS1Z5NhW-AKxse8Jc1Qm-pgi4bkpRYxReDqf8lA57gG8LKABT7x5fGfWomu7HgXw44UzbYAJ0RWwGV4PQlpm'
    },
    {
      id: 'arch-rad',
      name: 'Radha Krishna Yugala Murti',
      badge: 'Temple Brass',
      priceFrom: 'From £420',
      heightRange: 'Height Range: 40cm – 80cm',
      medium: 'Polished Temple Brass',
      lineage: 'Mathura-Swamimalai Fusion',
      leadTime: '4–6 Weeks UK',
      deityVal: 'Radha Krishna',
      mediumVal: 'Solid Temple Brass (Pithalai)',
      dimVal: '30cm–45cm (Standard Home Mandir)',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYFqmP0_gNQ-QE9AyO8kX2CkEK6W1ByYJy4WdiTPh_x6s0jwa3pavhMefM_MbRK7bK04l3bPNE8ncMdHgVBtlLdX4BUf4bg3BrMqOOWyWJCvHRAd-kHcxuQTU57TjZWmJI1qieAH3DJ0oE6Rcs2nI1uFHkjv8jAAbbHhmmZoZsC0wM1G2EFC3S_tVNRVxCTmT4dYOQ7RYK0sn38K2wpBWyvKqZqj7AgZ4-cMMvFKFz'
    },
    {
      id: 'arch-pra',
      name: 'Custom Mandir Prabhavali',
      badge: 'Sanctum Archway',
      priceFrom: 'From £390',
      heightRange: 'Custom Dimensions • Built to Order',
      medium: 'Hand-beaten Brass / Copper',
      lineage: 'Temple Mandir Guild',
      leadTime: '3–5 Weeks UK',
      deityVal: 'Other',
      mediumVal: 'Solid Temple Brass (Pithalai)',
      dimVal: '60cm–90cm (Large Sanctum)',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSOFndpphwZyzYhhkFQrQsI8n5ws0rLdQoRNtqnKTPGfnUYma_HQjdDsKU1G5A2IHUJfUujwtvtHgbME87f3sa4o0L0r52T0UPZS6d0wKr5qDI1TrgiHWBVZz9TIrzaWFfg7mnqF3AWmiW4wwuLSxS-WVkNdjL4VlSy5ZzVwNCmGOG9uRsKIqMroYecdymrddMDw-j_kx_sN4YaGVAPlNVwz_At2S33jDGaFJ5zvUC'
    }
  ];

  const handleSelectArchetype = (arch: typeof archetypes[0]) => {
    setFormData(prev => ({
      ...prev,
      deityForm: arch.deityVal,
      medium: arch.mediumVal,
      dimensions: arch.dimVal
    }));
    const el = document.getElementById('commission-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReq: OnDemandRequest = {
      id: `bespoke-${Date.now()}`,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      itemCategory: `Bespoke Murti: ${formData.deityForm} (${formData.medium})`,
      productDescription: `${formData.sanctuaryType} | ${formData.dimensions} | Finish: ${formData.finish} | Target: ${formData.deadline || 'N/A'}. Notes: ${formData.notes}`,
      approximateBudget: formData.budget,
      neededByDate: formData.deadline,
      status: 'Received',
      createdAt: new Date().toISOString().split('T')[0]
    };

    onSubmitRequest(newReq);
    setSubmittedRequest(newReq);
    const alertBox = document.getElementById('formSuccessAlert');
    if (alertBox) alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  const faqs = [
    {
      q: 'What is Panchaloha and why is it recommended for vigrahams?',
      a: 'Panchaloha is a sacred traditional five-metal alloy consisting of Copper (chembu), Brass (pithalai), Zinc, Silver, and trace Gold. According to the Shilpa Shastras, this specific metallurgical combination holds high pranic conductivity and electro-magnetic resonance, making it the ideal medium for deity vigrahams intended for daily abhishekam and temple worship.'
    },
    {
      q: 'Can I request custom astrological or muhurtham-aligned casting times?',
      a: 'Yes. Many devotees require the molten metal to be poured during specific auspicious nakshatras, tithis, or muhurthams (such as Brahma Muhurtham or Guru Pushya Yoga). If provided during initial consultation, our master stapathis in Tamil Nadu schedule the crucible melting ceremony precisely within your chosen planetary window.'
    },
    {
      q: 'How are large murtis transported and installed across the UK?',
      a: 'Every commissioned vigraham is enclosed in custom ISPM-15 certified wooden transit crates with contoured high-density cushioning to protect sacred mudras, limbs, and prabhavalis. For vigrahams exceeding 60cm or 35kg, GIRI UK provides dedicated two-person white-glove transport directly to your designated mandir room, uncrating and positioning the deity with devotional reverence.'
    },
    {
      q: 'Is there an advance deposit required before wax sculpting begins?',
      a: 'Following mutual agreement on the shastric proposal and quote, a 40% sanctum deposit is placed to initiate beeswax modeling and allocation of master artisans. The intermediate 30% milestone is payable upon your photo and 360-video approval of the wax model, with the remaining balance settled upon physical UK inspection before final home dispatch.'
    },
    {
      q: 'Can I inspect the vigraham at the Wembley Sanctuary before final payment?',
      a: 'Absolutely. Once air freight clearance is completed and the crate reaches our Wembley facility, devotees are warmly invited to book a private sanctum viewing. You may inspect the craftsmanship, verify iconometric measurements, and even perform initial darshan or archana prior to home mandir installation.'
    }
  ];

  return (
    <div className="w-full bg-[#FCF9F2]">
      {/* 1. BREADCRUMBS & EDITORIAL HERO */}
      <section className="w-full bg-[#f6f3ec] px-4 sm:px-6 lg:px-8 py-8 border-b border-[#e5e2db]">
        <div className="max-w-[1320px] mx-auto">
          <nav className="flex items-center gap-2 text-xs text-stone-500 uppercase tracking-wider mb-6">
            <button onClick={onNavigateHome} className="hover:text-[#164E45] flex items-center gap-1 cursor-pointer">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <span>/</span>
            <span>On Demand</span>
            <span>/</span>
            <span className="text-[#164E45] font-bold">Custom Murti &amp; Sacred Art Request</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ffdb96] text-[#795f26] text-xs font-bold uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4 text-[#745b22]" />
                <span>Sacred Heritage Craft • Swamimalai &amp; Kumbakonam Lineage</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#00362f] font-medium tracking-tight leading-tight">
                Bespoke Murti Commissions &amp; <span className="italic text-[#745b22] font-normal">Sacred Vigrahams</span>
              </h1>

              <p className="text-sm sm:text-base text-stone-600 max-w-2xl leading-relaxed">
                Commission custom temple-grade bronze, brass, panchaloha, and black granite vigrahams handcrafted according to authentic Shilpa Shastras by hereditary South Indian stapathis. Fully managed UK importation, transit-safe sacred packaging, and personal inspection at our Wembley Sanctum.
              </p>

              {/* 4 Shastric Guarantees */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
                <div className="bg-white p-3 rounded-lg shadow-xs border border-stone-200">
                  <span className="text-xs font-bold text-stone-900 block">100% Shastric Iconometry</span>
                  <span className="text-[11px] text-stone-500">Dhyana Sloka Canons</span>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-xs border border-stone-200">
                  <span className="text-xs font-bold text-stone-900 block">Madhuchehishtavidhana</span>
                  <span className="text-[11px] text-stone-500">Lost-Wax Bronze Casting</span>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-xs border border-stone-200">
                  <span className="text-xs font-bold text-stone-900 block">UK White-Glove</span>
                  <span className="text-[11px] text-stone-500">Padded Sanctum Delivery</span>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-xs border border-stone-200">
                  <span className="text-xs font-bold text-stone-900 block">Zero Customs Levies</span>
                  <span className="text-[11px] text-stone-500">Pre-Cleared UK Clearance</span>
                </div>
              </div>
            </div>

            {/* Hero Visual Frame */}
            <div className="lg:col-span-5 relative">
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl border border-stone-200">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtguIUGdguSqANrmRYriVZRsPOdhgXgEcPr-fvpNY2CxgC74rwJObiSIqrybK7-0rkARrV0A6KkWX57NCeYtE8kcHRmyZJMkpwzgsR8a77xSzd2PogmXT2mRSsouZR1pnKAOLPmq7OoAe4FXRWw7odudehpi-Naqbd5WG72zKDOoxWEv_rKrIYbioIU2dO8fbqCMTAG9O6JW-D-h_EVEeG0RcgLPyTn3TKg7KmA06Q"
                  alt="Master stapathi artisan chiseling bronze idol"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#00362f]/90 via-[#00362f]/30 to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-[11px] uppercase tracking-widest text-[#ffdea0] font-bold">Swamimalai GI Heritage Cluster</span>
                  <h3 className="font-serif text-xl font-semibold mt-1">Conducted by Master Stapathis</h3>
                  <p className="text-xs text-stone-200 mt-1">Every vigraham cast in adherence to Agamic proportions, ensuring divine presence (Sannidhyam).</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MASTERPIECE COMMISSIONS ARCHETYPES */}
      <section className="w-full py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1320px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-[#745b22] text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-4 h-4 text-[#cca730]" />
                <span>Canonical Expressions</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#00362f] font-medium mt-1">
                Masterpiece Commission Archetypes
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 max-w-xl mt-1">
                Select a classic temple iconometry archetype below to pre-populate your commission dossier, or submit an entirely custom bespoke deity request.
              </p>
            </div>
            <a href="#commission-form" className="inline-flex items-center gap-1.5 text-[#164E45] text-xs font-bold hover:underline">
              <span>Go straight to custom request form</span>
              <ChevronDown className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {archetypes.map((arch) => (
              <div
                key={arch.id}
                className="bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all border border-stone-200 flex flex-col justify-between group"
              >
                <div className="relative h-64 bg-[#FAF7F0] overflow-hidden">
                  <img
                    src={arch.image}
                    alt={arch.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#00362f]/90 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs">
                    {arch.badge}
                  </div>
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/95 text-[#00362f] text-xs font-bold shadow-xs">
                    {arch.priceFrom}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-[#164E45] transition-colors">
                      {arch.name}
                    </h3>
                    <p className="text-xs font-bold text-[#745b22] uppercase tracking-wider mt-0.5">
                      {arch.heightRange}
                    </p>
                    <div className="mt-4 space-y-1.5 text-xs text-stone-600">
                      <div className="flex justify-between">
                        <span className="text-stone-400">Medium:</span>
                        <span className="font-semibold text-stone-800">{arch.medium}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-400">Lineage:</span>
                        <span className="font-semibold text-stone-800">{arch.lineage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-400">Lead Time:</span>
                        <span className="font-semibold text-stone-800">{arch.leadTime}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelectArchetype(arch)}
                    className="w-full py-2.5 px-4 rounded-full bg-[#f6f3ec] hover:bg-[#164E45] text-[#164E45] hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>Select for Commission Request</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 4-STEP DEVOTIONAL COMMISSION WORKFLOW */}
      <section className="w-full bg-[#f6f3ec] py-12 px-4 sm:px-6 lg:px-8 border-y border-[#e5e2db]">
        <div className="max-w-[1320px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#745b22]">Sacred Journey</span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#00362f]">
              The 4-Step Devotional Commission Workflow
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              From ancient Vedic iconometry formulas to your home mandir in the United Kingdom, every stage is documented with photographic updates and shastric adherence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '1',
                title: 'Devotee Intent & Consultation',
                desc: 'Share your sanctum dimensions, preferred deity form, and posture. Our London sevaks review your request against traditional Shilpa Shastra proportions (Talamana system).',
                meta: '24-48 Hours Initial Dossier'
              },
              {
                step: '2',
                title: 'Wax Model & Carving Approval',
                desc: 'Receive 4K high-resolution photographs and 360° video footage of the handcrafted beeswax model sculpted by Master Stapathis prior to casting. Devotee approvals collected before metal pour.',
                meta: 'Devotee Sign-Off Mandatory'
              },
              {
                step: '3',
                title: 'Sacred Casting & Chiseling',
                desc: 'Pouring of molten panchaloha or temple brass alloy in consecrated conditions. Post-cooling, stapathis execute fine chiseled detailing of the deity\'s facial features and ritual attributes.',
                meta: 'Hand-Chiseled Eyes & Mudras'
              },
              {
                step: '4',
                title: 'London Inspection & Delivery',
                desc: 'Dispatched via air freight to our London Wembley Depot with zero UK customs fees. Devotees may inspect the murti in person before white-glove courier dispatch to your home mandir.',
                meta: 'Wembley Sanctum Viewing'
              }
            ].map((st, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-xs border border-stone-200 flex flex-col justify-between space-y-4">
                <div>
                  <div className="w-10 h-10 rounded-full bg-[#164e45] text-white font-serif text-lg flex items-center justify-center font-bold mb-3">
                    {st.step}
                  </div>
                  <h3 className="font-serif text-base font-bold text-stone-900">{st.title}</h3>
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed">{st.desc}</p>
                </div>
                <div className="pt-3 border-t border-stone-100 text-[11px] font-bold text-[#745b22] uppercase">
                  ✓ {st.meta}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ON-DEMAND COMMISSION REQUEST SUBMISSION FORM */}
      <section className="w-full py-12 px-4 sm:px-6 lg:px-8" id="commission-form">
        <div className="max-w-[1320px] mx-auto">
          <div className="bg-[#f6f3ec] rounded-2xl shadow-xl overflow-hidden border border-[#e5e2db]">
            <div className="bg-[#00362f] text-white p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#ffdea0]">
                  Confidential Vedic Commission Dossier
                </span>
                <h2 className="font-serif text-2xl font-medium mt-1">Submit Custom Murti Commission Request</h2>
                <p className="text-xs text-stone-300 mt-1">
                  Provide your details and sanctuary specifications below. Our London Vedic Arts team will contact you within 1 business day.
                </p>
              </div>
              <div className="flex items-center gap-3 bg-[#164e45] px-4 py-2.5 rounded-xl shrink-0">
                <ShieldCheck className="w-6 h-6 text-[#ffdea0]" />
                <div className="text-xs text-white">
                  <div className="font-bold">Zero Duty / Handled by GIRI UK</div>
                  <div className="text-[10px] text-stone-300">Registered in England &amp; Wales</div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-8 text-xs">
              {/* Section A: Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#00362f] text-white font-bold flex items-center justify-center text-xs">A</span>
                  <h3 className="font-serif text-base font-bold text-[#00362f]">Devotee &amp; Sanctum Contact Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-stone-700 font-bold mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Smt. Lakshmi Ramanathan"
                      className="w-full px-3 py-2.5 rounded-lg bg-white border border-stone-300 focus:outline-none focus:border-[#164E45]"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-bold mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="devotee@example.co.uk"
                      className="w-full px-3 py-2.5 rounded-lg bg-white border border-stone-300 focus:outline-none focus:border-[#164E45]"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-bold mb-1">UK Contact / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+44 7700 900000"
                      className="w-full px-3 py-2.5 rounded-lg bg-white border border-stone-300 focus:outline-none focus:border-[#164E45]"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-bold mb-1">Postcode / UK Delivery Region *</label>
                    <input
                      type="text"
                      required
                      value={formData.postcode}
                      onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                      placeholder="e.g. HA9 7NE (Greater London)"
                      className="w-full px-3 py-2.5 rounded-lg bg-white border border-stone-300 focus:outline-none focus:border-[#164E45]"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-stone-700 font-bold mb-1">Sanctuary Type / Installation Context</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {['Private Home Mandir', 'Community Temple Sanctum', 'Cultural Institution / Hall'].map((type) => (
                        <label key={type} className="flex items-center gap-2 p-2.5 bg-white rounded-lg border border-stone-200 cursor-pointer">
                          <input
                            type="radio"
                            name="sanctuaryType"
                            checked={formData.sanctuaryType === type}
                            onChange={() => setFormData({ ...formData, sanctuaryType: type })}
                            className="text-[#164E45]"
                          />
                          <span className="text-stone-800 font-medium">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section B: Deity Specs */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#00362f] text-white font-bold flex items-center justify-center text-xs">B</span>
                  <h3 className="font-serif text-base font-bold text-[#00362f]">Deity &amp; Artistic Specifications</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-stone-700 font-bold mb-1">Primary Deity Form *</label>
                    <select
                      required
                      value={formData.deityForm}
                      onChange={(e) => setFormData({ ...formData, deityForm: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg bg-white border border-stone-300 focus:outline-none"
                    >
                      <option value="">Select deity form...</option>
                      <option value="Lord Ganesha">Sri Maha Ganapati / Vinayaka</option>
                      <option value="Shiva Nataraja">Lord Shiva (Nataraja / Lingam / Dakshinamurthy)</option>
                      <option value="Balaji / Venkateswara">Sri Venkateswara Balaji / Padmavathi</option>
                      <option value="Devi / Durga / Lakshmi">Divine Mother (Lalitha, Durga, Lakshmi, Saraswati)</option>
                      <option value="Radha Krishna">Radha Krishna / Laddu Gopal</option>
                      <option value="Murugan / Karthikeya">Lord Murugan / Subrahmanya</option>
                      <option value="Other">Other Bespoke Form</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-700 font-bold mb-1">Preferred Sacred Medium *</label>
                    <select
                      required
                      value={formData.medium}
                      onChange={(e) => setFormData({ ...formData, medium: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg bg-white border border-stone-300 focus:outline-none"
                    >
                      <option value="">Select medium...</option>
                      <option value="Panchaloha (5-Metal Sacred Alloy)">Panchaloha (5-Metal Sacred Alloy)</option>
                      <option value="Solid Temple Brass (Pithalai)">Solid Temple Brass (Pithalai)</option>
                      <option value="Lost-Wax Traditional Bronze (Vengalam)">Lost-Wax Traditional Bronze (Vengalam)</option>
                      <option value="Black Granite (Krishna Shila Stone)">Black Granite (Krishna Shila Stone)</option>
                      <option value="Seasoned Burma Teak / Rosewood">Seasoned Burma Teak / Rosewood</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-700 font-bold mb-1">Height &amp; Sanctum Dimensions *</label>
                    <select
                      required
                      value={formData.dimensions}
                      onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg bg-white border border-stone-300 focus:outline-none"
                    >
                      <option value="">Select height bracket...</option>
                      <option value="15cm–25cm (Altar Size)">15cm – 25cm (Compact Altar / Traveling Vigraham)</option>
                      <option value="30cm–45cm (Standard Home Mandir)">30cm – 45cm (Standard Home Mandir Sanctum)</option>
                      <option value="60cm–90cm (Large Sanctum)">60cm – 90cm (Large Mandir / Hall Sanctum)</option>
                      <option value="100cm+ (Temple Grade)">100cm+ (Temple Grade / White-Glove Delivery)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-700 font-bold mb-1">Artistic Surface Finish</label>
                    <select
                      value={formData.finish}
                      onChange={(e) => setFormData({ ...formData, finish: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg bg-white border border-stone-300 focus:outline-none"
                    >
                      <option value="Antique Temple Patina">Antique Temple Patina (Dark Earthy Luster)</option>
                      <option value="Traditional Warm Brass">Traditional Warm Brass (Golden Glow)</option>
                      <option value="High-Polish Sacred Gold">High-Polish Radiant Sacred Gold</option>
                      <option value="24K Gold Leaf Accents">24K Gold Leaf Accents / Gilded Details</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-700 font-bold mb-1">Auspicious Target Date / Muhurtham</label>
                    <input
                      type="text"
                      value={formData.deadline}
                      onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                      placeholder="e.g., Grihapravesham (Oct 2026), Diwali, or No Rush"
                      className="w-full px-3 py-2.5 rounded-lg bg-white border border-stone-300 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-bold mb-1">Indicative Budget Guidance (£ GBP)</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg bg-white border border-stone-300 focus:outline-none"
                    >
                      <option value="£300 – £600">£300 – £600 (Compact &amp; Medium Home Murtis)</option>
                      <option value="£600 – £1,200">£600 – £1,200 (Substantial Bronze / Panchaloha)</option>
                      <option value="£1,200 – £2,500">£1,200 – £2,500 (Large Sanctum Vigrahams)</option>
                      <option value="£2,500+">£2,500+ (Temple Consecrations / Monumental)</option>
                    </select>
                  </div>

                  <div className="md:col-span-2 lg:col-span-3">
                    <label className="block text-stone-700 font-bold mb-1">
                      Specific Posture, Vahana, Weapons &amp; Dhyana Sloka Requirements
                    </label>
                    <textarea
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Detail any specific attributes (e.g. Chaturbhuja posture, Chin Mudra, specific weapon iconography, prabhavali motifs, or peedam inscription details)..."
                      className="w-full px-3 py-2.5 rounded-lg bg-white border border-stone-300 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Section C: Submission */}
              <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.wembleyViewing}
                    onChange={(e) => setFormData({ ...formData, wembleyViewing: e.target.checked })}
                    className="w-4 h-4 text-[#164E45] rounded"
                  />
                  <span className="text-stone-700">
                    <strong>Private London Wembley Viewing:</strong> I would like to inspect the final vigraham in Wembley before home dispatch.
                  </span>
                </label>

                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-full bg-[#164E45] hover:bg-[#00362f] text-white font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <span>Submit Sacred Murti Commission Request</span>
                  <ArrowRight className="w-4 h-4 text-[#ffdb96]" />
                </button>
              </div>

              {submittedRequest && (
                <div id="formSuccessAlert" className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif text-base font-bold">Pranams! Your Commission Request has been Received ({submittedRequest.id.toUpperCase()})</h4>
                    <p className="mt-0.5 text-xs text-emerald-800">
                      Our London Vedic Art advisors will review your submission and contact you within 1 business day with shastric recommendations and a transparent quotation.
                    </p>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* 5. DEVOTEE GUIDANCE & BESPOKE MURTI FAQ */}
      <section className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-[#f6f3ec] border-t border-[#e5e2db]">
        <div className="max-w-[1320px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#745b22]">Devotee Counsel</span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#00362f]">Frequently Asked Questions</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;

              return (
                <div key={i} className="bg-white rounded-xl p-4 shadow-xs border border-stone-200">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between text-left cursor-pointer"
                  >
                    <span className="font-serif text-base font-bold text-[#00362f]">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-[#745b22] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="pt-3 mt-3 border-t border-stone-100 text-xs sm:text-sm text-stone-600 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. DIRECT ASSISTANCE HOTLINE BANNER */}
      <section className="w-full bg-[#00362f] text-white py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1320px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white text-[#00362f] flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6 text-[#745b22]" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#ffdea0] uppercase">Direct Seva Desk • London Wembley</span>
              <h3 className="font-serif text-xl sm:text-2xl mt-0.5">Planning an Urgent Grihapravesham or Temple Prana Pratishtha?</h3>
              <p className="text-xs text-stone-300">Speak directly with our UK Vedic Art commissioners for expedited schedules.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a href="tel:+442089038920" className="px-5 py-2.5 rounded-full bg-white text-[#00362f] text-xs font-bold hover:bg-[#ffdea0] transition-colors">
              +44 20 8903 8920
            </a>
            <a href="https://wa.me/447700900821" target="_blank" rel="noreferrer" className="px-5 py-2.5 rounded-full bg-[#cca730] text-[#002b25] text-xs font-bold hover:bg-[#b89528] transition-colors flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Seva Desk</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
