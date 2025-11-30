'use client'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import useAppStore, { Product } from '../store/useStore'

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
  const { addToCart } = useAppStore();

  useEffect(() => {
    const url = "https://paradise-backend-usfa.onrender.com/api/v1/products";

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error al obtener los productos:", error);
      });
  }, [])

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Nuestros Productos</h2>
        <div className="mt-6 flex flex-wrap ">
          {/* Aquí puedes mapear tus productos */}
          <div className="relative w-full flex flex-col gap-2 py-2">
  <div className="relative w-full">
    <input
      type="text"
      placeholder="Buscar producto"
      className="block w-full lg:min-w-[400px] p-2 pl-10 border border-gray-400 rounded-md focus:outline-none focus:ring-1 text-black"
    />
    <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
  </div>
  <div className="flex gap-2 overflow-x-auto flex-nowrap py-2">
    <button className="flex text-center w-24 items-center gap-2 rounded-md bg-indigo-600 px-5.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
      <span>Todos</span>
    </button>
    {textoBotones.map((boton, index) => (
      <button
        key={index}
        className="flex items-center justify-center gap-2 rounded-md bg-indigo-600 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 px-4 py-2 whitespace-nowrap"
      >
        <span className="whitespace-nowrap">{boton.texto}</span>
      </button>
    ))}
  </div>
</div>

          {/* Grid de productos */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
            {products.map((product) => (
              <div key={product.id} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative w-full h-32">
                  <img
                    src={product.data.image}
                    alt={product.data.name}
                    className="object-cover w-full h-32"
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-base font-semibold text-gray-900">{product.data.name}</h3>
                  <p className="text-xs text-gray-600 mt-1">{product.data.category}</p>
                  <p className="text-xs text-gray-700 mt-2">{product.data.description}</p>
                  <p className="text-lg font-bold text-indigo-600 mt-2">${product.data.price}</p>
                  <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                    <button
                      onClick={() => console.log('Ver producto:', product.id)}
                      className="flex-1 bg-blue-600 text-white px-3 py-1.5 text-xs rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Ver Producto
                    </button>
                    <button
                      onClick={() => addToCart(product)}
                      className="flex-1 bg-green-600 text-white px-3 py-1.5 text-xs rounded-md hover:bg-green-700 transition-colors"
                    >
                      Añadir al Carrito
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  )
}
