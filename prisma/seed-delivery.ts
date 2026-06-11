import { PrismaClient, MenuCategory } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const menuItems = [
    { name: 'Classic Burger', description: 'Beef patty, lettuce, tomato, cheese, special sauce', price: 490, category: 'BURGER' as MenuCategory, imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=400&fit=crop' },
    { name: 'Double Cheeseburger', description: 'Two beef patties, double cheese, pickles, onions', price: 690, category: 'BURGER' as MenuCategory, imageUrl: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500&h=400&fit=crop' },
    { name: 'Chicken Burger', description: 'Crispy chicken fillet, mayo, lettuce, bun', price: 520, category: 'BURGER' as MenuCategory, imageUrl: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=500&h=400&fit=crop' },
    { name: 'Margherita Pizza', description: 'Tomato sauce, mozzarella, fresh basil', price: 590, category: 'PIZZA' as MenuCategory, imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&h=400&fit=crop' },
    { name: 'Pepperoni Pizza', description: 'Tomato sauce, mozzarella, spicy pepperoni', price: 690, category: 'PIZZA' as MenuCategory, imageUrl: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&h=400&fit=crop' },
    { name: 'Four Cheese Pizza', description: 'Mozzarella, gorgonzola, parmesan, cheddar', price: 790, category: 'PIZZA' as MenuCategory, imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&h=400&fit=crop' },
    { name: 'California Roll', description: 'Crab, avocado, cucumber, sesame seeds', price: 450, category: 'ROLL' as MenuCategory, imageUrl: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=400&fit=crop' },
    { name: 'Philadelphia Roll', description: 'Salmon, cream cheese, cucumber', price: 590, category: 'ROLL' as MenuCategory, imageUrl: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=500&h=400&fit=crop' },
    { name: 'Spicy Tuna Roll', description: 'Tuna, spicy mayo, green onion, nori', price: 520, category: 'ROLL' as MenuCategory, imageUrl: 'https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?w=500&h=400&fit=crop' },
  ];

  for (const item of menuItems) {
    await prisma.menuItem.create({ data: item });
  }

  console.log('Seeded 9 menu items');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });