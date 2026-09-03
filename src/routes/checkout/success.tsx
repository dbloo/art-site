import { createFileRoute } from '@tanstack/react-router'
import {useEffect, useState} from 'react'
import confetti from 'canvas-confetti'
import { useCart } from '@/context/CartContext'
import { Spinner } from '@/components/ui/spinner'

import { verifyCheckoutSession } from '@/serverFunctions/verifySession'
import { decrementStockIfAvailable } from '@/serverFunctions/stock'
import { SelectItem } from '#/components/ui/select'




export const Route = createFileRoute('/checkout/success')({
  component: RouteComponent,
})

function RouteComponent() {

  const { session_id } = Route.useSearch() as { session_id?: string }
  const { cart, clearCart } = useCart()
  const [status, setStatus] = useState<'checking' | 'success' | 'error'>('checking')

   useEffect(() => {
    const fire = () => {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
      })
    }

    fire() 

    const interval = setInterval(fire, 10000) 

    return () => clearInterval(interval) 
  }, [])

   useEffect(() => {
    if (!session_id) return setStatus('error')
    verifyCheckoutSession({ data: session_id })
      .then(({ paid }) => {
        if (paid) {
        
          clearCart()
          setStatus('success')
        } else {
          setStatus('error')
        }
      })
      .catch(() => setStatus('error'))
  }, [session_id])

  if (status === 'checking') return <div className=' flex flex-row gap-10 items-center justify-center w-screen h-screen '><p>Confirming your order...</p><Spinner></Spinner></div>
  if (status === 'error') return <p>Sorry, we couldn't confirm your payment.</p>
  return (
  
  <div className='w-screen h-auto  p-5 lg:p-60'>


    <div className=' pt-20 lg:pt-0 relative items-center justify-center flex flex-col'>
                    <img  onContextMenu={(e) => e.preventDefault()} draggable = {false} className = "w-60 top-37 lg:w-80 absolute lg:top-12" src= "/assets/graphics/graphic3.svg"></img>

    
    <div className='w-full mt-30 lg:p-10  p-5 h-auto border border-black rounded-2xl flex flex-col items-center '>
    <h1 className=' text-6xl text-center lg:text-9xl font-black'>THANK YOU!  </h1>
    <p className=' text-2xl w-full lg:text-3xl text-center mt-5 '>Your order is being proccessed.</p>
    <p className='text-xl font-light text-center mt-10'>Keep an eye on your inbox for processing updates. Enjoy your new piece of art! </p>
    </div>

    </div>
    
    </div>)
}
