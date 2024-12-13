'use client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import React, { Suspense, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

// Define interfaces for product types
interface FloorCleanerProps {
  color: string;
  accent: string;
}

interface SprayBottleProps {
  color: string;
  accent: string;
  nozzle: string;
}

interface MopProps {
  color: string;
  accent: string;
  handle: string;
}

interface BroomProps {
  modelIndex: number;
}
type ProductItem = 
  | { type: 'Floor Cleaners', color: string; name: string; accent: string }
  | { type: 'Spray Bottles', color: string; name: string; accent: string; nozzle: string }
  | { type: 'Mops', name: string; color: string; accent: string; handle: string }
  | { type: 'Brooms', name: string; modelIndex: number };

// Define a type for product categories
// type ProductCategory = {
//   type: string;
//   items: ProductItem[];
// };


const products = [
  {
    type: 'Floor Cleaners',
    items: [
      { color: '#80DEEA', name: 'Ocean Fresh Floor Cleaner', accent: '#4DD0E1' },
      { color: '#FFD54F', name: 'Citrus Floor Cleaner', accent: '#FFC107' },
      { color: '#F48FB1', name: 'Spring Fresh Floor Cleaner', accent: '#EC407A' },
      { color: '#81C784', name: 'Pine Floor Cleaner', accent: '#4CAF50' },
      { color: '#212121', name: 'Deep Clean Floor Cleaner', accent: '#424242' },
    ]
  },
  {
    type: 'Spray Bottles',
    items: [
      { color: '#90CAF9', name: 'Glass Cleaner Spray', accent: '#1976D2', nozzle: '#E0E0E0' },
      { color: '#FFB74D', name: 'Multi-Surface Spray', accent: '#F57C00', nozzle: '#E0E0E0' },
      { color: '#81C784', name: 'Kitchen Cleaner Spray', accent: '#388E3C', nozzle: '#E0E0E0' },
      { color: '#9575CD', name: 'Bathroom Cleaner Spray', accent: '#5E35B1', nozzle: '#E0E0E0' },
    ]
  },
  {
    type: 'Mops',
    items: [
      { name: 'Ocean Blue Mop', color: '#2196F3', accent: '#1976D2', handle: '#78909C' },
      { name: 'Sunset Orange Mop', color: '#FF9800', accent: '#F57C00', handle: '#8D6E63' },
      { name: 'Forest Green Mop', color: '#4CAF50', accent: '#388E3C', handle: '#795548' },
    ]
  },
  {
    type: 'Brooms',
    items: [
      { name: 'Garden Sweep', modelIndex: 0 },
      { name: 'Indoor Pro', modelIndex: 1 },
      { name: 'Heavy Duty', modelIndex: 2 },
      { name: 'Soft Sweep', modelIndex: 3 },
      { name: 'Multi-Surface', modelIndex: 4 }
    ]
  }
]

function FloorCleaner({ color, accent }: FloorCleanerProps) {

  return (
    <group position={[0, -0.8, 0]} scale={[1.5, 1.5, 1.5]} rotation={[0, Math.PI, 0]}>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 2, 32]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.1} />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.2, 0.5, 0.4, 32]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.1} />
      </mesh>
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color={accent} roughness={0.2} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0.6, 0.35]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.1, 0.1, 0.3, 16]} />
        <meshStandardMaterial color={accent} roughness={0.2} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0.5, 0.505]} rotation={[0, 0, 0]}>
        <planeGeometry args={[1, 0.5]} />
        <meshBasicMaterial color="#FFFFFF" opacity={0.8} transparent />
      </mesh>
      <Text
        position={[0, 0.5, 0.51]}
        fontSize={0.15}
        color="#1A237E"
        anchorX="center"
        anchorY="middle"
      >
        Moppy
      </Text>
    </group>
  )
}

function SprayBottle({ color, accent, nozzle }: SprayBottleProps) {

  const { scene } = useGLTF('/glb/spray.glb')
  const sprayScene = scene.clone()

  // Apply colors to different parts of the spray bottle
  sprayScene.traverse((child) => {
    if (child.isMesh) {
      // Create a new material to avoid sharing
      const newMaterial = child.material.clone()
      
      // Apply different colors based on the mesh name or position
      if (child.name.toLowerCase().includes('nozzle') || child.name.toLowerCase().includes('trigger')) {
        newMaterial.color.set(nozzle)
        newMaterial.roughness = 0.3
        newMaterial.metalness = 0.8
      } else if (child.name.toLowerCase().includes('cap') || child.name.toLowerCase().includes('base')) {
        newMaterial.color.set(accent)
        newMaterial.roughness = 0.3
        newMaterial.metalness = 0.6
      } else {
        newMaterial.color.set(color)
        newMaterial.roughness = 0.1
        newMaterial.metalness = 0.2
        newMaterial.transparent = true
        newMaterial.opacity = 0.9
      }
      
      child.material = newMaterial
    }
  })

  return (
    <group position={[0, -2, 0]} scale={[15, 15, 15]} rotation={[0, Math.PI, 0]}>
      <primitive object={sprayScene} />
    </group>
  )
}

function Mop({ color, accent, handle }: MopProps) {

  const { scene } = useGLTF('/glb/mop.glb')
  const mopScene = scene.clone()
  
  // Apply colors to different parts of the mop
  mopScene.traverse((child) => {
    if (child.isMesh) {
      // Create a new material to avoid sharing
      const newMaterial = child.material.clone()
      
      // Apply different colors based on the mesh name or position
      if (child.name.toLowerCase().includes('handle')) {
        newMaterial.color.set(handle)
      } else if (child.name.toLowerCase().includes('head') || child.name.toLowerCase().includes('mop')) {
        newMaterial.color.set(color)
      } else {
        newMaterial.color.set(accent)
      }
      
      child.material = newMaterial
    }
  })
  
  return (
    <group position={[0, -2.5, 0]} scale={[4, 4, 4]} rotation={[0, Math.PI, 0]}>
      <primitive object={mopScene} />
    </group>
  )
}

function Broom({ modelIndex }: BroomProps) {

  const { scene } = useGLTF('/glb/brooms.glb')
  const broomScene = scene.clone()
  
  // Hide all broom models first
  broomScene.traverse((child) => {
    if (child.isMesh) {
      child.visible = false
    }
  })
  
  // Show only the selected broom model and center it
  let currentBroom = 0
  let selectedBroom = null
  broomScene.traverse((child) => {
    if (child.isMesh) {
      if (currentBroom === modelIndex) {
        child.visible = true
        selectedBroom = child
      }
      currentBroom++
    }
  })

  // Center the selected broom
  if (selectedBroom) {
    const box = new THREE.Box3().setFromObject(selectedBroom)
    const center = box.getCenter(new THREE.Vector3())
    selectedBroom.position.sub(center)
  }

  return (
    <group position={[0, -2, 0]} scale={[4.5, 4.5, 4.5]} rotation={[0, Math.PI, 0]}>
      <group position={[0, 0.5, 0]}>
        <primitive object={broomScene} />
      </group>
    </group>
  )
}
interface ProductDisplayProps {
  productType: string;
  item: ProductItem; 
}

function ProductDisplay({ productType, item }: ProductDisplayProps) {
  switch (productType) {
    case 'Floor Cleaners':
      if ('color' in item && 'accent' in item) {
        return <FloorCleaner color={item.color} accent={item.accent} />
      }
      break;
    case 'Spray Bottles':
      if ('color' in item && 'accent' in item && 'nozzle' in item) {
        return <SprayBottle color={item.color} accent={item.accent} nozzle={item.nozzle} />
      }
      break;
    case 'Mops':
      if ('color' in item && 'accent' in item && 'handle' in item) {
        return <Mop color={item.color} accent={item.accent} handle={item.handle} />
      }
      break;
    case 'Brooms':
      if ('modelIndex' in item) {
        return <Broom modelIndex={item.modelIndex} />
      }
      break;
  }
  return null;
}



export default function Hero() {
  const [currentType, setCurrentType] = useState(0)
  const [currentItem, setCurrentItem] = useState(0)
  const [dragStart, setDragStart] = useState(0)

  const currentProduct = products[currentType]
  const currentProductItem = currentProduct.items[currentItem]

  // Rest of the component remains the same
  const handleDragStart = (event: any, info: any) => {
    setDragStart(info.point.x)
  }

  const handleDragEnd = (event: any, info: any) => {
    const drag = dragStart - info.point.x
    if (Math.abs(drag) > 50) {
      if (drag > 0 && currentItem < currentProduct.items.length - 1) {
        setCurrentItem(currentItem + 1)
      } else if (drag < 0 && currentItem > 0) {
        setCurrentItem(currentItem - 1)
      }
    }
  }


  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 md:pt-24">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50"></div>
      <div className="absolute inset-0">
        <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="rgba(52, 211, 153, 0.1)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>
      <div className="absolute right-0 top-0 -mr-96 -mt-96 w-[800px] h-[800px] rounded-full bg-gradient-radial from-emerald-100/40 via-emerald-200/20 to-transparent blur-3xl"></div>
      <div className="absolute left-0 bottom-0 -ml-96 -mb-96 w-[800px] h-[800px] rounded-full bg-gradient-radial from-teal-100/40 via-teal-200/20 to-transparent blur-3xl"></div>
      <div className="container mx-auto px-6 py-1 md:py-12 flex flex-col md:flex-row items-center relative z-8">
        <div className="w-full md:w-1/2 mb-8 md:mb-0">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-emerald-950 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {currentProductItem.name}
          </motion.h1>
          <motion.p
            className="text-xl text-emerald-700 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover Moppy's range of premium cleaning products for a cleaner, happier home.
          </motion.p>
          <motion.button
            className="bg-emerald-500 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-emerald-600 hover:scale-105 transition duration-300 ease-in-out"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Shop Now
          </motion.button>
          <div className="mt-12 space-y-4">
            <p className="text-emerald-600 text-center font-medium">Explore Our Collection</p>
            <div className="flex items-center justify-center space-x-4">
              <motion.button
                className="p-2 rounded-full bg-emerald-100 hover:bg-emerald-200 transition-colors"
                onClick={() => currentItem > 0 && setCurrentItem(currentItem - 1)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                disabled={currentItem === 0}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
              <div className="flex flex-col space-y-4">
                <div className="flex space-x-3">
                  {products.map((product, index) => (
                    <motion.button
                      key={index}
                      onClick={() => {
                        setCurrentType(index)
                        setCurrentItem(0)
                      }}
                      className={`px-4 py-2 rounded-full transition-all duration-200 ${
                        index === currentType 
                          ? 'bg-emerald-500 text-white' 
                          : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {product.type}
                    </motion.button>
                  ))}
                </div>
                <div className="flex space-x-3 justify-center">
                  {currentProduct.items.map((item, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setCurrentItem(index)}
                      className={`group relative flex items-center justify-center`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div 
                        className={`w-4 h-4 rounded-full transition-all duration-200 ${
                          index === currentItem 
                            ? 'bg-emerald-500 scale-125' 
                            : 'bg-emerald-200 hover:bg-emerald-300'
                        }`}
                      />
                      <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-emerald-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                        {item.name}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
              <motion.button
                className="p-2 rounded-full bg-emerald-100 hover:bg-emerald-200 transition-colors"
                onClick={() => currentItem < currentProduct.items.length - 1 && setCurrentItem(currentItem + 1)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                disabled={currentItem === currentProduct.items.length - 1}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>
            <motion.p 
              className="text-emerald-600/80 text-sm text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Swipe or use arrows to explore different fragrances and products
            </motion.p>
          </div>
        </div>
        <motion.div
          className="w-full md:w-1/2 h-72 md:h-[450px] lg:h-[550px]"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentItem}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <Canvas
                className="w-full h-full bg-transparent"
                camera={{ position: [0, 0, 6], fov: 50 }}
              >
                <Suspense fallback={null}>
                  {/* Brighter ambient light */}
                  <ambientLight intensity={1.2} />
                  
                  {/* Brighter key light */}
                  <spotLight 
                    position={[5, 5, 5]} 
                    angle={0.4} 
                    penumbra={0.5} 
                    intensity={2.5}
                    castShadow
                  />
                  
                  {/* Brighter fill light */}
                  <pointLight 
                    position={[-5, 0, -5]} 
                    intensity={1.5} 
                  />
                  
                  {/* Brighter rim light */}
                  <spotLight
                    position={[0, 5, -5]}
                    angle={0.5}
                    penumbra={0.5}
                    intensity={1.5}
                  />

                  {/* Additional front fill light */}
                  <pointLight 
                    position={[0, 0, 5]} 
                    intensity={1.2} 
                  />

                  <OrbitControls 
                    enableZoom={false} 
                    autoRotate 
                    autoRotateSpeed={4}
                    minPolarAngle={Math.PI / 2.5}
                    maxPolarAngle={Math.PI / 2.5}
                  />
                  <ProductDisplay 
                    productType={currentProduct.type} 
                    item={currentProductItem} 
                  />
                </Suspense>
              </Canvas>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
