const fs = require('fs');
const registerPath = 'C:/Users/Devi/Downloads/E-Commerce/E-Commerce/client/src/pages/customer/Register.jsx';
let content = fs.readFileSync(registerPath, 'utf8');

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
        setError(data.message || 'Google Login failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Google Login failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {`;

const oldHookRegex = /  const loginWithGoogle = useGoogleLogin\([\s\S]*?\}\);[\s]*const handleSubmit = async \(e\) => \{/g;
if (oldHookRegex.test(content)) {
    content = content.replace(oldHookRegex, hookCode);
} else {
    console.log("Old hook not found in Register!");
}

// Replace old button with GoogleLogin
const buttonRegex = /<button type="button" className="register-google-btn" onClick=\{\(\) => loginWithGoogle\(\)\}>[\s\S]*?<\/button>/g;
const newButton = `<div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => setError('Google Login Failed')}
                  theme="outline"
                  size="large"
                  text="signup_with"
                  shape="rectangular"
                  width="100%"
                />
              </div>`;

if (buttonRegex.test(content)) {
    content = content.replace(buttonRegex, newButton);
    fs.writeFileSync(registerPath, content, 'utf8');
    console.log("Register.jsx updated to use GoogleLogin");
} else {
    console.log("Button not found in Register!");
}
