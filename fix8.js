const fs = require('fs');
let content = fs.readFileSync('prisma/seed.ts', 'utf8');

const oldDoctors = `  const doctorsData = [
    { firstName: 'Борис', patronymic: 'Львович', lastName: 'Штерн', specSlug: 'terapiya', exp: 15 },
    { firstName: 'Владимир', patronymic: 'Борисович', lastName: 'Морозов', specSlug: 'terapiya', exp: 12 },
    { firstName: 'Кирилл', patronymic: 'Станиславович', lastName: 'Зайцев', specSlug: 'terapiya', exp: 17 },
    { firstName: 'Мария', patronymic: 'Сергеевна', lastName: 'Козлова', specSlug: 'kardiologiya', exp: 16 },
    { firstName: 'Наталья', patronymic: 'Игоревна', lastName: 'Васильева', specSlug: 'kardiologiya', exp: 20 },
    { firstName: 'Юлия', patronymic: 'Артуровна', lastName: 'Саркисян', specSlug: 'kardiologiya', exp: 14 },
    { firstName: 'Дмитрий', patronymic: 'Робертович', lastName: 'Левин', specSlug: 'nevrologiya', exp: 11 },
    { firstName: 'Андрей', patronymic: 'Олегович', lastName: 'Ким', specSlug: 'nevrologiya', exp: 10 },
    { firstName: 'Артём', patronymic: 'Геннадьевич', lastName: 'Куликов', specSlug: 'nevrologiya', exp: 25 },
    { firstName: 'Елена', patronymic: 'Викторовна', lastName: 'Попова', specSlug: 'endokrinologiya', exp: 9 },
    { firstName: 'Татьяна', patronymic: 'Олеговна', lastName: 'Семёнова', specSlug: 'endokrinologiya', exp: 6 },
    { firstName: 'Виктория', patronymic: 'Львовна', lastName: 'Юдина', specSlug: 'endokrinologiya', exp: 11 },
    { firstName: 'Сергей', patronymic: 'Николаевич', lastName: 'Волков', specSlug: 'gastroenterologiya', exp: 18 },
    { firstName: 'Максим', patronymic: 'Юрьевич', lastName: 'Голубев', specSlug: 'gastroenterologiya', exp: 8 },
    { firstName: 'Павел', patronymic: 'Денисович', lastName: 'Беляев', specSlug: 'gastroenterologiya', exp: 21 },
    { firstName: 'Анна', patronymic: 'Дмитриевна', lastName: 'Лебедева', specSlug: 'dermatologiya', exp: 8 },
    { firstName: 'Ирина', patronymic: 'Константиновна', lastName: 'Виноградова', specSlug: 'dermatologiya', exp: 7 },
    { firstName: 'Екатерина', patronymic: 'Робертовна', lastName: 'Тарасова', specSlug: 'dermatologiya', exp: 5 },
    { firstName: 'Игорь', patronymic: 'Михайлович', lastName: 'Соколов', specSlug: 'oftalmologiya', exp: 22 },
    { firstName: 'Роман', patronymic: 'Фёдорович', lastName: 'Богданов', specSlug: 'oftalmologiya', exp: 19 },
    { firstName: 'Даниил', patronymic: 'Валентинович', lastName: 'Белов', specSlug: 'oftalmologiya', exp: 15 },
    { firstName: 'Ольга', patronymic: 'Александровна', lastName: 'Новикова', specSlug: 'ortopediya', exp: 14 },
    { firstName: 'Светлана', patronymic: 'Вадимовна', lastName: 'Воронова', specSlug: 'ortopediya', exp: 10 },
    { firstName: 'Алина', patronymic: 'Эдуардовна', lastName: 'Комиссарова', specSlug: 'ortopediya', exp: 8 },
    { firstName: 'Елена', patronymic: 'Олеговна', lastName: 'Захарова', specSlug: 'ortopediya', exp: 12 },
  ]`;

const newDoctors = `  const doctorsData = [
    { firstName: 'Борис', patronymic: 'Львович', lastName: 'Штерн', specSlug: 'terapiya', exp: 15 },
    { firstName: 'Наталья', patronymic: 'Игоревна', lastName: 'Васильева', specSlug: 'terapiya', exp: 12 },
    { firstName: 'Кирилл', patronymic: 'Станиславович', lastName: 'Зайцев', specSlug: 'terapiya', exp: 17 },
    { firstName: 'Мария', patronymic: 'Сергеевна', lastName: 'Козлова', specSlug: 'kardiologiya', exp: 16 },
    { firstName: 'Сергей', patronymic: 'Николаевич', lastName: 'Волков', specSlug: 'kardiologiya', exp: 20 },
    { firstName: 'Юлия', patronymic: 'Артуровна', lastName: 'Саркисян', specSlug: 'kardiologiya', exp: 14 },
    { firstName: 'Дмитрий', patronymic: 'Робертович', lastName: 'Левин', specSlug: 'nevrologiya', exp: 11 },
    { firstName: 'Елена', patronymic: 'Викторовна', lastName: 'Попова', specSlug: 'nevrologiya', exp: 10 },
    { firstName: 'Артём', patronymic: 'Геннадьевич', lastName: 'Куликов', specSlug: 'nevrologiya', exp: 25 },
    { firstName: 'Владимир', patronymic: 'Борисович', lastName: 'Морозов', specSlug: 'endokrinologiya', exp: 9 },
    { firstName: 'Татьяна', patronymic: 'Олеговна', lastName: 'Семёнова', specSlug: 'endokrinologiya', exp: 6 },
    { firstName: 'Виктория', patronymic: 'Львовна', lastName: 'Юдина', specSlug: 'endokrinologiya', exp: 11 },
    { firstName: 'Андрей', patronymic: 'Олегович', lastName: 'Ким', specSlug: 'gastroenterologiya', exp: 18 },
    { firstName: 'Максим', patronymic: 'Юрьевич', lastName: 'Голубев', specSlug: 'gastroenterologiya', exp: 8 },
    { firstName: 'Ирина', patronymic: 'Константиновна', lastName: 'Виноградова', specSlug: 'gastroenterologiya', exp: 21 },
    { firstName: 'Анна', patronymic: 'Дмитриевна', lastName: 'Лебедева', specSlug: 'dermatologiya', exp: 8 },
    { firstName: 'Павел', patronymic: 'Денисович', lastName: 'Беляев', specSlug: 'dermatologiya', exp: 7 },
    { firstName: 'Екатерина', patronymic: 'Робертовна', lastName: 'Тарасова', specSlug: 'dermatologiya', exp: 5 },
    { firstName: 'Игорь', patronymic: 'Михайлович', lastName: 'Соколов', specSlug: 'oftalmologiya', exp: 22 },
    { firstName: 'Роман', patronymic: 'Фёдорович', lastName: 'Богданов', specSlug: 'oftalmologiya', exp: 19 },
    { firstName: 'Алина', patronymic: 'Эдуардовна', lastName: 'Комиссарова', specSlug: 'oftalmologiya', exp: 15 },
    { firstName: 'Ольга', patronymic: 'Александровна', lastName: 'Новикова', specSlug: 'ortopediya', exp: 14 },
    { firstName: 'Даниил', patronymic: 'Валентинович', lastName: 'Белов', specSlug: 'ortopediya', exp: 10 },
    { firstName: 'Светлана', patronymic: 'Вадимовна', lastName: 'Воронова', specSlug: 'ortopediya', exp: 8 },
    { firstName: 'Елена', patronymic: 'Олеговна', lastName: 'Захарова', specSlug: 'ortopediya', exp: 12 },
  ]`;

content = content.replace(oldDoctors, newDoctors);
fs.writeFileSync('prisma/seed.ts', content, 'utf8');
console.log('done');
