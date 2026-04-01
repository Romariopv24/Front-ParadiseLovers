'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, ShoppingBagIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { rootImages } from '../core/rootImages'
import { Hero } from '../components/Hero/Hero'

const navigation: { name: string; href: string }[] = [
  { name: 'Productos', href: '#productos' },
  { name: 'Contacto', href: '#contacto' },
]

export const HeroSection = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="pt-[72px] lg:pt-[95px] bg-white">
      {/* ── Top Nav ── */}
      <header className="fixed top-0 left-0 z-50 w-full backdrop-blur-[12px]">
        <nav
          aria-label="Global"
          className="mx-auto p-4 md:p-0 flex h-[72px] w-full max-w-[1450px] items-center justify-between py-4"
        >
          <div className="flex items-center gap-8">
            <a
              href="#"
              className="text-2xl font-bold leading-8 tracking-[-0.05em] text-black"
            >
              Paradise
            </a>

            {/* Desktop nav links */}
            <div className="hidden items-center gap-6 lg:flex">
              {navigation.map((item, index) => {
                const isActive = index === 0

                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`text-base leading-6 tracking-[-0.025em] transition-colors duration-200 ${
                      isActive
                        ? 'border-b-2 border-black pb-[2px] font-bold text-black'
                        : 'font-normal text-black/60 hover:text-black'
                    }`}
                  >
                    {item.name}
                  </a>
                )
              })}
            </div>
          </div>

          {/* Mobile hamburger */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="inline-flex items-center justify-center rounded-xl p-2 text-black/70 transition-colors duration-200 hover:bg-black/5 hover:text-black"
            >
              <span className="sr-only">Abrir menú</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>

          {/* Desktop right icons */}
          <div className="hidden items-center gap-[18px] lg:flex">
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full text-black transition-colors duration-200 hover:bg-black/5"
              aria-label="Carrito"
            >
              <ShoppingBagIcon className="h-[19px] w-[22px]" aria-hidden="true" />
            </button>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full text-black transition-colors duration-200 hover:bg-black/5"
              aria-label="Mi cuenta"
            >
              <UserIcon className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </nav>

        {/* ── Mobile Menu ── */}
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50 bg-inverse-surface/20 backdrop-blur-sm" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-surface-lowest p-6 sm:max-w-sm transition-transform duration-300">
            <div className="flex items-center justify-between">
              <a
              href="#"
              className="text-2xl font-bold leading-8 tracking-[-0.05em] text-black"
            >
              Paradise
            </a>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl p-2 text-black/70 transition-colors duration-200 hover:bg-black/5 hover:text-black"
              >
                <span className="sr-only">Cerrar menú</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-8 flow-root">
              <div className="space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-base font-semibold text-on-surface hover:bg-surface-low transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="mt-6 flex gap-3">
                  <a
              href={'#'}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#e0f2fe] px-8 py-4 text-base font-semibold leading-6 text-[#1f5467] transition-colors duration-200 hover:brightness-95"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                className="h-4 w-4 fill-current"
              >
                <path d="M13.601 2.326A7.854 7.854 0 0 0 8.012 0C3.66 0 .104 3.556.104 7.908c0 1.391.364 2.748 1.057 3.944L0 16l4.249-1.114a7.93 7.93 0 0 0 3.763.957h.003c4.351 0 7.907-3.556 7.907-7.908a7.86 7.86 0 0 0-2.321-5.609Zm-5.589 12.17h-.003a6.616 6.616 0 0 1-3.368-.92l-.241-.143-2.521.661.673-2.459-.157-.252a6.611 6.611 0 0 1-1.014-3.53c0-3.648 2.968-6.615 6.617-6.615 1.769 0 3.431.689 4.68 1.938a6.57 6.57 0 0 1 1.939 4.679c-.001 3.649-2.969 6.616-6.615 6.616Z" />
                <path d="M11.656 9.829c-.2-.1-1.183-.584-1.366-.65-.182-.067-.315-.1-.448.1-.133.2-.515.65-.632.784-.116.133-.232.15-.432.05-.2-.1-.843-.311-1.606-.993-.593-.529-.994-1.183-1.11-1.383-.116-.2-.012-.308.088-.408.09-.089.2-.233.3-.35.1-.116.133-.2.2-.333.066-.133.033-.25-.017-.35-.05-.1-.448-1.083-.614-1.482-.162-.389-.326-.336-.448-.342l-.382-.007a.732.732 0 0 0-.532.25c-.182.2-.697.682-.697 1.665 0 .982.714 1.932.814 2.065.1.133 1.404 2.144 3.401 3.006.475.205.845.328 1.134.42.476.151.909.13 1.251.079.382-.057 1.183-.483 1.35-.95.166-.467.166-.867.116-.95-.05-.083-.183-.133-.383-.233Z" />
              </svg>
              Whatsapp
            </a>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

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
    </div>
  )
}


  // FFD1DC