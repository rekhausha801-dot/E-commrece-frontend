const fs = require('fs');
const path = 'C:/Users/Devi/Downloads/E-Commerce/E-Commerce/client/src/pages/customer/AddAddress.jsx';
let content = fs.readFileSync(path, 'utf8');

const oldTryCatch = `    try {
      if (isEdit && formData.id) {
        await fetch(\`\${API_URL}/addresses/\${formData.id}\`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': \`Bearer \${token}\` },
          body: JSON.stringify(payload)
        });
      } else {
        await fetch(\`\${API_URL}/addresses\`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': \`Bearer \${token}\` },
          body: JSON.stringify(payload)
        });
      }
      navigate('/account/addresses');
    } catch (error) {
      console.error('Error saving address:', error);
      alert('Unable to save address. Please try again.');
    }`;

const newTryCatch = `    try {
      let response;
      if (isEdit && formData.id) {
        response = await fetch(\`\${API_URL}/addresses/\${formData.id}\`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': \`Bearer \${token}\` },
          body: JSON.stringify(payload)
        });
      } else {
        response = await fetch(\`\${API_URL}/addresses\`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': \`Bearer \${token}\` },
          body: JSON.stringify(payload)
        });
      }
      
      const data = await response.json();
      if (!response.ok || data.success === false) {
        alert(data.message || 'Unable to save address');
        return;
      }
      
      navigate('/account/addresses');
    } catch (error) {
      console.error('Error saving address:', error);
      alert('Network error. Please try again.');
    }`;

content = content.replace(oldTryCatch, newTryCatch);
fs.writeFileSync(path, content, 'utf8');
console.log("Updated handleSave in AddAddress.jsx to show errors");
