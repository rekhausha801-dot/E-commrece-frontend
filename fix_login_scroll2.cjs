const fs = require('fs');

const jsxPath = 'C:/Users/Devi/Downloads/E-Commerce/E-Commerce/client/src/pages/customer/Login.jsx';
let content = fs.readFileSync(jsxPath, 'utf8');

content = content.replace(
    "import React, { useState } from 'react';",
    "import React, { useState, useEffect } from 'react';"
);

const regex = /const navigate = useNavigate\(\);\s*/;

const replaceStr = `const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  `;

if (regex.test(content)) {
    content = content.replace(regex, replaceStr);
    fs.writeFileSync(jsxPath, content, 'utf8');
    console.log("JSX Updates applied successfully.");
} else {
    console.log("Regex not found!");
}
