import { db } from '@/db'

export const getOriginalStock = async (originalName: string): Promise<number | null> => {
    try {
        const result = await db.select().from(originalsStock).where(originalsStock.name.eq(originalName));
        if (result.length > 0) {
            return result[0].stock;
        } else {
            return null; // Original not found
        }
    } catch (error) {
        console.error('Error fetching original stock:', error);
        return null;
    }