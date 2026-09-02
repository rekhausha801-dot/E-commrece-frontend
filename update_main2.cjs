const fs = require('fs');
const mainPath = 'C:/Users/Devi/Downloads/E-Commerce/E-Commerce/client/src/main.jsx';
let content = fs.readFileSync(mainPath, 'utf8');

const regex = /<App \/>\s*<\/React.StrictMode>,/;

const replaceStr = `<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID"}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,`;

if (regex.test(content)) {
    content = content.replace(regex, replaceStr);
    fs.writeFileSync(mainPath, content, 'utf8');
    console.log("main.jsx updated");
} else {
    console.log("Regex not found in main.jsx!");
}
