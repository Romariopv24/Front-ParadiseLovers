'use client'
import React, { useState } from 'react'
import { ProductFilters } from '../components/ProductFilters'
import { useProducts } from '../../hooks/useProducts'
import { ProductCard } from '../components/ProductCard'
import { ProductCardSkeleton } from '../components/ProductCardSkeleton'

const categories = ['Todos', 'Sanrio', 'Hello Kitty', 'Aggretsuko', 'Keroppi', 'Cinnamoroll', 'Anime', 'Papeleria']

export const ProductosSection = () => {
  const { data: products = [], isLoading, isError, error } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchValue, setSearchValue] = useState('');

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'Todos' || product.category?.toLowerCase().includes(selectedCategory.toLowerCase())

    const matchesSearch = product.name.toLowerCase().includes(searchValue.toLowerCase())

    return matchesCategory && matchesSearch
  })

  const loadingSkeletons = Array.from({ length: 8 }, (_, index) => index)

  return (
    <div className="bg-[#ffffff]  md:py-12">
      <div className="mx-auto w-full  px-8">
        <div className="mt-6 flex flex-wrap">
          <div className="relative w-full py-2">
            <ProductFilters
              categories={categories}
              activeCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              onSearchChange={setSearchValue}
            />
          </div>

          {/* Grid de productos */}
          <div className="mt-8 grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {isLoading && loadingSkeletons.map((item) => (
              <ProductCardSkeleton key={`skeleton-${item}`} />
            ))}

            {isError && (
              <div className="col-span-full rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                No pudimos cargar los productos en este momento. Intenta de nuevo en unos segundos.
                {error instanceof Error ? ` ${error.message}` : ''}
              </div>
            )}

            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>

      </div>
    </div>
  )
}
