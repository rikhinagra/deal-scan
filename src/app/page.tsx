
import InteractiveScene from '@/components/InteractiveScene';
import NavScrollHandler from '@/components/NavScrollHandler';
import { Zap, BarChart3, Lock, Car, ClipboardList, Smartphone, Handshake, User, Building2, Star, Check, Play, AlertTriangle, Flag } from 'lucide-react';
import { FaGooglePlay, FaApple } from 'react-icons/fa';

export default function Home() {
  return (
    <>
      <NavScrollHandler />
      {/* InteractiveScene disabled — video background is used instead */}
      {/* <InteractiveScene /> */}




      {/* PORSCHE-INSPIRED CAR CURSOR */}


      {/* NAV */}
      <nav role="banner">
        <a href="/" className="flogo" aria-label="DealScan Home" style={{ textDecoration: 'none', color: '#ffffff', fontSize: '1.55rem' }}>
          DEALSCAN
        </a>
        <div className="nav-r">
          <span className="nav-tag">Smart Car Buying · Android &amp; iOS</span>
          <a href="#download" className="nav-btn">Get the App</a>
        </div>
      </nav>

      {/* HERO */}
      <main id="main">
        <section className="hero" aria-label="Hero" itemScope itemType="https://schema.org/SoftwareApplication">
          {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="hero-video-bg"
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>

          <div className="hbg"></div>
          <div className="hgrid"></div>

          {/* HERO CONTENT */}
          <div className="hero-in">

            {/* LEFT: Main Text */}
            <div className="hero-copy">
              <div className="eyebrow rv d1"><span className="edot"></span>Car Buying Intelligence · Android &amp; iOS</div>
              <h1 className="rv d2" itemProp="name">
                DRIVE IT<br />
                HOME<br />
                <span className="hl">TODAY.</span><br />
                <span className="soft">CONFIDENT.</span>
              </h1>
              <p className="hero-desc rv d3" itemProp="description">
                When the dealer hands you that offer sheet, DealScan <strong>reads every number instantly</strong> — breaking down financing terms, fees, and add-ons into plain English so you walk out <strong>knowing exactly what you paid for.</strong>
              </p>
              <div className="hero-label rv d4">
                <span className="hero-label-dot"></span>
                90-Second Decode
              </div>
            </div>

            {/* RIGHT: Download Buttons */}
            <div className="hero-right rv d5">
              <a href="#download-android" className="bstore band" aria-label="Download DealScan on Google Play">
                <div className="bstore-ic"><FaGooglePlay size={18} fill="currentColor" /></div>
                <div className="bstore-t"><span className="bstore-s">Get it on</span><span className="bstore-m">Google Play</span></div>
              </a>
              <a href="#download-ios" className="bstore bios" aria-label="Download DealScan on App Store">
                <div className="bstore-ic"><FaApple size={20} fill="currentColor" /></div>
                <div className="bstore-t"><span className="bstore-s">Download on</span><span className="bstore-m">App Store</span></div>
              </a>
            </div>

          </div>

          {/* BOTTOM STATS BAR */}
          <div className="hero-stats rv d5">
            <div className="hero-stat">
              <span className="hero-stat-v">50<span>K+</span></span>
              <span className="hero-stat-l">Deals Scanned</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-v">4.8<span><Star size={16} strokeWidth={2} fill="currentColor" /></span></span>
              <span className="hero-stat-l">App Rating</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-v">90<span>s</span></span>
              <span className="hero-stat-l">Full Decode</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-v">All<span> <Check size={16} strokeWidth={3} /></span></span>
              <span className="hero-stat-l">Dealers Supported</span>
            </div>
          </div>

        </section>

        {/* ROAD SCENE DIVIDER */}
        <div className="road-scene" aria-hidden="true">
          <div className="road">
            <div className="road-lines"></div>
          </div>

          {/* EXHAUST (offset behind car) */}
          <div className="exhaust-wrap" style={{ "left": "-220px" }}>
            <span></span><span></span><span></span><span></span>
          </div>

          {/* PORSCHE-STYLE ANIMATED CAR */}
          <div className="road-car-wrap">
            {/* headlight beams */}
            <div className="road-headlight"></div>
            <div className="road-headlight-low"></div>
            <div className="road-ground-glow"></div>
            {/* taillight glow */}
            <div className="road-tailglow"></div>

            {/* honk sound waves + text */}
            <div className="honk-wrap">
              <div className="honk-ring"></div>
              <div className="honk-ring"></div>
              <div className="honk-ring"></div>
              <div className="honk-text">BEEP BEEP!</div>
            </div>

            {/* Porsche 911 Image Car */}
            <img
              src="/porsche-911.webp"
              alt="Porsche 911"
              style={{ width: '160px', height: 'auto', display: 'block', transform: 'translateY(-10px)' }}
            />
          </div>

          {/* floating label */}
          <div className="drive-tag"><span className="drive-tag-dot"></span> Drive It Home Today</div>
        </div>

        {/* HOW IT WORKS */}
        <section className="sec" id="how-it-works">
          <div className="sec-lbl">How It Works</div>
          <h2>FOUR STEPS TO A <span>CONFIDENT</span> DEAL</h2>
          <div className="steps" role="list">
            <div className="step" role="listitem">
              <span className="snum">Step 01</span>
              <div className="sic"><ClipboardList size={24} strokeWidth={1.8} /></div>
              <h3>Receive the Offer Sheet</h3>
              <p>Your dealer presents their first proposal — a standard sheet with pricing, financing terms, and optional add-ons. Take your time, no pressure.</p>
            </div>
            <div className="step" role="listitem">
              <span className="snum">Step 02</span>
              <div className="sic"><Smartphone size={24} strokeWidth={1.8} /></div>
              <h3>Open DealScan &amp; Scan</h3>
              <p>Point your phone at the document. DealScan's smart OCR reads every line item — price, APR, fees, and packages — in under 90 seconds.</p>
            </div>
            <div className="step" role="listitem">
              <span className="snum">Step 03</span>
              <div className="sic"><BarChart3 size={24} strokeWidth={1.8} /></div>
              <h3>Get a Clear Breakdown</h3>
              <p>Every number is explained in plain English. See what's included, what's optional, and what each item actually means for your monthly payment.</p>
            </div>
            <div className="step" role="listitem">
              <span className="snum">Step 04</span>
              <div className="sic"><Handshake size={24} strokeWidth={1.8} /></div>
              <h3>Have a Productive Conversation</h3>
              <p>Engage your salesperson from a place of knowledge. Informed buyers and transparent dealers reach agreements faster — and with greater confidence on both sides.</p>
            </div>
          </div>
        </section>

        {/* STATS */}
        <div className="stats" role="region" aria-label="App statistics">
          <div className="stat"><div className="stn">90<em>s</em></div><div className="std">Average time to fully decode any dealer offer sheet</div></div>
          <div className="stat"><div className="stn">50<em>K+</em></div><div className="std">Car deals analyzed across all major brands and dealers</div></div>
          <div className="stat"><div className="stn">4.8<em><Star size={18} strokeWidth={2} fill="currentColor" /></em></div><div className="std">Average app store rating from verified car buyers</div></div>
          <div className="stat"><div className="stn">All<em> <Check size={18} strokeWidth={3} /></em></div><div className="std">New, used, and CPO dealerships supported nationwide</div></div>
        </div>

        {/* WHO IT'S FOR */}
        <section className="who" id="who">
          <div className="sec-lbl">Built for Everyone at the Table</div>
          <h2>CLARITY FOR <span>BUYERS</span>, TRUST FOR <span>DEALERS</span></h2>
          <div className="who-grid">
            <div className="wcard">
              <div className="wtag"><User size={14} strokeWidth={2} /> For Car Buyers</div>
              <h3>SHOP WITH CONFIDENCE</h3>
              <p>Whether it's your first car or your tenth, DealScan gives you the context to ask the right questions and make decisions you'll feel great about — both at signing and years later.</p>
              <ul className="wlist">
                <li className="wi"><div className="wck"><svg viewBox="0 0 12 12" fill="none" width="10" height="10"><path d="M2 6l3 3 5-5" stroke="#e84830" strokeWidth="1.5" /></svg></div>Understand every line on your offer sheet in plain English</li>
                <li className="wi"><div className="wck"><svg viewBox="0 0 12 12" fill="none" width="10" height="10"><path d="M2 6l3 3 5-5" stroke="#e84830" strokeWidth="1.5" /></svg></div>Know what's standard and what's optional — without guessing</li>
                <li className="wi"><div className="wck"><svg viewBox="0 0 12 12" fill="none" width="10" height="10"><path d="M2 6l3 3 5-5" stroke="#e84830" strokeWidth="1.5" /></svg></div>Ask informed questions and have a real, two-way conversation</li>
                <li className="wi"><div className="wck"><svg viewBox="0 0 12 12" fill="none" width="10" height="10"><path d="M2 6l3 3 5-5" stroke="#e84830" strokeWidth="1.5" /></svg></div>Leave with complete confidence in every decision you made</li>
              </ul>
            </div>
            <div className="wcard">
              <div className="wtag"><Building2 size={14} strokeWidth={2} /> For Dealerships</div>
              <h3>BUILD LASTING TRUST</h3>
              <p>When buyers understand your offer sheet, they trust the process. Trust drives referrals, loyalty, and repeat business. DealScan supports dealerships committed to a professional, transparent customer experience.</p>
              <ul className="wlist">
                <li className="wi"><div className="wck"><svg viewBox="0 0 12 12" fill="none" width="10" height="10"><path d="M2 6l3 3 5-5" stroke="#e84830" strokeWidth="1.5" /></svg></div>Informed buyers close faster with fewer objections</li>
                <li className="wi"><div className="wck"><svg viewBox="0 0 12 12" fill="none" width="10" height="10"><path d="M2 6l3 3 5-5" stroke="#e84830" strokeWidth="1.5" /></svg></div>Transparent deals create stronger relationships and referrals</li>
                <li className="wi"><div className="wck"><svg viewBox="0 0 12 12" fill="none" width="10" height="10"><path d="M2 6l3 3 5-5" stroke="#e84830" strokeWidth="1.5" /></svg></div>Support an educated buyer base — the future of auto retail</li>
                <li className="wi"><div className="wck"><svg viewBox="0 0 12 12" fill="none" width="10" height="10"><path d="M2 6l3 3 5-5" stroke="#e84830" strokeWidth="1.5" /></svg></div>Position your store as a customer-first, professional operation</li>
              </ul>
            </div>
          </div>
        </section>

        {/* DOWNLOAD CTA */}
        <section className="cta" id="download">
          <div className="cta-lbl">Free to Download · Android &amp; iOS</div>
          <h2>YOUR NEXT CAR DEAL,<br /><span>FULLY UNDERSTOOD.</span></h2>
          <p className="cta-sub">Download DealScan free and walk into any dealership with the clarity and context to make a decision you'll feel confident about.</p>

          <div className="dl-panels">
            <article className="dlp" id="download-android" itemScope itemType="https://schema.org/SoftwareApplication">
              <div className="dlplat"><FaGooglePlay size={13} fill="currentColor" /> Google Play</div>
              <div className="dlos" itemProp="name">ANDROID</div>
              <p className="dldd" itemProp="description">Full-featured offer scanner for Android. Offline-capable, lightweight, and fast.</p>
              <div className="dlreq">Requires Android 8.0+</div>
              <a href="#" className="dlbtn" aria-label="Download DealScan on Google Play" itemProp="downloadUrl">
                <FaGooglePlay size={14} fill="currentColor" style={{ marginRight: '6px' }} />
                Download Free
              </a>
            </article>
            <article className="dlp" id="download-ios" itemScope itemType="https://schema.org/SoftwareApplication">
              <div className="dlplat"><FaApple size={15} fill="currentColor" style={{ transform: 'translateY(-1px)' }} /> App Store</div>
              <div className="dlos" itemProp="name">iPHONE</div>
              <p className="dldd" itemProp="description">Optimized for iPhone with haptic feedback and crisp scanning on any screen size.</p>
              <div className="dlreq">Requires iOS 14.0+</div>
              <a href="#" className="dlbtn dlbtn-ios" aria-label="Download DealScan on Apple App Store" itemProp="downloadUrl">
                <FaApple size={16} fill="currentColor" style={{ marginRight: '6px', transform: 'translateY(-1px)' }} />
                Download Free
              </a>
            </article>
          </div>
        </section>

        {/* FAQ */}
        <section className="faq" id="faq" itemScope itemType="https://schema.org/FAQPage">
          <div className="sec-lbl">FAQ</div>
          <h2>COMMON <span>QUESTIONS</span></h2>
          <div className="fqi" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
            <div className="fqq" itemProp="name">How does DealScan work at the dealership?</div>
            <div className="fqa" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer"><span itemProp="text">When your dealer presents their offer sheet, open DealScan and point your phone's camera at the document. The app reads every number using smart OCR — price, financing terms, fees, and optional add-ons — and displays a plain-language breakdown in under 90 seconds.</span></div>
          </div>
          <div className="fqi" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
            <div className="fqq" itemProp="name">Is DealScan designed to work against dealerships?</div>
            <div className="fqa" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer"><span itemProp="text">Absolutely not. DealScan is built to improve communication between buyers and dealers. When buyers understand the numbers, conversations are smoother, trust is higher, and deals close faster. Transparency benefits everyone at the table.</span></div>
          </div>
          <div className="fqi" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
            <div className="fqq" itemProp="name">Is DealScan free to download?</div>
            <div className="fqa" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer"><span itemProp="text">Yes, DealScan is free to download on both Google Play (Android) and the App Store (iPhone and iPad). Core offer sheet scanning and plain-language breakdown features are included at no cost.</span></div>
          </div>
          <div className="fqi" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
            <div className="fqq" itemProp="name">Which car brands and dealerships does DealScan support?</div>
            <div className="fqa" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer"><span itemProp="text">DealScan supports standard offer sheet formats used at all major US dealerships — Toyota, Honda, Ford, GM, BMW, Mercedes-Benz, and independent lots. If a dealer uses a standard pricing sheet, DealScan can read it.</span></div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer role="contentinfo">
        <div style={{ "display": "flex", "alignItems": "center", "gap": "2rem", "flexWrap": "wrap", width: '100%', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <span className="flogo">DEALSCAN</span>
          <nav className="flinks">
            <a href="#how-it-works" className="flink">How It Works</a>
            <a href="#who" className="flink">Who It's For</a>
            <a href="#faq" className="flink">FAQ</a>
            <a href="#download" className="flink">Download</a>
          </nav>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid rgba(30,25,20,0.08)', paddingTop: '1.5rem' }}>
          <span className="fcopy">© 2025 DealScan · Smart Car Buying Technology</span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="/privacy" className="flink">Privacy</a>
            <a href="/terms" className="flink">Terms</a>
          </div>
        </div>
      </footer>



    </>
  );
}
