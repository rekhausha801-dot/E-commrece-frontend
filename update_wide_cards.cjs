const fs = require('fs');
const path = 'src/pages/customer/Coupons.jsx';
let code = fs.readFileSync(path, 'utf8');

// 1. Prepare Imports
const imports = `// Fallback images
import imgHanging1 from '../../assets/images/occ_casual.png';
import imgHanging2 from '../../assets/images/hd_dress.png';`;

// Replace old imports
code = code.replace(/\/\/ Fallback images[\s\S]*?(?=const Coupons = \(\) => {)/, imports + '\n\n');

// 2. Prepare HTML for 4 wide cards
const cardsHTML = `
          {/* Card 1: New Season */}
          <div className="nc-wide-card card-style-1">
            <div className="nwc-left">
              <div className="nwc-tag"><span className="nwc-dot"></span> EXCLUSIVE OFFER</div>
              <h2 className="nwc-title">New Season</h2>
              <h3 className="nwc-subtitle">NEW STYLE</h3>
              <p className="nwc-desc">Elevate your wardrobe with<br/>our latest collection.</p>
              
              <div className="nwc-discount-box">
                <div className="nwc-discount-top">
                  <span className="nwc-flat">FLAT</span>
                  <span className="nwc-percent">15%</span>
                  <span className="nwc-off">OFF</span>
                </div>
                <div className="nwc-min-purchase">ON MINIMUM PURCHASE OF ₹999</div>
              </div>
            </div>
            
            <div className="nwc-divider"></div>
            
            <div className="nwc-right">
              <p className="nwc-use-code">USE CODE</p>
              <div className="nwc-code-box">STYLE15</div>
              <button className="nwc-copy-btn theme-brown"><Copy size={14} style={{marginRight: 6}}/> COPY CODE</button>
            </div>
          </div>

          {/* Card 2: Chic Picks */}
          <div className="nc-wide-card card-style-2">
            <div className="nwc-image-container">
              <img src={imgHanging2} alt="Dresses" />
            </div>
            <div className="nwc-content-full">
              <div className="nwc-tag-center"><Clock size={12} style={{marginRight: 4}}/> LIMITED TIME</div>
              <h2 className="nwc-title-center">Chic Picks</h2>
              <h3 className="nwc-subtitle-center">JUST FOR YOU</h3>
              <div className="nwc-heart-divider"><Heart size={10} fill="#B36B6B" color="#B36B6B"/></div>
              <p className="nwc-desc-center">Grab your favorites at<br/>special prices.</p>
              
              <div className="nwc-horizontal-code">
                <span className="nwc-h-label">CODE</span>
                <span className="nwc-h-value">CHIC10</span>
                <button className="nwc-h-copy theme-pink"><Copy size={14}/></button>
              </div>
              <p className="nwc-min-purchase-center">GET 10% OFF ON ORDERS ABOVE ₹1299</p>
            </div>
          </div>

          {/* Card 3: Wardrobe Refresh */}
          <div className="nc-wide-card card-style-3">
            <div className="nwc-image-left">
              <img src={imgHanging1} alt="Wardrobe" />
            </div>
            <div className="nwc-left">
              <div className="nwc-tag"><span className="nwc-dot"></span> SPECIAL OFFER</div>
              <h2 className="nwc-title">Wardrobe</h2>
              <h3 className="nwc-subtitle script-font">Refresh</h3>
              <p className="nwc-desc">Revamp your look with<br/>trending styles.</p>
              
              <div className="nwc-discount-box">
                <div className="nwc-discount-top">
                  <span className="nwc-flat">FLAT</span>
                  <span className="nwc-percent">20%</span>
                  <span className="nwc-off">OFF</span>
                </div>
                <div className="nwc-min-purchase">ON MINIMUM PURCHASE OF ₹1499</div>
              </div>
            </div>
            
            <div className="nwc-divider"></div>
            
            <div className="nwc-right">
              <p className="nwc-use-code">USE CODE</p>
              <div className="nwc-code-box">REFRESH20</div>
              <button className="nwc-copy-btn theme-rose"><Copy size={14} style={{marginRight: 6}}/> COPY CODE</button>
            </div>
          </div>

          {/* Card 4: Fashion Edit */}
          <div className="nc-wide-card card-style-4">
            <div className="nwc-left">
              <div className="nwc-tag-center">TODAY'S DEAL</div>
              <h2 className="nwc-title-serif">Fashion</h2>
              <h3 className="nwc-subtitle-script">Edit</h3>
              <p className="nwc-desc-center" style={{marginTop: 16}}>Curated styles. Irresistible offers.</p>
              
              <div className="nwc-discount-box-inline">
                <Tag size={18} style={{marginRight: 8, color: '#9B7443'}}/>
                <span className="nwc-flat">FLAT</span>
                <span className="nwc-percent">25%</span>
                <span className="nwc-off">OFF</span>
              </div>
              <div className="nwc-min-purchase" style={{textAlign: 'center', width: '100%'}}>ON ORDERS ABOVE ₹1999</div>
            </div>
            
            <div className="nwc-divider"></div>
            
            <div className="nwc-right">
              <p className="nwc-use-code">USE CODE</p>
              <div className="nwc-code-box">EDIT25</div>
              <button className="nwc-copy-btn theme-gold"><Copy size={14} style={{marginRight: 6}}/> COPY CODE</button>
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
/* WIDE CARDS GRID UPDATE */
.nc-coupons-grid {
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr)) !important;
  gap: 24px;
}

/* WIDE CARD DESIGN */
.nc-wide-card {
  background: #FDFBF8; /* Very soft warm beige */
  border-radius: 20px;
  display: flex;
  height: 260px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.04);
  overflow: hidden;
  position: relative;
  border: 1px solid rgba(0,0,0,0.03);
  font-family: 'Inter', sans-serif;
  color: #333;
}

.nwc-left {
  flex: 1;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.nwc-right {
  width: 200px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.nwc-divider {
  width: 1px;
  border-left: 2px dashed #E5DCD0;
  margin: 32px 0;
}

/* Typography & Layouts */
.nwc-tag {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 1.5px;
  color: #9C836A;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}
.nwc-dot {
  width: 4px;
  height: 4px;
  background: #9C836A;
  border-radius: 50%;
  margin-right: 8px;
}

.nwc-title {
  font-family: 'Playfair Display', serif;
  font-size: 34px;
  font-weight: 500;
  line-height: 1.1;
  margin: 0;
  color: #2D3748;
}

.nwc-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  letter-spacing: 3px;
  color: #A38C75;
  margin: 4px 0 16px 0;
}

.nwc-desc {
  font-size: 11px;
  color: #555;
  line-height: 1.6;
  margin-bottom: 24px;
}

.nwc-discount-box {
  background: #F4EBE0;
  padding: 12px 16px;
  border-radius: 8px;
  display: inline-block;
  align-self: flex-start;
}

.nwc-discount-top {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.nwc-flat { font-size: 10px; font-weight: 600; color: #666; }
.nwc-percent { font-size: 28px; font-family: 'Playfair Display', serif; font-weight: 500; color: #8A6745; line-height: 1; }
.nwc-off { font-size: 12px; font-weight: 600; color: #666; }
.nwc-min-purchase { font-size: 9px; font-weight: 600; letter-spacing: 0.5px; color: #666; margin-top: 4px; }

/* Right side elements */
.nwc-use-code {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 1px;
  color: #444;
  margin-bottom: 12px;
}

.nwc-code-box {
  font-family: 'Playfair Display', serif;
  font-size: 24px;
  color: #8C6A48;
  padding: 12px 24px;
  border: 1px dashed #B89C82;
  border-radius: 8px;
  margin-bottom: 20px;
  width: 100%;
  text-align: center;
}

.nwc-copy-btn {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 6px;
  color: white;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.2s;
}

/* Card 2 Variations (Chic Picks) */
.nwc-image-container {
  width: 40%;
  height: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 0 100px 100px 0;
}
.nwc-image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.nwc-content-full {
  width: 60%;
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.nwc-tag-center {
  font-size: 10px;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  color: #777;
  margin-bottom: 12px;
}

.nwc-title-center {
  font-family: 'Playfair Display', serif;
  font-size: 32px;
  font-weight: 500;
  margin: 0;
}
.nwc-subtitle-center {
  font-size: 12px;
  letter-spacing: 3px;
  color: #B36B6B;
  margin: 8px 0;
}
.nwc-heart-divider { margin-bottom: 16px; }
.nwc-desc-center { font-size: 11px; color: #666; margin-bottom: 24px; }

.nwc-horizontal-code {
  display: flex;
  align-items: center;
  border: 1px dashed #D3A7A7;
  border-radius: 6px;
  padding: 4px;
  margin-bottom: 12px;
}
.nwc-h-label { font-size: 10px; padding: 0 12px; color: #555; }
.nwc-h-value { font-family: 'Playfair Display', serif; font-size: 18px; color: #B36B6B; padding: 0 16px; border-left: 1px solid #EEE; }
.nwc-h-copy { width: 36px; height: 36px; border: none; border-radius: 4px; color: white; display: flex; align-items: center; justify-content: center; cursor: pointer; }
.nwc-min-purchase-center { font-size: 9px; color: #555; letter-spacing: 0.5px; }


/* Card 3 Variations */
.nwc-image-left {
  width: 180px;
  height: 100%;
}
.nwc-image-left img { width: 100%; height: 100%; object-fit: cover; }
.script-font { font-family: 'Dancing Script', cursive; font-size: 28px !important; color: #B36B6B; letter-spacing: 1px !important; margin-top: -5px !important; text-transform: none; }

/* Card 4 Variations */
.card-style-4 .nwc-left { align-items: center; text-align: center; }
.nwc-title-serif { font-family: 'Playfair Display', serif; font-size: 36px; color: #2D3748; margin: 0; line-height: 1; }
.nwc-subtitle-script { font-family: 'Dancing Script', cursive; font-size: 36px; color: #9C836A; margin: -10px 0 0 0; font-weight: normal; }
.nwc-discount-box-inline { background: #F4EBE0; padding: 12px 24px; border-radius: 8px; display: flex; align-items: baseline; margin-bottom: 8px; }

/* Colors */
.theme-brown { background: #9D734E; }
.theme-pink { background: #DB8080; }
.theme-rose { background: #B36B6B; }
.theme-gold { background: #9E7445; }
`;

fs.appendFileSync('src/pages/customer/Coupons.css', css);
