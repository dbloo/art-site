import { createFileRoute, Link } from '@tanstack/react-router'
import { products } from '#/siteinfo/products'
import { map } from 'zod'

export const Route = createFileRoute('/prints')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
  
    <div className='-z-100 rise-in w-full h-auto py-10 p-5 lg:px-60 lg:py-20'>
      <div className='pt-30 relative items-center justify-center flex flex-col'>
                <img onContextMenu={(e) => e.preventDefault()} draggable = {false} className = "w-60 top-17 lg:w-80 absolute lg:top-12" src= "/assets/graphics/graphic3.svg"></img>

      <div className = " w-full border border-black rounded-2xl  px-3 py-5  lg:p-8 "> 
        <div className=' '> 
          <div className='flex flex-col mb-10'>
                <h1 className='lg:text-7xl text-4xl font-black mt-2 '>Prints</h1>
                <p className='text-lg opacity-70 font-light mb-5'>Printed on archival fine-art paper. </p>

                <hr className=''></hr>
                </div>
                </div>

<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {products.prints.map((print, e) => 
        <>
        
        <div className='pb-10  '><Link to = {`/print/${print.slug}`}><div style={{backgroundImage: `url(${print.thumbnail})`}} className = "shadow-lg  hover:-translate-y-1 hover:brightness-70 transition-all ease-in-out  bg-cover bg-center rounded-2xl w-full h-100 lg:h-120"></div><h1 className='text-4xl lg:text-left text-center mt-5 mb-5 font-bold'>{print.name}</h1><div className = "flex flex-row justify-between w-full"><p>From ${print.prints[0].price}</p><p className='font-light opacity-70'>[{print.size}]</p></div></Link></div>

        </>
        
        
        
      
      )}  
    </div>
    </div>
    </div>
    
    </div>
    
  )
}
