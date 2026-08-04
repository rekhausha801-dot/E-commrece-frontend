const fs = require('fs');

// 1. Rename JS to CJS and execute HTML replacement
let code = fs.readFileSync('src/pages/customer/Coupons.jsx', 'utf8');
const cardsHTML = `
          {/* Card 1: Audible */}
          <div className="nc-new-card audible-card">
            <div className="nc-new-card-header">
              <div className="nc-new-badge audible-badge"><Crown size={12} style={{marginRight: 4}}/> Best Deal</div>
              <button className="nc-new-heart"><Heart size={16} /></button>
            </div>
            <div className="nc-new-card-body">
              <h2 className="nc-new-brand audible-logo">audible</h2>
              <p className="nc-new-offer">Get <strong>2 Months</strong> Free</p>
              <div className="nc-new-image">
                <img src="https://images.unsplash.com/photo-1516280440502-86927dce7e95?auto=format&fit=crop&q=80&w=300" alt="Audible" />
              </div>
            </div>
            <div className="nc-new-card-footer">
              <div className="nc-new-code-box">
                <span className="nc-new-code">AUDIO2M</span>
                <span className="nc-new-divider"></span>
                <button className="nc-new-copy audible-copy"><Copy size={14} style={{marginRight: 4}}/> Copy</button>
              </div>
            </div>
          </div>

          {/* Card 2: boAt */}
          <div className="nc-new-card boat-blue-card">
            <div className="nc-new-card-header">
              <div className="nc-new-badge boat-blue-badge"><Clock size={12} style={{marginRight: 4}}/> Limited Time</div>
              <button className="nc-new-heart"><Heart size={16} /></button>
            </div>
            <div className="nc-new-card-body">
              <h2 className="nc-new-brand boat-logo">boAt</h2>
              <p className="nc-new-offer"><strong>70% OFF</strong></p>
              <div className="nc-new-image">
                <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=300" alt="boAt Earphones" />
              </div>
            </div>
            <div className="nc-new-card-footer">
              <div className="nc-new-code-box">
                <span className="nc-new-code">BOAT70</span>
                <span className="nc-new-divider"></span>
                <button className="nc-new-copy boat-blue-copy"><Copy size={14} style={{marginRight: 4}}/> Copy</button>
              </div>
            </div>
          </div>

          {/* Card 3: boAt Green */}
          <div className="nc-new-card boat-green-card">
            <div className="nc-new-card-header">
              <div className="nc-new-badge boat-green-badge"><Tag size={12} style={{marginRight: 4}}/> Special Price</div>
              <button className="nc-new-heart"><Heart size={16} /></button>
            </div>
            <div className="nc-new-card-body">
              <h2 className="nc-new-brand boat-logo">boAt</h2>
              <p className="nc-new-offer">Only <strong>₹1299</strong></p>
              <div className="nc-new-image">
                <img src="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=300" alt="boAt Earbuds" />
              </div>
            </div>
            <div className="nc-new-card-footer">
              <div className="nc-new-code-box">
                <span className="nc-new-code">BOAT1299</span>
                <span className="nc-new-divider"></span>
                <button className="nc-new-copy boat-green-copy"><Copy size={14} style={{marginRight: 4}}/> Copy</button>
              </div>
            </div>
          </div>

          {/* Card 4: be10x */}
          <div className="nc-new-card be10x-card">
            <div className="nc-new-card-header">
              <div className="nc-new-badge be10x-badge"><Sparkles size={12} style={{marginRight: 4}}/> New</div>
              <button className="nc-new-heart"><Heart size={16} /></button>
            </div>
            <div className="nc-new-card-body">
              <h2 className="nc-new-brand">be10x</h2>
              <p className="nc-new-offer">AI Tools for <strong>Free</strong></p>
              <div className="nc-new-image">
                <div className="be10x-ai-icon">AI</div>
              </div>
            </div>
            <div className="nc-new-card-footer">
              <div className="nc-new-code-box">
                <span className="nc-new-code">BE10XAI</span>
                <span className="nc-new-divider"></span>
                <button className="nc-new-copy be10x-copy"><Copy size={14} style={{marginRight: 4}}/> Copy</button>
              </div>
            </div>
          </div>
`;
const startIndex = code.indexOf('{/* Card 1: Audible */}');
const endIndex = code.indexOf('{/* Features Section */}');
if (startIndex !== -1 && endIndex !== -1) {
  code = code.substring(0, startIndex) + cardsHTML + '\n        </div>\n\n        ' + code.substring(endIndex);
  fs.writeFileSync('src/pages/customer/Coupons.jsx', code);
}

// 2. Append CSS
const css = `
/* NEW CARD DESIGN */
.nc-new-card {
  border-radius: 24px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  font-family: 'Inter', sans-serif;
  height: 400px;
  justify-content: space-between;
}

.audible-card { background: linear-gradient(180deg, #FDF7EF 0%, #F4E4D3 100%); }
.boat-blue-card { background: linear-gradient(180deg, #F3F8FF 0%, #E2EFFE 100%); }
.boat-green-card { background: linear-gradient(180deg, #F0FBF4 0%, #DEEFE3 100%); }
.be10x-card { background: linear-gradient(180deg, #F6EEFF 0%, #EBE0FF 100%); }

.nc-new-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
}

.nc-new-badge {
  display: flex;
  align-items: center;
  font-size: 11px;
  font-weight: 700;
  padding: 6px 12px;
  border-radius: 12px;
}

.audible-badge { background: #F2DDBF; color: #9B621A; }
.boat-blue-badge { background: #D5E6FA; color: #1E5AB6; }
.boat-green-badge { background: #CCEFD7; color: #157B36; }
.be10x-badge { background: #E2D1FA; color: #511894; }

.nc-new-heart {
  background: none;
  border: none;
  cursor: pointer;
  color: #111;
  display: flex;
}

.nc-new-card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 16px;
  z-index: 2;
}

.nc-new-brand {
  font-size: 32px;
  font-weight: 800;
  margin: 0 0 8px 0;
  color: #111;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: -1px;
}

.nc-new-offer {
  font-size: 15px;
  color: #555;
  margin: 0 0 16px 0;
}
.nc-new-offer strong { color: #111; font-weight: 700; }
.be10x-card .nc-new-offer strong { color: #511894; }

.nc-new-image {
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nc-new-image img {
  max-width: 180px;
  max-height: 160px;
  object-fit: contain;
  filter: drop-shadow(0 15px 20px rgba(0,0,0,0.1));
}

.be10x-ai-icon {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #A450FF 0%, #5200FF 100%);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 42px;
  font-weight: 800;
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(100, 0, 255, 0.4);
}

.nc-new-card-footer {
  margin-top: 16px;
  z-index: 2;
}

.nc-new-code-box {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 14px;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nc-new-code {
  font-weight: 700;
  font-size: 15px;
  color: #111;
  padding-left: 16px;
  flex: 1;
  letter-spacing: 0.5px;
}

.nc-new-divider {
  width: 1px;
  height: 24px;
  border-left: 2px dotted #DDD;
  margin: 0 12px;
}

.nc-new-copy {
  display: flex;
  align-items: center;
  border: none;
  border-radius: 10px;
  padding: 12px 20px;
  font-size: 13px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: 0.2s;
}

.audible-copy { background: #965E12; }
.boat-blue-copy { background: #0E4299; }
.boat-green-copy { background: #136932; }
.be10x-copy { background: #370678; }

.nc-new-card::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 250px;
  height: 250px;
  background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%);
  transform: translate(-50%, -40%);
  z-index: 1;
  pointer-events: none;
}
`;
fs.appendFileSync('src/pages/customer/Coupons.css', css);
