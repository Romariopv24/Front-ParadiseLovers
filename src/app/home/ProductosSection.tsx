'use client'
import { PlusIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'
import useAppStore from '../store/useStore'
import { ProductFilters } from '../components/ProductFilters'
import { useProducts } from '../../hooks/useProducts'
import { Products } from '@/types/products.types'

const categories = ['Todos', 'Sanrio', 'Hello Kitty', 'Aggretsuko', 'Keroppi', 'Cinnamoroll', 'Anime', 'Papeleria']

export const ProductosSection = () => {
  const { data: products = [], isLoading, isError, error } = useProducts();
  const { addToCart, cart, increaseQuantity, decreaseQuantity } = useAppStore();
  const [selectedProduct, setSelectedProduct] = useState<Products | null>(null);
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
    <div className="bg-[#ffffff] py-24 sm:py-12">
      <div className="mx-auto w-full max-w-[1280px] px-8">
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
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
            {isLoading && loadingSkeletons.map((item) => (
              <div
                key={`skeleton-${item}`}
                className="animate-pulse rounded-lg border border-gray-200 bg-white p-3"
              >
                <div className="mb-3 aspect-square rounded-xl bg-gray-100" />
                <div className="mb-2 h-5 w-3/4 rounded bg-gray-100" />
                <div className="mb-3 h-4 w-full rounded bg-gray-100" />
                <div className="h-6 w-1/2 rounded bg-gray-100" />
              </div>
            ))}

            {isError && (
              <div className="col-span-full rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                No pudimos cargar los productos en este momento. Intenta de nuevo en unos segundos.
                {error instanceof Error ? ` ${error.message}` : ''}
              </div>
            )}

            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => setSelectedProduct(selectedProduct?.id === product.id ? null : product)}
                className={
                  `group bg-white border border-gray-200 rounded-lg p-3 cursor-pointer self-start transform transition duration-300 ` +
                  (selectedProduct?.id === product.id ? 'scale-105 z-10 shadow-lg' : 'scale-100 hover:shadow-lg')
                }
              >
                <div className="relative aspect-square mb-3 rounded-xl overflow-hidden bg-gray-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-semibold text-gray-800 text-lg mb-1 truncate">{product.name}</h3>
                <p className="text-lg text-gray-500 mb-2 truncate">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-indigo-600 text-lg">${product.price}</span>
                  {(() => {
                    const cartItem = cart.find(item => item.product.id === product.id);
                    if (cartItem) {
                      return (
                        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => decreaseQuantity(product.id)}
                            className="w-7 h-7 bg-black text-white rounded-lg flex items-center justify-center hover:bg-gray-800"
                          >
                            -
                          </button>
                          <span className="px-2 text-black text-base font-medium">{cartItem.quantity}</span>
                          <button
                            onClick={() => increaseQuantity(product.id)}
                            className="w-7 h-7 bg-black text-white rounded-lg flex items-center justify-center hover:bg-gray-800"
                            disabled={cartItem.quantity >= 10}
                          >
                            +
                          </button>
                        </div>
                      );
                    }
                    return (
                      <button
                        onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white p-1.5 rounded-lg transition-colors"
                        aria-label="Añadir al carrito"
                      >
                        <PlusIcon className="w-4 h-4" />
                      </button>
                    );
                  })()}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  )
}
