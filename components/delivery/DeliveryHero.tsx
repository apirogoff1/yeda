'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function DeliveryHero() {
  const scrollToMenu = () => {
    const menuSection = document.getElementById('menu-section');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-[#111111] text-white py-20 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Delivery in 30 minutes
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Burgers, Pizza, Rolls - hot and fast
          </p>
          <button
            onClick={scrollToMenu}
            className="bg-[#f97316] hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Order Now
          </button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative h-64 md:h-96"
        >
          <Image
            src="https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=600&h=500&fit=crop"
            alt="Delicious food"
            fill
            className="object-cover rounded-lg"
          />
        </motion.div>
      </div>
    </section>
  );
}