const fs = require('fs');

const premiumCss = `
.premium-google-btn-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 25px;
  padding: 4px;
  border-radius: 40px;
  background: white;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid #eaeaea;
}

.premium-google-btn-wrapper:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}
`;

// Update Register.css
const registerCssPath = 'C:/Users/Devi/Downloads/E-Commerce/E-Commerce/client/src/pages/customer/Register.css';
let regCss = fs.readFileSync(registerCssPath, 'utf8');
if (!regCss.includes('.premium-google-btn-wrapper')) {
    fs.writeFileSync(registerCssPath, regCss + '\n' + premiumCss, 'utf8');
}

// Update Login.css
const loginCssPath = 'C:/Users/Devi/Downloads/E-Commerce/E-Commerce/client/src/pages/customer/Login.css';
let logCss = fs.readFileSync(loginCssPath, 'utf8');
if (!logCss.includes('.premium-google-btn-wrapper')) {
    fs.writeFileSync(loginCssPath, logCss + '\n' + premiumCss, 'utf8');
}

// Update Register.jsx
const registerPath = 'C:/Users/Devi/Downloads/E-Commerce/E-Commerce/client/src/pages/customer/Register.jsx';
let regJsx = fs.readFileSync(registerPath, 'utf8');

const regGoogleBtn = `
              <div className="login-divider" style={{ textAlign: 'center', margin: '20px 0', position: 'relative' }}>
                <span style={{ background: '#fff', padding: '0 10px', color: '#666', fontSize: '14px', position: 'relative', zIndex: 1 }}>or</span>
                <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: '#eaeaea', zIndex: 0 }}></div>
              </div>

              <div className="premium-google-btn-wrapper">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => setError('Google Login Failed')}
                  theme="outline"
                  size="large"
                  text="continue_with"
                  shape="pill"
                  width="360"
                />
              </div>
`;

if (!regJsx.includes('premium-google-btn-wrapper')) {
    regJsx = regJsx.replace(
        /<div className="register-footer">/g,
        regGoogleBtn + '\n              <div className="register-footer">'
    );
    fs.writeFileSync(registerPath, regJsx, 'utf8');
}

// Update Login.jsx
const loginPath = 'C:/Users/Devi/Downloads/E-Commerce/E-Commerce/client/src/pages/customer/Login.jsx';
let logJsx = fs.readFileSync(loginPath, 'utf8');

const oldLogGoogleWrapperRegex = /<div style=\{\{ width: '100%', display: 'flex', justifyContent: 'center' \}\}>([\s\S]*?)<\/div>/;
if (oldLogGoogleWrapperRegex.test(logJsx) && !logJsx.includes('premium-google-btn-wrapper')) {
    logJsx = logJsx.replace(
        oldLogGoogleWrapperRegex,
        `<div className="premium-google-btn-wrapper">\n$1\n                </div>`
    );
    // Also change shape="rectangular" to shape="pill" in Login.jsx
    logJsx = logJsx.replace(/shape="rectangular"/g, 'shape="pill"');
    fs.writeFileSync(loginPath, logJsx, 'utf8');
}

console.log("Updated both Register and Login with premium Google button");
