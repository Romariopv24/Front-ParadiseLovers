'use client'
import Link from 'next/link'
import useAppStore from '../store/useStore'
import { ArrowRightIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'

export const CartFooter = () => {
  const { getCartItemsCount, getCartTotal } = useAppStore()
  const itemCount = getCartItemsCount()
  const total = getCartTotal()
  const isVisible = itemCount > 0

  return (
    <div
      className={`fixed bottom-8 left-1/2 z-[70] w-[min(960px,calc(100%-2rem))] -translate-x-1/2 transform transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex items-center justify-between rounded-full border border-[#f2edf7] bg-white px-2 md:px-7 py-3 shadow-[0px_8px_32px_rgba(0,0,0,0.1)]">
        <div className="flex items-center gap-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ffdfe9] text-[#7d5d67]">
            <ShoppingCartIcon className="h-5 w-5" />
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            <div>
              <p className="font-semibold text-[10px] md:text-lg uppercase tracking-[0.08em] text-[#98929c]">Carrito</p>
              <p className=" font-semibold leading-none text-[#5b5760]">
                {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </p>
            </div>

            <div className="h-9 w-px bg-[#e9e3ee]" />

            <div>
              <p className="font-semibold text-[10px] md:text-lg uppercase tracking-[0.08em] text-[#98929c]">Total</p>
              <p className=" font-semibold leading-none text-[#5b5760]">${total.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <Link
          href="/cart"
          className="inline-flex h-8 md:h-12 items-center gap-2 rounded-full bg-[#d5b1ff] p-1 md:px-8 font-semibold text-[#4d2f68] transition-all duration-300 hover:opacity-90"
        >
          <span className='text-[10px] md:text-lg'>Ver Carrito</span>
          <ArrowRightIcon className="h-3 w-3" />
        </Link>
      </div>
    </div>
  )
}