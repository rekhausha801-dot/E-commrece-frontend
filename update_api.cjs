const fs = require('fs');
const apiPath = 'C:/Users/Devi/Downloads/E-Commerce/E-Commerce/client/src/services/api.js';
let content = fs.readFileSync(apiPath, 'utf8');

if (!content.includes('export const googleLoginApi')) {
    content = content.replace(
        "export const loginUser = (data) => axios.post(`${AUTH_API}/login`, data);",
        "export const loginUser = (data) => axios.post(`${AUTH_API}/login`, data);\nexport const googleLoginApi = (data) => axios.post(`${AUTH_API}/google`, data);"
    );
    fs.writeFileSync(apiPath, content, 'utf8');
    console.log("api.js updated");
} else {
    console.log("googleLoginApi already exists");
}
