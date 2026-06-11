const fs = require('fs');
let content = fs.readFileSync('app/clinic/page.tsx', 'utf8');
content = content.replace(
  "{ name: 'Гинекология', desc: 'Женское здоровье', slug: 'ginekologiya' },",
  "{ name: 'Эндокринология', desc: 'Заболевания эндокринной системы', slug: 'endokrinologiya' },"
);
content = content.replace(
  "{ name: 'Педиатрия', desc: 'Здоровье детей', slug: 'pediatriya' },",
  "{ name: 'Гастроэнтерология', desc: 'Заболевания ЖКТ', slug: 'gastroenterologiya' },"
);
fs.writeFileSync('app/clinic/page.tsx', content, 'utf8');
console.log('done');
