'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, CreditCard, Truck, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: ShoppingCart,
    title: 'Choose dishes',
    description: 'Browse our menu and select your favorite meals',
  },
  {
    icon: CreditCard,
    title: 'Place order',
    description: 'Fill in delivery details and confirm your order',
  },
  {
    icon: Truck,
    title: 'Get it hot',
    description: 'We deliver fresh food to your door in 30 minutes',
  },
];

export function DeliveryHowItWorks() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-[#f97316] rounded-full flex items-center justify-center mb-4">
                <step.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              {index < steps.length - 1 && (
                <ArrowRight className="w-6 h-6 text-gray-400 mt-4 hidden md:block" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}