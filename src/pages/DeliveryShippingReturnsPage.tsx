import React, { useState } from 'react';
import { 
  Truck, 
  Clock, 
  RotateCcw, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Package, 
  Box, 
  Sparkles, 
  QrCode, 
  FileText, 
  ArrowRight, 
  Phone, 
  MessageSquare, 
  ChevronDown,
  Info,
  Layers,
  MapPin,
  ExternalLink,
  X
} from 'lucide-react';

interface DeliveryShippingReturnsPageProps {
  onNavigate: (page: string) => void;
  onOpenTrackOrder?: () => void;
}

export default function DeliveryShippingReturnsPage({ onNavigate, onOpenTrackOrder }: DeliveryShippingReturnsPageProps) {
  const [openFaq, setOpenFaq] = useState<Record<string, boolean>>({
    'faq-1': true
  });
  const [showPortalModal, setShowPortalModal] = useState(false);
  const [portalOrderNum, setPortalOrderNum] = useState('');
  const [portalPostcode, setPortalPostcode] = useState('');
  const [portalResult, setPortalResult] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenFaq(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handlePortalLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!portalOrderNum || !portalPostcode) return;
    setPortalResult(`Order #${portalOrderNum.toUpperCase()} verified for postal code ${portalPostcode.toUpperCase()}. Royal Mail Paperless Return QR Code #RM-GUK-9921 has been generated and dispatched to your email.`);
  };

  return (
    <div className="w-full bg-[#fcf9f2] min-h-screen text-[#1c1c18]">
      
      {/* Top Breadcrumb & Micro Tracker Bar */}
      <div className="w-full bg-[#f0eee7] border-b border-[#e5e2db] py-2.5 px-4 md:px-8">
        <div className="max-w-[1320px] mx-auto flex flex-wrap items-center justify-between gap-2 text-xs text-stone-600">
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
            <span className="text-[#164E45] font-bold">Delivery, Shipping &amp; Returns Protocol</span>
          </nav>

          <div className="hidden sm:flex items-center gap-3">
            <span className="flex items-center gap-1 text-[11px] font-semibold bg-[#e5e2db] px-2.5 py-1 rounded-full text-[#745b22]">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              Wembley Hub Dispatch: Active Today (Cut-off 2:00 PM GMT)
            </span>
          </div>
        </div>
      </div>

      {/* Hero Editorial Header with Sacred Ornamentation */}
      <section className="w-full relative overflow-hidden bg-gradient-to-b from-[#f6f3ec] via-[#fcf9f2] to-[#fcf9f2] py-12 md:py-20 px-4 md:px-8 border-b border-[#e5e2db]">
        <div className="max-w-[1320px] mx-auto relative z-10">
          <div className="max-w-3xl flex flex-col gap-3">
            <div className="inline-flex items-center gap-2 w-fit bg-[#ffdb96]/60 text-[#795f26] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B99A5B]" />
              <span>Sanctified Logistics &amp; Devotee Peace of Mind</span>
            </div>
            
            <h1 className="font-serif text-3xl md:text-5xl text-[#164E45] font-semibold tracking-tight leading-tight">
              Our Sacred Delivery &amp; Reverent Returns Protocol
            </h1>
            
            <p className="text-stone-600 text-base md:text-lg leading-relaxed mt-1">
              Handled with devotional care from our London &amp; Wembley logistics sanctorum directly to your home altar. Transparent UK &amp; EU timelines, guaranteed safe transit for sanctified murtis, and our respectful 14-day restitution commitment.
            </p>
          </div>

          {/* Quick Highlights Grid (3-Card Accentuated Ribbon) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
            <div className="bg-white p-6 rounded-xl border border-[#e5e2db] shadow-xs flex items-start gap-4 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#B99A5B] border border-amber-200 flex items-center justify-center shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#B99A5B] uppercase tracking-wider block">Free Delivery Threshold</span>
                <h2 className="font-serif text-lg font-bold text-[#164E45] mt-0.5">Complimentary UK Tracked</h2>
                <p className="text-xs text-stone-600 mt-1">Orders £50 and over qualify automatically. Flat £3.99 for all smaller puja orders via Royal Mail 48.</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#e5e2db] shadow-xs flex items-start gap-4 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#164E45] border border-emerald-200 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#164E45] uppercase tracking-wider block">Same-Day London Dispatch</span>
                <h2 className="font-serif text-lg font-bold text-[#164E45] mt-0.5">2:00 PM GMT Cut-Off</h2>
                <p className="text-xs text-stone-600 mt-1">Orders placed Monday through Friday ship same day from our dedicated Wembley cultural depot.</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#e5e2db] shadow-xs flex items-start gap-4 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#745b22] border border-amber-200 flex items-center justify-center shrink-0">
                <RotateCcw className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#745b22] uppercase tracking-wider block">Sacred Restitution</span>
                <h2 className="font-serif text-lg font-bold text-[#164E45] mt-0.5">14-Day Respectful Return</h2>
                <p className="text-xs text-stone-600 mt-1">Hassle-free QR returns for lifestyle &amp; books; reverent temple protocol for sanctified murtis &amp; brassware.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Detailed Rates & Tariffs Matrix */}
      <section className="w-full py-12 md:py-16 bg-[#fcf9f2]">
        <div className="max-w-[1320px] mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[11px] font-bold text-[#B99A5B] uppercase tracking-widest block">Transparent UK &amp; European Shipping</span>
              <h2 className="font-serif text-2xl md:text-4xl text-[#164E45] font-semibold mt-1">Delivery Methods, Timeframes &amp; Costs</h2>
              <p className="text-stone-600 text-sm md:text-base max-w-2xl mt-1">
                Every parcel is barcoded, fully insured against transit shock, and dispatched in custom protective materials to honor sacred goods.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-stone-500 text-xs">
              <Info className="w-4 h-4 text-[#B99A5B]" />
              <span>Prices include all UK VAT at prevailing rates.</span>
            </div>
          </div>

          {/* Shipping Rates Table */}
          <div className="overflow-x-auto rounded-xl bg-white border border-[#e5e2db] shadow-xs">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-[#f0eee7] text-stone-800 text-xs font-bold uppercase tracking-wider border-b border-[#e5e2db]">
                  <th className="py-4 px-6">Delivery Service</th>
                  <th className="py-4 px-6">Carrier &amp; Tracking</th>
                  <th className="py-4 px-6">Estimated Transit Time</th>
                  <th className="py-4 px-6">Cost / Threshold</th>
                  <th className="py-4 px-6 text-right">Special Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0eee7] text-sm">
                
                {/* Row 1 */}
                <tr className="hover:bg-[#fcf9f2] transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-emerald-50 text-[#164E45] flex items-center justify-center shrink-0">
                        <Truck className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-[#164E45] block">UK Standard Tracked</span>
                        <span className="text-xs text-stone-500">Recommended for non-urgent items</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 text-xs">
                      <span className="font-bold text-rose-700">Royal Mail</span> Tracked 48
                    </span>
                  </td>
                  <td className="py-4 px-6 text-stone-600">
                    <span className="font-semibold text-stone-900 block text-xs">2–3 Business Days</span>
                    <span className="text-[11px] text-stone-500">SMS &amp; Email status updates</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-bold text-[#164E45] text-base block">£3.99</span>
                    <span className="text-xs text-[#B99A5B] font-bold">FREE on orders over £50</span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span className="inline-block bg-[#f0eee7] px-3 py-1 rounded-full text-xs text-stone-700">
                      No signature required; safe place enabled
                    </span>
                  </td>
                </tr>

                {/* Row 2 */}
                <tr className="hover:bg-[#fcf9f2] transition-colors bg-[#fdfbf7]">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-amber-50 text-[#B99A5B] flex items-center justify-center shrink-0">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-[#164E45] block">UK Priority Express</span>
                        <span className="text-xs text-stone-500">Ideal for auspicious dates &amp; pujas</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 text-xs">
                      <span className="font-bold text-rose-700">Royal Mail</span> Tracked 24
                    </span>
                  </td>
                  <td className="py-4 px-6 text-stone-600">
                    <span className="font-semibold text-stone-900 block text-xs">1–2 Business Days</span>
                    <span className="text-[11px] text-stone-500">Priority mail sorting stream</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-bold text-[#164E45] text-base">£5.99</span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span className="inline-block bg-[#ffdea0]/60 px-3 py-1 rounded-full text-xs text-[#745b22] font-semibold">
                      Delivers Mon–Sat across mainland UK
                    </span>
                  </td>
                </tr>

                {/* Row 3 */}
                <tr className="hover:bg-[#fcf9f2] transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-emerald-100/50 text-[#164E45] flex items-center justify-center shrink-0">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-[#164E45] block">Guaranteed Next Day by 1:00 PM</span>
                        <span className="text-xs text-stone-500">For urgent temple preparations</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 text-xs">
                      <span className="font-bold text-[#164E45]">DPD Express</span> or RM Special
                    </span>
                  </td>
                  <td className="py-4 px-6 text-stone-600">
                    <span className="font-semibold text-stone-900 block text-xs">Next Working Day</span>
                    <span className="text-[11px] text-stone-500">Guaranteed before 1:00 PM</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-bold text-[#164E45] text-base">£8.50</span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span className="inline-block bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full text-xs font-semibold">
                      1-Hour interactive delivery slot
                    </span>
                  </td>
                </tr>

                {/* Row 4 */}
                <tr className="hover:bg-[#fcf9f2] transition-colors bg-[#fdfbf7]">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#B99A5B]/20 text-[#745b22] flex items-center justify-center shrink-0">
                        <Package className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-[#164E45] block">European Union (EU) Tracked</span>
                        <span className="text-xs text-stone-500">Direct service to 24 European nations</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 text-xs">
                      <span className="font-bold text-stone-800">DHL Express / DPD Europe</span>
                    </span>
                  </td>
                  <td className="py-4 px-6 text-stone-600">
                    <span className="font-semibold text-stone-900 block text-xs">3–5 Business Days</span>
                    <span className="text-[11px] text-stone-500">Full door-to-door tracking</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-bold text-[#164E45] text-base block">£12.50</span>
                    <span className="text-[11px] text-stone-500">Standard weights up to 2.5kg</span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span className="inline-block bg-[#164E45] text-white px-3 py-1 rounded-full text-xs font-medium">
                      IOSS Pre-cleared: No surprise customs
                    </span>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>

          {/* Highlands & Islands Notes */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#f0eee7] p-5 rounded-xl border border-[#e5e2db] flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#B99A5B] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-bold text-[#164E45] uppercase tracking-wider">Scottish Highlands, Northern Ireland &amp; Channel Islands</h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  We never levy surcharges on Royal Mail Tracked services for offshore UK addresses (BT, IV, HS, ZE, IM, GY, JE). Please allow an additional 24 hours for final inter-island ferry transfer.
                </p>
              </div>
            </div>

            <div className="bg-[#f0eee7] p-5 rounded-xl border border-[#e5e2db] flex items-start gap-3">
              <Box className="w-5 h-5 text-[#B99A5B] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-bold text-[#164E45] uppercase tracking-wider">EU IOSS (Import One-Stop Shop) Guarantee</h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  For EU consignments under €150, VAT is collected at our UK checkout. Your parcel clears European customs electronically without local administration handling surcharges or postal delays.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Sanctified Transit Packaging & Unboxing Protocol */}
      <section className="w-full py-12 md:py-20 bg-[#f0eee7] border-y border-[#e5e2db]">
        <div className="max-w-[1320px] mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-[#ffdea0]/60 px-3 py-1 rounded-full text-[#745b22] text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#B99A5B]" />
              <span>Reverence in Every Parcel</span>
            </div>
            <h2 className="font-serif text-2xl md:text-4xl text-[#164E45] font-semibold">The Sanctified Packaging Standard</h2>
            <p className="text-stone-600 text-sm md:text-base mt-2">
              Sacred idols, traditional Vilakkus, and holy stotra books require more than standard commerce logistics. Every item is treated as an extension of our collective faith.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-xl border border-[#e5e2db] shadow-xs flex flex-col justify-between hover:shadow-md transition-all relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-14 h-14 bg-[#f0eee7] rounded-bl-2xl flex items-start justify-end p-2.5 text-[#B99A5B] font-bold font-serif text-base">
                01
              </div>
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#164E45] border border-emerald-200 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#164E45]">Sanctum Inspection &amp; Cleansing</h3>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  Brass metal purity and casting balance are verified by seasoned sevaks. Surfaces are gently wiped with pure natural cotton infused with Gangajal and sacred vibhuti aroma.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-stone-100 text-[10px] font-bold uppercase tracking-wider text-[#B99A5B]">
                Devotional Quality Seal
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-xl border border-[#e5e2db] shadow-xs flex flex-col justify-between hover:shadow-md transition-all relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-14 h-14 bg-[#f0eee7] rounded-bl-2xl flex items-start justify-end p-2.5 text-[#B99A5B] font-bold font-serif text-base">
                02
              </div>
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#745b22] border border-amber-200 flex items-center justify-center mb-4">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#164E45]">Saffron Cloth Swaddling</h3>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  Every deity murti and consecrated metalwork is lovingly hand-wrapped in auspicious saffron-tinted unbleached cotton to prevent scratch abrasions during international transit.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-stone-100 text-[10px] font-bold uppercase tracking-wider text-[#B99A5B]">
                Touch-Safe Sacred Cloth
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-xl border border-[#e5e2db] shadow-xs flex flex-col justify-between hover:shadow-md transition-all relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-14 h-14 bg-[#f0eee7] rounded-bl-2xl flex items-start justify-end p-2.5 text-[#B99A5B] font-bold font-serif text-base">
                03
              </div>
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center mb-4">
                  <Box className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#164E45]">Zero-Plastic Honeycomb Shield</h3>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  We reject cheap petrochemical bubble wrap. Heavy brass items are encased in multi-layered, shock-absorbing Geami paper cushioning and sturdy recyclable rigid outer boxes.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-stone-100 text-[10px] font-bold uppercase tracking-wider text-[#B99A5B]">
                100% Biodegradable Transit
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-6 rounded-xl border border-[#e5e2db] shadow-xs flex flex-col justify-between hover:shadow-md transition-all relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-14 h-14 bg-[#f0eee7] rounded-bl-2xl flex items-start justify-end p-2.5 text-[#B99A5B] font-bold font-serif text-base">
                04
              </div>
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#B99A5B] border border-amber-200 flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#164E45]">Devotee Unboxing Blessings</h3>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  Each package arrives accompanied by an authentic Tirupati-consecrated prasadam packet, an energizing unboxing stotra, and a certificate of temple authenticity.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-stone-100 text-[10px] font-bold uppercase tracking-wider text-[#B99A5B]">
                Temple Prasadam Included
              </div>
            </div>

          </div>

          {/* Double-Casket Feature Split Banner */}
          <div className="mt-10 bg-white rounded-xl border border-[#e5e2db] shadow-xs overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 p-6 md:p-10 flex flex-col gap-3">
              <span className="text-[11px] font-bold text-[#B99A5B] uppercase tracking-widest">Fragile Brass &amp; Clay Idols</span>
              <h3 className="font-serif text-2xl font-bold text-[#164E45]">Double-Casket Boxing for Murtis over 20cm</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                For sacred deities weighing more than 2kg or exceeding 20cm in height (such as Lord Nataraja or Brihadeeswarar bronze replicas), our logistics craftsmen utilize custom internal wood-reinforced skeletal frames to protect intricate mudras, tridents, and prabhavalis from courier vibration.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-semibold text-stone-800">
                <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Transit Insurance Included Free
                </span>
                <span className="flex items-center gap-1.5 bg-amber-50 text-[#745b22] px-3 py-1.5 rounded-full border border-amber-200">
                  <CheckCircle2 className="w-4 h-4 text-[#B99A5B]" />
                  Instant Free Replacements If Damaged
                </span>
              </div>
            </div>
            
            <div 
              className="lg:col-span-5 h-64 lg:h-full min-h-[240px] bg-cover bg-center"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCz46RB4eTU8qQFtxHgQjAlShuux3J3WBH82xVCAsv8rAm3UgCL8QHSZbHEV1yQcYx9HOQ5MU8LR7boiZu-fUm_l_C2mKAoi8gs4vOL0jaSeRQtzHaxvn72qblB3riiWJpkkE-oNVo6lvIvOzpUVb6aM5gbQx5Pa3ydJWbExzE937n5LzlS_WnRo6LJxJRGVklWS0gH_TOa-PCqAc9niPGeGQsjSkSMkeXyDHNw5CsG')`
              }}
            ></div>
          </div>
        </div>
      </section>

      {/* Section 3: Returns, Replacements & Sacred Restitution Protocol */}
      <section className="w-full py-12 md:py-20 bg-[#fcf9f2]">
        <div className="max-w-[1320px] mx-auto px-4 md:px-8">
          <div className="max-w-3xl mb-10">
            <span className="text-[11px] font-bold text-[#B99A5B] uppercase tracking-widest block">Transparent Reassurance</span>
            <h2 className="font-serif text-2xl md:text-4xl text-[#164E45] font-semibold mt-1">Our 14-Day Returns &amp; Exchange Policy</h2>
            <p className="text-stone-600 text-sm md:text-base mt-2 leading-relaxed">
              We want your home altar and ritual practice to be filled with deep joy and reverence. If a selected item is not suited to your sanctum, our respectful restitution process ensures prompt resolutions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Card 1: What Can Be Returned */}
            <div className="bg-white p-6 md:p-8 rounded-xl border border-[#e5e2db] shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#164E45] border border-emerald-200 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#164E45]">Eligible Items</h3>
                <p className="text-xs text-stone-500 mt-1 mb-4">
                  Returnable within 14 calendar days of documented carrier delivery:
                </p>
                <ul className="space-y-2.5 text-xs text-stone-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B99A5B] mt-0.5 shrink-0" />
                    <span>Unlit brass &amp; silver lamps (Kuthuvilakku, Kamakshi Vilakku, Aarti)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B99A5B] mt-0.5 shrink-0" />
                    <span>Unblemished brass, bronze, and marble idols in original presentation box</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B99A5B] mt-0.5 shrink-0" />
                    <span>Vedic literature, stotra scriptures, and children's mythological books</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B99A5B] mt-0.5 shrink-0" />
                    <span>Unopened classical Bharatanatyam jewellery and costume textiles</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 bg-[#f0eee7] p-3 rounded-lg text-xs text-stone-600">
                Full refund issued to original payment method within 3–5 working days of receipt.
              </div>
            </div>

            {/* Card 2: Sacred Item Protocol */}
            <div className="bg-white p-6 md:p-8 rounded-xl border border-[#B99A5B]/40 shadow-xs flex flex-col justify-between relative">
              <div className="absolute top-3 right-3 px-2 py-0.5 bg-[#ffdea0] text-[#745b22] text-[10px] font-bold rounded">
                Agamic Rule
              </div>
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#745b22] border border-amber-200 flex items-center justify-center mb-4">
                  <RotateCcw className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#164E45]">Sacred Murti Sanctity Rule</h3>
                <p className="text-xs text-stone-500 mt-1 mb-4">
                  How we respectfully handle damaged idols in spiritual compliance:
                </p>
                <div className="space-y-3 text-xs text-stone-600 leading-relaxed">
                  <p>
                    In strict adherence to Shastric tradition, <strong className="text-[#164E45] font-semibold">GIRI UK never discards broken or transit-damaged sanctified murtis into standard commercial recycling.</strong>
                  </p>
                  <p>
                    If your murti arrives fractured, please do not discard it. We arrange an immediate free replacement and provide a pre-paid courier pouch to transfer the damaged murti to our Wembley Mandir Custody for traditional ritual immersion (<em>Jal Samadhi</em>).
                  </p>
                </div>
              </div>
              <div className="mt-6 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-[#745b22] font-bold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#B99A5B]" />
                <span>Zero Desecration Guarantee</span>
              </div>
            </div>

            {/* Card 3: Non-Returnable Consumables */}
            <div className="bg-white p-6 md:p-8 rounded-xl border border-[#e5e2db] shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-stone-100 text-stone-600 border border-stone-200 flex items-center justify-center mb-4">
                  <AlertCircle className="w-6 h-6 text-stone-400" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#164E45]">Non-Returnable Puja Goods</h3>
                <p className="text-xs text-stone-500 mt-1 mb-4">
                  To uphold sanctified ritual purity, we cannot accept returns on:
                </p>
                <ul className="space-y-2.5 text-xs text-stone-700">
                  <li className="flex items-start gap-2">
                    <span className="w-3.5 h-3.5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center text-[10px] font-bold mt-0.5 shrink-0">✕</span>
                    <span>Unsealed Kumkum, Vibhuti, Sandalwood pastes &amp; Chandan rolls</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-3.5 h-3.5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center text-[10px] font-bold mt-0.5 shrink-0">✕</span>
                    <span>Natural Pachai Karpooram (Camphor) and cold-pressed Deepam sesame oils</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-3.5 h-3.5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center text-[10px] font-bold mt-0.5 shrink-0">✕</span>
                    <span>Sacred threads (Yagnopaveetam / Poonal) once outer envelope seal is broken</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-3.5 h-3.5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center text-[10px] font-bold mt-0.5 shrink-0">✕</span>
                    <span>Customised or specially ordained homam samagri sets</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 bg-[#f0eee7] p-3 rounded-lg text-xs text-stone-600">
                If any consumable arrives leaked in transit, a photo qualifies for immediate reshipment.
              </div>
            </div>

          </div>

          {/* How to Initiate a Return: 3 Steps */}
          <div className="mt-12 p-8 md:p-10 bg-[#f0eee7] rounded-xl border border-[#e5e2db]">
            <h3 className="font-serif text-2xl font-bold text-[#164E45] text-center mb-8">
              Initiating Your Return in 3 Intuitive Steps
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-[#164E45] text-white font-bold text-lg flex items-center justify-center mb-3 shadow-sm">
                  1
                </div>
                <h4 className="font-bold text-sm text-[#164E45]">Access Online Returns Portal</h4>
                <p className="text-xs text-stone-600 mt-1 max-w-xs">
                  Input your 6-digit GIRI order number (e.g. #GUK-8842) and UK postcode via our automated self-serve returns portal.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-[#164E45] text-white font-bold text-lg flex items-center justify-center mb-3 shadow-sm">
                  2
                </div>
                <h4 className="font-bold text-sm text-[#164E45]">Obtain Paperless QR Code</h4>
                <p className="text-xs text-stone-600 mt-1 max-w-xs">
                  No printer required. Present the generated Royal Mail digital QR code at any Post Office counter or Customer Service Point.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-[#164E45] text-white font-bold text-lg flex items-center justify-center mb-3 shadow-sm">
                  3
                </div>
                <h4 className="font-bold text-sm text-[#164E45]">Inspection &amp; Speedy Restitution</h4>
                <p className="text-xs text-stone-600 mt-1 max-w-xs">
                  Upon reception at our Wembley warehouse, our inspection team verifies condition and processes your full reimbursement within 72 hours.
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button 
                onClick={() => setShowPortalModal(true)}
                className="px-6 py-3 rounded-full bg-[#164E45] text-white font-semibold text-sm hover:bg-[#00362f] transition-all flex items-center gap-2 shadow-sm"
              >
                <QrCode className="w-4 h-4 text-[#B99A5B]" />
                <span>Launch Paperless Returns Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Interactive Frequently Asked Questions */}
      <section className="w-full py-12 md:py-16 bg-[#f0eee7] border-t border-[#e5e2db]">
        <div className="max-w-[1020px] mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <span className="text-[11px] font-bold text-[#B99A5B] uppercase tracking-widest block">Got Questions?</span>
            <h2 className="font-serif text-2xl md:text-3xl text-[#164E45] font-semibold mt-1">Frequently Asked Delivery &amp; Returns Inquiries</h2>
            <p className="text-stone-600 text-sm mt-1">Everything you need to know about receiving and returning your devotional treasures.</p>
          </div>

          <div className="space-y-4">
            
            <div className="bg-white rounded-xl border border-[#e5e2db] shadow-xs overflow-hidden">
              <button
                onClick={() => toggleFaq('faq-1')}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif text-lg font-semibold text-[#164E45]"
              >
                <span>What happens if my Brass Idol or Diya arrives damaged?</span>
                <ChevronDown className={`w-5 h-5 text-[#B99A5B] transition-transform ${openFaq['faq-1'] ? 'rotate-180' : ''}`} />
              </button>
              {openFaq['faq-1'] && (
                <div className="px-5 pb-5 pt-1 text-sm text-stone-600 leading-relaxed border-t border-stone-100">
                  In the rare event of transit shock or damage, photograph the item alongside its packaging and email us at <strong>care@giriuk.co.uk</strong> or WhatsApp our London helpline at <strong>+44 20 8903 8920</strong> within 48 hours. We dispatch an immediate priority replacement free of charge and provide instructions for the respectful surrender of the broken deity under our sacred protocol.
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl border border-[#e5e2db] shadow-xs overflow-hidden">
              <button
                onClick={() => toggleFaq('faq-2')}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif text-lg font-semibold text-[#164E45]"
              >
                <span>Do I need to pay customs duties or import taxes in the EU?</span>
                <ChevronDown className={`w-5 h-5 text-[#B99A5B] transition-transform ${openFaq['faq-2'] ? 'rotate-180' : ''}`} />
              </button>
              {openFaq['faq-2'] && (
                <div className="px-5 pb-5 pt-1 text-sm text-stone-600 leading-relaxed border-t border-stone-100">
                  No! Under the European Union Import One-Stop Shop (IOSS) framework, VAT is included at checkout for orders under €150. Your parcel clears customs electronically without any extra handling fees from your local national post (such as La Poste, Deutsche Post, or An Post).
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl border border-[#e5e2db] shadow-xs overflow-hidden">
              <button
                onClick={() => toggleFaq('faq-3')}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif text-lg font-semibold text-[#164E45]"
              >
                <span>Can I collect my order in person from your Wembley hub?</span>
                <ChevronDown className={`w-5 h-5 text-[#B99A5B] transition-transform ${openFaq['faq-3'] ? 'rotate-180' : ''}`} />
              </button>
              {openFaq['faq-3'] && (
                <div className="px-5 pb-5 pt-1 text-sm text-stone-600 leading-relaxed border-t border-stone-100">
                  Yes, simply choose <strong>"Collection at Wembley Sanctuary"</strong> during checkout. Most orders placed before 1:00 PM GMT are packed and ready within 2 hours. You will receive an SMS and email notification with your dedicated collection QR code.
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl border border-[#e5e2db] shadow-xs overflow-hidden">
              <button
                onClick={() => toggleFaq('faq-4')}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif text-lg font-semibold text-[#164E45]"
              >
                <span>How do I track my shipment once it has left your logistics center?</span>
                <ChevronDown className={`w-5 h-5 text-[#B99A5B] transition-transform ${openFaq['faq-4'] ? 'rotate-180' : ''}`} />
              </button>
              {openFaq['faq-4'] && (
                <div className="px-5 pb-5 pt-1 text-sm text-stone-600 leading-relaxed border-t border-stone-100">
                  As soon as Royal Mail or DPD scans your consignment at our Wembley depot, you will receive an SMS and email containing your live tracking reference. You can also use our website's <button onClick={onOpenTrackOrder} className="text-[#164E45] font-bold underline">Track Order</button> tool at any time.
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Direct Temple Seva Call to Action Banner */}
      <section className="w-full py-10 px-4 md:px-8 bg-[#164E45] text-white">
        <div className="max-w-[1320px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-[#B99A5B] text-xs font-semibold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Temple Seva Assistance</span>
            </div>
            <h3 className="font-serif text-2xl font-bold">Need Muhurtham or Festival Delivery Guarantees?</h3>
            <p className="text-stone-300 text-xs md:text-sm mt-1 max-w-xl">
              Preparing for an auspicious Grihapravesham, wedding ritual, or urgent festival puja? Speak directly with our Wembley logistics co-ordinators for expedited courier solutions and special vehicle dispatch within Greater London.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a 
              href="tel:+442089038920"
              className="px-5 py-2.5 rounded-full bg-[#B99A5B] text-[#164E45] font-semibold text-xs md:text-sm hover:bg-[#ffdea0] transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-4 h-4" />
              <span>+44 20 8903 8920</span>
            </a>
            <a 
              href="https://wa.me/447700900821"
              target="_blank"
              rel="noopener noreferrer" 
              className="px-5 py-2.5 rounded-full bg-emerald-700 text-white font-semibold text-xs md:text-sm hover:bg-emerald-600 transition-colors flex items-center gap-1.5"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Seva Team</span>
            </a>
          </div>
        </div>
      </section>

      {/* Paperless Returns Portal Modal */}
      {showPortalModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-[#e5e2db]">
            <button 
              onClick={() => { setShowPortalModal(false); setPortalResult(null); }}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#164E45] flex items-center justify-center">
                <QrCode className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#164E45]">Royal Mail Paperless Returns</h3>
                <p className="text-xs text-stone-500">Generate an instant printable or digital QR code</p>
              </div>
            </div>

            {portalResult ? (
              <div className="space-y-4">
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 leading-relaxed">
                  <div className="flex items-center gap-2 font-bold mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Return Authorization Approved</span>
                  </div>
                  {portalResult}
                </div>
                
                <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl flex items-center justify-center flex-col gap-2">
                  <div className="w-32 h-32 bg-white p-2 border border-stone-300 rounded-lg flex items-center justify-center">
                    <QrCode className="w-24 h-24 text-stone-800" />
                  </div>
                  <span className="text-[11px] font-mono text-stone-600">RM-GUK-9921-2026</span>
                  <span className="text-[10px] text-stone-500 text-center">Take your item and this barcode to any UK Post Office counter.</span>
                </div>

                <button
                  onClick={() => { setShowPortalModal(false); setPortalResult(null); }}
                  className="w-full py-2.5 rounded-full bg-[#164E45] text-white text-xs font-semibold hover:bg-[#00362f]"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handlePortalLookup} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    GIRI UK Order Reference *
                  </label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. GUK-8842 or 8842"
                    value={portalOrderNum}
                    onChange={(e) => setPortalOrderNum(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#164E45]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Delivery Postcode *
                  </label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. HA0 4TL or SW1A 1AA"
                    value={portalPostcode}
                    onChange={(e) => setPortalPostcode(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#164E45]"
                  />
                </div>

                <div className="text-[11px] text-stone-500 leading-relaxed bg-[#fcf9f2] p-2.5 rounded-lg border border-stone-200">
                  <span className="font-semibold text-stone-700">Sacred Restitution Note:</span> If this parcel contains a broken vigraham or idol, it will be directed to our Wembley Temple Custody for sacred Jal Samadhi.
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-full bg-[#164E45] text-white text-xs font-semibold hover:bg-[#00362f] transition-colors"
                >
                  Lookup Order &amp; Generate QR
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
