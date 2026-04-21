import { lazy, Suspense } from 'react'
import { Navbar } from './components/organisms/Navbar'
import { HeroSection } from './components/organisms/HeroSection'
import { PropuestaSection } from './components/organisms/PropuestaSection'
import { ServiciosSection } from './components/organisms/ServiciosSection'
import { ProcesoSection } from './components/organisms/ProcesoSection'
import { CertificacionesSection } from './components/organisms/CertificacionesSection'
import { MetricasSection } from './components/organisms/MetricasSection'
import { GaleriaSection } from './components/organisms/GaleriaSection'
import { ContactoSection } from './components/organisms/ContactoSection'
import { Footer } from './components/organisms/Footer'
import { WhatsAppFloat } from './components/organisms/WhatsAppFloat'
import { TestimoniosSection } from './components/organisms/TestimoniosSection'
import { useTier } from './context/DeviceTierContext'

const GlobalDNA = lazy(() => import('./components/three/scenes/DNAHelixScene').then(m => ({ default: m.GlobalDNABackground })))

function App() {
  const tier = useTier()

  return (
    <>
      {/* Global DNA Helix — fixed behind all content */}
      {tier !== 'LOW' && (
        <Suspense fallback={null}>
          <GlobalDNA />
        </Suspense>
      )}

      <Navbar />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection />
        <PropuestaSection />
        <ServiciosSection />
        <MetricasSection />
        <TestimoniosSection />
        <ProcesoSection />
        <CertificacionesSection />
        <GaleriaSection />
        <ContactoSection />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}

export default App
