import { createFileRoute, Link } from '@tanstack/react-router'
import { products } from '#/siteinfo/products'
import {db} from '@/db/index'

export const Route = createFileRoute('/originals')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
  
    <div className='-z-100 rise-in w-full h-auto p-5 lg:px-60 lg:py-20'>
      <div className='pt-20'>
      <div className = " w-full border border-black rounded-2xl  px-3 py-5  lg:p-8 "> 
        <div className=' '> 
          <div className='flex flex-col mb-10'>
                <h1 className='lg:text-5xl text-4xl font-black mb-2'>Originals</h1>
                <p className='text-lg opacity-70 mb-5'>1 of 1 acrylic on canvas paintings. </p>

                <hr className=''></hr>
                </div>
                </div>

<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {products.paintings.map((painting, e) => 
        
        <>
        
        <div className='pb-10  relative '><div className = "flex absolute gap-3 py-1 px-3 shadow-lg text-white right-0 items-center rounded-4xl z-100 bg-white/20 border border-white/30 my-5 mx-5  backdrop-blur-lg flex-row w-auto"><p>SOLD</p><span className='bg-red-500 size-3 rounded-full '></span></div> <Link to = {`/print/${painting.slug}`}><div style={{backgroundImage: `url(${painting.images[0]})`}} className = "shadow-lg  hover:-translate-y-1 hover:brightness-70 transition-all ease-in-out  bg-cover bg-center rounded-2xl w-full h-100 lg:h-120"></div><h1 className='text-4xl lg:text-left text-center mt-5 mb-5 font-bold'>{painting.name}</h1><div className = "flex flex-row justify-between w-full"><p>{painting.year}</p><p className='font-light opacity-70'>[{painting.size}]</p></div></Link></div>
        </>
        
        
        
      
      )}  
    </div>
    </div>
    </div>
    
    </div>
    
  )
}
