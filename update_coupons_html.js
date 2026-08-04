const fs = require('fs');
const path = 'src/pages/customer/Coupons.jsx';
let code = fs.readFileSync(path, 'utf8');

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

// Replace lines 90 to 238 with the new cards HTML
const startIndex = code.indexOf('{/* Card 1: Audible */}');
const endIndex = code.indexOf('{/* Features Section */}');
if (startIndex !== -1 && endIndex !== -1) {
  code = code.substring(0, startIndex) + cardsHTML + '\n        </div>\n\n        ' + code.substring(endIndex);
  fs.writeFileSync(path, code);
  console.log('Successfully updated Coupons.jsx');
} else {
  console.log('Could not find indices');
}
