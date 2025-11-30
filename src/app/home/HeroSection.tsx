'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { ShoppingCartIcon } from '@heroicons/react/24/solid'
import { rootImages } from '../core/rootImages'

const navigation: { name: string; href: string }[] = [
  { name: 'Productos', href: '#' },
  { name: 'Contacto', href: '#' },
]

export const HeroSection = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="pt-[88px]">
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow lg:w-full">
        <nav aria-label="Global" className="flex items-center justify-between p-3 lg:p-3 lg:px-8 max-w-7xl mx-auto">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5 flex items-center gap-2">
              <img
                alt=""
                src={rootImages.paradiseLogoMenu}
                className="h-7 lg:h-9 w-auto"
              />
            </a>
          </div>
          <div className="flex lg:hidden bg-gray-50">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-lg/6 font-semibold text-gray-900">
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <button className="flex items-center gap-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              <ShoppingCartIcon className="h-5 w-5 text-white" aria-hidden="true" />
              <span>Carrito</span>
            </button>
          </div>
        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  alt=""
                  src={rootImages.paradiseLogoMenu}
                  className="h-7 w-auto"
                />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <button className="flex items-center gap-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    <ShoppingCartIcon className="h-5 w-5 text-white" aria-hidden="true" />
                    <span>Carrito</span>
                  </button>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
      {/* bg-linear-65 from-purple-500 to-pink-500 */}



      <div className="w-full mt-5 relative flex items-center justify-center border  lg:h-[200px] overflow-hidden">
        {/* Imagen de fondo con opacidad */}
        <img
          src={rootImages.heroImage}
          alt=""
          className="object-cover absolute lg:w-full lg:h-full  opacity-70 pointer-events-none select-none"
        />
        {/* Gradiente encima de la imagen */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#ffff] opacity-90" />

        {/* Contenido centrado */}
        <div className="relative z-10 flex items-center justify-center w-full h-full">
          <div className="w-35 h-35 lg:w-60 lg:h-60 lg:mt-12 rounded-full bg-gray-400 flex items-center justify-center">
            <img
              src={rootImages.paradiseLogo}
              alt="Paradise Logo"
              className="w-34 h-34 lg:h-58 lg:w-58 object-contain rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
