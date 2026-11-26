import { createServerFn } from "@tanstack/react-start";
import { couponCodes, submittedCouponCodes } from "#/db/schema";
import { getDb } from '../db'
import { eq } from 'drizzle-orm'
import {z} from 'zod'


    const db = getDb()

    const codeSchema = z.object({
      code: z.string(`lol you didn't enter anything.`),
    })

export const submitCouponCode = createServerFn({method: "GET"}).handler(
    async(ctx:any) => {


        const parsed = codeSchema.parse(ctx.data)
        const code = parsed.code.trim().toLowerCase()
        try {
            

        const [exists, codes, offer] = await Promise.all([
            await db
            .select({code: submittedCouponCodes.code})
            .from(submittedCouponCodes)
            .where(eq(submittedCouponCodes.code, ctx.data.code))
            .limit(1),

            await db
            .select({code: couponCodes.code})
            .from(couponCodes)
            .where(eq(couponCodes.code, ctx.data.code))
            .limit(1),

            await db
            .select({offer: couponCodes.offer})
            .from(couponCodes)
            .where(eq(couponCodes.code, ctx.data.code))
            .limit(1),
        ])
        





        if (exists.length > 0) {
                return { success: false, reason: 'duplicate' } as const

        } if (codes.length === 0) {

                    return { success: false, reason: 'incorrect' } as const

            }
            
            else{

            //     await db
            // .insert(submittedCouponCodes)
            // .values({name: code, code: code })
            // .onConflictDoNothing()
            // .returning()

            console.log(offer[0].offer)

                return {success: true, reason: 'success', offer: offer} as const
            }

        
        

        
        } catch (e){return {success: false, reason: 'error'} as const}
        
        
        
        

        


    }

    
)