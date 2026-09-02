const fs = require('fs');
const registerPath = 'C:/Users/Devi/Downloads/E-Commerce/E-Commerce/client/src/pages/customer/Register.jsx';
let content = fs.readFileSync(registerPath, 'utf8');

// Add imports
if (!content.includes('useGoogleLogin')) {
    content = content.replace(
        "import { useNavigate, Link } from 'react-router-dom';",
        "import { useNavigate, Link } from 'react-router-dom';\nimport { useGoogleLogin } from '@react-oauth/google';"
    );
}

if (!content.includes('googleLoginApi')) {
    content = content.replace(
        "import { registerUser } from '../../services/api';",
        "import { registerUser, googleLoginApi } from '../../services/api';"
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
          setError(data.message || 'Google Login failed');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Google Login failed.');
      } finally {
        setLoading(false);
      }
    }
  });

  const handleSubmit = async (e) => {`;

if (!content.includes('const loginWithGoogle = useGoogleLogin')) {
    content = content.replace("  const handleSubmit = async (e) => {", hookCode);
}

// Update button onClick
const buttonOld = `<button type="button" className="register-google-btn">`;
const buttonNew = `<button type="button" className="register-google-btn" onClick={() => loginWithGoogle()}>`;

if (!content.includes('onClick={() => loginWithGoogle()}')) {
    content = content.replace(buttonOld, buttonNew);
}

fs.writeFileSync(registerPath, content, 'utf8');
console.log("Register.jsx updated");
