const fs = require('fs');

function fixLogin() {
    const path = 'C:/Users/Devi/Downloads/E-Commerce/E-Commerce/client/src/pages/customer/Login.jsx';
    let content = fs.readFileSync(path, 'utf8');

    // Replace navigation logic in handleGoogleSuccess
    content = content.replace(/navigate\('\/dashboard'\);/g, "setWelcomeRedirect('/dashboard'); setShowWelcome(true);");
    content = content.replace(/navigate\('\/'\);/g, "setWelcomeRedirect('/'); setShowWelcome(true);");

    // Insert WelcomeScreen component just after return ( <>
    if (!content.includes('<WelcomeScreen redirectUrl=')) {
        content = content.replace(
            "return (\n    <>", 
            "return (\n    <>\n      {showWelcome && <WelcomeScreen redirectUrl={welcomeRedirect} />}"
        );
    }
    
    fs.writeFileSync(path, content, 'utf8');
}

function fixRegister() {
    const path = 'C:/Users/Devi/Downloads/E-Commerce/E-Commerce/client/src/pages/customer/Register.jsx';
    let content = fs.readFileSync(path, 'utf8');

    // Replace navigation logic
    content = content.replace(/navigate\('\/dashboard'\);/g, "setWelcomeRedirect('/dashboard'); setShowWelcome(true);");
    content = content.replace(/navigate\('\/'\);/g, "setWelcomeRedirect('/'); setShowWelcome(true);");
    
    // In Register, the setTimeout redirects to '/login'. We should trigger animation instead.
    const oldTimeout = `      setTimeout(() => {\n        navigate('/login');\n      }, 2000);`;
    const newTimeout = `      setWelcomeRedirect('/login');\n      setShowWelcome(true);`;
    content = content.replace(oldTimeout, newTimeout);

    fs.writeFileSync(path, content, 'utf8');
}

fixLogin();
fixRegister();
console.log("Fixed WelcomeScreen integrations");
