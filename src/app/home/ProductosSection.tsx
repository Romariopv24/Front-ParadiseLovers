'use client'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { PlusIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useState } from 'react'
import useAppStore, { Product, CartItem } from '../store/useStore'

const textoBotones = [
  {
    texto: "Sanrio"
  },
  {
    texto: "Hello Kitty"
  },
  {
    texto: "Aggretsuko"
  },
  {
    texto: "Keroppi"
  },
  {
    texto: "Cinnamoroll"
  },
  {
    texto: "Anime"
  },
  {
    texto: "Papeleria"
  },
    {
    texto: "Papeleria"
  },
    {
    texto: "Papeleria"
  },
    {
    texto: "Papeleria"
  },
    {
    texto: "Papeleria"
  },
    {
    texto: "Papeleria"
  },
]

export const ProductosSection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart, cart, increaseQuantity, decreaseQuantity, removeFromCart } = useAppStore();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  useEffect(() => {
    const url = "https://paradise-backend-usfa.onrender.com/api/v1/products";

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if(data.message === "Error al obtener productos de Supabase") {
        setProducts([]);
        return;
        } else {
          setProducts(data);
        }

      })
      .catch((error) => {
        console.error("Error al obtener los productos:", error);
        setProducts([]);
      });
  }, [])

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-gray-800">Nuestros Productos</h2>
        <div className="mt-6 flex flex-wrap ">
          {/* Aquí puedes mapear tus productos */}
          <div className="relative w-full flex flex-col gap-2 py-2">
  <div className="relative w-full mb-2">
    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
      <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 pointer-events-none" />
    </span>
    <input
      type="text"
      placeholder="Buscar producto..."
      className="w-full py-3 pl-10 pr-4 bg-white border border-gray-200 rounded-2xl shadow-sm text-sm placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-shadow"
    />
  </div>
  <div className="flex overflow-x-auto gap-2 mb-2 no-scrollbar pb-2 -mx-2 px-2 snap-x">
    <button
      onClick={() => setSelectedCategory('Todos')}
      className={`snap-start shrink-0 px-5 py-2 text-sm font-semibold rounded-full transition-all transform hover:scale-105 focus-visible:outline-none flex items-center justify-center ` +
        (selectedCategory === 'Todos'
          ? 'bg-indigo-600 text-white shadow-lg hover:bg-indigo-700'
          : 'bg-white text-gray-700 border border-gray-200 shadow-sm hover:bg-gray-50 hover:text-indigo-600')}
    >
      Todos
    </button>
    {textoBotones.map((boton, index) => {
      const active = selectedCategory === boton.texto;
      return (
        <button
          key={index}
          onClick={() => setSelectedCategory(boton.texto)}
          className={`snap-start shrink-0 px-5 py-2 text-sm font-semibold rounded-full transition-all flex items-center justify-center ` +
            (active
              ? 'bg-indigo-600 text-white shadow-lg hover:bg-indigo-700'
              : 'bg-white text-gray-700 border border-gray-200 shadow-sm hover:bg-gray-50 hover:text-indigo-600')}
        >
          <span className="whitespace-nowrap">{boton.texto}</span>
        </button>
      );
    })}
  </div>
</div>

          {/* Grid de productos */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
            {products.map((product) => (
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
