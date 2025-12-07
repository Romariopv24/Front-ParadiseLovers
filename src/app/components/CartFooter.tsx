'use client'
import Link from 'next/link'
import useAppStore from '../store/useStore'

export const CartFooter = () => {
  const { getCartItemsCount, getCartTotal } = useAppStore();
  const itemCount = getCartItemsCount();
  const total = getCartTotal();

  if (itemCount === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-900">
            {itemCount} {itemCount === 1 ? 'artículo' : 'artículos'}
          </span>
          <span className="text-lg font-bold text-indigo-600">
            ${total.toFixed(2)}
          </span>
        </div>
        <Link href="/cart" className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
          <span>Ver carrito</span>
          <span className="text-lg">→</span>
        </Link>
      </div>
    </div>
  );
};