const fs = require('fs');
const path = 'C:/Users/Devi/Downloads/E-Commerce/E-Commerce/client/src/pages/customer/Login.jsx';
let content = fs.readFileSync(path, 'utf8');

if (!content.includes('<WelcomeScreen redirectUrl=')) {
    content = content.replace(
        "  return (\n    <>", 
        "  return (\n    <>\n      {showWelcome && <WelcomeScreen redirectUrl={welcomeRedirect} />}"
    );
    fs.writeFileSync(path, content, 'utf8');
    console.log("Injected WelcomeScreen into Login.jsx");
} else {
    console.log("Already injected");
}
