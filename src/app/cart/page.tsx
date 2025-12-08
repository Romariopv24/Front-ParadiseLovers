"use client"
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import useAppStore from '../store/useStore'

const CartPage = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart, getCartTotal } = useAppStore();
  const router = useRouter();

  const total = getCartTotal();
  // Configure your WhatsApp number as NEXT_PUBLIC_WHATSAPP_NUMBER in .env.local (format: country code + number, no + or spaces)
  // Example: NEXT_PUBLIC_WHATSAPP_NUMBER=549123456789
  const WHATSAPP_NUMBER =  '584146016516';

  const handleWhatsappCheckout = () => {
    if (!cart || cart.length === 0) return;

    // Build a readable, well-formatted message using newlines (will be encoded by encodeURIComponent)
    const lines: string[] = [];
    lines.push('Pedido - ParadiseLovers');
    lines.push('');
    lines.push('Detalle de productos:');

    cart.forEach((item, index) => {
      const unitPrice = parseFloat(item.product.price);
      const subtotal = (unitPrice * item.quantity);
      lines.push(`${index + 1}. ${item.product.name}`);
      lines.push(`   Cantidad: ${item.quantity}`);
      lines.push(`   Precio unitario: $${unitPrice.toFixed(2)}`);
      lines.push(`   Subtotal: $${subtotal.toFixed(2)}`);
      lines.push('');
    });

    lines.push(`Total: $${total.toFixed(2)}`);
    lines.push('');
    lines.push('Gracias por su compra. Por favor confirme su pedido respondiendo a este mensaje.');

    const message = lines.join('\n');
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    // Open WhatsApp (web or app) in a new tab
    if (typeof window !== 'undefined') {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-6">Mi Carrito</h1>

      {cart.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">Tu carrito está vacío.</p>
          <Link href="/" className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500">Ver productos</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ul className="space-y-4">
              {cart.map((item) => (
                <li key={item.product.id} className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-sm">
                  <img src={item.product.image} alt={item.product.name} className="w-24 h-24 object-cover rounded" />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.product.name}</h3>
                    <p className="text-sm text-gray-500">{item.product.category}</p>
                    <p className="mt-2 text-sm text-gray-700">{item.product.description}</p>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => decreaseQuantity(item.product.id)}
                          className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800"
                          aria-label={`Disminuir cantidad de ${item.product.name}`}
                        >
                          -
                        </button>
                        <span className="px-2 text-black font-medium">{item.quantity}</span>
                        <button
                          onClick={() => increaseQuantity(item.product.id)}
                          className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800"
                          aria-label={`Aumentar cantidad de ${item.product.name}`}
                        >
                          +
                        </button>
                      </div>
                      <div className="ml-auto text-right">
                        <div className="text-sm text-gray-500">Precio:</div>
                        <div className="font-semibold text-indigo-600">${(parseFloat(item.product.price) * item.quantity).toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <button onClick={() => removeFromCart(item.product.id)} className="text-sm text-red-600">Eliminar</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <aside className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Resumen</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span className="font-semibold">${total.toFixed(2)}</span>
            </div>
            <div className="text-sm text-gray-500 mb-4">Impuestos y envío se calcularán en el checkout.</div>
            <button onClick={handleWhatsappCheckout} className="w-full bg-green-600 text-white py-2 rounded-md mb-2">Ir a pagar</button>
            <button onClick={() => { clearCart(); router.push('/'); }} className="w-full bg-red-600 text-white py-2 rounded-md">Vaciar carrito</button>
          </aside>
        </div>
      )}
    </div>
  )
}

export default CartPage
