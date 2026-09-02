const fs = require('fs');
const jsxPath = 'C:/Users/Devi/Downloads/E-Commerce/E-Commerce/client/src/components/WelcomeScreen.jsx';
let jsxContent = fs.readFileSync(jsxPath, 'utf8');

// Add import for the new image
if (!jsxContent.includes('relie_logo_premium.png')) {
    jsxContent = jsxContent.replace(
        "import './WelcomeScreen.css';",
        "import './WelcomeScreen.css';\nimport relieLogo from '../assets/relie_logo_premium.png';"
    );
}

// Replace the <div className="premium-logo-r">R</div> with the img tag
jsxContent = jsxContent.replace(
    '<div className="premium-logo-r">R</div>',
    '<img src={relieLogo} alt="Relie Premium Logo" className="premium-logo-img" />'
);

fs.writeFileSync(jsxPath, jsxContent, 'utf8');


const cssPath = 'C:/Users/Devi/Downloads/E-Commerce/E-Commerce/client/src/components/WelcomeScreen.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

// Replace .premium-logo-r with .premium-logo-img and remove text styling
const imgCss = `.premium-logo-img {
  width: 140px;
  height: 140px;
  object-fit: contain;
  z-index: 2;
  filter: drop-shadow(0 0 20px rgba(200, 153, 83, 0.6));
}`;

const oldCssRegex = /\.premium-logo-r \{[\s\S]*?\}/;
cssContent = cssContent.replace(oldCssRegex, imgCss);

fs.writeFileSync(cssPath, cssContent, 'utf8');
console.log("Updated WelcomeScreen with image logo");
