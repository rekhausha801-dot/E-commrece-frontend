import os

jsx_path = r'C:\Users\Devi\Downloads\E-Commerce\E-Commerce\client\src\pages\customer\Login.jsx'
with open(jsx_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    "import { loginUser } from '../../services/api';",
    "import { loginUser } from '../../services/api';\nimport bgImage from '../../assets/banners/register_bg.jpg';"
)

search_str = '''              <div className="register-prompt">
                Don't have an account? <Link to="/register" className="register-link">Register</Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>'''

replace_str = '''              <div className="register-prompt">
                Don't have an account? <Link to="/register" className="register-link">Register</Link>
              </div>

            </div>
          </div>
          
          {/* Image side - placed on the right */}
          <div className="split-login-left" style={{ backgroundImage: url(), backgroundSize: 'cover', backgroundPosition: 'center' }}>
          </div>

        </div>
      </div>
    </>'''

content = content.replace(search_str, replace_str)

with open(jsx_path, 'w', encoding='utf-8') as f:
    f.write(content)

css_path = r'C:\Users\Devi\Downloads\E-Commerce\E-Commerce\client\src\pages\customer\Login.css'
with open(css_path, 'r', encoding='utf-8') as f:
    css_content = f.read()

css_content = css_content.replace(
    "max-width: 450px;",
    "max-width: 950px;\n  min-height: 580px;"
)

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(css_content)

print("Updates applied successfully.")
