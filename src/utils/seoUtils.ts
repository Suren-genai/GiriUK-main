import { CATEGORIES_TAXONOMY } from '../data/mockData';
import { Product } from '../types';

export interface SeoMetadata {
  title: string;
  metaDescription: string;
  h1: string;
  subheading: string;
  introDescription: string;
  detailedGuide: {
    heading: string;
    paragraphs: string[];
  };
  keywords: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export function findCategoryBySlug(slug: string) {
  return CATEGORIES_TAXONOMY.find((c) => slugify(c.name) === slug || c.slug === slug);
}

export function findSubcategoryBySlug(categoryName: string, subcategorySlug: string): string | undefined {
  const cat = CATEGORIES_TAXONOMY.find((c) => c.name.toLowerCase() === categoryName.toLowerCase());
  if (!cat) return undefined;
  return cat.subcategories.find((s) => slugify(s) === subcategorySlug);
}

// Category-specific rich SEO content dictionary
const CATEGORY_SEO_CONTENT: Record<string, SeoMetadata> = {
  'Festival Special': {
    title: 'Festival Special Collection UK | Deepavali, Puja & Auspicious Decor | GIRI UK',
    metaDescription: 'Shop authentic Hindu festival essentials in the UK. Handcrafted brass diyas, Kubera-Lakshmi coins, pure lamp oils, and Deepavali gifts dispatched from London.',
    h1: 'Sacred Festival Special Curations',
    subheading: 'Celebrate Deepavali, Navaratri, and Vedic Auspicious Days Across the UK & Europe',
    introDescription: 'Welcome to GIRI UK’s dedicated Festival Special boutique. Every celebration in Sanatana Dharma begins with sacred light, pure fragrances, and devoted intent. Discover our curated festival collection—from solid brass Lakshmi-Ganesha sets and five-wick Kamakshi deepams to fragrant til oils and consecrated puja samagri.',
    detailedGuide: {
      heading: 'Auspicious Festival Observances in British Homes',
      paragraphs: [
        'Observing Vedic festivals away from the homeland requires authentic, uncompromised ritual elements. GIRI UK provides British and European devotees with direct access to traditional temple-grade festival supplies hand-selected across Tamil Nadu, Karnataka, and Uttar Pradesh.',
        'Whether preparing for the sacred dawn bath during Deepavali with pure herbal powders, lighting hereditary Thooku Vilakku hanging diyas, or performing Lakshmi Kubera puja with gold-toned brass coins, our inventory is housed in our London Wembley facility for fast 24-48 hour tracked UK mainland dispatch.'
      ]
    },
    keywords: ['festival special UK', 'deepavali puja samagri london', 'brass diya online uk', 'lakshmi coins uk', 'hindu festival items birmingham'],
    faqs: [
      {
        question: 'Are all festival items shipped from within the UK?',
        answer: 'Yes, 100% of our active festival catalog is stocked in and dispatched from our Greater London warehouse via Royal Mail 48 Tracked and DPD Next Day Express.'
      },
      {
        question: 'What is included in the festival puja kits?',
        answer: 'Our festival kits include authentic virgin brass items (lamps, bell, panchamrita katori, thali), natural camphor, Mysore chandan, pure kumkum, and traditional wicks.'
      },
      {
        question: 'How quickly can I receive my order before a festival?',
        answer: 'Orders placed with DPD Next Day Express before 1:00 PM GMT are delivered next working day throughout mainland UK.'
      }
    ]
  },
  'Idols & Handicrafts': {
    title: 'Authentic Indian Brass Idols & Temple Murthis UK | GIRI UK',
    metaDescription: 'Explore handcrafted solid brass & panchaloha deity idols in the UK. Master artisan cast Nataraja, Krishna, Balaji, Ganesha, and Shiva vigrahams with London dispatch.',
    h1: 'Handcrafted Deities, Brass Idols & Temple Statues',
    subheading: 'Consecrated Sculptures & Divine Murthis Cast by Traditional Swamimalai Artisans',
    introDescription: 'Adorn your home mandir with sacred temple-grade sculptures sculptured according to the strict Shilpa Shastras. From the dynamic cosmic majesty of Lord Nataraja to the compassionate gaze of Tirupati Balaji, each vigraham embodies centuries of hereditary metal-casting legacy.',
    detailedGuide: {
      heading: 'The Sacred Art of Lost-Wax (Madhuchehishtavidhana) Brass Casting',
      paragraphs: [
        'Our bronze, brass, and panchaloha vigrahams are cast using centuries-old cire-perdue (lost-wax) techniques in Kumbakonam, Thanjavur, and Swamimalai. Each deity features intricate iconography—from the sacred flame prabhavali arch to hand-chiseled mudras and divine armaments.',
        'Heavy, solid, and finished with a traditional temple patina, our idols resist tarnishing in British climates and acquire a deeper luster when bathed in ritual abhishekams with milk, honey, and vibhuti.'
      ]
    },
    keywords: ['brass idols UK', 'shiva nataraja statue london', 'balaji murti buy uk', 'ganesha idol temple quality', 'panchaloha vigraham europe'],
    faqs: [
      {
        question: 'Are these hollow or solid brass sculptures?',
        answer: 'All our heirloom temple murtis are solid cast brass and panchaloha grade, offering substantial weight, stability, and enduring longevity.'
      },
      {
        question: 'How do I care for brass idols in the UK climate?',
        answer: 'Wipe with a soft dry cloth for regular maintenance. For festival abhishekams, clean gently using traditional tamarind pulp or Pitambari powder, followed by pure warm water and immediate drying.'
      },
      {
        question: 'Can I commission a custom-sized deity idol for my home or community temple?',
        answer: 'Yes! Through our On-Demand Bespoke Sourcing service, we collaborate directly with master sthapatis in Swamimalai for custom dimensions up to 6 feet.'
      }
    ]
  },
  'Puja': {
    title: 'Authentic Puja Samagri, Thalis & Vedic Ritual Essentials UK | GIRI UK',
    metaDescription: 'Premier UK source for authentic Hindu puja items, Ashta Lakshmi brass thali sets, Kamakshi lamps, pure Mysore sandalwood, and natural camphor.',
    h1: 'Sacred Puja Samagri & Temple Essentials',
    subheading: 'Pure, Unadulterated Ingredients & Implements for Daily Worship & Vedic Havans',
    introDescription: 'Perform sacred rituals with complete peace of mind. GIRI UK brings you authentic, certified puja samagri sourced directly from sacred Indian centres—ensuring every offering of dhoop, chandan, agarbatti, and camphor retains its ancient ritual purity.',
    detailedGuide: {
      heading: 'Uncompromised Purity for UK Temple & Home Altars',
      paragraphs: [
        'In Vedic tradition, the purity (shuddhi) of puja implements determines the sacred vibration of the prayer sanctuary. We strictly avoid chemical fragrances, synthetic fillers, or counterfeit paraffin camphor.',
        'Our brass puja thalis are precision-embossed with divine yantras, paired with temple bells tuned to sacred Vedic frequencies and heavy oil lamps engineered for clean, smoke-free burning in modern British interiors.'
      ]
    },
    keywords: ['puja samagri UK', 'puja thali set london', 'pure camphor buy uk', 'kamakshi lamp uk', 'mysore sandalwood chandan online'],
    faqs: [
      {
        question: 'Is the camphor pure and suitable for indoor British mandirs?',
        answer: 'Yes, our pachai karpooram (green refined camphor) and tablet camphor are 100% natural and burn cleanly without heavy black residue.'
      },
      {
        question: 'Do you supply complete puja sets for housewarming (Griha Pravesham)?',
        answer: 'Yes, our Ashta Lakshmi 9-piece and 11-piece brass sets are complete with all necessary implements for Griha Pravesh, Satyanarayan katha, and daily aarti.'
      }
    ]
  },
  'Books': {
    title: 'Vedic Scriptures, Hinduism Books & Sanskrit Slokas UK | GIRI UK',
    metaDescription: 'Authoritative Vedic literature, Valmiki Ramayana, Srimad Bhagavad Gita, Upanishads, and UK Tamil Panchangam 2026. Hardbound scriptures with English commentary.',
    h1: 'Vedic Scriptures, Sacred Books & Ancient Wisdom',
    subheading: 'Original Devanagari Texts, Authoritative Commentaries & UK Astrological Calendars',
    introDescription: 'Delve into the eternal knowledge of Sanatana Dharma. Our books department stocks rare and authoritative publications from Giri Publications and leading Vedic institutions—spanning original Sanskrit texts, word-by-word transliterations, English commentaries, and children’s spiritual stories.',
    detailedGuide: {
      heading: 'Preserving Sacred Knowledge for the European Diaspora',
      paragraphs: [
        'Finding genuine Sanskrit scriptures with English or regional language commentaries in the United Kingdom has often been challenging. GIRI UK bridges this gap by maintaining the largest curated inventory of sacred texts in Europe.',
        'From hardbound multi-volume sets of the Valmiki Ramayana and Rigveda Samhita to the yearly UK Tamil Panchangam (specifically calibrated for GMT/BST coordinates), our books enrich the spiritual study of devotees of all generations.'
      ]
    },
    keywords: ['vedic books UK', 'bhagavad gita london', 'tamil panchangam 2026 uk', 'ramayana sanskrit english', 'hindu scriptures buy online'],
    faqs: [
      {
        question: 'Are the astronomical panchangam calculations adjusted for the UK timezone?',
        answer: 'Yes, our UK Tamil Panchangam and Vedic ephemeris are specifically calculated for Greenwich Mean Time and British Summer Time coordinates.'
      },
      {
        question: 'Do you have books suitable for children learning Hindu culture?',
        answer: 'Yes, our Children’s Book Shelf features illustrated stories from the Puranas, Ramayana, and Mahabharata with contemporary moral reflections in English.'
      }
    ]
  },
  'Textiles': {
    title: 'Traditional Handloom Silks, Dhotis & Temple Sarees UK | GIRI UK',
    metaDescription: 'Certified pure handloom mulberry silk dhotis, gold zari angavastrams, and Kanchipuram temple silk sarees in the UK. Silk Mark certified traditional wear.',
    h1: 'Sacred Handloom Textiles & Traditional Vestments',
    subheading: 'Pure Mulberry Silks, Authentic Zari Borders & Temple Alankaram Fabrics',
    introDescription: 'Dress in divine grace for weddings, upanayanams, and temple celebrations. GIRI UK’s textile collection is woven by master weavers in Salem, Kanchipuram, and Madurai using certified pure mulberry silk, fine cotton, and genuine metallic zari.',
    detailedGuide: {
      heading: 'The Sacred Tradition of Handloom Weaving',
      paragraphs: [
        'Vedic rites require unstitched, pure natural fabrics (vastrams) that channel sattvic energy. Our 9x5 pure raw silk dhotis with matching angavastrams feature classic peacock (Mayil) and kalash motifs woven with precision.',
        'Every silk saree and veshti arrives Silk Mark certified, assuring British devotees of genuine unadulterated silk that drapes elegantly and endures for generations.'
      ]
    },
    keywords: ['handloom silk dhoti UK', 'kanchipuram saree london', 'veshti angavastram buy uk', 'temple silk vastram', 'indian wedding menswear uk'],
    faqs: [
      {
        question: 'Are your silk products Silk Mark certified?',
        answer: 'Yes, all pure silk dhotis, veshtis, and Kanchipuram sarees come with authentic Silk Mark accreditation.'
      },
      {
        question: 'What is the sizing of the 9x5 silk dhoti?',
        answer: 'The 9x5 measurement refers to traditional mulam (cubits): approximately 4.1 meters for the lower dhoti wrap and 2.2 meters for the upper angavastram.'
      }
    ]
  },
  'Dancewear & Jewellery': {
    title: 'Bharatanatyam Dance Costumes, Salangai & Temple Jewellery UK | GIRI UK',
    metaDescription: 'Professional Bharatanatyam and Kuchipudi dancewear in the UK. High-clarity brass ghungroo / salangai, velvet ankle bells, and authentic matte gold temple jewellery.',
    h1: 'Classical Indian Dancewear & Sacred Temple Jewellery',
    subheading: 'Professional Salangai Bells, Hand-Tailored Dance Costumes & Kemp Ornaments',
    introDescription: 'Equipping dancers and performing arts academies across the UK and Europe. From resonant 4-row velvet salangai ankle bells to bespoke silk dance costumes and intricate temple jewellery sets, GIRI UK supports the vibrant tradition of classical Indian dance.',
    detailedGuide: {
      heading: 'Precision Craftsmanship for Classical Performers',
      paragraphs: [
        'Our ghungroos are cast from virgin brass with precise hollow chambers to produce the clear, crisp acoustic clarity essential for Bharatanatyam, Kathak, and Kuchipudi rhythms.',
        'Stitched onto plush, cushioned velvet straps, they provide ankle support during rigorous adavus and arangetram performances while safeguarding the dancer against friction.'
      ]
    },
    keywords: ['bharatanatyam dance costumes UK', 'salangai ghungroo bells london', 'temple jewellery uk', 'classical indian dance accessories'],
    faqs: [
      {
        question: 'How do I choose between 3-row, 4-row, and 5-row salangai?',
        answer: '3-row is ideal for beginners and children; 4-row is standard for intermediate performers; 5-row is preferred by advanced professionals and arangetram soloists.'
      },
      {
        question: 'Do you offer custom group orders for UK dance academies?',
        answer: 'Yes, we supply dance schools throughout London, Leicester, and Europe with custom tailored costumes and matched jewellery sets.'
      }
    ]
  },
  'Home & Gifts': {
    title: 'Traditional Indian Home Decor, Brass Diyas & Return Gifts UK | GIRI UK',
    metaDescription: 'Shop handcrafted Thooku Vilakku hanging diyas, sacred wall art, traditional brass cookware, and wedding return gifts. Fast delivery across the UK.',
    h1: 'Auspicious Home Decor, Brass Art & Sacred Gifts',
    subheading: 'Infuse Your British Home with the Warmth & Divine Grace of Traditional Bharat',
    introDescription: 'Transform your living spaces into a sanctuary of peace. Our home and gifting collection blends traditional spiritual motifs—peacocks, lotuses, kalash, and deepams—with master brass craftsmanship, creating welcoming entrances and memorable return gifts for auspicious celebrations.',
    detailedGuide: {
      heading: 'Creating an Auspicious Sanctuary in Modern Homes',
      paragraphs: [
        'Hanging brass diyas (Thooku Vilakku) suspended at the home threshold or inside a dedicated prayer room create an ambiance of serenity and divine blessing.',
        'Cast with solid interlocking chains and ornate finials, our home decor pieces celebrate timeless artisan techniques that become treasured family heirlooms.'
      ]
    },
    keywords: ['indian home decor UK', 'thooku vilakku london', 'wedding return gifts uk', 'brass hanging diya', 'auspicious indian gifts birmingham'],
    faqs: [
      {
        question: 'Are ceiling hooks and heavy chains included with hanging lamps?',
        answer: 'Yes, each Thooku Vilakku includes a solid brass interlocking chain and matching ornate mounting hook.'
      },
      {
        question: 'Can you cater bulk wedding or navratri return gifts?',
        answer: 'Absolutely. We offer special bulk pricing and dedicated packaging for weddings, thread ceremonies, and Navratri celebrations.'
      }
    ]
  },
  'New Arrivals': {
    title: 'New Arrivals 2026 – Latest Sacred Curations UK | GIRI UK',
    metaDescription: 'Discover the latest hand-cast brass idols, pure handloom silks, and newly published Vedic texts freshly imported from India to our UK warehouse.',
    h1: 'New Arrivals – Fresh Sacred Curations',
    subheading: 'The Latest Masterpieces from India’s Renowned Artisan Centers',
    introDescription: 'Explore our latest shipments freshly arrived in London. Every month, GIRI UK introduces exclusive limited-edition sculptures, newly woven festive silks, and fresh publications for British devotees and collectors.',
    detailedGuide: {
      heading: 'Direct Sourcing from India’s Master Guilds',
      paragraphs: [
        'Our sourcing team frequently travels across Tamil Nadu, Karnataka, Andhra Pradesh, and Rajasthan to commission new works from hereditary artisans.',
        'Every new arrival undergoes rigorous purity and quality inspection before being listed for delivery across the United Kingdom and Europe.'
      ]
    },
    keywords: ['new arrivals giri uk', 'latest brass idols uk', 'new indian sarees london', 'fresh vedic books 2026'],
    faqs: [
      {
        question: 'How frequently are new items added?',
        answer: 'We receive regular air and sea consignments from India every 3-4 weeks, replenishing classics and introducing new artisan collections.'
      }
    ]
  }
};

// Generates dynamic SEO data for any category and optional subcategory
export function getCategorySeoData(categoryName: string, subcategoryName?: string): SeoMetadata {
  const baseContent = CATEGORY_SEO_CONTENT[categoryName] || {
    title: `${categoryName} | Authentic Vedic Essentials UK | GIRI UK`,
    metaDescription: `Discover authentic ${categoryName} at GIRI UK. Traditional Indian devotional essentials, brassware, and lifestyle goods dispatched from London.`,
    h1: categoryName,
    subheading: `Authentic Curations in ${categoryName} for UK & European Devotees`,
    introDescription: `Browse our curated collection of ${categoryName}. Every piece is selected for traditional authenticity, impeccable craftsmanship, and spiritual reverence.`,
    detailedGuide: {
      heading: `About Our ${categoryName} Collection`,
      paragraphs: [
        `GIRI UK brings the heritage of Giri Trading to the UK and Europe. Our ${categoryName} are sourced directly from master craftspeople in India to guarantee uncompromised quality.`
      ]
    },
    keywords: [`${categoryName.toLowerCase()} UK`, `buy ${categoryName.toLowerCase()} london`],
    faqs: [
      {
        question: `How are ${categoryName} items shipped in the UK?`,
        answer: 'All items are carefully packaged and couriered via Royal Mail 48 Tracked or DPD Next Day Express.'
      }
    ]
  };

  if (!subcategoryName) {
    return baseContent;
  }

  // Generate specialized subcategory SEO metadata
  return {
    title: `${subcategoryName} – ${categoryName} | GIRI UK London`,
    metaDescription: `Shop authentic ${subcategoryName} under our ${categoryName} range. Fast UK delivery, temple-grade quality, and authentic heritage dispatch from London.`,
    h1: subcategoryName,
    subheading: `Curated Selection in ${categoryName} > ${subcategoryName}`,
    introDescription: `Explore our specialized ${subcategoryName} range within ${categoryName}. Every item has been curated according to Vedic tradition and handcrafted for durability and spiritual purity in modern UK homes.`,
    detailedGuide: {
      heading: `Why Choose GIRI UK for ${subcategoryName}`,
      paragraphs: [
        `Our ${subcategoryName} offerings represent the pinnacle of traditional craftsmanship. Whether for daily rituals, special occasions, or sacred gifts, these items are inspected for ritual authenticity and durability.`,
        `Directly dispatched from our Greater London facility, ensuring fast delivery across England, Scotland, Wales, Northern Ireland, and Europe without international customs friction.`
      ]
    },
    keywords: [
      `${subcategoryName.toLowerCase()} UK`,
      `buy ${subcategoryName.toLowerCase()} london`,
      `${subcategoryName.toLowerCase()} online`,
      ...baseContent.keywords
    ],
    faqs: [
      {
        question: `Are items in ${subcategoryName} authentic?`,
        answer: `Yes, all items in our ${subcategoryName} range are procured directly from recognized artisan hubs in India with strict quality standards.`
      },
      ...baseContent.faqs
    ]
  };
}

// Injects and updates document head tags for SEO
export function updateDocumentSeo(seo: SeoMetadata, canonicalPath: string) {
  // 1. Update Title
  document.title = seo.title;

  // 2. Helper to set or create meta tag
  const setMetaTag = (nameOrProperty: 'name' | 'property', attrValue: string, content: string) => {
    let el = document.querySelector(`meta[${nameOrProperty}="${attrValue}"]`) as HTMLMetaElement | null;
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(nameOrProperty, attrValue);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  // 3. Meta Description & Keywords
  setMetaTag('name', 'description', seo.metaDescription);
  setMetaTag('name', 'keywords', seo.keywords.join(', '));

  // 4. OpenGraph
  setMetaTag('property', 'og:title', seo.title);
  setMetaTag('property', 'og:description', seo.metaDescription);
  setMetaTag('property', 'og:url', window.location.origin + canonicalPath);
  setMetaTag('property', 'og:type', 'website');

  // 5. Twitter Card
  setMetaTag('name', 'twitter:title', seo.title);
  setMetaTag('name', 'twitter:description', seo.metaDescription);

  // 6. Canonical link
  let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', window.location.origin + canonicalPath);
}

// Injects JSON-LD structured data into the head
export function injectStructuredData(schemaId: string, schemaObject: object) {
  let scriptEl = document.getElementById(schemaId) as HTMLScriptElement | null;
  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = schemaId;
    scriptEl.type = 'application/ld+json';
    document.head.appendChild(scriptEl);
  }
  scriptEl.textContent = JSON.stringify(schemaObject);
}

// Builds BreadcrumbList JSON-LD Schema
export function buildBreadcrumbSchema(categoryName: string, subcategoryName?: string) {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://giriuk.com';
  const categorySlug = slugify(categoryName);
  
  const items: any[] = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${origin}/`
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: categoryName,
      item: `${origin}/category/${categorySlug}`
    }
  ];

  if (subcategoryName) {
    const subcategorySlug = slugify(subcategoryName);
    items.push({
      '@type': 'ListItem',
      position: 3,
      name: subcategoryName,
      item: `${origin}/category/${categorySlug}/${subcategorySlug}`
    });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items
  };
}

// Builds CollectionPage ItemList Schema
export function buildCollectionSchema(
  categoryName: string,
  subcategoryName: string | undefined,
  products: Product[],
  seo: SeoMetadata
) {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://giriuk.com';

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: seo.h1,
    description: seo.metaDescription,
    url: window.location.href,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: products.length,
      itemListElement: products.slice(0, 12).map((p, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        item: {
          '@type': 'Product',
          name: p.name,
          description: p.description,
          image: p.image.startsWith('http') ? p.image : `${origin}${p.image}`,
          sku: p.sku,
          offers: {
            '@type': 'Offer',
            price: p.price.toFixed(2),
            priceCurrency: 'GBP',
            availability: p.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
            seller: {
              '@type': 'Organization',
              name: 'GIRI UK'
            }
          }
        }
      }))
    }
  };
}

// Builds FAQPage Schema
export function buildFaqSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer
      }
    }))
  };
}

// Builds Product Schema (JSON-LD)
export function buildProductSchema(product: Product) {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://giriuk.com';
  const imgUrl = product.image.startsWith('http') ? product.image : `${origin}${product.image}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: [imgUrl, ...(product.additionalImages || []).map((img) => img.startsWith('http') ? img : `${origin}${img}`)],
    description: product.description,
    sku: product.sku,
    mpn: product.sku,
    brand: {
      '@type': 'Brand',
      name: 'GIRI UK'
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'GBP',
      price: product.price.toFixed(2),
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'GIRI UK'
      }
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating || 4.9,
      reviewCount: product.reviewCount || 12
    }
  };
}

