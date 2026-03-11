'use client';

import * as React from 'react';
import Link from 'next/link';
import './risingroof.css';
import AIChatbot from '@/components/public/AIChatbot';
import JsonLd from '@/components/seo/JsonLd';

export default function HomePage() {
  const [activeSlide, setActiveSlide] = React.useState(0);
  const [activeBlog, setActiveBlog] = React.useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [emiResult, setEmiResult] = React.useState('₹52,068');
  const [stampResult, setStampResult] = React.useState('₹5.20 L');
  const [roiResult, setRoiResult] = React.useState('3.75%');
  const loanAmtRef = React.useRef<HTMLInputElement>(null);
  const intRateRef = React.useRef<HTMLInputElement>(null);
  const tenureRef = React.useRef<HTMLInputElement>(null);
  const propValRef = React.useRef<HTMLInputElement>(null);
  const propTypeRef = React.useRef<HTMLSelectElement>(null);
  const propCostRef = React.useRef<HTMLInputElement>(null);
  const monthRentRef = React.useRef<HTMLInputElement>(null);

  const slides = [
    { bg: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1600&q=80', location: '📍 Hyderabad, Telangana' },
    { bg: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80', location: '📍 Gachibowli, Financial District' },
    { bg: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80', location: '📍 HITEC City, Hyderabad' },
  ];

  React.useEffect(() => {
    const t = setInterval(() => setActiveSlide(prev => (prev + 1) % 3), 5000);
    return () => clearInterval(t);
  }, []);

  function calcEMI() {
    const p = parseFloat(loanAmtRef.current?.value || '60') * 100000;
    const r = parseFloat(intRateRef.current?.value || '8.5') / 12 / 100;
    const n = parseFloat(tenureRef.current?.value || '20') * 12;
    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setEmiResult('₹' + Math.round(emi).toLocaleString('en-IN'));
  }

  function calcStamp() {
    const val = parseFloat(propValRef.current?.value || '80');
    const type = propTypeRef.current?.value || 'apartment';
    const sd = type === 'plot' ? 4.5 : 4;
    const total = val * (sd + 0.5 + 1.5) / 100;
    setStampResult('₹' + total.toFixed(2) + ' L');
  }

  function calcROI() {
    const cost = parseFloat(propCostRef.current?.value || '80') * 100000;
    const rent = parseFloat(monthRentRef.current?.value || '25000') * 12;
    setRoiResult((rent / cost * 100).toFixed(2) + '%');
  }

  const blogs = [
    { id: 'blog1', tag: 'Market Update', icon: '📈', title: 'Hyderabad Real Estate Boom 2025: 52% Sales Rise & What It Means for You', excerpt: 'Over 20,000 homes sold in Q3 2025 alone — a 52.7% jump year-on-year. Here\'s the complete picture of Hyderabad\'s historic property surge.', date: 'November 2025', author: 'RisingRoof Research Desk', read: '6 min read', content: (<><p>Hyderabad&apos;s real estate market has delivered one of its strongest performances in recent history. Between July and September 2025, the city recorded over 20,000 housing unit sales — a staggering 52.7% growth compared to the same period last year.</p><div className="rr-stat-box"><p>📊 Key Stat: Over 20,000 homes sold in Q3 2025 alone — Hyderabad outpaced Bengaluru, Pune and Chennai in quarterly growth.</p></div><h3>What&apos;s Driving This Boom?</h3><ul><li><strong>IT & GCC Expansion:</strong> Hyderabad hosts over 1,500 IT firms employing 6 lakh+ professionals.</li><li><strong>Infrastructure Push:</strong> The ORR, RRR and Metro Phase 2 have unlocked new residential zones.</li><li><strong>Price Appreciation:</strong> Property values have risen by 64% since 2019 — highest among all major Indian metros.</li><li><strong>NRI Investment:</strong> NRIs are actively choosing Hyderabad over other metros.</li></ul><div className="rr-cta-box"><p>Ready to invest in Hyderabad&apos;s booming market? Our experts will guide you to the best deals available right now.</p><a href="#contact">Book Free Consultation with RisingRoof →</a></div></>) },
    { id: 'blog2', tag: 'NRI Guide', icon: '🏙️', title: 'Complete NRI Guide to Buying Property in Hyderabad 2025–26', excerpt: 'FEMA rules, NRI home loan eligibility, RERA verification, repatriation of funds — everything you need before investing from abroad.', date: 'January 2026', author: 'RisingRoof NRI Desk', read: '8 min read', content: (<><p>Hyderabad is the top city chosen by NRIs for property investment in India right now. With 64% price appreciation since 2019 and rental yields of 4–6%, the city ticks every box for an NRI buyer.</p><h3>Step 1: What Type of Property Can NRIs Buy?</h3><ul><li>✅ Residential flats and apartments</li><li>✅ Villas and independent houses</li><li>✅ Commercial properties (offices, shops)</li><li>❌ Agricultural land, farmhouses or plantation property (requires RBI approval)</li></ul><div className="rr-stat-box"><p>💡 Pro Tip: Always pay from your NRE/FCNR account if you want to repatriate the sale proceeds back abroad later without restrictions.</p></div><div className="rr-cta-box"><p>RisingRoof has helped hundreds of NRIs invest in Hyderabad from the US, UK, UAE, Australia and Singapore.</p><a href="#contact">Talk to Our NRI Specialist Today →</a></div></>) },
    { id: 'blog3', tag: 'Locality Guide', icon: '🗺️', title: 'Top 5 Areas to Buy Property in Hyderabad in 2025 — Zone-Wise Guide', excerpt: 'Kondapur, Kokapet, Tellapur, Kompally, Narsingi — detailed comparison with prices, appreciation data and who each area suits best.', date: 'December 2025', author: 'RisingRoof Research Desk', read: '7 min read', content: (<><p>With property prices rising 10–15% annually, choosing the right locality in Hyderabad can mean the difference between a good investment and a great one.</p><table className="rr-area-table"><tbody><tr><th>Area</th><th>Avg Price/sqft</th><th>Best For</th><th>Appreciation</th></tr><tr><td>Kondapur</td><td>₹8,500–11,000</td><td>IT professionals, families</td><td>⭐⭐⭐⭐</td></tr><tr><td>Kokapet</td><td>₹9,000–14,000</td><td>Luxury buyers, NRIs</td><td>⭐⭐⭐⭐⭐</td></tr><tr><td>Tellapur</td><td>₹7,000–9,500</td><td>Mid-segment buyers</td><td>⭐⭐⭐⭐</td></tr><tr><td>Kompally</td><td>₹4,500–6,500</td><td>Budget investors</td><td>⭐⭐⭐</td></tr><tr><td>Narsingi</td><td>₹9,500–16,000</td><td>Luxury villas, HNIs</td><td>⭐⭐⭐⭐⭐</td></tr></tbody></table><div className="rr-cta-box"><p>Not sure which area suits your budget and goals? Our RisingRoof advisors will give you a personalised area recommendation — for free.</p><a href="#contact">Get Your Free Area Consultation →</a></div></>) },
    { id: 'blog4', tag: 'First-Time Buyers', icon: '🏠', title: 'How to Buy Your First Home in Hyderabad: Complete Step-by-Step Guide', excerpt: 'Budget planning, RERA checks, home loans, SRO registration, stamp duty — everything a first-time buyer needs to know in plain language.', date: 'January 2026', author: 'RisingRoof Buyer\'s Desk', read: '9 min read', content: (<><p>Buying your first home is one of the biggest financial decisions you will ever make. Hyderabad is one of the best cities in India to do it.</p><div className="rr-stat-box"><p>💡 First-time buyer tip: Under Section 80C, you can claim up to ₹1.5 lakh deduction on home loan principal repayment.</p></div><h3>Common Mistakes First-Time Buyers Must Avoid</h3><ul><li>❌ Booking without RERA verification</li><li>❌ Not reading the Agreement of Sale carefully</li><li>❌ Ignoring hidden charges</li><li>❌ Skipping legal title verification</li><li>❌ Taking a loan from only one bank without comparing</li></ul><div className="rr-cta-box"><p>First home buying can be confusing — but it doesn&apos;t have to be. RisingRoof guides first-time buyers through every step, completely free of charge.</p><a href="#contact">Talk to a RisingRoof Advisor Today →</a></div></>) },
    { id: 'blog5', tag: 'Infrastructure', icon: '🚇', title: 'RRR, Metro Phase 2 & Fourth City: How New Infrastructure Will Reshape Hyderabad Property Prices', excerpt: 'The Regional Ring Road and Metro expansion are unlocking entirely new investment zones. Here\'s which localities will benefit the most.', date: 'January 2026', author: 'RisingRoof Research Desk', read: '7 min read', content: (<><p>Every time Hyderabad builds a major infrastructure project, property prices in adjacent areas jump 20–40% within 3–5 years.</p><div className="rr-stat-box"><p>📊 Historical proof: When the ORR was built, property prices in Gachibowli, Kondapur and Miyapur rose 3–5x within a decade.</p></div><div className="rr-cta-box"><p>Want to identify the best pre-infrastructure investment opportunity in Hyderabad right now?</p><a href="#contact">Book Your Free Investment Consultation →</a></div></>) },
    { id: 'blog6', tag: 'Investment', icon: '💰', title: 'Hyderabad vs Bengaluru: Where Should You Invest in 2025?', excerpt: 'A data-backed comparison of property prices, rental yields, appreciation rates and value for money — so you invest in the right city.', date: 'October 2025', author: 'RisingRoof Investment Desk', read: '7 min read', content: (<><p>Both Hyderabad and Bengaluru are India&apos;s top IT cities and the most popular destinations for property investment. Which gives you better returns?</p><table className="rr-area-table"><tbody><tr><th>Parameter</th><th>Hyderabad</th><th>Bengaluru</th></tr><tr><td>Price appreciation (since 2019)</td><td>64%</td><td>48%</td></tr><tr><td>Rental yield (IT corridors)</td><td>4–6%</td><td>3–4%</td></tr><tr><td>Stamp duty</td><td>4%</td><td>5.6%</td></tr></tbody></table><div className="rr-cta-box"><p>Confused about where to invest? Our RisingRoof advisors have helped buyers from both cities make the right property decision.</p><a href="#contact">Book a Free Investment Call with RisingRoof →</a></div></>) },
  ];

  const localities = [
    { zone: '🖥️ IT Corridor — West', name: 'Gachibowli & HITEC City', info: [['Avg Price/sqft', '₹7,500 – ₹12,000'], ['Rental Yield', '3.5 – 4.5%'], ['Best For', 'IT Professionals, NRIs']], tags: ['TCS', 'Infosys', 'Microsoft', 'Metro Access'] },
    { zone: '🌿 Premium Residential — West', name: 'Kondapur & Narsingi', info: [['Avg Price/sqft', '₹6,000 – ₹9,500'], ['Rental Yield', '3.0 – 4.0%'], ['Best For', 'Families, IT Buyers']], tags: ['Schools', 'Hospitals', 'Malls'] },
    { zone: '🏆 Luxury — Central', name: 'Banjara Hills & Jubilee Hills', info: [['Avg Price/sqft', '₹12,000 – ₹20,000'], ['Rental Yield', '2.5 – 3.5%'], ['Best For', 'Luxury, HNI Investors']], tags: ['Villas', 'Penthouses', 'Premium'] },
    { zone: '🚀 High Growth — North', name: 'Kompally & Shamirpet', info: [['Avg Price/sqft', '₹3,500 – ₹5,500'], ['Appreciation', '12–18% p.a.'], ['Best For', 'Investors, Budget Buyers']], tags: ['Open Plots', 'Villas', 'ORR Access'] },
    { zone: '💊 Pharma Belt — East', name: 'Uppal & LB Nagar', info: [['Avg Price/sqft', '₹4,000 – ₹6,500'], ['Rental Yield', '3.5 – 5.0%'], ['Best For', 'Pharma Professionals']], tags: ['Metro', 'Genome Valley', 'Affordable'] },
    { zone: '🌱 Emerging — South', name: 'Shadnagar & Maheshwaram', info: [['Avg Price/sqft', '₹2,500 – ₹4,000'], ['Appreciation', '15–22% p.a.'], ['Best For', 'Early Investors, Plots']], tags: ['Plots', 'Farm Houses', 'ORR'] },
    { zone: '🏦 Corporate Hub — West', name: 'Financial District', info: [['Avg Price/sqft', '₹9,000 – ₹14,000'], ['Rental Yield', '4.0 – 6.0%'], ['Appreciation', '18–22% p.a.'], ['Best For', 'NRIs, Luxury Investors']], tags: ['Google', 'Amazon', 'Deloitte', 'GCCs', 'Kokapet Adj.'] },
    { zone: '🚀 Fastest Growing — West', name: 'Tellapur', info: [['Avg Price/sqft', '₹7,000 – ₹9,500'], ['Rental Yield', '3.5 – 5.0%'], ['Appreciation', '20–25% p.a.'], ['Best For', 'Mid-Segment, IT Buyers']], tags: ['Fin. District Adj.', 'Gated Communities', 'ORR Access', 'High Growth'] },
  ];

  const activeBlogData = blogs.find(b => b.id === activeBlog);

  return (
    <div className="rr-body">
      <JsonLd />

      {/* NAVBAR */}
      <nav className="rr-nav">
        <a href="#" className="rr-nav-logo" onClick={e => { e.preventDefault(); window.scrollTo(0,0); setMobileMenuOpen(false); }}>
          <span className="rr-nav-logo-text">Rising<span>Roof</span></span>
        </a>
        <ul className="rr-nav-links">
          <li><a href="#" onClick={e => { e.preventDefault(); window.scrollTo(0,0); }}>🏠 Home</a></li>
          <li><a href="#audience">🏘️ Properties</a></li>
          <li><a href="#blog">📝 Blog</a></li>
          <li><a href="#career">💼 Career</a></li>
          <li><a href="#about">🏢 About Us</a></li>
          <div className="rr-nav-divider"></div>
          <li><a href="#contact">🤝 Get Help</a></li>
          <li><a href="#contact" className="rr-nav-cta">📞 Book Consultation</a></li>
        </ul>
        <div className="rr-nav-phone">📞 +91 84593 21228</div>
        <button className="rr-hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
          <span style={mobileMenuOpen ? {transform:'rotate(45deg) translate(5px, 5px)'} : {}}></span>
          <span style={mobileMenuOpen ? {opacity:0} : {}}></span>
          <span style={mobileMenuOpen ? {transform:'rotate(-45deg) translate(5px, -5px)'} : {}}></span>
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div className={`rr-mobile-menu${mobileMenuOpen ? ' open' : ''}`}>
        <div style={{textAlign:'center',padding:'10px 0 18px',borderBottom:'1px solid rgba(201,168,76,0.2)',marginBottom:'8px'}}>
          <span style={{fontFamily:'Playfair Display,serif',fontSize:'20px',fontWeight:700,color:'#C59DD9'}}>Rising<span style={{color:'#fff'}}>Roof</span></span>
        </div>
        <a href="#" onClick={e => { e.preventDefault(); window.scrollTo(0,0); setMobileMenuOpen(false); }}>🏠 Home</a>
        <a href="#audience" onClick={() => setMobileMenuOpen(false)}>🏘️ Properties</a>
        <a href="#blog" onClick={() => setMobileMenuOpen(false)}>📝 Blog</a>
        <a href="#career" onClick={() => setMobileMenuOpen(false)}>💼 Career</a>
        <a href="#about" onClick={() => setMobileMenuOpen(false)}>🏢 About Us</a>
        <a href="#contact" onClick={() => setMobileMenuOpen(false)}>🤝 Get Help</a>
        <a href="#contact" className="rr-mob-cta" onClick={() => setMobileMenuOpen(false)}>📞 Book Free Consultation</a>
        <div style={{textAlign:'center',marginTop:'16px',color:'rgba(255,255,255,0.5)',fontSize:'13px'}}>📞 +91 84593 21228</div>
      </div>

      {/* HERO */}
      <section className="rr-hero">
        <div className="rr-hero-slideshow">
          {slides.map((s, i) => (
            <div key={i} className={`rr-hero-slide${activeSlide === i ? ' active' : ''}`} style={{ backgroundImage: `url('${s.bg}')` }} />
          ))}
        </div>
        <div className="rr-hero-dots">
          {slides.map((_, i) => (
            <button key={i} className={`rr-hero-dot${activeSlide === i ? ' active' : ''}`} onClick={() => setActiveSlide(i)} />
          ))}
        </div>
        <div className="rr-slide-location">{slides[activeSlide].location}</div>

        <div className="rr-hero-badge">✦ RisingRoof — Your Property Partner in Hyderabad</div>
        <h1>Find Your <span>Dream Home</span> in Hyderabad — We Make It Simple</h1>
        <p>Trusted by 1,200+ IT professionals, NRIs, first-time buyers &amp; investors. Expert guidance, verified listings, <span style={{ background: 'linear-gradient(135deg,#C59DD9,#a06cc4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 700, fontSize: '1.05em' }}>✦ Zero Brokerage Hassle</span></p>
        <div className="rr-hero-btns">
          <a href="#contact" className="rr-btn-primary">Book Free Consultation</a>
          <a href="#localities" className="rr-btn-outline">Explore Localities</a>
        </div>
        <div className="rr-search-bar">
          <select><option>Buy</option><option>Rent</option><option>Invest</option></select>
          <select><option>All Localities</option><option>Gachibowli</option><option>HITEC City</option><option>Kondapur</option><option>Banjara Hills</option><option>Kompally</option><option>Uppal</option><option>Narsingi</option></select>
          <select><option>Any BHK</option><option>1 BHK</option><option>2 BHK</option><option>3 BHK</option><option>4+ BHK / Villa</option><option>Open Plot</option></select>
          <input type="text" placeholder="Budget (e.g. ₹50L – ₹1Cr)" />
          <button className="rr-search-btn">🔍 Search</button>
        </div>
      </section>

      {/* STATS */}
      <div className="rr-stats-bar">
        <div className="rr-stat-item"><div className="rr-stat-number">1,200+</div><div className="rr-stat-label">Happy Families</div></div>
        <div className="rr-stat-item"><div className="rr-stat-number">₹800Cr+</div><div className="rr-stat-label">Properties Sold</div></div>
        <div className="rr-stat-item"><div className="rr-stat-number">60+</div><div className="rr-stat-label">Trusted Builders</div></div>
        <div className="rr-stat-item"><div className="rr-stat-number">100%</div><div className="rr-stat-label">RERA Verified Listings</div></div>
      </div>

      {/* AUDIENCE */}
      <section className="rr-section rr-audience-section" id="audience">
        <div className="rr-section-header">
          <div className="rr-section-tag">Who We Help</div>
          <h2 className="rr-section-title">We Understand <span>Your Unique</span> Property Needs</h2>
          <p className="rr-section-sub">Whether you&apos;re relocating from Delhi, investing from Dubai, or buying your first home in Hyderabad — we&apos;ve got you covered.</p>
        </div>
        <div className="rr-audience-grid">
          {[
            { icon: '🌍', tags: ['NRI', 'Gulf', 'USA/UK'], title: 'NRI Investors', desc: 'Invest in Hyderabad from anywhere in the world. We handle everything — from property selection to legal paperwork, virtual tours & FEMA compliance.', link: '#nri', linkText: 'Explore NRI Services →' },
            { icon: '💻', tags: ['HITEC City', 'Gachibowli', 'Kondapur'], title: 'IT Professionals', desc: "Working at TCS, Infosys, Microsoft or Google? We'll find your perfect home within 10 minutes of your office in Hyderabad's booming tech corridor.", link: '#localities', linkText: 'See IT Hub Properties →' },
            { icon: '🧳', tags: ['Delhi', 'Mumbai', 'North India'], title: 'Relocating to Hyderabad?', desc: "New to the city? Our relocation experts will walk you through the best areas, schools, hospitals and commute times — in Hindi if you prefer.", link: '#localities', linkText: 'Get Area Guide →' },
            { icon: '🏠', tags: ['Home Loan Help', 'RERA Guide', 'Step-by-Step'], title: 'First-Time Buyers', desc: 'Buying your first home? We simplify the entire process — loans, RERA verification, registration & Vaastu — with zero jargon and full transparency.', link: '#process', linkText: 'See Buying Process →' },
            { icon: '📈', tags: ['High ROI Zones', 'Rental Yield', 'Portfolio'], title: 'Property Investors', desc: "Looking for appreciation + rental income? We identify Hyderabad's fastest-growing micro-markets with data-backed ROI analysis and exit strategies.", link: '#tools', linkText: 'ROI Calculator →' },
            { icon: '💊', tags: ['Genome Valley', 'Uppal', 'IDA Jeedimetla'], title: 'Pharma Professionals', desc: "Working in Hyderabad's pharma belt? We specialise in properties near Genome Valley, IDA Jeedimetla and Uppal — affordable yet premium living.", link: '#localities', linkText: 'Explore Pharma Zones →' },
          ].map((card, i) => (
            <div className="rr-audience-card" key={i}>
              <span className="rr-audience-icon">{card.icon}</span>
              <div className="rr-card-tags">{card.tags.map(t => <span key={t} className="rr-card-tag">{t}</span>)}</div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
              <a href={card.link} className="rr-card-link">{card.linkText}</a>
            </div>
          ))}
        </div>
      </section>

      {/* LOCALITIES */}
      <section className="rr-section rr-localities-section" id="localities">
        <div className="rr-section-header">
          <div className="rr-section-tag" style={{ background: 'rgba(201,168,76,0.2)' }}>Hyderabad Locality Guide</div>
          <h2 className="rr-section-title">Find the Right <span>Neighbourhood</span> for Your Lifestyle</h2>
          <p className="rr-section-sub" style={{ color: 'rgba(255,255,255,0.65)', margin: '0 auto' }}>From premium IT corridors to peaceful family suburbs — we know every corner of Hyderabad.</p>
        </div>
        <div className="rr-localities-grid">
          {localities.map((loc, i) => (
            <div className="rr-locality-card" key={i}>
              <div className="rr-locality-zone">{loc.zone}</div>
              <h3>{loc.name}</h3>
              <div className="rr-locality-info">
                {loc.info.map(([label, value]) => (
                  <div className="rr-locality-row" key={label}><span className="rr-locality-label">{label}</span><span className="rr-locality-value">{value}</span></div>
                ))}
              </div>
              <div className="rr-locality-tags">{loc.tags.map(t => <span key={t} className="rr-locality-tag">{t}</span>)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* NRI SECTION */}
      <section className="rr-section rr-nri-section" id="nri">
        <div className="rr-nri-inner">
          <div className="rr-nri-content">
            <div className="rr-section-tag">🌍 NRI Services</div>
            <h2 className="rr-section-title">Invest in Hyderabad <span>From Anywhere</span> in the World</h2>
            <p className="rr-section-sub">We are the only Hyderabad consultancy with a dedicated NRI desk. From Dubai to Dallas — we make Indian property investment simple, safe and profitable.</p>
            <ul className="rr-nri-points">
              {['Live video walkthrough of properties — see before you buy, from anywhere', 'FEMA & RBI compliance handled — 100% legally sound NRI investment', 'NRI home loans from top banks — SBI, HDFC, ICICI with best rates', 'Power of Attorney support — we handle everything on your behalf', 'Rental management post-purchase — earn income without being present', 'Available on WhatsApp, Zoom & calls across all time zones'].map((pt, i) => (
                <li key={i}><div className="rr-nri-check">✓</div><span>{pt}</span></li>
              ))}
            </ul>
            <a href="#contact" className="rr-btn-primary">Talk to Our NRI Desk</a>
          </div>
          <div className="rr-nri-cards">
            {[{ icon: '📱', title: 'Virtual Property Tours', desc: 'Live video walkthroughs with our agent on-ground. See every room, neighbourhood & amenity before investing.' }, { icon: '⚖️', title: 'Free Legal Opinion', desc: 'Every listing is verified by our empanelled lawyers. Title clearance, RERA check & encumbrance certificate — free of charge.' }, { icon: '🏦', title: 'NRI Home Loan Assistance', desc: 'We work with 12+ banks to get you the best NRI home loan rates. Complete documentation support included.' }, { icon: '🔄', title: 'Rental & Resale Management', desc: "We manage your property after purchase — tenant sourcing, rent collection, maintenance & resale when you're ready." }].map((c, i) => (
              <div className="rr-nri-card" key={i}>
                <div className="rr-nri-card-icon">{c.icon}</div>
                <div><h4>{c.title}</h4><p>{c.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="rr-section" style={{ background: 'var(--off-white)' }} id="services">
        <div className="rr-section-header">
          <div className="rr-section-tag">Our Services</div>
          <h2 className="rr-section-title">Everything You Need, <span>Under One Roof</span></h2>
          <p className="rr-section-sub">From property search to key handover — we handle every step of your real estate journey.</p>
        </div>
        <div className="rr-services-grid">
          {[{ icon: '🔍', title: 'Property Consultation', desc: 'Expert 1-on-1 guidance tailored to your budget, lifestyle and investment goals.' }, { icon: '📋', title: 'Legal Opinion', desc: 'Full title clearance, RERA verification and encumbrance certificate — absolutely free.' }, { icon: '🏦', title: 'Home Loan Assistance', desc: 'Best loan rates from 12+ banks. We do the paperwork, you sign the dotted line.' }, { icon: '🧭', title: 'Vaastu Consultation', desc: 'Certified Vaastu experts to ensure your home brings positivity and prosperity.' }, { icon: '🏠', title: 'Home Interiors', desc: 'Partner interior designers to make your new house feel like home — on budget.' }, { icon: '📊', title: 'Portfolio Management', desc: "For investors holding multiple properties — we optimise yield, manage tenants & plan exits." }].map((s, i) => (
            <div className="rr-service-card" key={i}><div className="rr-service-icon">{s.icon}</div><h3>{s.title}</h3><p>{s.desc}</p></div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="rr-section rr-process-section" id="process">
        <div className="rr-section-header">
          <div className="rr-section-tag">How It Works</div>
          <h2 className="rr-section-title">Your Journey to <span>Dream Home</span> in 6 Easy Steps</h2>
        </div>
        <div className="rr-process-steps">
          {[{ n: '1', title: 'Free Consultation', desc: 'Tell us your needs, budget & timeline. We listen first.' }, { n: '2', title: 'Curated Shortlist', desc: 'We shortlist 3–5 verified properties matching your profile.' }, { n: '3', title: 'Site Visit / Virtual Tour', desc: 'Visit in person or via live video. Your choice.' }, { n: '4', title: 'Legal Verification', desc: 'Free title check, RERA & encumbrance clearance.' }, { n: '5', title: 'Loan & Registration', desc: 'We coordinate home loan & registration paperwork end-to-end.' }, { n: '6', title: 'Key Handover 🎉', desc: 'Move into your dream home with full support.' }].map((step, i) => (
            <div className="rr-process-step" key={i}>
              <div className="rr-step-num">{step.n}</div>
              <h4>{step.title}</h4>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CALCULATORS */}
      <section className="rr-section" id="tools">
        <div className="rr-section-header">
          <div className="rr-section-tag">Free Tools</div>
          <h2 className="rr-section-title">Plan Smarter with Our <span>Property Calculators</span></h2>
          <p className="rr-section-sub">Make data-driven decisions before you invest a single rupee.</p>
        </div>
        <div className="rr-tools-grid">
          <div className="rr-tool-card">
            <h3>EMI Calculator</h3>
            <div className="rr-tool-sub">Know your monthly home loan EMI instantly</div>
            <div className="rr-calc-row">
              <div className="rr-calc-field"><label>LOAN AMOUNT (₹ LAKHS)</label><input ref={loanAmtRef} type="number" defaultValue="60" min="5" max="500" /></div>
              <div className="rr-calc-field"><label>INTEREST RATE (% p.a.)</label><input ref={intRateRef} type="number" defaultValue="8.5" step="0.1" /></div>
              <div className="rr-calc-field"><label>TENURE (YEARS)</label><input ref={tenureRef} type="number" defaultValue="20" min="1" max="30" /></div>
              <button className="rr-calc-btn" onClick={calcEMI}>Calculate EMI</button>
              <div className="rr-calc-result"><div className="rr-result-label">Monthly EMI</div><div className="rr-result-value">{emiResult}</div></div>
            </div>
          </div>
          <div className="rr-tool-card">
            <h3>Stamp Duty Calculator</h3>
            <div className="rr-tool-sub">Telangana registration charges estimate</div>
            <div className="rr-calc-row">
              <div className="rr-calc-field"><label>PROPERTY VALUE (₹ LAKHS)</label><input ref={propValRef} type="number" defaultValue="80" min="10" /></div>
              <div className="rr-calc-field"><label>PROPERTY TYPE</label><select ref={propTypeRef}><option value="apartment">Apartment / Flat</option><option value="plot">Open Plot / Land</option><option value="villa">Villa / Independent House</option></select></div>
              <button className="rr-calc-btn" onClick={calcStamp}>Calculate Charges</button>
              <div className="rr-calc-result"><div className="rr-result-label">Stamp Duty + Registration</div><div className="rr-result-value">{stampResult}</div></div>
            </div>
          </div>
          <div className="rr-tool-card">
            <h3>Rental Yield Calculator</h3>
            <div className="rr-tool-sub">Check if your investment makes financial sense</div>
            <div className="rr-calc-row">
              <div className="rr-calc-field"><label>PROPERTY COST (₹ LAKHS)</label><input ref={propCostRef} type="number" defaultValue="80" min="10" /></div>
              <div className="rr-calc-field"><label>MONTHLY RENT EXPECTED (₹)</label><input ref={monthRentRef} type="number" defaultValue="25000" min="1000" /></div>
              <button className="rr-calc-btn" onClick={calcROI}>Calculate Yield</button>
              <div className="rr-calc-result"><div className="rr-result-label">Annual Rental Yield</div><div className="rr-result-value">{roiResult}</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* BUILDERS */}
      <section className="rr-section rr-builders-section">
        <div className="rr-section-header">
          <div className="rr-section-tag">Our Builder Partners</div>
          <h2 className="rr-section-title">Listings from <span>Hyderabad&apos;s Best</span> Developers</h2>
          <p className="rr-section-sub">We partner only with RERA-approved, reputation-verified builders — so you never take a risk.</p>
        </div>
        <div className="rr-builders-strip">
          {['Prestige', 'Godrej Properties', 'Brigade', 'Aparna', 'Ramky', 'My Home', 'Aliens Space', 'Vasavi', 'NCC Urban', 'Urbanrise'].map(b => (
            <div key={b} className="rr-builder-logo">{b}</div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="rr-section rr-testimonials-section">
        <div className="rr-section-header">
          <div className="rr-section-tag">Client Stories</div>
          <h2 className="rr-section-title">Trusted by Families <span>Across India & the World</span></h2>
        </div>
        <div className="rr-testimonials-grid">
          {[{ initials: 'RK', name: 'Rajesh Kumar', type: 'NRI Investor — Dubai → Gachibowli', quote: "I was based in Dubai and was worried about buying property in Hyderabad remotely. RisingRoof's NRI team did virtual tours for 4 properties, handled all legal checks, and I bought my dream flat in Gachibowli without visiting once. Absolutely world-class service." }, { initials: 'PS', name: 'Priya Sharma', type: 'IT Professional — Delhi → Kondapur', quote: "Relocated from Delhi to Hyderabad for my IT job. Had no idea about localities here. The team explained everything in Hindi, showed me 3 options near my office in HITEC City, and I closed within 10 days. The loan process was seamless. Highly recommended!" }, { initials: 'AR', name: 'Aditya Rao', type: 'First-Time Buyer — Kompally', quote: "As a first-time buyer I was terrified of the whole process — loans, RERA, registration… RisingRoof made it so simple. They handled everything and were transparent at every step. No hidden costs, no surprises. I finally own my home at 29!" }, { initials: 'MR', name: 'Meena Reddy', type: 'Pharma Professional — Uppal', quote: "I work in pharma near Genome Valley and needed something affordable yet good. The team showed me exactly the right areas — Uppal and LB Nagar — and found me a 3BHK at a price I didn't think was possible. Great value, great service." }].map((t, i) => (
            <div className="rr-testimonial-card" key={i}>
              <div className="rr-stars">★★★★★</div>
              <p className="rr-quote">&ldquo;{t.quote}&rdquo;</p>
              <div className="rr-testimonial-author">
                <div className="rr-author-avatar">{t.initials}</div>
                <div><div className="rr-author-name">{t.name}</div><div className="rr-author-type">{t.type}</div></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BLOG */}
      <section className="rr-section rr-blog-section" id="blog">
        <div className="rr-section-header">
          <div className="rr-section-tag">Insights & Guides</div>
          <h2 className="rr-section-title">Real Estate Knowledge <span>You Can Trust</span></h2>
          <p className="rr-section-sub">In-depth guides, market updates and locality reports — written by our Hyderabad property experts.</p>
        </div>
        <div className="rr-blog-grid">
          {blogs.map(blog => (
            <div className="rr-blog-card" key={blog.id}>
              <div className="rr-blog-img">{blog.icon}</div>
              <div className="rr-blog-body">
                <span className="rr-blog-tag">{blog.tag}</span>
                <h3>{blog.title}</h3>
                <p>{blog.excerpt}</p>
                <button className="rr-read-more" onClick={() => setActiveBlog(blog.id)}>Read More →</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BLOG MODALS */}
      {activeBlogData && (
        <div className="rr-modal-overlay active" onClick={(e) => { if (e.target === e.currentTarget) setActiveBlog(null); }}>
          <div className="rr-blog-modal">
            <div className="rr-modal-header">
              <button className="rr-modal-close" onClick={() => setActiveBlog(null)}>✕</button>
              <span className="rr-modal-tag">{activeBlogData.tag}</span>
              <h2>{activeBlogData.title}</h2>
              <div className="rr-modal-meta"><span>📅 {activeBlogData.date}</span><span>✍️ {activeBlogData.author}</span><span>⏱ {activeBlogData.read}</span></div>
            </div>
            <div className="rr-modal-body">{activeBlogData.content}</div>
          </div>
        </div>
      )}

      {/* ABOUT */}
      <section className="rr-section" id="about">
        <div className="rr-about-inner">
          <div>
            <div className="rr-section-tag">About RisingRoof</div>
            <h2 className="rr-section-title">Hyderabad&apos;s Most <span>Trusted Property Partner</span> Since 2018</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: 1.8, margin: '20px 0' }}>RisingRoof was founded with one simple mission — to make property buying in Hyderabad transparent, stress-free, and truly rewarding. We got tired of seeing buyers get confused, overcharged, or misled. So we built something different.</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: 1.8, marginBottom: '28px' }}>Today, we are a team of 25+ dedicated real estate experts helping NRIs, IT professionals, first-time buyers and investors across Hyderabad. Every listing we recommend is RERA-verified, every advice we give is unbiased, and every transaction we handle is fully transparent.</p>
            <div className="rr-about-stats">
              {[['7+', 'Years in Hyderabad'], ['25+', 'Expert Advisors'], ['60+', 'Builder Partners'], ['1,200+', 'Happy Families']].map(([num, label]) => (
                <div className="rr-about-stat" key={label}><div className="rr-about-stat-num">{num}</div><div className="rr-about-stat-label">{label}</div></div>
              ))}
            </div>
            <a href="#contact" className="rr-btn-primary">Meet Our Team →</a>
          </div>
          <div className="rr-about-cards">
            {[{ icon: '🎯', title: 'Our Mission', desc: 'To make every property transaction in Hyderabad simple, safe and rewarding — for every buyer, every time.' }, { icon: '👁️', title: 'Our Vision', desc: "To be Hyderabad's most trusted real estate partner — for NRIs, IT professionals and first-time buyers across India and the world." }, { icon: '🤝', title: 'Our Promise', desc: 'Zero hidden charges. 100% transparent advice. We only earn when you find your perfect home — not before.' }].map((c, i) => (
              <div className="rr-about-card" key={i}>
                <div className="rr-about-card-icon">{c.icon}</div>
                <div><h4 className="rr-about-card h4">{c.title}</h4><p>{c.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAREER */}
      <section className="rr-section rr-career-section" id="career">
        <div className="rr-section-header">
          <div className="rr-section-tag">Join Our Team</div>
          <h2 className="rr-section-title">Build Your Career in <span>Real Estate</span> with RisingRoof</h2>
          <p className="rr-section-sub">We are always looking for passionate, driven people who want to help families find their dream homes. Join Hyderabad&apos;s fastest-growing property consultancy.</p>
        </div>
        <div className="rr-careers-grid">
          {[{ icon: '🏡', title: 'Property Advisor', desc: 'Guide clients through buying, selling and renting properties in Hyderabad. Field + office role with uncapped commissions.', tags: ['Full Time', 'Hyderabad'] }, { icon: '🌍', title: 'NRI Relationship Manager', desc: 'Handle NRI client accounts, virtual tours, and international property consultations. Excellent English required.', tags: ['Full Time', 'Remote + Office'] }, { icon: '📱', title: 'Digital Marketing Executive', desc: 'Manage social media, run property ad campaigns on Google & Meta, and generate qualified leads for our sales team.', tags: ['Full Time', 'Hyderabad'] }].map((job, i) => (
            <div className="rr-career-card" key={i}>
              <div style={{ fontSize: '36px', marginBottom: '16px' }}>{job.icon}</div>
              <h3>{job.title}</h3>
              <p>{job.desc}</p>
              <div className="rr-card-tags">
                {job.tags.map(t => <span key={t} className="rr-card-tag">{t}</span>)}
                <span style={{ background: 'rgba(201,168,76,0.15)', color: 'var(--gold)', fontSize: '11px', padding: '4px 10px', borderRadius: '4px', fontWeight: 600 }}>Hiring Now</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: '18px', fontSize: '15px' }}>Interested in joining RisingRoof? Send your resume to <strong style={{ color: 'var(--navy)' }}>hellorisingroof@gmail.com</strong></p>
          <a href="mailto:hellorisingroof@gmail.com?subject=Career Application - RisingRoof" className="rr-btn-primary">📧 Apply Now</a>
        </div>
      </section>

      {/* CONTACT */}
      <div className="rr-contact-section" id="contact">
        <div className="rr-contact-left">
          <div className="rr-section-tag">Get In Touch</div>
          <h2 className="rr-section-title" style={{ color: 'white' }}>Book Your <span>Free</span> Property Consultation</h2>
          <p>No obligation. No sales pressure. Just honest guidance from Hyderabad&apos;s most trusted property experts — in English or Hindi.</p>
          <div className="rr-contact-info-list">
            {[{ icon: '📞', title: 'Call / WhatsApp', val: '+91 84593 21228' }, { icon: '📧', title: 'Email', val: 'hellorisingroof@gmail.com' }, { icon: '📍', title: 'Office', val: 'Gachibowli, Hyderabad – 500032\nMon–Sat: 9am – 7pm IST' }, { icon: '🌍', title: 'NRI Desk', val: 'Available on Zoom / WhatsApp\nAll time zones — UAE, USA, UK' }].map((info, i) => (
              <div className="rr-contact-info-item" key={i}>
                <div className="rr-contact-info-icon">{info.icon}</div>
                <div><h4 style={{ color: 'white', fontFamily: 'Playfair Display, serif', marginBottom: '2px' }}>{info.title}</h4><p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', whiteSpace: 'pre-line' }}>{info.val}</p></div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="rr-contact-form-wrap">
            <h3>Tell Us About Your Property Need</h3>
            <p className="rr-form-sub">We&apos;ll get back within 2 hours during business hours.</p>
            <div className="rr-contact-form">
              <div className="rr-form-row">
                <div className="rr-form-field"><label>YOUR NAME</label><input type="text" placeholder="Full Name" /></div>
                <div className="rr-form-field"><label>PHONE / WHATSAPP</label><input type="tel" placeholder="+91 or international" /></div>
              </div>
              <div className="rr-form-field"><label>YOU ARE A</label>
                <select><option>First-Time Buyer</option><option>NRI Investor</option><option>IT Professional</option><option>Relocating from Another City</option><option>Property Investor</option><option>Pharma Professional</option></select>
              </div>
              <div className="rr-form-field"><label>I AM LOOKING TO</label>
                <select><option>Buy a Home</option><option>Invest in Property</option><option>Sell My Property</option><option>Explore Localities</option></select>
              </div>
              <div className="rr-form-field"><label>YOUR BUDGET RANGE</label>
                <select><option>Under ₹50 Lakhs</option><option>₹50L – ₹1 Crore</option><option>₹1Cr – ₹2Cr</option><option>₹2Cr – ₹5Cr</option><option>Above ₹5 Crore</option></select>
              </div>
              <div className="rr-form-field"><label>ANYTHING ELSE</label><textarea rows={3} placeholder="Tell us more about what you're looking for..." /></div>
              <button className="rr-form-submit">📞 Book My Free Consultation</button>
            </div>
          </div>
        </div>
      </div>

      {/* TRUST BANNER */}
      <div className="rr-trust-banner">
        {['✅ RERA Verified Listings', '🏆 12+ Bank Partnerships', '🌍 NRI Desk Available', '🔒 100% Transparent', '📞 Reply in 2 Hours'].map(item => (
          <div key={item} className="rr-trust-item"><span>{item}</span></div>
        ))}
      </div>

      {/* FOOTER */}
      <footer className="rr-footer">
        <div className="rr-footer-grid">
          <div className="rr-footer-brand">
            <span style={{ fontFamily: 'Playfair Display,serif', fontSize: '22px', fontWeight: 700, color: '#C59DD9' }}>Rising<span style={{ color: '#fff' }}>Roof</span></span>
            <p>Hyderabad&apos;s trusted property partner since 2018. Helping NRIs, IT professionals, first-time buyers and investors find their dream home — with complete transparency and zero hidden charges.</p>
            <div className="rr-footer-socials">
              {['in', 'fb', 'ig', 'yt'].map(s => <a key={s} href="#" className="rr-social-btn">{s === 'in' ? 'Li' : s === 'fb' ? 'Fb' : s === 'ig' ? 'Ig' : 'Yt'}</a>)}
            </div>
          </div>
          <div className="rr-footer-col">
            <h4>Quick Links</h4>
            <ul><li><a href="#audience">Properties</a></li><li><a href="#localities">Localities</a></li><li><a href="#tools">Calculators</a></li><li><a href="#blog">Blog</a></li><li><a href="#about">About Us</a></li><li><a href="#career">Careers</a></li></ul>
          </div>
          <div className="rr-footer-col">
            <h4>Areas We Serve</h4>
            <ul><li><a href="#localities">Gachibowli</a></li><li><a href="#localities">Kondapur</a></li><li><a href="#localities">Banjara Hills</a></li><li><a href="#localities">Kompally</a></li><li><a href="#localities">Financial District</a></li><li><a href="#localities">Tellapur</a></li></ul>
          </div>
          <div className="rr-footer-col">
            <h4>Contact</h4>
            <ul><li><a href="tel:+918459321228">+91 84593 21228</a></li><li><a href="mailto:hellorisingroof@gmail.com">hellorisingroof@gmail.com</a></li><li><a href="#">Gachibowli, Hyderabad</a></li></ul>
            <div style={{ marginTop: '16px' }}><Link href="/login" style={{ color: 'rgba(201,168,76,0.8)', fontSize: '12px', textDecoration: 'none' }}>🔒 Admin Portal</Link></div>
          </div>
        </div>
        <div className="rr-footer-bottom">
          <p>© {new Date().getFullYear()} RisingRoof Group. All rights reserved. | Powered by passion for Hyderabad real estate.</p>
          <span className="rr-rera-badge">RERA Verified Partner</span>
        </div>
      </footer>

      {/* WHATSAPP FLOAT */}
      <a href="https://wa.me/918459321228" className="rr-whatsapp" target="_blank" rel="noopener noreferrer" title="Chat on WhatsApp">
        <svg viewBox="0 0 24 24" fill="white" width="30" height="30"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.885m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>
      </a>

      {/* AI CHATBOT */}
      <AIChatbot />
    </div>
  );
}
