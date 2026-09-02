const fs = require('fs');

const jsxPath = 'C:/Users/Devi/Downloads/E-Commerce/E-Commerce/client/src/pages/customer/Login.jsx';
let content = fs.readFileSync(jsxPath, 'utf8');

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

if (content.includes(searchStr)) {
    content = content.replace(searchStr, replaceStr);
    fs.writeFileSync(jsxPath, content, 'utf8');
    console.log("JSX Updates applied successfully.");
} else {
    console.log("Search string not found!");
}
