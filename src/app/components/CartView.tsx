'use client'

import Image from 'next/image'
import Link from 'next/link'
import useAppStore from '../store/useStore'

type CartRowProps = {
  item: {
    product: {
      id: number
      name: string
      image: string
      price: string
      category: string
      description: string
    }
    quantity: number
  }
  onIncrease: (id: number) => void
  onDecrease: (id: number) => void
}

const CartRow = ({ item, onIncrease, onDecrease }: CartRowProps) => {
  const price = parseFloat(item.product.price)
  const subtitle = item.product.description || `${item.product.category} Collection`

  return (
    <article className="flex items-center gap-4 sm:gap-5">
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-[#f2f2f2] sm:h-16 sm:w-16">
        <Image src={item.product.image} alt={item.product.name} fill sizes="64px" className="object-cover" />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-[22px] font-semibold leading-[1.05] tracking-[-0.02em] text-[#1f1f1f]">
          {item.product.name}
        </h3>
        <p className="mt-1 truncate text-[14px] font-normal leading-none text-[#7a7a7a]">{subtitle}</p>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        <div className="rounded-full bg-[#efe2ff] px-[7px] py-[5px]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onDecrease(item.product.id)}
              className="flex h-6 w-6 items-center justify-center rounded-full bg-[#d9b8ff] text-sm font-bold text-[#7146a6] transition-all duration-300 hover:bg-[#ceadf3]"
              aria-label={`Disminuir cantidad de ${item.product.name}`}
            >
              -
            </button>
            <span className="min-w-4 text-center text-[15px] font-medium leading-none text-[#575757]">
              {item.quantity}
            </span>
            <button
              onClick={() => onIncrease(item.product.id)}
              className="flex h-6 w-6 items-center justify-center rounded-full bg-[#d9b8ff] text-sm font-bold text-[#7146a6] transition-all duration-300 hover:bg-[#ceadf3]"
              aria-label={`Aumentar cantidad de ${item.product.name}`}
            >
              +
            </button>
          </div>
        </div>

        <p className="w-16 text-right text-[30px] font-medium leading-none text-[#232323] sm:w-20">
          ${price.toFixed(2)}
        </p>
      </div>
    </article>
  )
}

export const CartView = () => {
  const { cart, increaseQuantity, decreaseQuantity } = useAppStore()
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cart.reduce((sum, item) => sum + parseFloat(item.product.price) * item.quantity, 0)
  const WHATSAPP_NUMBER = '584146016516'

  const handleWhatsappCheckout = () => {
    if (!cart.length) return

    const lines: string[] = []
    lines.push('Pedido - ParadiseLovers')
    lines.push('')
    lines.push('Detalle de productos:')

    cart.forEach((item, index) => {
      const unitPrice = parseFloat(item.product.price)
      const rowSubtotal = unitPrice * item.quantity
      lines.push(`${index + 1}. ${item.product.name}`)
      lines.push(`   Cantidad: ${item.quantity}`)
      lines.push(`   Precio unitario: $${unitPrice.toFixed(2)}`)
      lines.push(`   Subtotal: $${rowSubtotal.toFixed(2)}`)
      lines.push('')
    })

    lines.push(`Total: $${subtotal.toFixed(2)}`)
    lines.push('')
    lines.push('Gracias por su compra. Por favor confirme su pedido respondiendo a este mensaje.')

    const message = lines.join('\n')
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

    if (typeof window !== 'undefined') {
      window.open(url, '_blank')
    }
  }

  return (
    <section className="min-h-screen bg-white px-4 py-16 sm:px-6">
      <div className="mx-auto w-full max-w-[980px]">
        <header className="text-center">
          <h1 className="text-[54px] font-semibold leading-none tracking-[-0.03em] text-[#c8abeb]">
            Finalizar Compra
          </h1>
          <p className="mt-4 text-[16px] font-normal text-[#6f6f6f]">
            Casi terminamos. Revisa tus tesoros antes de enviar.
          </p>
        </header>

        <div className="mt-10 rounded-[40px] border border-[#f0edf4] bg-white px-5 py-6 shadow-[0px_16px_40px_0px_rgba(45,47,47,0.12)] sm:px-8 sm:py-8">
          <div className="flex items-center justify-between">
            <p className="text-[30px] font-medium uppercase tracking-[0.05em] text-[#757575]">Tu Seleccion</p>
            <p className="text-[30px] font-normal text-[#757575]">{itemCount} Articulos</p>
          </div>
          <div className="mt-4 h-px w-full bg-[#e9e9e9]" />

          {cart.length === 0 ? (
            <div className="py-10 text-center">
              <p className="mb-5 text-base text-[#6f6f6f]">Tu carrito esta vacio.</p>
              <Link
                href="/"
                className="inline-flex h-11 items-center rounded-full bg-[#d9b8ff] px-7 text-sm font-semibold text-[#4d2f68] transition-opacity duration-300 hover:opacity-90"
              >
                Ver productos
              </Link>
            </div>
          ) : (
            <div className="mt-7 space-y-8">
              {cart.map((item) => (
                <CartRow
                  key={item.product.id}
                  item={item}
                  onIncrease={increaseQuantity}
                  onDecrease={decreaseQuantity}
                />
              ))}
            </div>
          )}
        </div>

        <div className="relative mt-10 rounded-[32px] bg-[#f3e8ff] px-6 pb-8 pt-10 shadow-[0px_14px_34px_rgba(111,78,160,0.14)] sm:px-8">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#ede7f4] bg-white px-4 py-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#7a7a7a]">
              Resumen de Compra
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-[#5f5f66]">Subtotal de productos</p>
              <p className="text-base font-semibold text-[#3a2f47]">${subtotal.toFixed(2)}</p>
            </div>

            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-[#5f5f66]">Envio</p>
              <span className="rounded-full bg-[#dff4ff] px-3 py-1 text-xs font-semibold text-[#2a84ab]">
                Acordar por WhatsApp
              </span>
            </div>

            <div className="border-t border-dashed border-[#d8c6eb]" />

            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#7b708a]">Total</p>
                <p className="text-[44px] font-semibold leading-none tracking-[-0.02em] text-[#9f67df]">
                  ${subtotal.toFixed(2)}
                </p>
              </div>
              <p className="pb-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8e8499]">
                Impuestos incluidos
              </p>
            </div>
          </div>

          {/* <div className="pointer-events-none absolute inset-x-6 -bottom-3 h-6 bg-[radial-gradient(circle_at_10px_-2px,#ffffff_12px,transparent_13px)] bg-[length:20px_20px]" /> */}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={handleWhatsappCheckout}
            disabled={!cart.length}
            className="inline-flex h-14 w-full max-w-[560px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#d8b4fe] to-[#cffafe] px-8 text-base font-semibold text-[#4d2f68] shadow-[0px_10px_28px_rgba(184,157,226,0.35)] transition-all duration-300 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4 fill-current">
              <path d="M13.601 2.326A7.854 7.854 0 0 0 8.012 0C3.66 0 .104 3.556.104 7.908c0 1.391.364 2.748 1.057 3.944L0 16l4.249-1.114a7.93 7.93 0 0 0 3.763.957h.003c4.351 0 7.907-3.556 7.907-7.908a7.86 7.86 0 0 0-2.321-5.609Zm-5.589 12.17h-.003a6.616 6.616 0 0 1-3.368-.92l-.241-.143-2.521.661.673-2.459-.157-.252a6.611 6.611 0 0 1-1.014-3.53c0-3.648 2.968-6.615 6.617-6.615 1.769 0 3.431.689 4.68 1.938a6.57 6.57 0 0 1 1.939 4.679c-.001 3.649-2.969 6.616-6.615 6.616Z" />
              <path d="M11.656 9.829c-.2-.1-1.183-.584-1.366-.65-.182-.067-.315-.1-.448.1-.133.2-.515.65-.632.784-.116.133-.232.15-.432.05-.2-.1-.843-.311-1.606-.993-.593-.529-.994-1.183-1.11-1.383-.116-.2-.012-.308.088-.408.09-.089.2-.233.3-.35.1-.116.133-.2.2-.333.066-.133.033-.25-.017-.35-.05-.1-.448-1.083-.614-1.482-.162-.389-.326-.336-.448-.342l-.382-.007a.732.732 0 0 0-.532.25c-.182.2-.697.682-.697 1.665 0 .982.714 1.932.814 2.065.1.133 1.404 2.144 3.401 3.006.475.205.845.328 1.134.42.476.151.909.13 1.251.079.382-.057 1.183-.483 1.35-.95.166-.467.166-.867.116-.95-.05-.083-.183-.133-.383-.233Z" />
            </svg>
            Finalizar Pedido por WhatsApp
          </button>
          <p className="mt-3 text-xs text-[#7a7a7a]">
            Al hacer clic, seras redirigido a WhatsApp para confirmar tu pedido.
          </p>
        </div>
      </div>
    </section>
  )
}
