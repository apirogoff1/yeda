'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useDeliveryStore } from '@/store/delivery';

interface DeliveryCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export function DeliveryCard({ id, name, description, price, imageUrl }: DeliveryCardProps) {
  const addItem = useDeliveryStore((state) => state.addItem);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="relative h-48">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-[#f97316]">{price} RUB</span>
          <button
            onClick={() => addItem({ id, name, price, imageUrl })}
            className="bg-[#f97316] hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
          >
            Add to cart
          </button>
        </div>
      </div>
    </motion.div>
  );
}