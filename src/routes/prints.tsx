import { createFileRoute, Link } from '@tanstack/react-router'
import { products } from '#/siteinfo/products'
import { map } from 'zod'

export const Route = createFileRoute('/prints')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
  
    <div className='-z-100 rise-in w-full h-auto p-5 lg:px-60 lg:py-20'>
      <div className='pt-20'>
      <div className = " w-full border border-black rounded-2xl  px-3 py-5  lg:p-8 "> 
        <div className=' '> 
          <div className='flex flex-col mb-10'>
                <h1 className='lg:text-5xl text-4xl font-black mb-2'>Prints</h1>
                <p className='text-lg opacity-70 mb-5'>Printed on archival fine-art paper. </p>

                <hr className=''></hr>
                </div>
                </div>

<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {products.prints.map((print, e) => 
        

        <>
        
        <div className = "flex absolute z-100 flex-row w-10"><p></p><span className='bg-red-500 w-10'></span></div>
        <div className='pb-10  '><Link to = {`/print/${print.slug}`}><div style={{backgroundImage: `url(${print.images[0]})`}} className = "shadow-lg  hover:-translate-y-1 hover:brightness-70 transition-all ease-in-out  bg-cover bg-center rounded-2xl w-full h-100 lg:h-120"></div><h1 className='text-4xl lg:text-left text-center mt-5 mb-5 font-bold'>{print.name}</h1><div className = "flex flex-row justify-between w-full"><p>{print.year}</p><p className='font-light opacity-70'>[{print.size}]</p></div></Link></div>
        </>
        
        
        
      
      )}  
    </div>
    </div>
    </div>
    
    </div>
    
  )
}
