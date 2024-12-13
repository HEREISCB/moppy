import Layout from './components/layout'
import Hero from '../components/hero'
import Services from '../components/services'
import Products from '../components/products'
import Benefits from '../components/benefits'
import Contact from '../components/contact'

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Services />
      <Products />
      <Benefits />
      <Contact />
    </Layout>
  )
}

