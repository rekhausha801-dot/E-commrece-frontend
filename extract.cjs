const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('C:\\Users\\Lenovo\\.gemini\\antigravity-ide\\brain\\f8b5e395-0ea3-48f5-8028-936301e5cd2a\\.system_generated\\logs\\transcript_full.jsonl');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let largestSnippet = "";
  let currentSnippet = "";
  let collecting = false;

  for await (const line of rl) {
    try {
      const obj = JSON.parse(line);
      if (obj.content && obj.content.includes("Dashboard.jsx")) {
          // If the content is from a VIEW_FILE or USER_INPUT, let's see its length
          if (obj.content.length > 5000) {
             console.log(`Found a large block at step ${obj.step_index}, size: ${obj.content.length}`);
             fs.writeFileSync('large_block_' + obj.step_index + '.txt', obj.content);
          }
      }
    } catch (e) {
      // JSON parse error, skip
    }
  }
}

processLineByLine();
