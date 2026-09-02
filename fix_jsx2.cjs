const fs = require('fs');

const jsxPath = 'C:/Users/Devi/Downloads/E-Commerce/E-Commerce/client/src/pages/customer/Login.jsx';
let content = fs.readFileSync(jsxPath, 'utf8');

const regex = /<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/>\s*\);\s*};/g;

const replaceStr = `            </div>
          </div>
          
          {/* Image side - placed on the right */}
          <div className="split-login-left" style={{ backgroundImage: \`url(\${bgImage})\`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          </div>

        </div>
      </div>
    </>
  );
};`;

if (regex.test(content)) {
    content = content.replace(regex, replaceStr);
    fs.writeFileSync(jsxPath, content, 'utf8');
    console.log("JSX Updates applied successfully.");
} else {
    console.log("Regex not found!");
}
