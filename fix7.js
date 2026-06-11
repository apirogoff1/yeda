const fs = require('fs');
let content = fs.readFileSync('app/clinic/admin/appointments/client.tsx', 'utf8');

content = content.replace(
  '            <th className="px-4 py-3">Пациент</th>',
  '            <th className="px-4 py-3">Пациент</th>\n            <th className="px-4 py-3">Комментарий</th>'
);

content = content.replace(
  '              <td className="px-4 py-3">{a.patientName || \'—\'}</td>',
  '              <td className="px-4 py-3">{a.patientName || \'—\'}</td>\n              <td className="px-4 py-3 max-w-xs"><span className="text-gray-500 italic text-xs">{a.comment || \'—\'}</span></td>'
);

fs.writeFileSync('app/clinic/admin/appointments/client.tsx', content, 'utf8');
console.log('done');
