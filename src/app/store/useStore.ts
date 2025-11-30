import { create } from 'zustand';

interface Product {
  id: number;
  data: {
    name: string;
    image: string;
    price: string;
    category: string;
    description: string;
  };
}

export type { Product };

interface AppConfig {
  theme: 'light' | 'dark';
  language: string;
  notifications: boolean;
  user: {
    name: string;
    email: string;
  } | null;
}

interface AppState extends AppConfig {
  cart: Product[];
  // Setters
  setTheme: (theme: 'light' | 'dark') => void;
  setLanguage: (language: string) => void;
  setNotifications: (enabled: boolean) => void;
  setUser: (user: AppConfig['user']) => void;
  // Product setters
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  // Getters
  isDarkMode: () => boolean;
  isLoggedIn: () => boolean;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
  // Actions
  toggleTheme: () => void;
  resetConfig: () => void;
}

const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  theme: 'light',
  language: 'es',
  notifications: true,
  user: null,
  cart: [],

  // Setters
  setTheme: (theme) => set({ theme }),
  setLanguage: (language) => set({ language }),
  setNotifications: (enabled) => set({ notifications: enabled }),
  setUser: (user) => set({ user }),

  // Product setters
  addToCart: (product) => {
    console.log('Producto añadido al carrito:', product);
    set((state) => {
      const newCart = [...state.cart, product];
      console.log('Cantidad de objetos en el carrito:', newCart.length);
      console.log('Carrito actual:', newCart);
      return { cart: newCart };
    });
  },
  removeFromCart: (id) => set((state) => {
    const newCart = state.cart.filter(p => p.id !== id);
    console.log('Producto removido del carrito. Cantidad actual:', newCart.length);
    console.log('Carrito actual:', newCart);
    return { cart: newCart };
  }),
  clearCart: () => {
    console.log('Carrito limpiado');
    console.log('Carrito actual:', []);
    set({ cart: [] });
  },

  // Getters
  isDarkMode: () => get().theme === 'dark',
  isLoggedIn: () => get().user !== null,
  getCartTotal: () => get().cart.reduce((total, p) => total + parseFloat(p.data.price), 0),
  getCartItemsCount: () => get().cart.length,

  // Actions
  toggleTheme: () => {
    const currentTheme = get().theme;
    set({ theme: currentTheme === 'light' ? 'dark' : 'light' });
  },
  resetConfig: () => set({
    theme: 'light',
    language: 'es',
    notifications: true,
    user: null,
    cart: [],
  }),
}));

export default useAppStore;