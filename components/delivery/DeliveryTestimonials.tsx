'use client';

const testimonials = [
  {
    name: 'Alex M.',
    rating: 5,
    text: 'Amazing burgers! Delivery was super fast and food arrived hot. Will order again!',
  },
  {
    name: 'Maria K.',
    rating: 5,
    text: 'Best pizza in Moscow. Fresh ingredients and great taste. Highly recommend!',
  },
  {
    name: 'Dmitry S.',
    rating: 5,
    text: 'Love their rolls! Always fresh and delicious. Great service and friendly couriers.',
  },
];

export function DeliveryTestimonials() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg">
              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">&#9733;</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">&quot;{testimonial.text}&quot;</p>
              <p className="font-semibold text-gray-900">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}