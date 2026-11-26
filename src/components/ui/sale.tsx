export const isOnSale = true;
export const SALE_PERCENTAGE = 0.50



export const SALE = {
  percentOff: 30, // adjust
  starts: new Date('2026-11-25T00:00:00-05:00'),
  ends: new Date('2026-12-01T05:00:00Z'),
  // optional: restrict to certain products by slug, or leave undefined for everything
  appliesTo: undefined as string[] | undefined,
}

 const now = new Date()
 const active = now >= SALE.starts && now <= SALE.ends

export function applySale(price: number, slug: string) {
  
     const now = new Date()
 const active = now >= SALE.starts && now <= SALE.ends
//   const eligible = !SALE.appliesTo || SALE.appliesTo.includes(slug)
  if (!active || !isOnSale ) return price
  return Math.round(price * (1 - SALE.percentOff / 100) * 100) / 100
}
