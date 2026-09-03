import { useCart } from '#/context/CartContext'
import { Spinner } from '#/components/ui/spinner'
import {Button, StyledButton} from "@/components/ui/button"
import {Link} from "@tanstack/react-router"
import {Trash2} from "lucide-react"
import {useEffect} from "react"




import type { CartItem } from '#/context/CartContext';


export function Cart () {

    const { cart, removeFromCart, subtotal, addToCart, isLoading, setIsLoading, clearCart } = useCart();


  
    

    async function handleCheckout () {

        setIsLoading(true);
        try{
         const res = await fetch('/api/checkout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({cart})
         })
         const {url} = await res.json()
         if (url){
            window.location.href = url
           
         } else {
            throw new Error ('No checkout URL returned')
         }
    }catch(e){
        setIsLoading(false);
        console.log("something went wrong: " + e)

    }
    }



    return(
    
    <div className='rise-in py-40  h-auto '>

                        

        <div className={`w-screen  h-full flex flex-col  z-100 p-3  lg:px-60 gap-5 lg:justify-center  `}>
                        {cart.length == 0 ? (<>

                        <div className = "flex flex-row justify-between">
            <h1 className='text-black text-4xl font-black '>YOUR CART </h1>

            </div>

                        <div className='w-full text-center flex flex-col lg:p-8 p-3 rounded-2xl bg-white h-full border border-black '>


                            <h1 >Theres nothing here.</h1>
                        </div>
                        
                        </>):(<>

            <div className = "flex flex-row justify-between items-center">
                <h1 className='text-black text-4xl font-black '>YOUR CART </h1>
                        <Button disabled = {isLoading} onClick = {() => clearCart()}className = "  cursor-pointer hover:bg-black/10 justify-baseline items-center w-23   text-xs bg-white text-black border border-black">Clear Cart </Button>

            </div>



            <div className='w-full relative flex flex-col lg:p-8 p-3  px-3 pt-8 rounded-2xl   bg-white h-full border border-black '>
                {isLoading && <div className = "w-full h-full flex  items-center justify-center"><div className='absolute justify-center items-center  top-0 left-0 rounded-2xl bg-black opacity-20 z-100 w-full h-full'></div><Spinner  className=' fixed  mt-100 size-10  z-100 '></Spinner></div>}

                {cart.map((item:CartItem, i:number)=> { 



                return(
                
                <div className='w-full'>    


                <div className = "grid grid-cols-3 w-full">
                    

                    <div className='flex flex-col   gap-5 lg:w-50 w-full items-center'>
                        <p className='opacity-40 text-xs font-light '>Item:</p>

                   <Link to ={`/print/${item.slug}`}><img onContextMenu={(e) => e.preventDefault()} draggable = {false} className = " hover:-translate-y-1 duration-300 transition-all rounded-lg shadow-md w-20 " src = {item.image}></img></Link>

                                           <h1 className='text-sm opacity-50 font-medium items-center'>{item.name}</h1>

                   <h1 className=' font-light text-center text-sm'>[{item.selectedSize}] {item.productType} </h1>                                 

                    
                    </div>
                   
                                            <div className='flex flex-col items-center text-center gap-16 '>

                            <p className='opacity-40 text-xs font-light'>Quantity:</p>

                            

                            <div className = "flex flex-col gap-16 items-center">

                    {item.productType != "original" && 

                                                <div className="flex items-center gap-2">
            <Button disabled = {isLoading} onClick = {()=>removeFromCart(item.id, item.selectedSize ? item.selectedSize : "", item.productType)} color = "white" className = {` size-5 lg:size-7 bg-white border border-black text-black cursor-pointer `}> - </Button>
            <span className={`tabular-nums`}>{item.quantity}</span>
            <Button disabled = {isLoading} onClick = {()=>addToCart(item)} color = "white" className = {` size-5 lg:size-7 bg-white border border-black text-black cursor-pointer `}> +</Button>


        </div>

                    }

                                                  <div className = "cursor-pointer"><button disabled = {isLoading}><Trash2 className = {` ${isLoading ? "opacity-30":""} cursor-pointer`} onClick={()=>removeFromCart(item.id, item.selectedSize ? item.selectedSize : "", item.productType, true)}size="20"/></button></div>

                                                </div>

                            </div>

                             <div className='flex flex-col  w-full h-full items-center gap-16 '>
                                <p className='opacity-40 text-xs font-light '>Price:</p>
                                            <h1 className='text-xl lg:text-3xl'>${item.price.toLocaleString()}<span className='text-sm opacity-50'>  x  {item.quantity}</span></h1>
                                            </div>

                                                              

                    
                    </div>


                                        
                                        <hr className='my-10 w-full '></hr>                


                    </div>

                )
            }
                    
                
                
                )}

         

                <h1 className='text-3xl lg:text-4xl flex w-full lg:justify-end lg:pr-40 mb-15'>Subtotal: ${subtotal.toLocaleString()}</h1>

                <StyledButton onClick = {handleCheckout} disabled = {isLoading} className='w-full mb-3'>Checkout</StyledButton>

            </div>

            
                </>)}


            <div className='mt-20 flex flex-col w-full gap-10 '>
                
                <div className = "opacity-80 flex flex-col gap-2">
                <h1 className='font-extrabold text-2xl lg:text-3xl '>SHIPPING POLICY:</h1>

                 <hr className = "mt-5"></hr>

                   <p className='font-light mt-5'> <strong>Domestic Orders (U.S.):</strong> 5-10 Business Days</p>

                    <p className='font-light'><strong className='font-medium'>Interational Orders:</strong> 10-15 Business Days</p>
                    </div>

                    <p className='font-light'>Original artwork and merchandise orders can take from <strong>2 to 4 weeks </strong> to fufill depending on package weight and delivery location.</p>
            
            </div>

            <div className='mt-5 flex flex-col w-full gap-10 '>
                
                <div className = "mt-10 opacity-80 flex flex-col gap-2">
                <h1 className='font-extrabold  text-2xl lg:text-3xl'>RETURNS & REFUNDS POLICY:</h1>

                <hr className = "mt-5"></hr>

                   <strong className='text-2xl mt-5'> Original Artworks</strong>

                    <p className='font-light'>{`All original works are one-of-a-kind and sold as final sale. Because of their unique nature, we do not accept returns or exchanges on originals except in cases of damage during shipping (see below).`}</p>

                     <strong className='text-2xl mt-5'> Prints </strong>

                    <p className='font-light'>{`We accept returns on prints within 14 days of delivery, provided the item is unused and in its original packaging, free of damage, marks, or alterations and accompanied by proof of purchase (order number or receipt)`}</p>

                    <p className='mt-5 font-light'>To start a return, contact us at <strong className='font-bold'>contact.dominicbloomfield@gmail.com</strong>  with your order number and reason for return. Once approved, we'll provide return instructions. Return shipping costs are the responsibility of the customer unless the return is due to our error (wrong item shipped, defect, etc.). Refunds are issued to the original payment method within 5–10 business days of us receiving the returned item</p>

                    <strong className='text-2xl mt-5'> Damaged or Defective Items </strong>

                    <p className='font-light'>{`If your artwork arrives damaged or defective, contact us within 48 hours of delivery with your order number and photos of the damaged item and packaging. We'll arrange a replacement, repair, or full refund at no cost to you, including return shipping if applicable.`}</p>
                    </div>

                                
            </div>

            

        </div>

        


    </div>)
}