import { Product, Coupon, BlogPost, Testimonial, Order } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Antique Handcrafted Brass Nataraja Shiva Idol (12")',
    subtitle: 'Cosmic Dance of Lord Shiva with Sacred Prabhavali Arch',
    category: 'Idols & Handicrafts',
    subcategory: 'Brass Idols',
    sku: 'GUK-IDL-BRS-001',
    price: 84.99,
    originalPrice: 99.99,
    inStock: true,
    stockCount: 14,
    rating: 4.9,
    reviewCount: 38,
    image: '/src/assets/images/brass_idol_nataraja_1793710748927.jpg',
    description: 'Masterfully cast in heavy solid brass by traditional artisans in Kumbakonam, Tamil Nadu. Lord Nataraja stands poised upon the dwarf of ignorance (Apasmara), encircled by the sacred flame arch. Treated with an authentic temple-patina finish that resists oxidation and deepens with sacred abhishekams.',
    material: 'Pure Solid Brass (Panchaloha grade)',
    dimensions: 'Height: 12 inches (30.5 cm) | Base Width: 7 inches',
    weight: '3.4 kg',
    tags: ['Nataraja', 'Brass', 'Idol', 'Shiva', 'Kumbakonam'],
    isBestSeller: true,
    isFestivalSpecial: true
  },
  {
    id: 'prod-2',
    name: 'Royal Astha Lakshmi Embossed Brass Puja Thali Set (9 Pcs)',
    subtitle: 'Complete Daily Puja & Festival Worship Essentials',
    category: 'Puja',
    subcategory: 'Puja Samagri',
    sku: 'GUK-PUJ-SET-102',
    price: 36.50,
    originalPrice: 42.00,
    inStock: true,
    stockCount: 28,
    rating: 4.8,
    reviewCount: 64,
    image: '/src/assets/images/puja_thali_samagri_1793710750018.jpg',
    description: 'An auspicious 9-piece temple-grade brass worship set containing an embossed Ashta Lakshmi plate, Kamakshi deepam lamp, brass bell with Nandi finial, double-cup kumkum/chandan katori, sacred panchamrita spoon, and incense holder. Designed for flawless daily worship and Deepavali rituals in British homes.',
    material: 'High-density Virgin Brass',
    dimensions: 'Thali Diameter: 11 inches (28 cm)',
    weight: '1.2 kg',
    tags: ['Puja Thali', 'Diya', 'Brass', 'Deepavali', 'Lakshmi'],
    isBestSeller: true,
    isFestivalSpecial: true
  },
  {
    id: 'prod-3',
    name: 'Pure South Indian Handloom Silk Dhoti & Angavastram (9x5)',
    subtitle: 'Cream Raw Silk with Pure Gold Zari Mayil Borders',
    category: 'Textiles',
    subcategory: 'Indian Menswear',
    sku: 'GUK-TEX-DHO-205',
    price: 49.99,
    originalPrice: 58.00,
    inStock: true,
    stockCount: 19,
    rating: 4.9,
    reviewCount: 52,
    image: '/src/assets/images/textile_dhoti_silk_1793710781166.jpg',
    description: 'Woven with pride in Salem, Tamil Nadu, from certified mulberry raw silk. Features a classic 3-inch pure gold-toned zari border depicting the traditional peacock and kalash motif. Perfect for temple visits, weddings, upanayanams, and sacred festivals.',
    material: '100% Pure Handloom Silk with Metallic Zari',
    dimensions: 'Dhoti: 4.1 meters (9 Mulam) | Angavastram: 2.2 meters',
    weight: '550 g',
    tags: ['Dhoti', 'Veshti', 'Silk', 'Angavastram', 'Wedding'],
    isBestSeller: true,
    isNewArrival: true
  },
  {
    id: 'prod-4',
    name: 'Srimad Valmiki Ramayana & Rigveda Samhita (Hardbound 2-Vol Set)',
    subtitle: 'Original Devanagari Sanskrit with English & Tamil Commentary',
    category: 'Books',
    subcategory: 'Books on Hinduism',
    sku: 'GUK-BKS-RAM-311',
    price: 32.00,
    originalPrice: 38.00,
    inStock: true,
    stockCount: 22,
    rating: 5.0,
    reviewCount: 41,
    image: '/src/assets/images/vedic_books_scripture_1793710783027.jpg',
    description: 'Authored with authoritative commentary by revered Vedic scholars. Bound in rich foil-embossed archival leatherette with gold gilded edges and ribbon bookmarks. Includes transliteration, metered sloka pronunciation guide, and deep philosophical reflections for modern seekers.',
    material: 'Hardbound Archival Acid-Free Paper',
    dimensions: '24 cm x 18 cm x 7 cm (Set)',
    weight: '2.1 kg',
    tags: ['Ramayana', 'Rigveda', 'Sanskrit', 'Giri Publications', 'Philosophy'],
    isNewArrival: true
  },
  {
    id: 'prod-5',
    name: 'Kamakshi Deepam Brass Oil Lamp (Pair - 7")',
    subtitle: 'Traditional South Indian Auspicious Welcome Lamps',
    category: 'Puja',
    subcategory: 'Puja Samagri',
    sku: 'GUK-PUJ-LMP-044',
    price: 28.50,
    inStock: true,
    stockCount: 30,
    rating: 4.7,
    reviewCount: 29,
    image: '/src/assets/images/hero_deepavali_brass_1793710718525.jpg',
    description: 'Sacred Kamakshi vilakku cast with the divine form of Goddess Kamakshi with Gajalakshmi iconography. Specially weighted base ensures safety on temple altars and wooden mantels alike.',
    material: 'Heavy Casting Brass',
    dimensions: 'Height: 7 inches (18 cm)',
    weight: '980 g pair',
    tags: ['Kamakshi Vilakku', 'Diya', 'Puja', 'Lamp'],
    isFestivalSpecial: true
  },
  {
    id: 'prod-6',
    name: 'Pure Sandalwood Chandan Tablets & Pachai Karpooram Set',
    subtitle: 'Mysore Sandalwood & Natural Edible/Ritual Camphor (100g each)',
    category: 'Puja',
    subcategory: 'Puja Samagri',
    sku: 'GUK-PUJ-SAN-089',
    price: 14.99,
    originalPrice: 18.00,
    inStock: true,
    stockCount: 50,
    rating: 4.9,
    reviewCount: 77,
    image: '/src/assets/images/puja_thali_samagri_1793710750018.jpg',
    description: '100% natural, steam-distilled pure organic sandalwood paste tablets sourced directly from Karnataka forest plantations, combined with sacred pachai karpooram (green refined camphor) for authentic temple prasadams and daily deity alankaram.',
    material: 'Natural Mysore Sandalwood & Camphor',
    dimensions: 'Pack of 2 airtight tin containers',
    weight: '200 g total',
    tags: ['Chandan', 'Camphor', 'Sandalwood', 'Samagri'],
    isBestSeller: true
  },
  {
    id: 'prod-7',
    name: 'Lord Venkateswara Balaji Brass Murti with Tirupati Shankh & Chakra',
    subtitle: 'Elaborate Temple Alankaram Finish with Prabhavali (10")',
    category: 'Idols & Handicrafts',
    subcategory: 'Brass Idols',
    sku: 'GUK-IDL-BAL-072',
    price: 74.00,
    originalPrice: 85.00,
    inStock: true,
    stockCount: 11,
    rating: 4.9,
    reviewCount: 46,
    image: '/src/assets/images/hero_deepavali_brass_1793710718525.jpg',
    description: 'Exquisitely sculptured representation of Sri Venkateswara Balaji of Tirumala hills. Features precise carving of the Sudarshana Chakra, Panchajanya Shankha, and sacred jewel garlands. Hand-polished to a radiant temple glow.',
    material: 'Antique Virgin Brass',
    dimensions: 'Height: 10 inches (25.4 cm)',
    weight: '2.6 kg',
    tags: ['Balaji', 'Venkateswara', 'Tirupati', 'Brass Idol', 'Vishnu'],
    isBestSeller: true,
    isFestivalSpecial: true
  },
  {
    id: 'prod-8',
    name: 'UK Tamil Panchangam 2026-2027 (Krodhi Varusham)',
    subtitle: 'London & UK Timezone Astrological Calendar, Muhurtham & Festivals',
    category: 'Books',
    subcategory: 'Ancient Science',
    sku: 'GUK-BKS-PAN-2026',
    price: 8.99,
    inStock: true,
    stockCount: 85,
    rating: 4.9,
    reviewCount: 92,
    image: '/src/assets/images/vedic_books_scripture_1793710783027.jpg',
    description: 'Specially computed for the Greenwich Mean Time (GMT) and British Summer Time (BST) coordinates. Covers all auspicious wedding muhurthams, Rahu Kaalam, Yamagandam, Ekadashi, Pradosham, Amavasya, and UK festival observances for 2026.',
    material: 'Offset Printed on Premium Paper',
    dimensions: 'A4 format, 160 pages',
    weight: '320 g',
    tags: ['Panchangam', 'Tamil Calendar', 'UK Astrology', 'Muhurtham'],
    isBestSeller: true,
    isNewArrival: true
  },
  {
    id: 'prod-9',
    name: 'Pure Kanchipuram Temple Silk Saree with Real Zari Pallu',
    subtitle: 'Deep Crimson & Royal Emerald with Sacred Rudraksha Weave',
    category: 'Textiles',
    subcategory: 'Indian Womenswear',
    sku: 'GUK-TEX-SAR-501',
    price: 145.00,
    originalPrice: 175.00,
    inStock: true,
    stockCount: 6,
    rating: 5.0,
    reviewCount: 18,
    image: '/src/assets/images/textile_dhoti_silk_1793710781166.jpg',
    description: 'Handwoven in Kanchipuram using traditional Korvai interlocking technique. The heavy silk body features micro gold buttas with a grand temple border. Comes with Silk Mark certification and unstitched blouse fabric.',
    material: '100% Pure Mulberry Silk Mark Certified',
    dimensions: 'Length: 6.2 meters (including blouse)',
    weight: '750 g',
    tags: ['Kanchipuram', 'Silk Saree', 'Zari', 'Festive', 'Wedding'],
    isNewArrival: true
  },
  {
    id: 'prod-10',
    name: 'Bharatanatyam Classical Dance Salangai / Ghungroo (4 Rows)',
    subtitle: 'Hand-Stitched Genuine Velvet with Brass Chime Bells',
    category: 'Dancewear & Jewellery',
    subcategory: 'Indian Dance Costumes',
    sku: 'GUK-DAN-GHU-012',
    price: 24.50,
    inStock: true,
    stockCount: 35,
    rating: 4.8,
    reviewCount: 31,
    image: '/src/assets/images/brass_idol_nataraja_1793710748927.jpg',
    description: 'Designed specifically for student and professional Bharatanatyam, Kuchipudi, and Kathak performers. High-clarity resonant brass bells securely stitched onto padded maroon velvet straps for comfort during intense rhythmic footwork.',
    material: 'Cast Brass Bells & Padded Velvet Cushion',
    dimensions: '40 bells per leg pad, adjustable ties',
    weight: '620 g pair',
    tags: ['Ghungroo', 'Salangai', 'Dance', 'Bharatanatyam'],
    isNewArrival: true
  },
  {
    id: 'prod-11',
    name: 'Natural Tulsi & Sandalwood Japa Mala with Cow Gomukhi Pouch',
    subtitle: '108+1 Beads Hand-Knotted for Sacred Mantra Meditation',
    category: 'Puja',
    subcategory: 'Hindu Puja Items',
    sku: 'GUK-PUJ-MAL-108',
    price: 12.99,
    originalPrice: 15.00,
    inStock: true,
    stockCount: 42,
    rating: 4.9,
    reviewCount: 58,
    image: '/src/assets/images/vedic_books_scripture_1793710783027.jpg',
    description: 'Handcrafted from sacred Vrindavan Tulsi wood beads, individually knotted with high-tensile silk thread. Accompanied by a traditional saffron cotton japa pouch (gomukhi) featuring the Hare Krishna mahamantra print.',
    material: 'Sacred Tulsi Wood & Pure Cotton Pouch',
    dimensions: '8mm beads, 108 count + Guru bead',
    weight: '120 g',
    tags: ['Tulsi Mala', 'Japa', 'Meditation', 'Puja'],
    isBestSeller: true
  },
  {
    id: 'prod-12',
    name: 'Handcrafted Brass Hanging Diya with Chain & Peacock Finial (18")',
    subtitle: 'Traditional Thooku Vilakku for Home Entrance & Pooja Mandir',
    category: 'Home Decor & Gifts',
    subcategory: 'Brass Range',
    sku: 'GUK-HOM-HNG-033',
    price: 39.50,
    inStock: true,
    stockCount: 16,
    rating: 4.9,
    reviewCount: 23,
    image: '/src/assets/images/hero_deepavali_brass_1793710718525.jpg',
    description: 'Breathtaking hanging brass oil lamp featuring an intricately detailed Mayil (peacock) seated atop the lamp bowl. Suspended by a heavy interlocking brass chain with an ornate ceiling hook.',
    material: 'Solid Brass with Cast Chain',
    dimensions: 'Lamp Height: 7", Total Hanging Length: 28"',
    weight: '1.4 kg',
    tags: ['Thooku Vilakku', 'Hanging Diya', 'Home Decor', 'Brass'],
    isFestivalSpecial: true
  }
];

export const AVAILABLE_COUPONS: Coupon[] = [
  {
    code: 'GIRIUK2026',
    discountPercent: 10,
    description: 'Get 10% off your entire order with code GIRIUK2026',
    minSpend: 0
  },
  {
    code: 'FESTIVAL15',
    discountPercent: 15,
    description: '15% off orders over £75 for Festival preparations',
    minSpend: 75
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'The Sacred Science of Brass in Hindu Temples & Home Mandirs',
    slug: 'sacred-science-of-brass-in-hindu-temples',
    excerpt: 'Why our ancestors mandated panchaloha and bell metal for sacred murti casting and the purifying electromagnetic resonance of temple bells.',
    date: '28 Feb 2026',
    readTime: '5 min read',
    author: 'Pandit Dr. S. Ramanathan',
    category: 'Spiritual Heritage',
    image: '/src/assets/images/brass_idol_nataraja_1793710748927.jpg',
    content: [
      'In the Agamic tradition, brass (a sacred alloy of copper and zinc) acts as a powerful vibrational conduit. When an artisanal idol is sculpted according to Shilpa Shastra proportions, the metal holds the energized cosmic prana generated through continuous mantra chanting and offering.',
      'Unlike synthetic polymers or cold metals, authentic brass oil lamps emit a warm electromagnetic radiance when infused with pure cow ghee or sesame (til) oil. The resulting flame purifies micro-pathogens in enclosed home spaces and produces negative ions that promote mental clarity and meditation.',
      'To maintain your brass idols in the UK without harmful chemicals, use pure tamarind pulp, lemon juice, and a pinch of rock salt. Rinse in lukewarm water and buff with unbleached cotton to retain the auspicious golden luster.'
    ]
  },
  {
    id: 'blog-2',
    title: 'Deepavali 2026: Auspicious Timings, Kubera Puja & Home Rituals in the UK',
    slug: 'deepavali-2026-uk-auspicious-timings-and-rituals',
    excerpt: 'A comprehensive step-by-step guide for British Hindu households on welcoming Mahalakshmi and Lord Kubera during the Festival of Lights.',
    date: '15 Feb 2026',
    readTime: '6 min read',
    author: 'Vidyavathi Raghavan',
    category: 'Festival Guide',
    image: '/src/assets/images/hero_deepavali_brass_1793710718525.jpg',
    content: [
      'Observing Deepavali in the United Kingdom requires aligning traditional Vedic tithis with Greenwich Mean Time. The Lakshmi Kubera puja should ideally be performed during the Pradosha Kaalam on Amavasya evening.',
      'Begin the day with the ceremonial Ganga Snanam: warm sesame oil infused with fresh black pepper and omam (ajwain) applied gently before the bath. Dress in unbleached handloom silk or fresh vastrams to cultivate sattvic energy.',
      'Arrange 14 brass diyas around the home entrance. Place the Ashta Lakshmi thali in the northeast (Ishanya) corner, adorned with pure kumkum, fresh jasmine, and a silver or brass Kubera coin. Chant Sri Suktam and Lakshmi Ashtothram for prosperity.'
    ]
  },
  {
    id: 'blog-3',
    title: 'How to Care for Pure Handloom Silk Dhotis and Kanchipuram Sarees',
    slug: 'care-guide-pure-handloom-silk-dhotis-sarees',
    excerpt: 'Preserve authentic gold zari weaves and delicate natural silks against British humidity and wardrobe storage.',
    date: '02 Feb 2026',
    readTime: '4 min read',
    author: 'Meenakshi Sundaram',
    category: 'Textile Craft',
    image: '/src/assets/images/textile_dhoti_silk_1793710781166.jpg',
    content: [
      'Pure Kanchipuram and Salem silks represent hundreds of hours of generational weaver craftsmanship. The real gold and silver electroplated zari needs specialized ventilation to avoid darkening.',
      'Always store pure silk dhotis and sarees in breathable unbleached muslin cotton bags rather than plastic poly-wraps. Plastic traps seasonal condensation, which can dull metallic zari.',
      'Refold your sacred garments along opposite crease lines every three to four months. Never apply perfume or aerosol deodorants directly to the fabric; instead, place dried neem leaves or cedar balls in the wardrobe corners.'
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Dr. Ananya & Karthik Iyer',
    location: 'Harrow, London',
    verifiedBuyer: true,
    rating: 5,
    title: 'Unrivaled temple-grade authenticity right here in the UK',
    content: 'We had been searching all over England for a heavy, traditionally cast Nataraja idol that followed accurate Agamic proportions. When GIRI UK delivered the parcel via DPD within 24 hours, packed with pristine care in cushioned velvet, we were speechless. It is now the jewel of our puja room.',
    date: '14 Oct 2026',
    purchasedItem: 'Handcrafted Brass Nataraja Idol'
  },
  {
    id: 'test-2',
    name: 'Venkatesh Narasimhan',
    location: 'Leicester, East Midlands',
    verifiedBuyer: true,
    rating: 5,
    title: 'Essential for every South Indian family in Britain',
    content: 'From the authentic Tamil Panchangam adjusted for UK sunrise timings to the purest Mysore sandalwood paste, GIRI UK has solved our family’s festival preparations. The free delivery over £50 and the coupon code GIRIUK2026 made it a joy to order.',
    date: '03 Nov 2026',
    purchasedItem: 'UK Tamil Panchangam & Sandalwood Set'
  },
  {
    id: 'test-3',
    name: 'Radhika Swaminathan',
    location: 'Solihull, Birmingham',
    verifiedBuyer: true,
    rating: 5,
    title: 'The pure handloom silk dhoti exceeded all expectations',
    content: 'Ordered the 9x5 silk dhoti with matching angavastram for my son’s upanayanam ceremony. The weave is rich, the zari border is pure and radiant, and the customer service in London was polite and responsive when I phoned with sizing questions.',
    date: '21 Sep 2026',
    purchasedItem: 'Handloom Silk Dhoti & Angavastram'
  },
  {
    id: 'test-4',
    name: 'Gaurav & Deepa Sharma',
    location: 'Edinburgh, Scotland',
    verifiedBuyer: true,
    rating: 5,
    title: 'Fragrant samagri and fast Royal Mail tracked shipping',
    content: 'Living in Scotland, getting genuine camphor and brass Kamakshi diyas used to require trips to Southall or Wembley. GIRI UK sent our parcel trackable to Edinburgh in two days flat. Pristine packaging with no oil leaks or scratches.',
    date: '11 Aug 2026',
    purchasedItem: 'Ashta Lakshmi Puja Thali & Kamakshi Vilakku'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'GIRI-UK-849201',
    createdAt: '2026-11-01',
    items: [
      {
        product: INITIAL_PRODUCTS[1], // Puja Thali
        quantity: 1
      },
      {
        product: INITIAL_PRODUCTS[5], // Sandalwood
        quantity: 2
      }
    ],
    subtotal: 66.48,
    discount: 6.65, // 10% coupon
    shippingFee: 0,
    total: 59.83,
    couponCode: 'GIRIUK2026',
    status: 'In Transit',
    shippingAddress: {
      fullName: 'Suren Murugesan',
      email: 'suren.genaiarchitect@gmail.com',
      phone: '+44 7911 123456',
      addressLine1: '42 Belgrave Road',
      city: 'Leicester',
      postcode: 'LE4 5AS',
      country: 'United Kingdom'
    },
    shippingMethod: 'Royal Mail 48 Tracked',
    trackingNumber: 'GB-RM-994827103',
    estimatedDelivery: '04 Nov 2026',
    paymentMethod: 'Credit/Debit Card'
  }
];

export const CATEGORIES_TAXONOMY = [
  {
    name: 'Festival Special',
    slug: 'festival-special',
    badge: 'Deepavali 2026',
    subcategories: [
      'Gifts',
      'Kubera-Lakshmi Coins & Accessories',
      'Lamp Oils',
      'Lamps & Diyas',
      'Puja Essentials',
      'Puja Frames & Boxes'
    ]
  },
  {
    name: 'New Arrivals',
    slug: 'new-arrivals',
    subcategories: ['Latest Brass Sculptures', 'Handloom Silks', 'New Publications 2026', 'Auspicious Gift Sets']
  },
  {
    name: 'On Demand',
    slug: 'on-demand',
    subcategories: ['Custom Deity Mourtis', 'Bespoke Dance Costumes', 'Rare Sanskrit Manuscripts', 'Temple Vessels']
  },
  {
    name: 'Books',
    slug: 'books',
    subcategories: [
      'Ancient Science & Astrology',
      'Books on Hinduism & Slokas',
      'Vedas & Upanishads',
      'Children’s Book Shelf',
      'General Indian Literature',
      'Indian Arts & Classical Music'
    ]
  },
  {
    name: 'Puja',
    slug: 'puja',
    subcategories: [
      'Puja Samagri & Herbs',
      'Hindu Puja Items & Malas',
      'Puja Decorations & Mandir',
      'Agarbatti & Dhoop',
      'Vibhuti, Kumkum & Chandan'
    ]
  },
  {
    name: 'Idols & Handicrafts',
    slug: 'idols-handicrafts',
    subcategories: [
      'Metal Figurines & Brass Idols',
      'Gold Finish Murthis',
      'Stone & Sphatik Idols',
      'Wooden Handicrafts of India'
    ]
  },
  {
    name: 'Dancewear & Jewellery',
    slug: 'dancewear-jewellery',
    subcategories: [
      'Indian Dance Costumes & Salangai',
      'Indian Temple Jewellery UK',
      'Hair Accessories & Flowers',
      'Bangles & Waistbelts'
    ]
  },
  {
    name: 'Home & Gifts',
    slug: 'home-gifts',
    subcategories: [
      'Brass Range & Thooku Vilakku',
      'Indian Home Decor & Wall Art',
      'Kitchenware & Traditional Cookware',
      'Navratri & Wedding Return Gifts'
    ]
  },
  {
    name: 'Textiles',
    slug: 'textiles',
    subcategories: [
      'God Clothing & Devi Vastram',
      'Indian Menswear Dhoti & Veshti',
      'Indian Saree UK & Handloom Silk',
      'Indian Shawls & Towels'
    ]
  }
];
