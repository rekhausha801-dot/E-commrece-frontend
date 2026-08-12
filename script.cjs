const fs = require('fs');
const path = 'C:\\\\Users\\\\Lenovo\\\\.gemini\\\\antigravity-ide\\\\brain\\\\f8b5e395-0ea3-48f5-8028-936301e5cd2a\\\\.system_generated\\\\logs\\\\transcript_full.jsonl';
const targetPath = 'd:\\\\n\\\\E-commrece-frontend\\\\src\\\\pages\\\\admin\\\\Dashboard.jsx';

const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

for (const line of lines) {
  if (!line.trim()) continue;
  try {
    const data = JSON.parse(line);
    if (data.type === 'TOOL_RESPONSE' && typeof data.content === 'string' && data.content.includes('import React') && data.content.includes('Dashboard.css')) {
      let c = data.content;
      let lines = c.split('\\n');
      let codeLines = [];
      let inCode = false;
      for (let l of lines) {
        if (l.includes('The following code has been modified to include a line number')) {
          inCode = true;
          continue;
        }
        if (l.includes('The above content shows the entire') || l.includes('The above content does NOT show')) {
          inCode = false;
          continue;
        }
        if (inCode) {
          const match = l.match(/^\\d+:\\s(.*)/);
          if (match) {
            codeLines.push(match[1]);
          } else {
             if (l.match(/^\\d+:/)) {
                codeLines.push('');
             }
          }
        }
      }
      if (codeLines.length > 100) {
        fs.writeFileSync(targetPath, codeLines.join('\\n'));
        console.log('RESTORED SUCCESS! Lines: ' + codeLines.length);
        break;
      }
    }
  } catch (e) {
  }
}
