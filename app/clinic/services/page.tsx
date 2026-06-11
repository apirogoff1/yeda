export default function ServicesPage() {
  const services = [
    {
      title: 'Терапия',
      description: 'Первичная диагностика и лечение острых и хронических заболеваний.',
      items: [
        { name: 'Первичная консультация', price: '4500 руб' },
        { name: 'Повторная консультация', price: '3500 руб' },
        { name: 'Программа профилактики', price: '5000 руб' },
      ],
    },
    {
      title: 'Кардиология',
      description: 'Диагностика и лечение сердечно-сосудистых заболеваний.',
      items: [
        { name: 'Консультация кардиолога', price: '5500 руб' },
        { name: 'ЭКГ с расшифровкой', price: '2500 руб' },
        { name: 'Суточное мониторирование ЭКГ', price: '6500 руб' },
      ],
    },
    {
      title: 'Неврология',
      description: 'Диагностика заболеваний нервной системы и лечение головных болей.',
      items: [
        { name: 'Консультация невролога', price: '5500 руб' },
        { name: 'Программа диагностики головной боли', price: '6000 руб' },
        { name: 'Лечебные процедуры', price: 'от 4500 руб' },
      ],
    },
    {
      title: 'Эндокринология',
      description: 'Лечение заболеваний щитовидной железы и гормональных нарушений.',
      items: [
        { name: 'Консультация эндокринолога', price: '5500 руб' },
        { name: 'Комплексное обследование щитовидной железы', price: '7500 руб' },
      ],
    },
    {
      title: 'Гастроэнтерология',
      description: 'Лечение заболеваний желудка, кишечника, печени.',
      items: [
        { name: 'Консультация гастроэнтеролога', price: '5500 руб' },
        { name: 'Комплексное обследование ЖКТ', price: '8500 руб' },
      ],
    },
    {
      title: 'Дерматология',
      description: 'Диагностика и лечение заболеваний кожи, волос и ногтей.',
      items: [
        { name: 'Консультация дерматолога', price: '4500 руб' },
        { name: 'Дерматоскопия', price: '2000 руб' },
        { name: 'Удаление новообразований', price: 'от 5000 руб' },
      ],
    },
    {
      title: 'Офтальмология',
      description: 'Современные методы диагностики и коррекции зрения.',
      items: [
        { name: 'Консультация офтальмолога', price: '5000 руб' },
        { name: 'Компьютерная диагностика зрения', price: '3500 руб' },
        { name: 'Подбор очковой коррекции', price: '2500 руб' },
      ],
    },
    {
      title: 'Ортопедия',
      description: 'Диагностика и лечение заболеваний суставов и позвоночника.',
      items: [
        { name: 'Консультация ортопеда', price: '5500 руб' },
        { name: 'Внутрисуставные инъекции', price: 'от 7500 руб' },
      ],
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Услуги и цены</h1>
      <p className="text-lg text-gray-600 mb-8">8 направлений медицины под одной крышей</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h2>
            <p className="text-sm text-gray-600 mb-4">{service.description}</p>
            <ul className="space-y-2">
              {service.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex justify-between text-sm">
                  <span className="text-gray-700">{item.name}</span>
                  <span className="font-medium text-blue-600">{item.price}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}