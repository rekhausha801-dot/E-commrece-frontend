const fs = require('fs');

function updateFile(filePath, isRegister) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Add import
    if (!content.includes('WelcomeScreen')) {
        content = content.replace(
            "import { useNavigate, Link } from 'react-router-dom';",
            "import { useNavigate, Link } from 'react-router-dom';\nimport WelcomeScreen from '../../components/WelcomeScreen';"
        );
    }

    // Add state variables
    if (!content.includes('showWelcome')) {
        content = content.replace(
            "const [loading, setLoading] = useState(false);",
            "const [loading, setLoading] = useState(false);\n    const [showWelcome, setShowWelcome] = useState(false);\n    const [welcomeRedirect, setWelcomeRedirect] = useState('/');"
        );
    }

    // Update handleGoogleSuccess in Login & Register
    const oldGoogleNavigate = `          if (data.user?.role === 'admin') {
            navigate('/dashboard');
          } else {
            navigate('/');
          }`;
    const newGoogleNavigate = `          setWelcomeRedirect(data.user?.role === 'admin' ? '/dashboard' : '/');
          setShowWelcome(true);`;
    content = content.replace(oldGoogleNavigate, newGoogleNavigate);

    // Update handleLogin / handleSubmit normal flow
    if (isRegister) {
        const oldRegisterNavigate = `      setTimeout(() => {
        navigate('/login');
      }, 2000);`;
        const newRegisterNavigate = `      setWelcomeRedirect('/login');
      setShowWelcome(true);`;
        content = content.replace(oldRegisterNavigate, newRegisterNavigate);
    } else {
        const oldLoginNavigate = `          // Redirect based on role
          if (data.user?.role === 'admin') {
            navigate('/dashboard');
          } else {
            navigate('/');
          }`;
        const newLoginNavigate = `          setWelcomeRedirect(data.user?.role === 'admin' ? '/dashboard' : '/');
          setShowWelcome(true);`;
        content = content.replace(oldLoginNavigate, newLoginNavigate);
    }

    // Add WelcomeScreen to JSX output
    const returnRegex = /return \(\s*<div/g;
    content = content.replace(returnRegex, 'return (\n    <>\n      {showWelcome && <WelcomeScreen redirectUrl={welcomeRedirect} />}\n      <div');
    
    // Close the fragment at the end
    if (content.includes('{showWelcome && <WelcomeScreen')) {
        content = content.replace(/;\n\};\n\nexport default/, '\n    </>\n  );\n};\n\nexport default');
        // Clean up any extra </div> that might have been accidentally left or format mismatch
        // Actually it's better to replace the final `  );\n};` with `    </div>\n    </>\n  );\n};`
        // Wait, the original end is:
        //       </div>
        //     </div>
        //   );
        // };
        content = content.replace(/    <\/div>\n  \);\n\};/g, '    </div>\n    </>\n  );\n};');
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`${isRegister ? 'Register' : 'Login'}.jsx updated with WelcomeScreen`);
}

updateFile('C:/Users/Devi/Downloads/E-Commerce/E-Commerce/client/src/pages/customer/Login.jsx', false);
updateFile('C:/Users/Devi/Downloads/E-Commerce/E-Commerce/client/src/pages/customer/Register.jsx', true);
