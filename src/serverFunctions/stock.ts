import {createServerFn} from '@tanstack/react-start'
import { db } from '@/db'
import { originalsStock } from '@/db/schema'
import { eq, and, gt, sql } from 'drizzle-orm'

export const getStock = createServerFn({ method: 'GET' })
  .validator((id: number) => id)
  .handler(async ({ data: id }) => {
    try {
      const result = await db
        .select()
        .from(originalsStock)
        .where(eq(originalsStock.id, id));

      return result.length > 0 ? result[0].stock : null;
    } catch (error) {
      console.error('Error fetching original stock:', error);
      return null;
    }
  });

export const decrementStockIfAvailable = createServerFn({ method: 'POST' })
  .validator((input: { id: number }) => input)
  .handler(async ({ data }) => {
    console.log('RAW decrement data:', data, typeof data, typeof data?.id)
    const { id } = data
    console.log('extracted id:', id, typeof id)
    try {
      const result = await db
        .update(originalsStock)
        .set({ stock: sql`${originalsStock.stock} - 1` })
        .where(and(eq(originalsStock.id, id), gt(originalsStock.stock, 0)))
        .returning({ id: originalsStock.id });

      return result.length > 0;
    } catch (error) {
      console.error('Error decrementing stock:', error);
      return false;
    }
  });