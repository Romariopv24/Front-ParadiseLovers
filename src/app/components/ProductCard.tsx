'use client'

import { PlusIcon } from '@heroicons/react/24/solid'
import { MinusIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import Image from 'next/image'
import { Products } from '@/types/products.types'



export const ProductCard = ({ product }: { product: Products }) => {
  const [quantity, setQuantity] = useState(0)

  return (
    <article className="group rounded-[20px] border border-[#ececec] bg-white p-4 shadow-[0px_20px_40px_rgba(45,47,47,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0px_28px_48px_rgba(45,47,47,0.1)]">
      <div className="relative mb-4 aspect-square rounded-2xl bg-[#f8f8f8] p-3">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="rounded-xl object-cover"
        />
        {product.category && (
          <span className="absolute left-3 top-3 rounded-full bg-[#dcbeff] px-3 py-1 text-xs font-semibold text-[#5b2c85]">
            {product.category}
          </span>
        )}
      </div>

      <h3 className="mb-1 truncate text-lg font-semibold text-[#111111]">{product.name}</h3>
      <p className="mb-4 line-clamp-1 text-sm text-[#5a5c5c]">{product.description}</p>

      <div className="flex items-center justify-between">
        <span className="text-lg font-medium text-[#111111]">${product.price}</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setQuantity((value) => Math.max(0, value - 1))}
            disabled={quantity === 0}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f1ddff] text-[#8e53d0] transition-all duration-300 enabled:hover:bg-[#e6c8ff] disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Restar cantidad"
          >
            <MinusIcon className="h-4 w-4" />
          </button>
          <span className="min-w-6 text-center text-sm font-semibold text-[#6c4c8a]">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((value) => value + 1)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f1ddff] text-[#8e53d0] transition-all duration-300 hover:bg-[#e6c8ff]"
            aria-label="Sumar cantidad"
          >
            <PlusIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  )
}
