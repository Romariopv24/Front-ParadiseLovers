import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React from 'react'

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

        </div>

      </div>
    </div>
  )
}
