const fs = require('fs');
const loginPath = 'C:/Users/Devi/Downloads/E-Commerce/E-Commerce/client/src/pages/customer/Login.jsx';
let content = fs.readFileSync(loginPath, 'utf8');

// Replace useGoogleLogin import with GoogleLogin
content = content.replace(
    "import { useGoogleLogin } from '@react-oauth/google';",
    "import { GoogleLogin } from '@react-oauth/google';"
);

// Define new handler
const hookCode = `  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      const response = await googleLoginApi({ credential: credentialResponse.credential });
      const data = response.data;
      if (data.success || data.token) {
        localStorage.setItem('token', data.token);
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
        }
        window.scrollTo(0, 0);
        if (data.user?.role === 'admin') {
          navigate('/dashboard');
        } else {
          navigate('/');
        }
      } else {
        setErrorMsg(data.message || 'Google Login failed');
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Google Login failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {`;

const oldHookRegex = /  const loginWithGoogle = useGoogleLogin\([\s\S]*?\}\);[\s]*const handleLogin = async \(e\) => \{/g;
if (oldHookRegex.test(content)) {
    content = content.replace(oldHookRegex, hookCode);
} else {
    console.log("Old hook not found!");
}

// Replace old button with GoogleLogin
const buttonRegex = /<button type="button" className="google-login-btn" onClick=\{\(\) => loginWithGoogle\(\)\}>[\s\S]*?<\/button>/g;
const newButton = `<div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => setErrorMsg('Google Login Failed')}
                  theme="outline"
                  size="large"
                  text="continue_with"
                  shape="rectangular"
                  width="360"
                />
              </div>`;

if (buttonRegex.test(content)) {
    content = content.replace(buttonRegex, newButton);
    fs.writeFileSync(loginPath, content, 'utf8');
    console.log("Login.jsx updated to use GoogleLogin");
} else {
    console.log("Button not found!");
}
