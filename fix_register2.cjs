const fs = require('fs');
const path = 'C:/Users/Devi/Downloads/E-Commerce/E-Commerce/client/src/pages/customer/Register.jsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
    "    </div>\n  );\n};\n\nexport default Register;",
    "    </div>\n    </>\n  );\n};\n\nexport default Register;"
);

fs.writeFileSync(path, content, 'utf8');
console.log("Fixed fragment syntax");
