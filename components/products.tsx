'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const products = [
  {
    name: 'All-Purpose Cleaner',
    description: 'Effective on multiple surfaces',
    image: '/all-purpose-cleaner.jpg',
  },
  {
    name: 'Glass Cleaner',
    description: 'Streak-free shine for windows and mirrors',
    image: '/glass-cleaner.jpg',
  },
  {
    name: 'Floor Cleaner',
    description: 'Safe for all types of flooring',
    image: '/floor-cleaner.jpg',
  },
  {
    name: 'Bathroom Cleaner',
    description: 'Removes soap scum and hard water stains',
    image: '/bathroom-cleaner.jpg',
  },
]

export default function Products() {
  return (
    <section id="products" className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Our Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

