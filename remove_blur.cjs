const fs = require('fs');
const path = 'C:/Users/Devi/Downloads/E-Commerce/E-Commerce/client/src/components/WelcomeScreen.css';
let content = fs.readFileSync(path, 'utf8');

const newTextCss = `.welcome-text {
  font-family: 'Playfair Display', serif;
  font-size: 52px;
  font-weight: 800;
  margin: 0 0 12px 0;
  letter-spacing: 2px;
  background: linear-gradient(90deg, #FFFFFF, #FFC107, #FFFFFF);
  background-size: 200% auto;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  animation: shine 2.5s linear infinite, slideUpFade 1s ease-out forwards;
  animation-delay: 0.6s;
  opacity: 0;
  transform: translateY(20px);
  /* Crisp drop shadow instead of heavy blur */
  filter: drop-shadow(0px 4px 6px rgba(0,0,0,0.8));
}`;

content = content.replace(/\.welcome-text\s*\{[\s\S]*?\}/, newTextCss);

fs.writeFileSync(path, content, 'utf8');
console.log("Updated welcome-text to remove blur");
