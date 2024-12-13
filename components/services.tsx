'use client'

import { motion } from 'framer-motion'
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card'

const services = [
  {
    title: 'Regular Cleaning',
    description: 'Thorough cleaning of your home on a regular schedule.',
    icon: '🧹',
    image: 'https://cdn.prod.website-files.com/640051ce8a159067e1042e74/65d5b19950d874f282b5c35f_woman-with-gloves-cleaning-floor_23-2148520978-p-800.jpg'
  },
  {
    title: 'Deep Cleaning',
    description: 'Intensive cleaning for those hard-to-reach areas and stubborn dirt.',
    icon: '🧽',
    image: 'https://www.thespruce.com/thmb/fBOdyMFmEBHusOiO6Ryep-Ud9I0=/4000x2667/filters:no_upscale()/SPR-how-to-deep-cleaning-house-7152794-Hero-01-e5cd99973ec24e69b00b5ee6b992f760.jpg'
  },
  {
    title: 'Move-in/Move-out Cleaning',
    description: 'Prepare your new home or leave your old one spotless.',
    icon: '📦',
    image: 'https://www.360precisioncleaning.com/wp-content/uploads/2022/07/move-out-cleaning-service-700x467.jpeg'
  },
  {
    title: 'Office Cleaning',
    description: 'Keep your workspace clean and productive.',
    icon: '💼',
    image: 'https://cleanfanatics.com/wp-content/uploads/2023/04/Tips-For-Office-Sanitization.jpg'
  },
]

export default function Services() {
  return (
    <section id="services" className="py-20 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="container mx-auto px-6">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center text-emerald-950 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Our Services
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-20 lg:gap-24 px-4">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex justify-center"
            >
              <CardContainer className="inter-var" containerClassName="py-10">
                <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-[280px] sm:w-[300px] h-auto rounded-xl p-6 border">
                  <CardItem
                    translateZ="50"
                    className="text-4xl font-bold text-neutral-600 dark:text-white mb-4"
                  >
                    {service.icon}
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-xl font-bold text-neutral-600 dark:text-white mb-3"
                  >
                    {service.title}
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="80"
                    className="text-neutral-500 text-sm max-w-sm mb-6 dark:text-neutral-300"
                  >
                    {service.description}
                  </CardItem>
                  <CardItem translateZ="100" className="w-full mb-6">
                    <img
                      src={service.image}
                      height="1000"
                      width="1000"
                      className="h-48 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                      alt={service.title}
                    />
                  </CardItem>
                  <CardItem
                    translateZ="120"
                    className="px-4 py-2 rounded-xl bg-emerald-500 text-white text-sm font-bold hover:bg-emerald-600 transition-colors"
                  >
                    Book Now →
                  </CardItem>
                </CardBody>
              </CardContainer>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
