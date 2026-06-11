const fs = require('fs');
let c = fs.readFileSync('app/clinic/page.tsx', 'utf8');
c = c.replace(
  `background:'linear-gradient(90deg,rgba(143,166,192,0.78) 0%,rgba(159,184,214,0.78) 45%,rgba(183,210,234,0.78) 100%)'`,
  `background:'linear-gradient(90deg,rgba(143,166,192,0.65) 0%,rgba(159,184,214,0.65) 45%,rgba(183,210,234,0.65) 100%)'`
);
fs.writeFileSync('app/clinic/page.tsx', c, 'utf8');
console.log('done');
