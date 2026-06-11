'use client';

import { useDeliveryStore } from '@/store/delivery';

const categories = [
  { id: 'ALL', label: 'All' },
  { id: 'BURGER', label: 'Burgers' },
  { id: 'PIZZA', label: 'Pizza' },
  { id: 'ROLL', label: 'Rolls' },
];

export function DeliveryCategories() {
  const { activeCategory, setCategory } = useDeliveryStore();

  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => setCategory(cat.id)}
          className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition-colors ${
            activeCategory === cat.id
              ? 'bg-[#f97316] text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}