import React from 'react';
import { 
  Home, 
  ChevronRight, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  BookOpen, 
  Award, 
  Heart, 
  Truck, 
  Star, 
  ArrowRight,
  ChevronDown
} from 'lucide-react';

interface AboutHeritageStoryPageProps {
  onNavigateHome: () => void;
  onExploreCatalog: () => void;
}

export const AboutHeritageStoryPage: React.FC<AboutHeritageStoryPageProps> = ({
  onNavigateHome,
  onExploreCatalog
}) => {
  return (
    <div className="w-full bg-[#FCF9F2]">
      {/* 1. Top Breadcrumb & Sacred Indicator */}
      <section className="w-full bg-[#f6f3ec] py-3 border-b border-[#e5e2db]">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs">
          <nav className="flex items-center gap-2 text-stone-500">
            <button onClick={onNavigateHome} className="hover:text-[#164E45] flex items-center gap-1 cursor-pointer">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <span>/</span>
            <span>About GIRI UK</span>
            <span>/</span>
            <span className="text-[#164E45] font-semibold">Our Heritage &amp; Story</span>
          </nav>
          <div className="hidden sm:flex items-center gap-2 text-[#745b22] font-bold uppercase tracking-wider text-[11px]">
            <Award className="w-3.5 h-3.5" />
            <span>Seven Decades of Dharma • 1953 – 2026</span>
          </div>
        </div>
      </section>

      {/* 2. Hero Section */}
      <section className="relative w-full py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 self-start bg-[#ffdea0]/60 text-[#745b22] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ESTABLISHED 1953 • CHENNAI TO THE BRITISH ISLES</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#00362f] tracking-tight leading-tight">
                Nurturing Sanatana Dharma, Sacred Arts &amp; Vedic Culture for the UK &amp; Europe
              </h1>

              <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl">
                For over seven decades, GIRI has preserved authentic Indian devotional literature, handcrafted temple bronze &amp; brass vigrahams, and sanctified puja essentials. Today, in sacred synergy with <strong className="font-semibold text-[#00362f]">SHIVAYAA</strong>, we bring centuries of ritual reverence directly to homes, mandirs, and cultural centers across the United Kingdom.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs">
                <a
                  href="#heritage-timeline"
                  className="inline-flex items-center gap-2 bg-[#164E45] text-white px-6 py-3 rounded-full font-bold shadow-xs hover:bg-[#00362f] transition-all"
                >
                  <span>Explore Our 70-Year Journey</span>
                  <ChevronDown className="w-4 h-4" />
                </a>
                <a
                  href="#shivayaa-alliance"
                  className="inline-flex items-center gap-2 text-[#745b22] font-bold hover:underline py-3"
                >
                  <span>The SHIVAYAA UK Alliance</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Metrics Strip */}
              <div className="grid grid-cols-3 gap-3 pt-4">
                <div className="p-3 bg-white rounded-xl border border-stone-200">
                  <span className="font-serif text-xl sm:text-2xl text-[#00362f] font-bold block">1953</span>
                  <span className="text-[11px] text-stone-500">Founded in Mylapore, Chennai</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-stone-200">
                  <span className="font-serif text-xl sm:text-2xl text-[#745b22] font-bold block">50,000+</span>
                  <span className="text-[11px] text-stone-500">Authentic Vedic Titles &amp; Murtis</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-stone-200">
                  <span className="font-serif text-xl sm:text-2xl text-[#00362f] font-bold block">24/48h</span>
                  <span className="text-[11px] text-stone-500">Tracked UK Island Fulfillment</span>
                </div>
              </div>
            </div>

            {/* Visual Mosaic */}
            <div className="lg:col-span-5 relative">
              <div className="relative w-full aspect-4/5 rounded-3xl overflow-hidden shadow-xl border border-stone-200 bg-stone-100">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7SwVWUm6EsVMTHQdt7ipj06sx9QSUEuoxxw7Jqy9-kJPmQf0fuEThuESivpQnYcfGQEczmHILfeW0s4mUaj34jl028f9Vi0MvsqHXLmYQsmnsPGEeiZGiEvDsvMBWtUWrwpmXHZQrOWGGTYqwOL-HU3HxyVkhFL6xc43kynlEuzSrOx4rNiwcMHJqWox9Vo9UzMPKkOCu2ISccbKiATdCbytgfktSJuz560FpKkzg"
                  alt="Traditional brass Nataraja murti surrounded by oil lamps"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#00362f]/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-xs shadow-lg text-stone-900">
                  <h4 className="font-serif text-base font-bold text-[#00362f]">Mylapore to London</h4>
                  <p className="text-xs text-stone-600 mt-0.5">Empowering ritual continuity across generations without compromise.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Sacred Purpose Narrative */}
      <section className="w-full bg-[#f6f3ec] py-12 px-4 sm:px-6 lg:px-8 border-y border-[#e5e2db]">
        <div className="max-w-[1320px] mx-auto">
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-2 mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#745b22]">TRADITION PRESERVED</span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#00362f]">The Living Breath of Sanatana Dharma</h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-2xl">
              Sacred rituals are not mere physical routines; they are metaphysical bridges anchoring us to divine memory, ancestral grace, and inner equilibrium. Whether you are performing Sandhyavandanam in Surrey, hosting Navaratri Golu in Leicester, or lighting your Sandalwood Dhoop in Edinburgh, GIRI ensures your sacred instruments carry pristine sanctity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-xs border border-stone-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#164E45]/10 flex items-center justify-center text-[#164E45]">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#00362f]">Vedic &amp; Agamic Shastras</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                From comprehensive Rig, Yajur, and Sama Veda recitations to bilingual stotra compilations, Gita bhashyas, and temple manuals, vetted meticulously by eminent Sanskrit vidwans.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-xs border border-stone-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#164E45]/10 flex items-center justify-center text-[#164E45]">
                <Sparkles className="w-5 h-5 text-[#745b22]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#00362f]">Ashtadhatu &amp; Brass Vigrahams</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Every murti is fashioned strictly adhering to the Shilpa Shastras by master hereditary stapathis in Swamimalai and Nachiyar Koil, maintaining canonical proportions and spiritual serenity.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-xs border border-stone-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#164E45]/10 flex items-center justify-center text-[#164E45]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#00362f]">Unadulterated Puja Samagri</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Pure Mysore sandalwood paste, naturally distilled rose water, organic cow ghee wicks, hand-rolled temple flora agarbattis, and sacred vibhuti prepared through ancient Vedic homam methods.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive 70-Year Heritage Timeline */}
      <section className="w-full py-12 px-4 sm:px-6 lg:px-8" id="heritage-timeline">
        <div className="max-w-[1320px] mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#745b22]">SEVEN DECADES OF DEVOTION</span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#00362f]">Our Sacred Journey Through Time</h2>
            <p className="text-xs text-stone-500">Tracing the footsteps of humble seva from temple streets to the European diaspora.</p>
          </div>

          <div className="space-y-8">
            {/* 1953 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="md:text-right space-y-2">
                <span className="font-serif text-2xl text-[#745b22] font-bold">1953</span>
                <h3 className="font-serif text-xl font-bold text-[#00362f]">The Sanctuary at Kapaleeshwarar</h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Founded opposite the sanctified gates of Sri Kapaleeshwarar Temple in Mylapore, Chennai. Began as a dedicated publisher of sloka booklets, authentic panchangams, and traditional Carnatic musical texts for temple pilgrims.
                </p>
                <span className="inline-block text-[11px] font-bold text-[#745b22] bg-[#ffdea0]/40 px-2.5 py-0.5 rounded-full">
                  Mylapore, Tamil Nadu
                </span>
              </div>
              <div className="h-56 rounded-2xl overflow-hidden shadow-xs border border-stone-200">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7zNnQI48DF8FUxYT0uzxxseKSf2nTJTlF85qM_U472tICQnbQoWTY_NQ1rvV7o1ylxmrvrBmnm5-qsE4sqveOn3ePV5mAvsGKwz4TyZw6OOYBEQzkbS1ooCFyeNygRZ-G2gNv6ru6TNJicJW_a05e92PzaSBi8iwiQtlWBrZpZROYhI5bJoi8CtEwwaNdNMpuCx3HnihgpkF0bDnCSTdl13IJ5wJcMrTkqHEjjGK0"
                  alt="1953 Mylapore"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* 1978 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="order-2 md:order-1 h-56 rounded-2xl overflow-hidden shadow-xs border border-stone-200">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1cwz_jEDAMi0DnsY_jtmOItyAEUoyryvxyZvOPA1g_ZyJ4Sc1SJ49GVAKXG9BHeG2NQ3AkDM_uZ_OOJ6vjJeghu3Y-gTka_XLNyThHwK0lSw8539IHVBqdbR58gE74VJ696ny-D0I5gXXuFG0fTxReav0DD_NmimwNiihAo3W0N7P5PQWDDthK2NdCfsvCJkbC5mXrr-X9NOll24A7Cy1lfWZ0n9UoKruImOm87El"
                  alt="1978 Printing Press"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="order-1 md:order-2 space-y-2">
                <span className="font-serif text-2xl text-[#745b22] font-bold">1978</span>
                <h3 className="font-serif text-xl font-bold text-[#00362f]">Preserving the Agamic Press</h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Expanded publication operations across Southern India. Collaborated with revered mutts and Vedic pathashalas to transcribe rare hand-scribed cadjan manuscripts into standardized, high-clarity editions for household daily recitation.
                </p>
                <span className="inline-block text-[11px] font-bold text-[#00362f] bg-[#164E45]/10 px-2.5 py-0.5 rounded-full">
                  Authoritative Stotra Publications
                </span>
              </div>
            </div>

            {/* 2005 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="md:text-right space-y-2">
                <span className="font-serif text-2xl text-[#745b22] font-bold">2005</span>
                <h3 className="font-serif text-xl font-bold text-[#00362f]">Sustaining Temple Stapathis</h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Institutionalized direct fair-trade artisan cooperatives with lost-wax bronze casting lineages in Swamimalai, Kanchipuram silk weavers, and Tanjore gold leaf painters, insulating indigenous craft forms from commercial dilution.
                </p>
                <span className="inline-block text-[11px] font-bold text-[#745b22] bg-[#ffdea0]/40 px-2.5 py-0.5 rounded-full">
                  Artisan Lineage Protection
                </span>
              </div>
              <div className="h-56 rounded-2xl overflow-hidden shadow-xs border border-stone-200">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB59LMnYHIwxMUsAQikX0ROuu0QmhyLUQr0z8A58TAqcJV1VQ2ibrmwCRazWl2TQYhVLqtJTNr7tTCQkdm-aDzeNmrfsjQw3MX78N6NnDJrwGFypNL6GzBe-RQpU6g4hykQ_nskUm3fiHEfQFSOw5irLHhXotmtUtktP7OQAMgGVo3x-QJ64vjBFpDeOOjjPcrgW_oHiMTT9BqN7pILGwSLQVFjysEBeDTH21HZfsS7"
                  alt="2005 Stapathis"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* 2024–Present */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="order-2 md:order-1 h-56 rounded-2xl overflow-hidden shadow-xs border border-stone-200">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtS3Uo1q3H_SK4lw53gjOlKEwvHj2eWk056IbGkquCXLRdW495HiwTJ5aa3GBcJ_v4W7ms0vMGLuqObm9-Fg2OD9rypIfrw-IaJ3NEUz7siUis2vo5ubBz-yR5R51jHSMhEBIvYUjz_aDt5uSb7ehAcg0-77e51l17AHe050TJBn7f20DMZUg7yJP_WqSuv2HLh0zIeK00fqzQ1LJE12FR5bGz0MktpyLdX-Inuogl"
                  alt="London Logistics"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="order-1 md:order-2 space-y-2">
                <span className="font-serif text-2xl text-[#745b22] font-bold">2024 – Present</span>
                <h3 className="font-serif text-xl font-bold text-[#00362f]">The British Isles &amp; European Bridge</h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  In strategic partnership with SHIVAYAA, GIRI UK was established with a dedicated logistics hub in London/Wembley. Providing zero-customs, rapid local Royal Mail dispatch and genuine spiritual assurance to hundreds of diaspora communities.
                </p>
                <span className="inline-block text-[11px] font-bold text-[#00362f] bg-[#164E45]/10 px-2.5 py-0.5 rounded-full">
                  Local UK Stock &amp; Next Day Delivery
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. The SHIVAYAA Alliance Split Banner */}
      <section className="w-full bg-[#00362f] text-white py-12 px-4 sm:px-6 lg:px-8" id="shivayaa-alliance">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 bg-[#164e45] p-6 rounded-2xl space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#ffdea0] font-bold uppercase">UK &amp; EU FULFILLMENT SANCTUARY</span>
                <span className="bg-[#cca730] text-[#002b25] px-2 py-0.5 rounded font-bold">WEMBLEY, LONDON</span>
              </div>
              <div className="p-4 bg-white text-stone-900 rounded-xl text-xs space-y-1">
                <p className="font-serif text-base font-bold text-[#00362f]">London Stock Sanctuary</p>
                <p className="text-stone-500">Over 25,000 items on London shelves for instant UK mainland dispatch.</p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-center text-xs">
                <div className="p-3 bg-[#00362f]/60 rounded-xl">
                  <p className="font-bold text-white">Zero Import Duty</p>
                  <p className="text-[10px] text-stone-300">No surprise post office fees</p>
                </div>
                <div className="p-3 bg-[#00362f]/60 rounded-xl">
                  <p className="font-bold text-white">Royal Mail 24/48</p>
                  <p className="text-[10px] text-stone-300">Next day delivery options</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#ffdea0]">
                STRATEGIC DIASPORA ALLIANCE
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold">
                Curated in Chennai. Dispatched with Grace Across Great Britain.
              </h2>
              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                Previously, diaspora families wishing to bring authentic GIRI puja items or brass vigrahams to the UK faced exorbitant freight rates, weeks of shipping delays, customs declarations, and fragile items damaged in transit.
              </p>
              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                By partnering with <strong className="text-[#ffdea0]">SHIVAYAA</strong>, GIRI has bridged the oceans. Our London fulfillment team inspects every article, cushions sacred bronzes with precision, and provides a direct British customer helpline for festival bookings, bulk temple orders, and personalized home altar guidance.
              </p>
              <div className="flex flex-wrap gap-4 pt-2 text-xs text-stone-300">
                <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-[#ffdea0]" /> 100% Tax &amp; VAT Prepaid</span>
                <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-[#ffdea0]" /> Hassle-Free 14-Day UK Returns</span>
                <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-[#ffdea0]" /> Direct Phone &amp; WhatsApp Seva Desk</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Voices from our UK Spiritual Family */}
      <section className="w-full bg-[#f6f3ec] py-12 px-4 sm:px-6 lg:px-8 border-t border-[#e5e2db]">
        <div className="max-w-[1320px] mx-auto space-y-8">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#745b22]">DEVOTEE EXPERIENCES</span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#00362f] mt-1">Voices from our UK Spiritual Family</h2>
            </div>
            <div className="flex items-center gap-1 text-xs text-[#745b22] font-bold">
              <Star className="w-4 h-4 fill-[#cca730] text-[#cca730]" />
              <span>4.9 / 5 (1,400+ UK Reviews)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-xs border border-stone-200 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex text-[#cca730] text-xs">★★★★★</div>
                <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed line-clamp-3">
                  &ldquo;Finding authentic Lalitha Sahasranama with Tamil transliteration in Manchester felt impossible until Giri UK. Arrived in two days, packed with sheer reverence in saffron wrap.&rdquo;
                </p>
              </div>
              <div className="pt-2 border-t border-stone-100 text-xs">
                <p className="font-bold text-[#00362f]">Dr. Radhika Sundaram</p>
                <p className="text-stone-400">Altrincham, Greater Manchester</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-xs border border-stone-200 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex text-[#cca730] text-xs">★★★★★</div>
                <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed line-clamp-3">
                  &ldquo;The brass Krishna idol is masterclass temple quality. The facial expression has so much karuna. I am deeply thankful to the SHIVAYAA team for bringing genuine Giri heritage to London.&rdquo;
                </p>
              </div>
              <div className="pt-2 border-t border-stone-100 text-xs">
                <p className="font-bold text-[#00362f]">Venkatesh Raghavan</p>
                <p className="text-stone-400">Harrow, London</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-xs border border-stone-200 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex text-[#cca730] text-xs">★★★★★</div>
                <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed line-clamp-3">
                  &ldquo;Their UK panchangam calculations match our local solar hours precisely. We coordinate all our temple mahotsavams and domestic pujas through their publications.&rdquo;
                </p>
              </div>
              <div className="pt-2 border-t border-stone-100 text-xs">
                <p className="font-bold text-[#00362f]">Acharya Shreedhar Bhatt</p>
                <p className="text-stone-400">Southall Hindu Mandir Council</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Final Call to Action */}
      <section className="w-full py-12 px-4 sm:px-6 lg:px-8 text-center bg-white border-t border-stone-200">
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#00362f] font-bold">
            Grace Your Sacred Space Today
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Whether you are replenishing sacred daily essentials or seeking a timeless brass deity for your prayer room, experience seven decades of uncompromising reverence.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={onExploreCatalog}
              className="px-6 py-3 rounded-full bg-[#164E45] hover:bg-[#00362f] text-white text-xs font-bold shadow-md cursor-pointer"
            >
              Explore The Complete Collection
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
