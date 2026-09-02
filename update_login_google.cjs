const fs = require('fs');
const loginPath = 'C:/Users/Devi/Downloads/E-Commerce/E-Commerce/client/src/pages/customer/Login.jsx';
let content = fs.readFileSync(loginPath, 'utf8');

// Add imports
if (!content.includes('useGoogleLogin')) {
    content = content.replace(
        "import { useNavigate, Link } from 'react-router-dom';",
        "import { useNavigate, Link } from 'react-router-dom';\nimport { useGoogleLogin } from '@react-oauth/google';"
    );
}

if (!content.includes('googleLoginApi')) {
    content = content.replace(
        "import { loginUser } from '../../services/api';",
        "import { loginUser, googleLoginApi } from '../../services/api';"
    );
}

// Add hook
const hookCode = `  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setLoading(true);
        const response = await googleLoginApi({ token: tokenResponse.access_token });
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
    }
  });

  const handleLogin = async (e) => {`;

if (!content.includes('const loginWithGoogle = useGoogleLogin')) {
    content = content.replace("  const handleLogin = async (e) => {", hookCode);
}

// Update button onClick
const buttonOld = `<button type="button" className="google-login-btn">`;
const buttonNew = `<button type="button" className="google-login-btn" onClick={() => loginWithGoogle()}>`;

if (!content.includes('onClick={() => loginWithGoogle()}')) {
    content = content.replace(buttonOld, buttonNew);
}

fs.writeFileSync(loginPath, content, 'utf8');
console.log("Login.jsx updated");
