const fs = require('fs');

const content = fs.readFileSync('large_block_5.txt', 'utf8');
const lines = content.split('\n');

let startIdx = 0;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('The following code has been modified to include a line number')) {
    startIdx = i + 1;
    break;
  }
}

let endIdx = lines.length;
for (let i = lines.length - 1; i >= 0; i--) {
  if (lines[i].includes('The above content does NOT show the entire file contents') || 
      lines[i].includes('The above content shows the entire, complete file contents')) {
    endIdx = i;
    break;
  }
}

const cleanedLines = [];
for (let i = startIdx; i < endIdx; i++) {
  let line = lines[i];
  // Remove the line number pattern like "1: "
  const match = line.match(/^(\d+):\s(.*)/);
  if (match) {
    cleanedLines.push(match[2]);
  } else {
    // If it doesn't match, just push it (though it should all match)
    // Wait, regex might fail if the line is exactly "1:"
    const match2 = line.match(/^(\d+):(.*)/);
    if (match2) {
       cleanedLines.push(match2[2].startsWith(' ') ? match2[2].substring(1) : match2[2]);
    } else {
       cleanedLines.push(line);
    }
  }
}

fs.writeFileSync('src/pages/admin/Dashboard.jsx', cleanedLines.join('\n'));
console.log('Restored Dashboard.jsx');
