'use client'

import { PlusIcon } from '@heroicons/react/24/solid'
import { MinusIcon } from '@heroicons/react/24/outline'
import { ArchiveBoxIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import Image from 'next/image'
import { Products } from '@/types/products.types'



export const ProductCard = ({ product }: { product: Products }) => {
  const [quantity, setQuantity] = useState(0)
  const isAnime = product.category?.toLowerCase() === 'anime'

  return (
    <article className="group flex h-full flex-col rounded-[30px]  p-4 shadow-[0px_14px_30px_0px_rgba(26,18,38,0.08)] transition-all duration-300 hover:shadow-[0px_20px_36px_0px_rgba(26,18,38,0.11)]">
      <div className="relative mb-4 aspect-square rounded-[22px]  p-3">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="rounded-[16px] object-cover"
        />
        {isAnime && (
          <span className="absolute left-3 top-3 rounded-full bg-[#dff4ff] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#2a84ab]">
            ANIME
          </span>
        )}
      </div>

      <div className="mb-2 flex items-start justify-between gap-2">
        <h3 className="line-clamp-2 text-[24px] font-semibold leading-[1.05] tracking-[-0.02em] text-[#121212]">
          {product.name}
        </h3>
        <span className="shrink-0 text-[22px] font-medium leading-none text-[#121212]">${product.price}</span>
      </div>

      <div className="mb-5 flex items-center gap-1.5 text-[11px] font-normal leading-none text-[#7f7f7f]">
        <ArchiveBoxIcon className="h-[11px] w-[11px]" />
        <span>Disponibles: {product.quantity}</span>
      </div>

      <div className="mt-auto rounded-full bg-[#FDF8FF] px-[7px] py-[5px] shadow-[0px_10px_18px_0px_rgba(142,83,208,0.16)]">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setQuantity((value) => Math.max(0, value - 1))}
            disabled={quantity === 0}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#caa7ef] bg-[#d9b8ff] text-[#8d55cf] shadow-[0px_2px_6px_0px_rgba(87,49,136,0.12)] transition-all duration-300 hover:bg-[#ceadf3]"
            aria-label="Restar cantidad"
          >
            <MinusIcon className="h-4 w-4" />
          </button>
          <span className="min-w-8 text-center text-[18px] font-medium leading-none text-[#232323]">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((value) => value + 1)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#caa7ef] bg-[#d9b8ff] text-[#8d55cf] shadow-[0px_2px_6px_0px_rgba(87,49,136,0.12)] transition-all duration-300 hover:bg-[#ceadf3]"
            aria-label="Sumar cantidad"
          >
            <PlusIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  )
}
