const fs = require('fs');
let content = fs.readFileSync('components/ContactWidget.tsx', 'utf8');
content = content.replace(
  '\n            href="tel:+79962408586"',
  '\n          <a\n            href="tel:+79962408586"'
);
fs.writeFileSync('components/ContactWidget.tsx', content, 'utf8');
console.log('done');
