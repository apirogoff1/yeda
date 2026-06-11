'use client';

import { useQuery } from '@tanstack/react-query';
import { useDeliveryStore } from '@/store/delivery';
import { DeliveryCard } from './DeliveryCard';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
}

export function DeliveryMenu() {
  const activeCategory = useDeliveryStore((state) => state.activeCategory);

  const { data: items, isLoading, error } = useQuery<MenuItem[]>({
    queryKey: ['menuItems', activeCategory],
    queryFn: async () => {
      const url = activeCategory === 'ALL'
        ? '/api/delivery/menu'
        : `/api/delivery/menu?category=${activeCategory}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-200 rounded-lg h-80 animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        Failed to load menu. Please try again.
      </div>
    );
  }

  return (
    <div id="menu-section" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items?.map((item) => (
        <DeliveryCard key={item.id} {...item} />
      ))}
    </div>
  );
}