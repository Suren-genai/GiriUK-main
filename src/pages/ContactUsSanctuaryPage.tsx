import React, { useState } from 'react';
import { 
  Home, 
  ChevronRight, 
  Phone, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Check, 
  Navigation, 
  Send, 
  Sparkles,
  Train,
  Bus,
  Car
} from 'lucide-react';

interface ContactUsSanctuaryPageProps {
  onNavigateHome: () => void;
}

export const ContactUsSanctuaryPage: React.FC<ContactUsSanctuaryPageProps> = ({ onNavigateHome }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: '',
    orderRef: '',
    message: '',
    contactMethod: 'whatsapp',
    panchangamOptIn: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="w-full bg-[#FCF9F2]">
      {/* 1. BREADCRUMBS & EDITORIAL HERO */}
      <section className="w-full bg-[#f6f3ec] pb-8 pt-4 border-b border-[#e5e2db]">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="py-2 flex items-center gap-2 text-xs text-stone-500 mb-2">
            <button onClick={onNavigateHome} className="hover:text-[#164E45] flex items-center gap-1 cursor-pointer">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <span>/</span>
            <span>Customer Care</span>
            <span>/</span>
            <span className="text-[#164E45] font-bold">Contact Us &amp; Wembley Sanctuary</span>
          </nav>

          <div className="mt-2 p-6 sm:p-10 rounded-2xl bg-white shadow-xs border border-stone-200 relative overflow-hidden">
            <div className="relative z-10 max-w-4xl flex flex-col gap-3">
              <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-[#ffdea0] text-[#745b22] text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Sacred Seva &amp; Devotee Assistance • London &amp; Greater UK</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#00362f] tracking-tight font-medium">
                Connect with the GIRI UK Seva Desk &amp; Temple Sanctuary
              </h1>

              <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-3xl">
                Whether you seek ritual guidance for an upcoming Grihapravesham, wish to inspect sacred temple vigrahams in person at our Wembley cultural sanctuary, or require rapid delivery coordination across the UK &amp; Europe, our devoted sevaks are here to assist.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
                  <span className="font-semibold text-[#00362f]">Seva Desk Active Today</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1 text-stone-500">
                  <Clock className="w-3.5 h-3.5 text-[#745b22]" />
                  <span>Avg Phone Pick-up: &lt; 45 Seconds</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1 text-stone-500">
                  <MapPin className="w-3.5 h-3.5 text-[#745b22]" />
                  <span>3 Mins from Wembley Central Station</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 4 FAST DEVOTEE CONTACT CARDS */}
      <section className="w-full -mt-4 z-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Telephone */}
            <div className="bg-white p-5 rounded-2xl shadow-xs border border-stone-200 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#164E45]/10 flex items-center justify-center text-[#164E45]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-[#745b22] uppercase bg-[#ffdea0]/40 px-2 py-0.5 rounded">
                    Voice Help
                  </span>
                </div>
                <h3 className="font-serif text-base font-bold text-[#00362f]">Direct UK Helpline</h3>
                <p className="font-mono text-base font-bold text-[#745b22] mt-0.5 mb-2">+44 20 8903 8920</p>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Mon–Sat: 9:30 AM – 6:30 PM GMT<br/>
                  Sun &amp; Ekadashi: 10:00 AM – 3:00 PM GMT
                </p>
              </div>
              <a
                href="tel:+442089038920"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#164E45] text-white text-xs font-bold hover:bg-[#00362f] transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call London Helpline</span>
              </a>
            </div>

            {/* Card 2: WhatsApp */}
            <div className="bg-white p-5 rounded-2xl shadow-xs border border-stone-200 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 uppercase bg-emerald-100 px-2 py-0.5 rounded">
                    &lt; 15m Response
                  </span>
                </div>
                <h3 className="font-serif text-base font-bold text-[#00362f]">WhatsApp Temple Advisor</h3>
                <p className="font-mono text-base font-bold text-[#745b22] mt-0.5 mb-2">+44 7700 900821</p>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Real-time photos of brass vigrahams, muhurtham advice &amp; rapid dispatch updates.
                </p>
              </div>
              <a
                href="https://wa.me/447700900821"
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Card 3: Email Inquiries */}
            <div className="bg-white p-5 rounded-2xl shadow-xs border border-stone-200 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#ffdb96]/40 text-[#745b22] flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-[#745b22] uppercase bg-[#ffdea0]/40 px-2 py-0.5 rounded">
                    Sacred Desk
                  </span>
                </div>
                <h3 className="font-serif text-base font-bold text-[#00362f]">Sacred Devotee Desk</h3>
                <p className="font-mono text-xs font-semibold text-[#745b22] mt-0.5 mb-2 truncate">care@giriuk.com</p>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Temple consort orders, bulk mandir needs, festival sponsorships &amp; custom murti casting inquiries.
                </p>
              </div>
              <a
                href="mailto:care@giriuk.com"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#f6f3ec] text-[#00362f] text-xs font-bold hover:bg-stone-200 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email Our Sevaks</span>
              </a>
            </div>

            {/* Card 4: Wembley Sanctuary */}
            <div className="bg-white p-5 rounded-2xl shadow-xs border border-stone-200 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#00362f]/10 text-[#00362f] flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-[#00362f] uppercase bg-[#b7eee1]/50 px-2 py-0.5 rounded">
                    In-Person
                  </span>
                </div>
                <h3 className="font-serif text-base font-bold text-[#00362f]">Wembley Sanctuary</h3>
                <p className="text-xs font-semibold text-stone-800 mt-0.5 mb-2">48 Ealing Road, HA0 4TL</p>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Walk-in collection, consecrated brass viewing, silk trial sanctum, and Vedic library reading.
                </p>
              </div>
              <a
                href="#sanctuary-hub"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#745b22] text-white text-xs font-bold hover:bg-[#5a430b] transition-colors"
              >
                <span>Book Sanctuary Visit</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TWO-COLUMN INTERACTIVE HUB */}
      <section className="w-full py-12 px-4 sm:px-6 lg:px-8" id="sanctuary-hub">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT COLUMN: Inquiry Form */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl shadow-xs border border-stone-200 space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#745b22]">
                  DEVOTEE INQUIRY &amp; CONSULTATION
                </span>
                <h2 className="font-serif text-2xl font-bold text-[#00362f] mt-1">
                  How May We Serve Your Spiritual Practice?
                </h2>
                <p className="text-xs text-stone-600 mt-1">
                  Fill out the sacred inquiry form below and our knowledgeable team in Wembley will review your requirements with reverence and respond within one business day.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-stone-700 font-bold mb-1">Full Devotee Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Smt. Radhika Sundaram"
                    className="w-full px-3 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-[#164E45]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-700 font-bold mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@domain.co.uk"
                      className="w-full px-3 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-[#164E45]"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-bold mb-1">UK Contact / Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+44 7911 123456"
                      className="w-full px-3 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-[#164E45]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-700 font-bold mb-1">Nature of Inquiry *</label>
                    <select
                      required
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-stone-300 focus:outline-none"
                    >
                      <option value="">Select category...</option>
                      <option value="tracking">Order Status &amp; Tracking Assistance</option>
                      <option value="vigraham">Temple &amp; Mandir Vigraham Commission (Custom Panchaloha)</option>
                      <option value="festival">Festival Muhurtham &amp; Bulk Samagri (Deepavali / Navratri / Wedding)</option>
                      <option value="dancewear">Classical Dancewear &amp; Temple Jewellery Sizing</option>
                      <option value="scripture">Vedic Scriptures, Tamil Panchangam &amp; Sloka Translation</option>
                      <option value="appointment">Wembley Sanctuary Private Appointment</option>
                      <option value="other">Other Devotional Inquiry</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-stone-700 font-bold mb-1">Order Reference (Optional)</label>
                    <input
                      type="text"
                      value={formData.orderRef}
                      onChange={(e) => setFormData({ ...formData, orderRef: e.target.value })}
                      placeholder="#GUK-2026-XXXXX"
                      className="w-full px-3 py-2.5 rounded-lg border border-stone-300 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-700 font-bold mb-1">Ritual Requirements / Question Details *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Please describe your puja requirements, temple dimensions, auspicious muhurtham dates, or items you wish to inspect..."
                    className="w-full px-3 py-2.5 rounded-lg border border-stone-300 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-bold mb-1">Preferred Contact Method</label>
                  <div className="flex gap-4">
                    {['whatsapp', 'phone', 'email'].map((method) => (
                      <label key={method} className="flex items-center gap-1.5 cursor-pointer capitalize">
                        <input
                          type="radio"
                          name="contactMethod"
                          checked={formData.contactMethod === method}
                          onChange={() => setFormData({ ...formData, contactMethod: method })}
                          className="text-[#164E45]"
                        />
                        <span>{method === 'whatsapp' ? 'WhatsApp Chat' : method === 'phone' ? 'Phone Call' : 'Email Response'}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex items-start gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="panchangamOptIn"
                    checked={formData.panchangamOptIn}
                    onChange={(e) => setFormData({ ...formData, panchangamOptIn: e.target.checked })}
                    className="mt-0.5 text-[#164E45] rounded"
                  />
                  <label htmlFor="panchangamOptIn" className="text-stone-600">
                    Receive London GMT Panchangam alerts, auspicious festival tithis, and private sanctuary viewing invitations via email.
                  </label>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#164E45] hover:bg-[#00362f] text-white font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Send Sacred Inquiry</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] text-stone-400">Protected by 256-bit SSL encryption.</span>
                </div>

                {formSubmitted && (
                  <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 flex items-start gap-3 mt-4">
                    <CheckCircle className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-serif text-base font-bold">Om Namah Shivaya. Your message is received.</p>
                      <p className="mt-0.5 text-xs text-emerald-800">
                        A GIRI sevak at Wembley will connect via your preferred contact channel shortly.
                      </p>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* RIGHT COLUMN: Wembley Sanctuary Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#00362f] text-white p-6 sm:p-8 rounded-2xl shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase bg-[#ffdea0] text-[#261900] px-2.5 py-1 rounded">
                    SHIVAYAA CULTURAL HUB &amp; STOREFRONT
                  </span>
                  <span className="text-emerald-400 font-bold text-xs flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    Open Now
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#ffdea0]">Experience the Sanctum in Person</h3>
                  <p className="text-xs text-stone-200 mt-1">
                    Immerse your senses in authentic temple fragrances, hand-chiseled bronze idols, and woven silk dhotis.
                  </p>
                </div>

                <div className="relative rounded-xl overflow-hidden h-48 border border-stone-700">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQTurfvjp8oz53nZt-R0ndMkDTwtYMtoqR9dD38KHqYsaMUM4vx73q8jJ5z7UNA0dgTsptF7lncKyism3adnUi3F3CDTy6YqZUPuIox8RfqhFZSQQgi7k0nupvTl7OzUmfHQELXsTgv-n1Xx0ZX8hnDfmo0e0XTqhX8rvma02TH2v3Fx4byFuJKxDm3Op7R1qxwYvWByjJawWUyET2D2PFb72BK4sngH-7n0FgXQyQ"
                    alt="Wembley London Sanctuary"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-xs px-2.5 py-1 rounded text-[11px] text-white">
                    📍 Ealing Road Sanctuary, Wembley
                  </div>
                </div>

                <div className="bg-[#164e45] p-3.5 rounded-xl text-xs space-y-1">
                  <p className="font-bold text-white">48 Ealing Road, Wembley, Greater London HA0 4TL</p>
                  <p className="text-stone-300">3 mins walk from Wembley Central Station (Bakerloo Line &amp; Overground)</p>
                </div>

                <div className="space-y-1.5 text-xs text-stone-300">
                  <div className="flex justify-between py-1 border-b border-stone-700">
                    <span>Monday – Saturday:</span>
                    <span className="font-bold text-white">09:30 – 18:30 GMT</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-700">
                    <span>Sunday &amp; Ekadashi Days:</span>
                    <span className="font-bold text-white">10:00 – 15:00 GMT</span>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <a
                    href="https://maps.google.com/?q=48+Ealing+Road+Wembley+HA0+4TL"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2.5 rounded-full bg-[#cca730] text-[#002b25] text-xs font-bold hover:bg-[#b89528] text-center flex items-center justify-center gap-1.5"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Google Maps Directions</span>
                  </a>
                </div>
              </div>

              {/* Transit & Parking */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 text-xs space-y-2.5 shadow-xs">
                <h4 className="font-serif text-base font-bold text-[#00362f] flex items-center gap-1.5">
                  <Navigation className="w-4 h-4 text-[#745b22]" />
                  <span>Getting Here &amp; Parking</span>
                </h4>
                <div className="space-y-2 text-stone-600">
                  <div className="flex items-start gap-2">
                    <Train className="w-4 h-4 text-[#164E45] shrink-0 mt-0.5" />
                    <p><strong>Underground &amp; Rail:</strong> Wembley Central Station is a 300m walk.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Bus className="w-4 h-4 text-[#164E45] shrink-0 mt-0.5" />
                    <p><strong>Bus Routes:</strong> Buses 79, 83, 204, 297, and 483 stop right outside.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Car className="w-4 h-4 text-[#164E45] shrink-0 mt-0.5" />
                    <p><strong>Parking:</strong> Dedicated customer loading bay behind sanctuary for heavy brass murtis.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. STORE LOCATOR & AFFILIATED MANDIR HUBS */}
      <section className="w-full py-12 bg-[#f6f3ec] border-t border-[#e5e2db] px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1320px] mx-auto space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#745b22]">
              NETWORK &amp; FULFILMENT SANCTUARIES
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#00362f] mt-1">
              GIRI UK Collection Points &amp; Temple Partner Desks
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-xs border-t-4 border-[#745b22] border-x border-b border-stone-200 space-y-3">
              <span className="text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                Primary Hub
              </span>
              <h3 className="font-serif text-lg font-bold text-[#00362f]">Wembley Flagship &amp; Fulfilment Sanctuary</h3>
              <p className="text-xs text-stone-600">48 Ealing Road, Wembley, London HA0 4TL</p>
              <p className="text-xs font-bold text-[#745b22]">Tel: +44 20 8903 8920</p>
              <div className="pt-2 text-[11px] text-stone-500 space-y-1">
                <p>✓ Full Retail Showroom</p>
                <p>✓ Click &amp; Collect (2h)</p>
                <p>✓ Custom Vigraham Sizing</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-xs border border-stone-200 space-y-3">
              <span className="text-[10px] font-bold uppercase bg-stone-100 text-stone-700 px-2 py-0.5 rounded">
                Partner Point
              </span>
              <h3 className="font-serif text-lg font-bold text-[#00362f]">Neasden &amp; Brentfield Road Collection Point</h3>
              <p className="text-xs text-stone-600">Brentfield Road Mandir Area, London NW10 8HE</p>
              <p className="text-xs font-medium text-stone-500">Pre-order collection desk</p>
              <div className="pt-2 text-[11px] text-stone-500 space-y-1">
                <p>✓ Festival Samagri Pickup</p>
                <p>✓ Panchangam Distribution</p>
                <p>✓ Daily Temple Dhoop Stocks</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-xs border border-stone-200 space-y-3">
              <span className="text-[10px] font-bold uppercase bg-stone-100 text-stone-700 px-2 py-0.5 rounded">
                Midlands Hub
              </span>
              <h3 className="font-serif text-lg font-bold text-[#00362f]">Leicester Diaspora Seva Counter</h3>
              <p className="text-xs text-stone-600">Belgrave Road (Golden Mile), Leicester LE4 6AS</p>
              <p className="text-xs font-bold text-[#745b22]">Tel: +44 116 266 8920</p>
              <div className="pt-2 text-[11px] text-stone-500 space-y-1">
                <p>✓ Navratri Golu Essentials</p>
                <p>✓ Dancewear Fittings</p>
                <p>✓ Festive Lighting &amp; Brass</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
