'use client'

import { motion } from 'framer-motion'

const benefits = [
  {
    title: 'Time-Saving',
    description: 'Let us handle the cleaning while you focus on what matters most.',
    icon: '⏰',
  },
  {
    title: 'Professional Results',
    description: 'Our trained staff delivers spotless results every time.',
    icon: '🏆',
  },
  {
    title: 'Eco-Friendly',
    description: 'We use environmentally safe products for a healthier home.',
    icon: '🌿',
  },
  {
    title: 'Customized Service',
    description: 'Tailored cleaning plans to meet your specific needs.',
    icon: '🎯',
  },
]

export default function Benefits() {
  return (
    <section id="benefits" className="py-20 bg-blue-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Why Choose Moppy?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

