const fs = require('fs');
let content = fs.readFileSync('app/clinic/page.tsx', 'utf8');

const oldSpecs = `const SPECIALIZATIONS = [
  { name: 'Терапия', desc: 'Общая терапия и диагностика' },
  { name: 'Кардиология', desc: 'Лечение сердца и сосудов' },
  { name: 'Неврология', desc: 'Заболевания нервной системы' },
  { name: 'Ортопедия', desc: 'Опорно-двигательный аппарат' },
  { name: 'Офтальмология', desc: 'Диагностика и лечение зрения' },
  { name: 'Дерматология', desc: 'Заболевания кожи' },
  { name: 'Гинекология', desc: 'Женское здоровье' },
  { name: 'Педиатрия', desc: 'Здоровье детей' },
]`;

const newSpecs = `const SPECIALIZATIONS = [
  { name: 'Терапия', desc: 'Общая терапия и диагностика', slug: 'terapiya' },
  { name: 'Кардиология', desc: 'Лечение сердца и сосудов', slug: 'kardiologiya' },
  { name: 'Неврология', desc: 'Заболевания нервной системы', slug: 'nevrologiya' },
  { name: 'Ортопедия', desc: 'Опорно-двигательный аппарат', slug: 'ortopediya' },
  { name: 'Офтальмология', desc: 'Диагностика и лечение зрения', slug: 'oftalmologiya' },
  { name: 'Дерматология', desc: 'Заболевания кожи', slug: 'dermatologiya' },
  { name: 'Гинекология', desc: 'Женское здоровье', slug: 'ginekologiya' },
  { name: 'Педиатрия', desc: 'Здоровье детей', slug: 'pediatriya' },
]`;

content = content.replace(oldSpecs, newSpecs);

const oldLink = 'href={`/clinic/doctors?specialization=${spec.name.toLowerCase()}`}';
const newLink = 'href={`/clinic/doctors?specialization=${spec.slug}`}';
content = content.replace(oldLink, newLink);

fs.writeFileSync('app/clinic/page.tsx', content, 'utf8');
console.log('done');
