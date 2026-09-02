const fs = require('fs');
const path = 'C:/Users/Devi/Downloads/E-Commerce/E-Commerce/client/src/pages/customer/Register.jsx';
let content = fs.readFileSync(path, 'utf8');

// The file ends with:
//       </div>
//     </div>
//   );
// };

content = content.replace(
    /      <\/div>\n    <\/div>\n  \);\n\};\n\nexport default Register;/g,
    '      </div>\n    </div>\n    </>\n  );\n};\n\nexport default Register;'
);

fs.writeFileSync(path, content, 'utf8');
console.log("Fixed missing closing fragment in Register.jsx");
