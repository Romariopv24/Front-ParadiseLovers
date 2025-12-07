import { create } from "zustand";

interface Product {
  id: number;
  name: string;
  image: string;
  price: string;
  category: string;
  description: string;
}

export type { Product, CartItem };

interface CartItem {
  product: Product;
  quantity: number;
}

interface AppConfig {
  theme: "light" | "dark";
  language: string;
  notifications: boolean;
  user: {
    name: string;
    email: string;
  } | null;
}

interface AppState extends AppConfig {
  cart: CartItem[];
  // Setters
  setTheme: (theme: "light" | "dark") => void;
  setLanguage: (language: string) => void;
  setNotifications: (enabled: boolean) => void;
  setUser: (user: AppConfig["user"]) => void;
  // Product setters
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
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
  theme: "light",
  language: "es",
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
    console.log("Producto añadido al carrito:", product);
    set((state) => {
      const existingIndex = state.cart.findIndex(item => item.product.id === product.id);
      let newCart;
      if (existingIndex !== -1) {
        newCart = [...state.cart];
        newCart[existingIndex].quantity += 1;
      } else {
        newCart = [...state.cart, { product, quantity: 1 }];
      }
      console.log("Cantidad de objetos en el carrito:", newCart.reduce((sum, item) => sum + item.quantity, 0));
      console.log("Carrito actual:", newCart);
      return { cart: newCart };
    });
  },
  removeFromCart: (id) =>
    set((state) => {
      const newCart = state.cart.filter((item) => item.product.id !== id);
      console.log(
        "Producto removido del carrito. Cantidad actual:",
        newCart.reduce((sum, item) => sum + item.quantity, 0)
      );
      console.log("Carrito actual:", newCart);
      return { cart: newCart };
    }),
  increaseQuantity: (id) => set((state) => {
    const item = state.cart.find(item => item.product.id === id);
    if (item && item.quantity < 10) {
      item.quantity += 1;
      console.log('Cantidad aumentada para', id, 'a', item.quantity);
    }
    return { cart: [...state.cart] };
  }),
  decreaseQuantity: (id) => set((state) => {
    const item = state.cart.find(item => item.product.id === id);
    if (item) {
      if (item.quantity > 1) {
        item.quantity -= 1;
        console.log('Cantidad disminuida para', id, 'a', item.quantity);
      } else {
        const newCart = state.cart.filter(item => item.product.id !== id);
        console.log('Producto eliminado del carrito:', id);
        return { cart: newCart };
      }
    }
    return { cart: [...state.cart] };
  }),
  clearCart: () => {
    console.log("Carrito limpiado");
    console.log("Carrito actual:", []);
    set({ cart: [] });
  },

  // Getters
  isDarkMode: () => get().theme === "dark",
  isLoggedIn: () => get().user !== null,
  getCartTotal: () =>
    get().cart.reduce((total, item) => total + parseFloat(item.product.price) * item.quantity, 0),
  getCartItemsCount: () => get().cart.reduce((sum, item) => sum + item.quantity, 0),

  // Actions
  toggleTheme: () => {
    const currentTheme = get().theme;
    set({ theme: currentTheme === "light" ? "dark" : "light" });
  },
  resetConfig: () =>
    set({
      theme: "light",
      language: "es",
      notifications: true,
      user: null,
      cart: [],
    }),
}));

export default useAppStore;
