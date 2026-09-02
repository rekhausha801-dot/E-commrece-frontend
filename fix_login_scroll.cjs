const fs = require('fs');

const jsxPath = 'C:/Users/Devi/Downloads/E-Commerce/E-Commerce/client/src/pages/customer/Login.jsx';
let content = fs.readFileSync(jsxPath, 'utf8');

content = content.replace(
    "import React, { useState } from 'react';",
    "import React, { useState, useEffect } from 'react';"
);

const searchStr = `  const navigate = useNavigate();

  const handleLogin = async (e) => {`;

const replaceStr = `  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogin = async (e) => {`;

if (content.includes(searchStr)) {
    content = content.replace(searchStr, replaceStr);
    fs.writeFileSync(jsxPath, content, 'utf8');
    console.log("JSX Updates applied successfully.");
} else {
    console.log("Search string not found!");
}
