const fs = require('fs');
const path = 'src/pages/customer/Coupons.jsx';
let code = fs.readFileSync(path, 'utf8');

// 1. Prepare Imports
const imports = `// Fallback images
import couponHeroImg from '../../assets/images/coupon_hero.png';
import imgDress from '../../assets/images/hd_dress.png';
import imgHandbag from '../../assets/images/elegant_handbag.png';
import imgSweater from '../../assets/images/women_tshirt_1_1785476452842.png';
import imgSunnies from '../../assets/images/stylish_sunglasses.png';
import imgSneaker from '../../assets/images/sneaker.jpg';
import imgEarrings from '../../assets/images/gold_earrings.png';
import imgBag from '../../assets/images/coupon_bg_bag.png';
import imgCasual from '../../assets/images/occ_casual.png';`;

// Replace old imports
code = code.replace(/\/\/ Fallback images[\s\S]*?(?=const Coupons = \(\) => {)/, imports + '\n\n');

// 2. Prepare HTML for 8 cards
const cardsHTML = `
          {/* Card 1 */}
          <div className="nc-clean-card theme-beige">
            <div className="nc-clean-image">
              <img src={imgCasual} alt="Fashion" />
            </div>
            <div className="nc-clean-content">
              <div className="nc-clean-header">
                <span className="nc-clean-badge">BEST DEAL</span>
                <button className="nc-clean-heart"><Heart size={16} /></button>
              </div>
              <div className="nc-clean-offer">
                <h2 className="nc-clean-title">20%<br/><span>OFF</span></h2>
                <p className="nc-clean-desc">On orders above ₹999</p>
              </div>
              <div className="nc-clean-code-area">
                <div className="nc-clean-code-box">FASHION20</div>
                <button className="nc-clean-copy"><Copy size={14}/></button>
              </div>
              <div className="nc-clean-footer">
                <Clock size={12} style={{marginRight: 4}}/> Valid till 30 Jun 2025
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="nc-clean-card theme-pink">
            <div className="nc-clean-image">
              <img src={imgDress} alt="New Arrival" />
            </div>
            <div className="nc-clean-content">
              <div className="nc-clean-header">
                <span className="nc-clean-badge">NEW ARRIVAL</span>
                <button className="nc-clean-heart"><Heart size={16} /></button>
              </div>
              <div className="nc-clean-offer">
                <h2 className="nc-clean-title">15%<br/><span>OFF</span></h2>
                <p className="nc-clean-desc">On new collection</p>
              </div>
              <div className="nc-clean-code-area">
                <div className="nc-clean-code-box">NEW15</div>
                <button className="nc-clean-copy"><Copy size={14}/></button>
              </div>
              <div className="nc-clean-footer">
                <Clock size={12} style={{marginRight: 4}}/> Valid till 25 Jun 2025
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="nc-clean-card theme-green">
            <div className="nc-clean-image">
              <img src={imgHandbag} alt="Extra Save" />
            </div>
            <div className="nc-clean-content">
              <div className="nc-clean-header">
                <span className="nc-clean-badge">EXTRA SAVE</span>
                <button className="nc-clean-heart"><Heart size={16} /></button>
              </div>
              <div className="nc-clean-offer">
                <h2 className="nc-clean-title">10%<br/><span>OFF</span></h2>
                <p className="nc-clean-desc">On orders above ₹1499</p>
              </div>
              <div className="nc-clean-code-area">
                <div className="nc-clean-code-box">EXTRA10</div>
                <button className="nc-clean-copy"><Copy size={14}/></button>
              </div>
              <div className="nc-clean-footer">
                <Clock size={12} style={{marginRight: 4}}/> Valid till 20 Jun 2025
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="nc-clean-card theme-purple">
            <div className="nc-clean-image">
              <img src={imgSweater} alt="Trending" />
            </div>
            <div className="nc-clean-content">
              <div className="nc-clean-header">
                <span className="nc-clean-badge">TRENDING</span>
                <button className="nc-clean-heart"><Heart size={16} /></button>
              </div>
              <div className="nc-clean-offer">
                <h2 className="nc-clean-title">25%<br/><span>OFF</span></h2>
                <p className="nc-clean-desc">On trending styles</p>
              </div>
              <div className="nc-clean-code-area">
                <div className="nc-clean-code-box">TREND25</div>
                <button className="nc-clean-copy"><Copy size={14}/></button>
              </div>
              <div className="nc-clean-footer">
                <Clock size={12} style={{marginRight: 4}}/> Valid till 28 Jun 2025
              </div>
            </div>
          </div>

          {/* Card 5 */}
          <div className="nc-clean-card theme-gold">
            <div className="nc-clean-image">
              <img src={imgSunnies} alt="Summer Sale" />
            </div>
            <div className="nc-clean-content">
              <div className="nc-clean-header">
                <span className="nc-clean-badge">SUMMER SALE</span>
                <button className="nc-clean-heart"><Heart size={16} /></button>
              </div>
              <div className="nc-clean-offer">
                <h2 className="nc-clean-title">30%<br/><span>OFF</span></h2>
                <p className="nc-clean-desc">On summer collection</p>
              </div>
              <div className="nc-clean-code-area">
                <div className="nc-clean-code-box">SUMMER30</div>
                <button className="nc-clean-copy"><Copy size={14}/></button>
              </div>
              <div className="nc-clean-footer">
                <Clock size={12} style={{marginRight: 4}}/> Valid till 15 Jun 2025
              </div>
            </div>
          </div>

          {/* Card 6 */}
          <div className="nc-clean-card theme-blue">
            <div className="nc-clean-image">
              <img src={imgSneaker} alt="Special Price" />
            </div>
            <div className="nc-clean-content">
              <div className="nc-clean-header">
                <span className="nc-clean-badge">SPECIAL PRICE</span>
                <button className="nc-clean-heart"><Heart size={16} /></button>
              </div>
              <div className="nc-clean-offer">
                <h2 className="nc-clean-title">₹200<br/><span>OFF</span></h2>
                <p className="nc-clean-desc">On orders above ₹1999</p>
              </div>
              <div className="nc-clean-code-area">
                <div className="nc-clean-code-box">SAVE200</div>
                <button className="nc-clean-copy"><Copy size={14}/></button>
              </div>
              <div className="nc-clean-footer">
                <Clock size={12} style={{marginRight: 4}}/> Valid till 18 Jun 2025
              </div>
            </div>
          </div>

          {/* Card 7 */}
          <div className="nc-clean-card theme-orange">
            <div className="nc-clean-image">
              <img src={imgEarrings} alt="Festive Offer" />
            </div>
            <div className="nc-clean-content">
              <div className="nc-clean-header">
                <span className="nc-clean-badge">FESTIVE OFFER</span>
                <button className="nc-clean-heart"><Heart size={16} /></button>
              </div>
              <div className="nc-clean-offer">
                <h2 className="nc-clean-title">20%<br/><span>OFF</span></h2>
                <p className="nc-clean-desc">On festive collection</p>
              </div>
              <div className="nc-clean-code-area">
                <div className="nc-clean-code-box">FESTIVE20</div>
                <button className="nc-clean-copy"><Copy size={14}/></button>
              </div>
              <div className="nc-clean-footer">
                <Clock size={12} style={{marginRight: 4}}/> Valid till 30 Jun 2025
              </div>
            </div>
          </div>

          {/* Card 8 */}
          <div className="nc-clean-card theme-brown">
            <div className="nc-clean-image">
              <img src={imgBag} alt="Welcome" />
            </div>
            <div className="nc-clean-content">
              <div className="nc-clean-header">
                <span className="nc-clean-badge">WELCOME</span>
                <button className="nc-clean-heart"><Heart size={16} /></button>
              </div>
              <div className="nc-clean-offer">
                <h2 className="nc-clean-title">10%<br/><span>OFF</span></h2>
                <p className="nc-clean-desc">On your first order</p>
              </div>
              <div className="nc-clean-code-area">
                <div className="nc-clean-code-box">WELCOME10</div>
                <button className="nc-clean-copy"><Copy size={14}/></button>
              </div>
              <div className="nc-clean-footer">
                <Clock size={12} style={{marginRight: 4}}/> Valid till 30 Jun 2025
              </div>
            </div>
          </div>
`;

// Extract everything from <div className="nc-coupons-grid"> until {/* Features Section */}
const startIndex = code.indexOf('<div className="nc-coupons-grid">');
const endIndex = code.indexOf('{/* Features Section */}');
if (startIndex !== -1 && endIndex !== -1) {
  const startToGrid = code.substring(0, startIndex + '<div className="nc-coupons-grid">\n'.length);
  code = startToGrid + cardsHTML + '\n        </div>\n\n        ' + code.substring(endIndex);
  fs.writeFileSync(path, code);
}

// 3. Append new CSS
const css = `
/* BRAND NEW CLEAN CARD DESIGN */
.nc-clean-card {
  background: #FFF;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  display: flex;
  height: 220px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
  font-family: 'Playfair Display', serif; /* Or whatever elegant font */
  border: 1px solid rgba(0,0,0,0.02);
  width: 100%;
  max-width: 320px;
  margin: 0 auto;
}

.nc-clean-image {
  position: absolute;
  right: 0;
  top: 0;
  width: 50%;
  height: 100%;
  z-index: 1;
}

.nc-clean-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: right center;
}

/* Gradient overlay to blend image */
.nc-clean-image::before {
  content: '';
  position: absolute;
  left: -1px;
  top: 0;
  width: 40px;
  height: 100%;
  background: linear-gradient(90deg, #FFF 0%, rgba(255,255,255,0) 100%);
  z-index: 2;
}

.nc-clean-content {
  position: relative;
  z-index: 3;
  width: 60%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: linear-gradient(90deg, #FFF 60%, rgba(255,255,255,0.8) 85%, rgba(255,255,255,0) 100%);
}

.nc-clean-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nc-clean-badge {
  font-family: 'Inter', sans-serif;
  font-size: 9px;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 4px;
  letter-spacing: 0.5px;
}

.nc-clean-heart {
  background: none;
  border: none;
  cursor: pointer;
  color: #111;
  position: absolute;
  right: 16px;
  top: 16px;
  z-index: 10; /* Above image */
}

.nc-clean-offer {
  margin-top: 8px;
}

.nc-clean-title {
  font-size: 32px;
  font-weight: 500;
  margin: 0;
  line-height: 1.1;
  letter-spacing: -1px;
}
.nc-clean-title span {
  font-size: 20px;
}

.nc-clean-desc {
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  color: #555;
  margin: 4px 0 0 0;
}

.nc-clean-code-area {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
}

.nc-clean-code-box {
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 700;
  padding: 6px 12px;
  border: 1px solid #E0E0E0;
  border-radius: 4px;
  letter-spacing: 0.5px;
}

.nc-clean-copy {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

.nc-clean-footer {
  font-family: 'Inter', sans-serif;
  font-size: 10px;
  color: #666;
  display: flex;
  align-items: center;
  margin-top: auto;
}

/* THEMES */
/* Beige Theme */
.theme-beige .nc-clean-badge { background: #F5E8D3; color: #9A773F; }
.theme-beige .nc-clean-title { color: #222; }
.theme-beige .nc-clean-title span { color: #222; }
.theme-beige .nc-clean-code-box { border-color: #F5E8D3; color: #222; }
.theme-beige .nc-clean-copy { background: #D6A868; }

/* Pink Theme */
.theme-pink .nc-clean-badge { background: #FADDE0; color: #B35863; }
.theme-pink .nc-clean-title { color: #CC6B78; }
.theme-pink .nc-clean-title span { color: #CC6B78; }
.theme-pink .nc-clean-code-box { border-color: #FADDE0; color: #111; }
.theme-pink .nc-clean-copy { background: #CC6B78; }

/* Green Theme */
.theme-green .nc-clean-badge { background: #DBE8D7; color: #4B794A; }
.theme-green .nc-clean-title { color: #5B8B5B; }
.theme-green .nc-clean-title span { color: #5B8B5B; }
.theme-green .nc-clean-code-box { border-color: #DBE8D7; color: #111; }
.theme-green .nc-clean-copy { background: #719A71; }

/* Purple Theme */
.theme-purple .nc-clean-badge { background: #E4D8F3; color: #62438C; }
.theme-purple .nc-clean-title { color: #724E9D; }
.theme-purple .nc-clean-title span { color: #724E9D; }
.theme-purple .nc-clean-code-box { border-color: #E4D8F3; color: #111; }
.theme-purple .nc-clean-copy { background: #8E70B3; }

/* Gold Theme */
.theme-gold .nc-clean-badge { background: #F8E3C6; color: #A67B38; }
.theme-gold .nc-clean-title { color: #C6954A; }
.theme-gold .nc-clean-title span { color: #C6954A; }
.theme-gold .nc-clean-code-box { border-color: #F8E3C6; color: #C6954A; }
.theme-gold .nc-clean-copy { background: #D9A24D; }

/* Blue Theme */
.theme-blue .nc-clean-badge { background: #D8E3F2; color: #416B99; }
.theme-blue .nc-clean-title { color: #517BAA; }
.theme-blue .nc-clean-title span { color: #517BAA; }
.theme-blue .nc-clean-code-box { border-color: #D8E3F2; color: #517BAA; }
.theme-blue .nc-clean-copy { background: #608AB9; }

/* Orange Theme */
.theme-orange .nc-clean-badge { background: #F6DFCE; color: #B36841; }
.theme-orange .nc-clean-title { color: #D67A4F; }
.theme-orange .nc-clean-title span { color: #D67A4F; }
.theme-orange .nc-clean-code-box { border-color: #F6DFCE; color: #D67A4F; }
.theme-orange .nc-clean-copy { background: #D67A4F; }

/* Brown Theme */
.theme-brown .nc-clean-badge { background: #EFE7DE; color: #8C7359; }
.theme-brown .nc-clean-title { color: #222; }
.theme-brown .nc-clean-title span { color: #222; }
.theme-brown .nc-clean-code-box { border-color: #EFE7DE; color: #222; }
.theme-brown .nc-clean-copy { background: #C4A78D; }
`;

fs.appendFileSync('src/pages/customer/Coupons.css', css);
