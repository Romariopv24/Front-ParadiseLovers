'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, ShoppingBagIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import useAppStore from '../store/useStore'

const navigation: { name: string; href: string }[] = [
  { name: 'Productos', href: '/#productos' },
  { name: 'Contacto', href: '/#contacto' },
]

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const cartItemsCount = useAppStore((state) =>
    state.cart.reduce((sum, item) => sum + item.quantity, 0),
  )

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === 'undefined' || window.location.pathname !== '/') {
        setActiveSection('')
        return
      }

      const sections = ['productos', 'contacto']
      const scrollPosition = window.scrollY + 100 // offset for navbar height

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            return
          }
        }
      }
      setActiveSection('')
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
                const sectionId = item.href.split('#')[1]
                const isActive = activeSection === sectionId

                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`text-base leading-6 tracking-[-0.025em] transition-colors duration-200 ${
                      isActive
                        ? 'border-b-2 border-black  font-bold text-black'
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
            <Link
              href="/cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-black transition-colors duration-200 hover:bg-black/5"
              aria-label="Carrito"
            >
              <ShoppingBagIcon className="h-[19px] w-[22px]" aria-hidden="true" />
              {cartItemsCount > 0 && (
                <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#d9b8ff] px-1 text-[10px] font-bold leading-none text-[#4d2f68]">
                  {cartItemsCount > 9 ? '9+' : cartItemsCount}
                </span>
              )}
            </Link>
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
                <Link
                  href="/cart"
                  className="relative inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#e0f2fe] text-[#1f5467] transition-colors duration-200 hover:brightness-95"
                  aria-label="Carrito"
                >
                  <ShoppingBagIcon className="h-5 w-5" aria-hidden="true" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#d9b8ff] px-1 text-[10px] font-bold leading-none text-[#4d2f68]">
                      {cartItemsCount > 9 ? '9+' : cartItemsCount}
                    </span>
                  )}
                </Link>
                <button
                  type="button"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#e0f2fe] text-[#1f5467] transition-colors duration-200 hover:brightness-95"
                  aria-label="Mi cuenta"
                >
                  <UserIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </div>
  )
}

