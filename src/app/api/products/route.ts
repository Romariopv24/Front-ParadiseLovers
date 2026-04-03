import { RouteHandler } from "@/types/api.types"
import { Products } from "@/types/products.types"
import { NextResponse } from "next/server"

const PRODUCTS_ENDPOINT = 'https://paradise-backend-usfa.onrender.com/api/v1/products'

const normalizeProduct = (raw: unknown): Products => {
  const source = raw as Partial<Products>

  return {
    id: Number(source.id ?? 0),
    name: String(source.name ?? ''),
    description: String(source.description ?? ''),
    price: String(source.price ?? '0'),
    quantity: Number(source.quantity ?? 0),
    category: String(source.category ?? ''),
    image: String(source.image ?? ''),
  }
}

export const GET:RouteHandler = async () => {
  try {
    const response = await fetch(PRODUCTS_ENDPOINT, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }

    const data = await response.json()
    return NextResponse.json(data.map(normalizeProduct))

  } catch (error) {
      console.error(error);
    return NextResponse.json({ error: "Failed endpoint GET /products", message: error }, { status: 500 });
  }

}
