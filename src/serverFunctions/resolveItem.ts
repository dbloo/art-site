import { products, sellingPrints, sellingOriginals } from '@/siteinfo/products'

export function resolveItem(item: any) {
  const { productType, slug, selectedSize } = item ?? {}
  if (typeof slug !== 'string') throw new Error('Bad item')

  if (productType === 'print') {
    const p = products.prints.find((p) => p.slug === slug)
    if (!p || !sellingPrints.includes(p.name)) throw new Error('Not for sale')
    const option = p.prints.find((o) => o.sizes === selectedSize)
    if (!option) throw new Error('Invalid size')
    return { productType, name: p.name, slug: p.slug, image: p.productImage, size: option.sizes, unitPrice: option.price }
  }

  if (productType === 'original') {
    const p = products.paintings.find((p) => p.slug === slug)
    if (!p || !sellingOriginals.includes(p.name)) throw new Error('Not for sale')
    return { productType, name: p.name, slug: p.slug, image: p.productImage, size: undefined, unitPrice: p.price }
  }

  throw new Error('Unknown product type')
}