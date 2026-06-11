const {PrismaClient} = require('@prisma/client');
const p = new PrismaClient();
p.specialization.findMany({select:{name:true,slug:true}})
  .then(r => r.forEach(s => console.log(s.slug, '|', s.name)))
  .finally(() => p.$disconnect());
