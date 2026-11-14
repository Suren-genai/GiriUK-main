import React, { useState, useMemo } from 'react';
import { 
  Search, 
  HelpCircle, 
  Truck, 
  Sparkles, 
  Leaf, 
  CreditCard, 
  RotateCcw, 
  ChevronDown, 
  Phone, 
  MessageSquare, 
  MapPin, 
  BookOpen, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Building
} from 'lucide-react';

interface FaqItem {
  id: string;
  category: 'shipping' | 'murtis' | 'samagri' | 'orders' | 'returns';
  question: string;
  answer: React.ReactNode;
  tags: string[];
}

interface FaqHelpCentrePageProps {
  onNavigate: (page: string) => void;
  onOpenContact?: () => void;
  onOpenOnDemand?: () => void;
}

export default function FaqHelpCentrePage({ onNavigate, onOpenContact, onOpenOnDemand }: FaqHelpCentrePageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'ship-1': true,
    'murti-1': true,
  });

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const faqItems: FaqItem[] = useMemo(() => [
    // UK & EU Shipping & Delivery
    {
      id: 'ship-1',
      category: 'shipping',
      question: 'How quickly will my order arrive within the United Kingdom?',
      tags: ['delivery', 'shipping', 'royal mail', 'dpd', 'wembley', 'speed', 'times'],
      answer: (
        <div className="space-y-3">
          <p>
            All orders are dispatched directly from our dedicated warehouse in <strong>Wembley, Greater London</strong>. We partner directly with <strong>Royal Mail Tracked</strong> and <strong>DPD Priority</strong>:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2">
            <div className="p-3.5 rounded-lg bg-emerald-50/50 border border-emerald-100 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#164E45] text-sm">Royal Mail Tracked 48</span>
                <span className="text-xs font-semibold text-[#B99A5B] bg-[#B99A5B]/10 px-2 py-0.5 rounded">Standard</span>
              </div>
              <p className="text-xs text-stone-600">2 to 3 working days. Complimentary for all UK basket values over £50.</p>
            </div>
            <div className="p-3.5 rounded-lg bg-emerald-50/50 border border-emerald-100 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#164E45] text-sm">Royal Mail Tracked 24</span>
                <span className="text-xs font-semibold text-[#164E45] bg-[#164E45]/10 px-2 py-0.5 rounded">Express</span>
              </div>
              <p className="text-xs text-stone-600">Next working day delivery when placed before 2:00 PM GMT (Mon–Fri).</p>
            </div>
          </div>
          <p className="text-xs text-stone-500 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-[#B99A5B] shrink-0" />
            Festival rush periods (Diwali, Navaratri, Vinayaka Chaturthi) may carry an additional 24-hour buffer due to high UK carrier volume.
          </p>
        </div>
      )
    },
    {
      id: 'ship-2',
      category: 'shipping',
      question: 'Do I have to pay import duties, customs, or handling fees in the UK?',
      tags: ['customs', 'taxes', 'vat', 'import', 'fees', 'zero uk customs'],
      answer: (
        <div className="space-y-3">
          <p>
            <strong>Never.</strong> You will never receive an unexpected Royal Mail or customs clearance slip. Because GIRI UK operates directly under <em>Shivayaa Enterprises Ltd</em> in London, all consignments have already completed UK customs clearance and UK VAT formalities prior to arriving at our fulfilment centre.
          </p>
          <div className="p-3 rounded-lg bg-[#f0eee7] text-[#164E45] text-sm">
            <strong>The price you see in British Pounds (£ GBP) is all-inclusive.</strong> No surcharges, no post-delivery customs bills, and no administrative fees for any UK postcode.
          </div>
        </div>
      )
    },
    {
      id: 'ship-3',
      category: 'shipping',
      question: 'Do you deliver to the European Union (EU) and Northern Ireland?',
      tags: ['eu', 'europe', 'ireland', 'germany', 'france', 'ioss', 'dhl'],
      answer: (
        <div className="space-y-3">
          <p>
            Yes. We deliver safely to all European destinations including Germany, France, Netherlands, Ireland, Switzerland, and the Nordics via <strong>DHL Express Worldwide</strong> and <strong>DPD Europe</strong>.
          </p>
          <ul className="list-disc list-inside text-sm space-y-1.5 text-stone-700">
            <li><strong>Northern Ireland:</strong> Treated as standard UK domestic dispatch with no customs forms needed for retail devotees.</li>
            <li><strong>EU Shipments (IOSS / DDP):</strong> Taxes and import VAT are pre-cleared at checkout for orders under €150. Your parcel arrives directly at your door within 3–5 business days without local post office delays.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'ship-4',
      category: 'shipping',
      question: 'Can heavy stone or brass vigrahams be delivered directly to a UK Temple?',
      tags: ['temple', 'mandir', 'heavy', 'stone', 'priest', 'neasden', 'balaji', 'installation'],
      answer: (
        <div className="space-y-3">
          <p>
            Yes. For temple donations or large sanctum installations exceeding 15kg (such as Panchaloha Nataraja, marble idols, or large tiered brass vilakkus), our London Sevak team coordinates directly with the temple management.
          </p>
          <p>
            We regularly deliver directly to prominent mandirs including <strong>BAPS Shri Swaminarayan Mandir (Neasden)</strong>, <strong>Shri Venkateswara (Balaji) Temple Tividale</strong>, <strong>SKLP Community Centre</strong>, and <strong>Highbury Murugan Temple</strong>. Please select "Temple Delivery Consignment" at checkout or message our WhatsApp Sevak desk with the Temple Priest's receiving details.
          </p>
        </div>
      )
    },
    {
      id: 'ship-5',
      category: 'shipping',
      question: 'Can I collect my parcel directly from the Wembley Sanctuary in person?',
      tags: ['click and collect', 'wembley', 'collection', 'in person', 'pickup'],
      answer: (
        <div className="space-y-2">
          <p>
            Yes! During checkout, select <strong>"Click &amp; Collect — Wembley Sanctuary"</strong>. Orders placed before 1:00 PM are packed and ready within 2 hours.
          </p>
          <p className="text-sm text-stone-600">
            Collection address: <strong>48 Ealing Road, Wembley, London HA0 4TL</strong> (3 minutes walk from Wembley Central Station). Free customer loading bays are located behind the building for heavy brass murtis.
          </p>
        </div>
      )
    },
    {
      id: 'ship-6',
      category: 'shipping',
      question: 'What packaging is used for fragile brass, clay idols, and glass chimneys?',
      tags: ['packaging', 'breakage', 'fragile', 'boxes', 'safe', 'damage protection'],
      answer: (
        <div className="space-y-2">
          <p>
            We adhere strictly to our <strong>Sanctified Packaging Standard</strong>:
          </p>
          <ul className="list-disc list-inside text-sm space-y-1 text-stone-700">
            <li>Zero-plastic biodegradable Geami honeycomb paper padding.</li>
            <li>Saffron-tinted pure cotton cloth swaddling for all consecrated deities.</li>
            <li>Double-casket reinforced boxes with custom wooden internal framing for murtis over 20cm.</li>
            <li>Borosilicate chimneys receive custom-cut high-density foam sleeves.</li>
          </ul>
        </div>
      )
    },

    // Murtis, Consecration & Care
    {
      id: 'murti-1',
      category: 'murtis',
      question: 'Are the idols consecrated before dispatch, or should I perform Prana Pratishtha at home?',
      tags: ['prana pratishtha', 'consecration', 'sanctified', 'shastras', 'ritual', 'blessed'],
      answer: (
        <div className="space-y-3">
          <p>
            In strict accordance with the <strong>Shilpa Shastras and Agamic canons</strong>, all GIRI vigrahams are sculpted by hereditary master sthapathis with precise sacred measurements (<em>Talamana system</em>) and purified in the artisan's sanctum.
          </p>
          <p>
            However, final <strong>Prana Pratishtha</strong> (invoking the divine breath) is traditionally performed in your personal mandir or temple by your family priest, or through simple daily abhishekam and prayer. We enclose a complimentary <em>Stapana &amp; Energization Guidebook</em> with each deity order.
          </p>
        </div>
      )
    },
    {
      id: 'murti-2',
      category: 'murtis',
      question: 'What is the difference between Solid Brass, Lost-Wax Bronze, and Panchaloha?',
      tags: ['panchaloha', 'bronze', 'brass', 'metal', 'swamimalai', 'asthadhatu'],
      answer: (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-200">
              <strong className="block text-stone-900 font-semibold mb-1">Solid Brass</strong>
              <span>Durable alloy of copper and zinc. Ideal for household daily puja, easily polished, vibrant golden lustre.</span>
            </div>
            <div className="p-3 rounded-lg bg-orange-50/70 border border-orange-200">
              <strong className="block text-stone-900 font-semibold mb-1">Lost-Wax Bronze (Cire Perdue)</strong>
              <span>Hand-chiseled from ancient beeswax models in Swamimalai. Heirloom density, timeless deep antique patina.</span>
            </div>
            <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200">
              <strong className="block text-stone-900 font-semibold mb-1">Panchaloha (5 Sacred Metals)</strong>
              <span>Sacred combination of Gold, Silver, Copper, Zinc, and Iron formulated for powerful Agamic temple abhishekam.</span>
            </div>
          </div>
          <p className="text-sm text-stone-600">
            For bespoke Panchaloha casts, visit our <strong>On Demand Bespoke Commissions</strong> portal to consult directly with our Vedic desk.
          </p>
        </div>
      )
    },
    {
      id: 'murti-3',
      category: 'murtis',
      question: 'How should I clean and maintain my brass and bronze murtis in the UK?',
      tags: ['brass', 'cleaning', 'pitambari', 'tamarind', 'patina', 'maintenance', 'care'],
      answer: (
        <div className="space-y-3">
          <p>
            To preserve the sacred aura and intricate engravings of your vigrahams:
          </p>
          <ul className="list-disc list-inside text-sm space-y-1.5 text-stone-700">
            <li><strong>For High-Gloss Brass:</strong> Use authentic Pitambari powder mixed with water into a smooth paste. Gently massage with your hands or a soft cloth, rinse with clean warm water, and immediately wipe dry with soft microfibre.</li>
            <li><strong>For Antique Patina &amp; Bronze:</strong> Do NOT use abrasive chemical brass cleaners like Brasso, as they strip the artisan's dark oxidized patina. Simply wipe with a dry soft flannel cloth or warm water with a dash of vibhuti.</li>
            <li><strong>Abhishekam Care:</strong> After milk, honey, or panchamritam abhishekam, rinse thoroughly with fresh water and dry completely to prevent verdigris (green mineral spotting) in damp UK weather.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'murti-4',
      category: 'murtis',
      question: 'Can I visit the Wembley Sanctuary to physically inspect a large vigraham before purchasing?',
      tags: ['viewing', 'wembley sanctuary', 'inspect', 'appointment', 'showroom'],
      answer: (
        <div className="space-y-2">
          <p>
            <strong>Yes, warmly welcomed.</strong> We maintain a private 1-on-1 viewing room at our Wembley cultural sanctuary. You can view our 45cm+ Natarajas, Balaji vigrahams, and Ganesha murtis under proper lighting, inspect casting weights, and verify artisan certificates.
          </p>
          <p className="text-sm text-stone-600">
            Appointments can be scheduled via our <strong>Contact Us</strong> page or directly via WhatsApp (+44 7700 900821).
          </p>
        </div>
      )
    },
    {
      id: 'murti-5',
      category: 'murtis',
      question: 'What happens if a sacred idol arrives with a crack or transit damage?',
      tags: ['broken', 'damage', 'jal samadhi', 'reverent return', 'sanctity', 'replacement'],
      answer: (
        <div className="space-y-2">
          <p>
            Under our <strong>Sacred Restitution Protocol</strong>, GIRI UK never discards broken idols into industrial metal scraps.
          </p>
          <p className="text-sm text-stone-700">
            If damage occurs during transit, notify us within 48 hours with a photograph. We immediately courier an express pristine replacement and arrange a respectful return pouch to bring the damaged vigraham to our Wembley temple custody for traditional ritual immersion (<em>Jal Samadhi</em>).
          </p>
        </div>
      )
    },

    // Puja Samagri & Purity
    {
      id: 'sam-1',
      category: 'samagri',
      question: 'Can GIRI camphor and dhoop cups be used in UK flats with sensitive optical smoke alarms?',
      tags: ['camphor', 'smoke', 'fire alarm', 'flats', 'apartment', 'low smoke', 'karpooram'],
      answer: (
        <div className="space-y-3">
          <p>
            <strong>Yes.</strong> We specifically curate low-smoke, 100% natural formulations tailored for modern UK apartments and flats with sensitive optical smoke detectors:
          </p>
          <ul className="list-disc list-inside text-sm space-y-1 text-stone-700">
            <li><strong>Pure Bhimseni Pachai Karpooram:</strong> Contains zero kerosene or paraffin wax fillers. Sublimates cleanly into pure divine fragrance without sooty black plumes.</li>
            <li><strong>Eco Micro-Flame Dhoop Cups:</strong> Formulated with pure loban, guggul, and desi cow dung base that smoulders softly with high aroma and low particulate matter.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'sam-2',
      category: 'samagri',
      question: 'Is your Gangajal authentic and certified for UK customs import?',
      tags: ['gangajal', 'haridwar', 'gangotri', 'pure water', 'customs', 'consecrated'],
      answer: (
        <div className="space-y-2">
          <p>
            Yes. Our Gangajal is drawn directly from <strong>Gangotri and Haridwar</strong> under governmental and priestly oversight, sealed in hermetic food-grade containers, and fully certified under UK DEFRA and Customs health import regulations.
          </p>
          <p className="text-xs text-stone-500">
            It arrives pure, sacred, and microbiologically tested for safe abhishekam use.
          </p>
        </div>
      )
    },
    {
      id: 'sam-3',
      category: 'samagri',
      question: 'What oil is recommended for daily morning and evening Deepam lighting in the UK?',
      tags: ['oil', 'deepam', 'sesame', 'gingelly', 'ghee', 'vilakku'],
      answer: (
        <div className="space-y-2">
          <p>
            Agamic traditions recommend:
          </p>
          <ul className="list-disc list-inside text-sm space-y-1 text-stone-700">
            <li><strong>Pure Cold-Pressed Gingelly (Sesame) Oil:</strong> The traditional choice for dispelling doshas, sustaining a steady flame, and filling the mandir with an auspicious aroma.</li>
            <li><strong>Desi Cow Ghee:</strong> Considered the most sattvic offering for morning sandhyavandanam and deity archana.</li>
            <li><strong>Pancha Deepam Oil:</strong> Our proprietary sacred blend of 5 oils (Sesame, Castor, Mahua, Mustard, and Desi Ghee) formulated to invite Maha Lakshmi's presence.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'sam-4',
      category: 'samagri',
      question: 'Do you supply customized bulk samagri lists for weddings, homams, and Grihapravesham?',
      tags: ['bulk', 'homam', 'grihapravesham', 'wedding', 'priest list', 'custom'],
      answer: (
        <div className="space-y-2">
          <p>
            Yes! UK Vadhyars and Temple Priests often provide extensive 30-to-60 item lists for Ganapathi Homam, Navagraha Shanti, or Sudarshana Homam.
          </p>
          <p className="text-sm text-stone-700">
            You can simply send us the Priest's handwritten or typed PDF list via WhatsApp (+44 7700 900821) or email. Our seva team packs and labels each herb and samiti packet individually in English &amp; Sanskrit for effortless ritual conduction.
          </p>
        </div>
      )
    },

    // Orders, Currency & Invoices
    {
      id: 'ord-1',
      category: 'orders',
      question: 'What payment methods do you accept online?',
      tags: ['payment', 'cards', 'apple pay', 'google pay', 'paypal', 'klarna', 'gbp'],
      answer: (
        <div className="space-y-2">
          <p>
            We process all transactions securely in British Pounds (£ GBP) via bank-grade 256-bit SSL encryption. We accept:
          </p>
          <div className="flex flex-wrap gap-2 text-xs font-semibold mt-2">
            <span className="px-2.5 py-1 bg-stone-100 rounded border">Visa &amp; Mastercard</span>
            <span className="px-2.5 py-1 bg-stone-100 rounded border">American Express</span>
            <span className="px-2.5 py-1 bg-stone-100 rounded border">Apple Pay</span>
            <span className="px-2.5 py-1 bg-stone-100 rounded border">Google Pay</span>
            <span className="px-2.5 py-1 bg-stone-100 rounded border">PayPal</span>
            <span className="px-2.5 py-1 bg-stone-100 rounded border">Maestro</span>
          </div>
        </div>
      )
    },
    {
      id: 'ord-2',
      category: 'orders',
      question: 'Can I obtain a formal VAT Invoice for our UK Registered Charity or Mandir Trust?',
      tags: ['vat', 'invoice', 'charity', 'tax', 'receipt', 'mandir trust', 'gift aid'],
      answer: (
        <div className="space-y-2">
          <p>
            Yes. Every order automatically includes a downloadable UK VAT invoice showing our registered UK Company Number and VAT ID (GB 412 8902 44).
          </p>
          <p className="text-sm text-stone-600">
            For registered UK charities claiming VAT relief on specific educational or religious supplies, please contact our accounts desk before order placement to arrange VAT-exempt billing where applicable.
          </p>
        </div>
      )
    },
    {
      id: 'ord-3',
      category: 'orders',
      question: 'Can I amend or add items to my order before it ships?',
      tags: ['amend', 'change order', 'cut off', 'combine', 'modify'],
      answer: (
        <div className="space-y-2">
          <p>
            Because we aim to dispatch all orders before 2:00 PM GMT same day, please WhatsApp or call our Wembley Seva Desk (+44 20 8903 8920) immediately with your <strong>#GUK-XXXX</strong> order number.
          </p>
          <p className="text-sm text-stone-600">
            If the parcel has not yet been processed by Royal Mail or DPD manifest, we will happily combine items and adjust your invoice.
          </p>
        </div>
      )
    },

    // Sacred Returns Protocol
    {
      id: 'ret-1',
      category: 'returns',
      question: 'What is GIRI UK’s 14-day return and exchange policy?',
      tags: ['return policy', '14 days', 'refund', 'exchange', 'conditions'],
      answer: (
        <div className="space-y-3">
          <p>
            We offer a transparent <strong>14-Day Respectful Return Policy</strong> starting from the carrier delivery timestamp.
          </p>
          <ul className="list-disc list-inside text-sm space-y-1 text-stone-700">
            <li><strong>Eligible:</strong> Unlit brassware, unopened books and stotras, unblemished statues in original boxes, and classical dance jewellery.</li>
            <li><strong>Non-returnable:</strong> Opened bottles of oils, pastes (Kumkum, Chandan, Vibhuti), consecrated sacred threads (Poonal) once packaging seal is broken, and customized homam wood sets.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'ret-2',
      category: 'returns',
      question: 'How do I use the paperless Royal Mail returns portal?',
      tags: ['paperless', 'qr code', 'post office', 'portal', 'returns'],
      answer: (
        <div className="space-y-2">
          <p>
            No home printer required! Simply enter your order number and UK postcode on our <strong>Delivery &amp; Returns Protocol page</strong> to generate an instant Royal Mail paperless return QR code.
          </p>
          <p className="text-sm text-stone-600">
            Show the QR code on your mobile phone at any UK Post Office counter or Royal Mail Customer Service Point; they will print the postage label and provide a drop-off receipt.
          </p>
        </div>
      )
    },
    {
      id: 'ret-3',
      category: 'returns',
      question: 'How quickly are refunds reimbursed to my bank account?',
      tags: ['refund time', 'speed', 'bank', 'restitution'],
      answer: (
        <div className="space-y-2">
          <p>
            Once your returned parcel reaches our Wembley Logistics Centre, our sevaks inspect the consignment within 24 hours.
          </p>
          <p className="text-sm text-stone-600">
            Reimbursements are processed immediately back to your original payment card or PayPal account, appearing in your bank statement within 3 to 5 business days.
          </p>
        </div>
      )
    }
  ], []);

  // Filter items based on active category and search query
  const filteredItems = useMemo(() => {
    return faqItems.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const matchesQuestion = item.question.toLowerCase().includes(q);
      const matchesTags = item.tags.some(tag => tag.toLowerCase().includes(q));
      
      return matchesQuestion || matchesTags;
    });
  }, [faqItems, activeCategory, searchQuery]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: faqItems.length,
      shipping: 0,
      murtis: 0,
      samagri: 0,
      orders: 0,
      returns: 0
    };
    faqItems.forEach(i => {
      counts[i.category] = (counts[i.category] || 0) + 1;
    });
    return counts;
  }, [faqItems]);

  const handleQuickTagClick = (tag: string) => {
    setSearchQuery(tag);
    setActiveCategory('all');
  };

  return (
    <div className="w-full bg-[#fcf9f2] min-h-screen text-[#1c1c18]">
      {/* Top Heritage Marquee Sub-Bar */}
      <div className="w-full bg-[#f0eee7] border-b border-[#e5e2db] py-2.5 px-4 md:px-8">
        <div className="max-w-[1320px] mx-auto flex items-center justify-between text-xs text-stone-600">
          <nav className="flex items-center gap-1.5">
            <button 
              onClick={() => onNavigate('home')}
              className="hover:text-[#164E45] transition-colors flex items-center gap-1 font-medium"
            >
              <span>Home</span>
            </button>
            <span className="text-stone-400">/</span>
            <span className="text-stone-500">Customer Care</span>
            <span className="text-stone-400">/</span>
            <span className="text-[#B99A5B] font-semibold">Frequently Asked Questions (FAQ)</span>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block animate-pulse"></span>
              Wembley Hub Dispatch: Active Today (Cut-off 2 PM)
            </span>
            <span className="text-stone-300">|</span>
            <span className="text-[#B99A5B] font-medium">Devotee Helpline: +44 20 8903 8920</span>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <section className="relative w-full bg-gradient-to-b from-[#f6f3ec] via-[#fcf9f2] to-[#fcf9f2] py-12 md:py-16 px-4 md:px-8 border-b border-[#e5e2db] overflow-hidden">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#B99A5B]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-[920px] mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e5e2db]/70 text-[#745b22] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#B99A5B]" />
            <span>Devotee Assistance &amp; Knowledge Centre</span>
          </div>
          <h1 className="font-serif text-3xl md:text-5xl text-[#164E45] font-semibold tracking-tight mb-4">
            How May We Assist Your Sacred Practice?
          </h1>
          <p className="text-stone-600 text-base md:text-lg max-w-2xl leading-relaxed mb-8">
            Detailed guidance regarding domestic UK dispatch from London, sacred murti consecration protocols, low-smoke puja samagri, temple delivery logistics, and reverent transit care.
          </p>

          {/* Search Bar */}
          <div className="w-full max-w-2xl relative shadow-md rounded-full bg-white p-1.5 border border-[#B99A5B]/30 focus-within:ring-2 focus-within:ring-[#164E45] transition-all">
            <div className="flex items-center">
              <Search className="w-5 h-5 text-[#164E45] ml-3 mr-2 shrink-0" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions, e.g., 'dispatch times', 'prana pratishtha', 'smoke alarms', 'returns'..."
                className="w-full py-2.5 pr-3 bg-transparent text-sm md:text-base text-stone-900 placeholder:text-stone-400 focus:outline-none"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-stone-400 hover:text-stone-700 px-2 py-1 mr-1"
                >
                  Clear
                </button>
              )}
              <button 
                className="px-5 py-2.5 rounded-full bg-[#164E45] text-white text-xs md:text-sm font-semibold hover:bg-[#00362f] transition-all flex items-center gap-1 shrink-0"
              >
                <span>Find</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Search Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-5 text-xs text-stone-600">
            <span className="text-stone-400 uppercase tracking-wider text-[11px] font-medium">Popular:</span>
            {[
              { label: 'UK Delivery 24/48', tag: 'delivery' },
              { label: 'Prana Pratishtha', tag: 'consecration' },
              { label: 'Camphor in Flats', tag: 'smoke' },
              { label: 'Zero UK Customs', tag: 'customs' },
              { label: 'Brass Murti Care', tag: 'brass' },
              { label: 'Temple Delivery', tag: 'temple' }
            ].map(item => (
              <button
                key={item.tag}
                onClick={() => handleQuickTagClick(item.tag)}
                className="px-2.5 py-1 rounded-full bg-[#f0eee7] hover:bg-[#e5e2db] text-stone-700 transition-colors border border-[#e5e2db]"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky Categories / Filter Bar */}
      <section className="sticky top-20 z-20 bg-white border-b border-[#e5e2db] shadow-xs">
        <div className="max-w-[1320px] mx-auto px-4 md:px-8 py-3">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
            {[
              { id: 'all', label: 'All Inquiries', icon: HelpCircle },
              { id: 'shipping', label: 'UK & EU Shipping & Delivery', icon: Truck },
              { id: 'murtis', label: 'Murtis, Consecration & Care', icon: Sparkles },
              { id: 'samagri', label: 'Puja Samagri & Purity', icon: Leaf },
              { id: 'orders', label: 'Orders, Currency & Invoices', icon: CreditCard },
              { id: 'returns', label: 'Sacred Returns Protocol', icon: RotateCcw }
            ].map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              const count = categoryCounts[cat.id] || 0;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                    isActive 
                      ? 'bg-[#164E45] text-white shadow-sm' 
                      : 'bg-[#f6f3ec] text-stone-700 hover:bg-[#ebe8e1]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#B99A5B]' : 'text-stone-500'}`} />
                  <span>{cat.label}</span>
                  <span className={`ml-1 text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-600'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-[1320px] mx-auto px-4 md:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Accordion Questions (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {filteredItems.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center border border-[#e5e2db] shadow-xs">
                <HelpCircle className="w-12 h-12 text-[#B99A5B] mx-auto mb-3" />
                <h3 className="font-serif text-xl font-semibold text-[#164E45]">No Matching Inquiries Found</h3>
                <p className="text-stone-600 text-sm mt-1 max-w-md mx-auto">
                  We could not find an answer matching "{searchQuery}". Our London Wembley Seva desk is available to assist you directly.
                </p>
                <div className="mt-5 flex justify-center gap-3">
                  <button 
                    onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                    className="px-4 py-2 text-xs font-semibold rounded-full border border-stone-300 text-stone-700 hover:bg-stone-50"
                  >
                    Reset Filter
                  </button>
                  <button 
                    onClick={() => onNavigate('contact')}
                    className="px-4 py-2 text-xs font-semibold rounded-full bg-[#164E45] text-white hover:bg-[#00362f]"
                  >
                    Ask London Seva Desk
                  </button>
                </div>
              </div>
            ) : (
              filteredItems.map((item) => {
                const isOpen = !!openItems[item.id];
                return (
                  <div 
                    key={item.id}
                    className="bg-white rounded-xl border border-[#e5e2db] shadow-xs hover:shadow-sm transition-all overflow-hidden"
                  >
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="w-full p-5 text-left flex items-start justify-between gap-4 group"
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-2 h-2 rounded-full bg-[#B99A5B] mt-2 shrink-0"></span>
                        <h3 className="font-serif text-lg md:text-xl font-semibold text-[#164E45] group-hover:text-[#00362f] transition-colors leading-snug">
                          {item.question}
                        </h3>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-[#B99A5B] shrink-0 transition-transform duration-200 mt-1 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 pt-1 border-t border-stone-100 text-sm text-stone-700 leading-relaxed">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })
            )}

            {/* Bottom Guidance Banner */}
            <div className="bg-[#164E45] text-white rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm mt-8">
              <div>
                <span className="text-[#B99A5B] text-xs font-semibold uppercase tracking-wider">Unsure About Ritual Measurements?</span>
                <h3 className="font-serif text-xl md:text-2xl font-medium mt-1">Speak Directly with a Wembley Temple Sevak</h3>
                <p className="text-stone-300 text-xs md:text-sm mt-1 max-w-xl">
                  Whether you are consecrated a new mandir, need guidance on panchangam auspicious dates, or need bespoke sthapathi dimensions.
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button 
                  onClick={() => onNavigate('contact')}
                  className="px-5 py-2.5 rounded-full bg-[#B99A5B] text-[#164E45] font-semibold text-xs md:text-sm hover:bg-[#ffdea0] transition-colors"
                >
                  Contact Seva Desk
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Support & Wembley Desk Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick Contact Card */}
            <div className="bg-white rounded-xl p-6 border border-[#e5e2db] shadow-xs">
              <h3 className="font-serif text-lg font-semibold text-[#164E45] mb-1">Direct Devotee Seva Desk</h3>
              <p className="text-xs text-stone-500 mb-4">Dedicated telephone and WhatsApp assistance based in Wembley.</p>
              
              <div className="space-y-3">
                <a 
                  href="tel:+442089038920"
                  className="flex items-center gap-3 p-3 rounded-lg bg-[#fcf9f2] hover:bg-[#f6f3ec] border border-[#e5e2db] transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-[#164E45]/10 flex items-center justify-center text-[#164E45] shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-stone-500 font-medium block">UK Devotee Helpline</span>
                    <span className="text-sm font-bold text-[#164E45]">+44 20 8903 8920</span>
                  </div>
                </a>

                <a 
                  href="https://wa.me/447700900821" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-emerald-50/60 hover:bg-emerald-50 border border-emerald-200 transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-emerald-600/10 flex items-center justify-center text-emerald-700 shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-emerald-700 font-medium block">WhatsApp Live Sevak</span>
                    <span className="text-sm font-bold text-emerald-900">+44 7700 900821</span>
                  </div>
                </a>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-[#fcf9f2] border border-[#e5e2db]">
                  <div className="w-9 h-9 rounded-full bg-[#B99A5B]/20 flex items-center justify-center text-[#745b22] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-stone-900 block">Wembley Cultural Sanctuary</span>
                    <span className="text-stone-600">48 Ealing Road, Wembley HA0 4TL</span>
                    <span className="text-stone-400 block mt-0.5">Mon–Sat: 9:30 AM – 6:30 PM GMT</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => onNavigate('contact')}
                className="w-full mt-4 py-2.5 rounded-full border border-[#164E45] text-[#164E45] hover:bg-[#164E45] hover:text-white transition-all text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <span>Book 1-on-1 Sanctuary Viewing</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 2026 UK Panchangam Card */}
            <div className="bg-gradient-to-br from-[#164E45] to-[#00362f] text-white rounded-xl p-6 shadow-xs relative overflow-hidden">
              <div className="absolute top-0 right-0 w-28 h-28 bg-[#B99A5B]/15 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-[#B99A5B]" />
                  <span className="text-[11px] font-semibold text-[#B99A5B] uppercase tracking-wider">Free Devotee Asset</span>
                </div>
                <h4 className="font-serif text-lg font-semibold mb-1.5">2026 UK Hindu Panchangam</h4>
                <p className="text-stone-300 text-xs leading-relaxed mb-4">
                  Calculated precisely for Greenwich Mean Time (GMT/BST). Includes Ekadashi, Pradosham, Sankashti, and major festival muhurthams for England, Scotland &amp; Wales.
                </p>
                <button 
                  onClick={() => alert('The 2026 GIRI UK Panchangam PDF has been queued for download.')}
                  className="w-full py-2 bg-[#B99A5B] text-[#164E45] text-xs font-bold rounded-lg hover:bg-[#ffdea0] transition-colors flex items-center justify-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Download Digital Panchangam (PDF)</span>
                </button>
              </div>
            </div>

            {/* Policy Quick Links */}
            <div className="bg-[#f0eee7] rounded-xl p-5 border border-[#e5e2db] text-xs space-y-2">
              <span className="text-stone-500 font-bold uppercase tracking-wider text-[10px] block mb-2">Helpful Reference Pages</span>
              <button 
                onClick={() => onNavigate('delivery')}
                className="w-full text-left py-1.5 text-[#164E45] hover:text-[#00362f] font-semibold flex items-center justify-between group"
              >
                <span>Delivery &amp; Shipping Rates Matrix</span>
                <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="h-px bg-[#e5e2db]"></div>
              <button 
                onClick={() => onNavigate('on-demand')}
                className="w-full text-left py-1.5 text-[#164E45] hover:text-[#00362f] font-semibold flex items-center justify-between group"
              >
                <span>Bespoke Murti Commissions</span>
                <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="h-px bg-[#e5e2db]"></div>
              <button 
                onClick={() => onNavigate('about')}
                className="w-full text-left py-1.5 text-[#164E45] hover:text-[#00362f] font-semibold flex items-center justify-between group"
              >
                <span>Our 70-Year Mylapore to London Story</span>
                <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
