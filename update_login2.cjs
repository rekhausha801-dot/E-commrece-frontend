const fs = require('fs');

const jsxPath = 'C:/Users/Devi/Downloads/E-Commerce/E-Commerce/client/src/pages/customer/Login.jsx';
let content = fs.readFileSync(jsxPath, 'utf8');

content = content.replace(
    "import { loginUser } from '../../services/api';",
    "import { loginUser } from '../../services/api';\nimport bgImage from '../../assets/banners/register_bg.jpg';"
);

const searchStr = `              <div className="register-prompt">
                Don't have an account? <Link to="/register" className="register-link">Register</Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};`;

const replaceStr = `              <div className="register-prompt">
                Don't have an account? <Link to="/register" className="register-link">Register</Link>
              </div>

            </div>
          </div>
          
          {/* Image side - placed on the right */}
          <div className="split-login-left" style={{ backgroundImage: \`url(\${bgImage})\`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          </div>

        </div>
      </div>
    </>
  );
};`;

content = content.replace(searchStr, replaceStr);

fs.writeFileSync(jsxPath, content, 'utf8');

const cssPath = 'C:/Users/Devi/Downloads/E-Commerce/E-Commerce/client/src/pages/customer/Login.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

cssContent = cssContent.replace(
    "max-width: 450px;",
    "max-width: 950px;\n  min-height: 580px;"
);

fs.writeFileSync(cssPath, cssContent, 'utf8');

console.log("Updates applied successfully.");
