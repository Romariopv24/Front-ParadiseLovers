
import { Hero } from '../components/Hero/Hero'

export const HeroSection = () => {
  return (

      <Hero
        titlePrefix="Tus favoritos de"
        titleGradientLine1="papelería en un"
        titleGradientLine2="solo lugar."
        description={[
          'Los precios publicados aplican SOLO a pagos en divisas.',
          'Para pagos en bolivares puedes escribirnos y consultar el',
          'monto de tu producto.',
        ]}
        primaryAction={{ label: 'Explore Gallery', href: '#productos' }}
        secondaryAction={{ label: 'Whatsapp', href: '#contacto' }}
      />
  )
}

