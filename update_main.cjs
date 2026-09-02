const fs = require('fs');
const mainPath = 'C:/Users/Devi/Downloads/E-Commerce/E-Commerce/client/src/main.jsx';
let content = fs.readFileSync(mainPath, 'utf8');

content = content.replace(
    "import './index.css'",
    "import './index.css'\nimport { GoogleOAuthProvider } from '@react-oauth/google';"
);

const searchStr = `<App />
  </React.StrictMode>,`;

const replaceStr = `<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID"}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,`;

content = content.replace(searchStr, replaceStr);

fs.writeFileSync(mainPath, content, 'utf8');
console.log("main.jsx updated");
