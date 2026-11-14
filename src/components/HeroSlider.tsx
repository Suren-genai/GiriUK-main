import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShieldCheck, Sparkles, Star, PackageCheck, Award, HeartHandshake } from 'lucide-react';

interface HeroSliderProps {
  onShopNow: (category?: string) => void;
}

const SLIDES = [
  {
    id: 1,
    title: 'Sacred Deepavali & Temple Brass Essentials',
    subtitle: 'Handcrafted Kumbakonam Brass Murtis, Kamakshi Diyas & Pure Samagri',
    highlight: 'Deepavali 2026 Festive Collection',
    cta: 'Shop Festival Collection',
    category: 'Festival Special',
    image: '/src/assets/images/hero_deepavali_brass_1793710718525.jpg',
    codeText: 'Apply Code GIRIUK2026 for 10% Off'
  },
  {
    id: 2,
    title: 'Divine Panchaloha & Antique Brass Sculptures',
    subtitle: 'Cast according to sacred Shilpa Shastra Agamic canons by generational sculptors',
    highlight: 'Artisanal Heritage Craft',
    cta: 'Explore Brass Idols',
    category: 'Idols & Handicrafts',
    image: '/src/assets/images/brass_idol_nataraja_1793710748927.jpg',
    codeText: 'Free UK Delivery on Orders Over £50'
  },
  {
    id: 3,
    title: 'Pure South Indian Handloom Silks & Traditional Dhotis',
    subtitle: 'Kanchipuram & Salem Certified Mulberry Silks with Pure Gold Zari Weaves',
    highlight: 'Authentic Traditional Attire',
    cta: 'Discover Handloom Textiles',
    category: 'Textiles',
    image: '/src/assets/images/textile_dhoti_silk_1793710781166.jpg',
    codeText: 'Direct UK Dispatch within 24 Hours'
  }
];

export const HeroSlider: React.FC<HeroSliderProps> = ({ onShopNow }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[currentSlide];

  return (
    <div className="relative bg-[#F4EFE6] border-b border-[#EBE6DC] overflow-hidden">
      {/* Visual Container */}
      <div className="relative min-h-[420px] md:min-h-[500px] flex items-center">
        {/* Background Image with warm gradient scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover transition-opacity duration-700 ease-in-out"
          />
          {/* Measured contrast scrim */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#00241f]/90 via-[#00362f]/75 to-black/35" />
          <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/30" />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 max-w-[1340px] mx-auto px-6 sm:px-12 py-12 text-white w-full">
          <div className="max-w-2xl space-y-4">
            {/* Editorial Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-semibold text-[#ffdb96]">
              <Sparkles className="w-3.5 h-3.5 text-[#cca730]" />
              <span>{slide.highlight}</span>
              <span className="text-white/40">·</span>
              <span className="text-stone-300 font-normal">{slide.codeText}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif leading-[1.15] tracking-tight text-balance text-stone-50 font-normal">
              {slide.title}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-stone-200 leading-relaxed font-normal max-w-xl">
              {slide.subtitle}
            </p>

            {/* CTAs */}
            <div className="pt-2 flex items-center gap-3.5 flex-wrap">
              <button
                onClick={() => onShopNow(slide.category)}
                className="px-6 py-3 rounded-full bg-[#cca730] hover:bg-[#b89528] text-[#002b25] text-sm font-bold tracking-wide transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
              >
                {slide.cta}
              </button>

              <button
                onClick={() => onShopNow('All')}
                className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-xs text-white border border-white/25 text-sm font-medium transition-all cursor-pointer"
              >
                Browse Full Catalog
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Arrow Controls */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)}
          className="absolute left-4 z-20 p-2.5 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-xs transition-colors hidden sm:flex items-center justify-center cursor-pointer"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % SLIDES.length)}
          className="absolute right-4 z-20 p-2.5 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-xs transition-colors hidden sm:flex items-center justify-center cursor-pointer"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 transition-all rounded-full cursor-pointer ${
                idx === currentSlide ? 'w-8 bg-[#cca730]' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Trustpilot & 4 Trust Pillars Bar (SOW §5.4) */}
      <div className="bg-white border-b border-[#EBE6DC] py-4 px-4 sm:px-8">
        <div className="max-w-[1340px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-stone-200">
          {/* Trustpilot Integration */}
          <div className="flex items-center gap-3 pt-2 md:pt-0">
            <div className="bg-[#00b67a]/10 p-2 rounded-lg text-[#00b67a]">
              <Star className="w-5 h-5 fill-[#00b67a]" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-stone-900 tracking-tight">Trustpilot</span>
                <div className="flex text-[#00b67a]">
                  {'★★★★★'.split('').map((s, i) => (
                    <span key={i} className="text-xs font-bold leading-none">{s}</span>
                  ))}
                </div>
              </div>
              <p className="text-[11px] text-stone-500">4.8/5 by 2,400+ UK Devotees</p>
            </div>
          </div>

          {/* Genuine Bharat Temple Craft */}
          <div className="flex items-center gap-3 pt-2 md:pt-0 md:pl-4">
            <div className="bg-[#164E45]/10 p-2 rounded-lg text-[#164E45]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-stone-900">Authentic Heritage</p>
              <p className="text-[11px] text-stone-500">100% Direct from Artisans in India</p>
            </div>
          </div>

          {/* Fast UK Delivery */}
          <div className="flex items-center gap-3 pt-2 md:pt-0 md:pl-4">
            <div className="bg-[#cca730]/15 p-2 rounded-lg text-[#795f26]">
              <PackageCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-stone-900">Royal Mail &amp; DPD</p>
              <p className="text-[11px] text-stone-500">Free UK delivery over £50</p>
            </div>
          </div>

          {/* UK & EU Support */}
          <div className="flex items-center gap-3 pt-2 md:pt-0 md:pl-4">
            <div className="bg-[#164E45]/10 p-2 rounded-lg text-[#164E45]">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-stone-900">London &amp; EU Support</p>
              <p className="text-[11px] text-stone-500">Official Shivayaa partnership</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
