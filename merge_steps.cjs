const fs = require('fs');
const path = 'src/pages/admin/ProductManagement.jsx';
let content = fs.readFileSync(path, 'utf8');

// Change max step back to 5
content = content.replace('const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 6));', 'const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 5));');

// Merge step 6 into 5
content = content.replace(/\s*<\/div>\s*<\/>\s*\)\}\s*\{currentStep === 6 && \(\s*<>\s*/, '\n            </div>\n');

// Change footer condition
content = content.replace('{currentStep === 6 ? (', '{currentStep === 5 ? (');

fs.writeFileSync(path, content);
console.log('Merged Step 6 into Step 5');
