'use client'

import { useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { CategoryButton } from './CategoryButton'

interface ProductFiltersProps {
  title?: string
  categories: string[]
  activeCategory: string
  onCategoryChange: (category: string) => void
  onSearchChange?: (value: string) => void
}

export const ProductFilters = ({
  title = 'Nuestros Productos',
  categories,
  activeCategory,
  onCategoryChange,
  onSearchChange,
}: ProductFiltersProps) => {
  const [searchValue, setSearchValue] = useState('')

  const handleSearchChange = (value: string) => {
    setSearchValue(value)
    onSearchChange?.(value)
  }

  return (
    <div className="w-full">
      <h2 className="mb-6 text-center md:text-left text-[30px] md:text-[36px] font-semibold leading-[36px] tracking-[-0.02em] text-[#2d2f2f]">
        {title}
      </h2>

      <div className="relative mb-6 w-full">
        <MagnifyingGlassIcon
          className="pointer-events-none absolute left-6 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#767777]"
          aria-hidden="true"
        />
        <input
          type="text"
          value={searchValue}
          onChange={(event) => handleSearchChange(event.target.value)}
          placeholder="Buscar producto..."
          className="h-[57px] w-full rounded-full border border-[#e1e3e3] bg-white pl-[57px] pr-5 text-[16px] text-[#2d2f2f] placeholder:text-[#767777] focus:outline-none focus:ring-2 focus:ring-[#dcbeff]"
        />
      </div>

      <div className="-mx-1 overflow-x-auto pb-2">
        <div className="flex min-w-max items-center gap-3 px-1">
          {categories.map((category) => {
            const isActive = category === activeCategory

            return (
              <CategoryButton
                key={category}
                label={category}
                isActive={isActive}
                onClick={() => onCategoryChange(category)}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
