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
    <div className="pt-[72px] lg:pt-[95px]">
      {/* ── Top Nav ── */}
      <header className="fixed top-0 left-0 z-50 w-full backdrop-blur-[12px]">
        <nav
          aria-label="Global"
          className="mx-auto flex h-[72px] w-full max-w-[1280px] items-center justify-between px-8 py-4"
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
              <a href="#" className="p-1.5">
                <span className="sr-only">Paradise Lovers</span>
                <img
                  alt="Paradise Logo"
                  src={rootImages.paradiseLogoMenu}
                  className="h-7 w-auto"
                />
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
                <button className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-on-primary shadow-[var(--shadow-kawaii)] transition-all duration-200 hover:bg-primary-dim">
                  <ShoppingBagIcon className="h-5 w-5" aria-hidden="true" />
                  <span>Carrito</span>
                </button>
                <button className="flex items-center gap-2 rounded-full bg-surface-high px-6 py-3 text-sm font-semibold text-on-surface hover:bg-surface-highest transition-all duration-200">
                  <UserIcon className="h-5 w-5" aria-hidden="true" />
                  <span>Mi cuenta</span>
                </button>
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