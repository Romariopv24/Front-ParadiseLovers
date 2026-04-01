import { Products } from "@/types/products.types"

export const getProducts = async (): Promise<Products[]> => {   
    const response = await fetch('/api/products')

    if (!response.ok) {
        throw new Error('No se pudieron obtener los productos.')
    }

    const data = await response.json()

    return data
} 