import { createFileRoute, Link } from '@tanstack/react-router'
import { products } from '#/siteinfo/products'
import { useState, useEffect } from 'react'
import {getStock} from "@/serverFunctions/stock"
import {Skeleton} from "@/components/ui/skeleton"


export const Route = createFileRoute('/originals')({
  component: RouteComponent,
})

function RouteComponent() {

  const [stockMap, setStockMap] = useState<Record<number, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllStock = async () => {
      setLoading(true);
      const entries = await Promise.all(
        products.paintings.map(async (painting) => {
          const stock = await getStock({ data: painting.id }); 
          return [painting.id, stock !== null && stock > 0] as const;
        })
      );
      setStockMap(Object.fromEntries(entries));
      setLoading(false);
    };
    fetchAllStock();
  }, []);

  function getTitleClass(title: string) {
        const len = title.length;
        if (len <= 8) return "text-5xl";
        if (len <= 14) return "text-4xl";
        if (len <= 20) return "text-xl";
        return "text-xl";
}


  
  return (
  
    <div className='-z-100 rise-in w-full h-auto p-5  py-10  lg:px-60 lg:py-20'>
      <div className='pt-30 relative items-center justify-center flex flex-col'>
        <img onContextMenu={(e) => e.preventDefault()} className = "w-60 top-17 lg:w-80 absolute lg:top-12" src= "/assets/graphics/graphic3.svg"></img>
      <div className = " w-full border border-black rounded-2xl  px-3 py-5  lg:p-8 "> 
        <div className=' '> 
          <div className='flex flex-col mb-10'>
                <h1 className='lg:text-7xl text-4xl font-black mb-5'>Originals</h1>
                <p className='text-xl opacity-70 font-light mb-5'>One of one canvas paintings. </p>

                <hr className=''></hr>
                </div>
                </div>

<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {products.paintings.map((painting) => {
              const inStock = stockMap[painting.id] ?? true;

              return (
                <div key={painting.id} className='pb-10 relative'>
                  {loading ? (<Skeleton/>):(<>
                  {!inStock && (
                    <div className="flex absolute gap-3 py-1 px-3 shadow-lg text-white right-0 items-center rounded-4xl z-100 bg-white/20 border border-white/30 my-5 mx-5 backdrop-blur-lg flex-row w-auto">
                      <p className='select-none'>SOLD</p>
                      <span className='bg-red-500 size-3 rounded-full'></span>
                    </div>
                  )}

                  <Link to={`/original/${painting.slug}`}>
                    <div
                      style={{ backgroundImage: `url(${painting.images[0]})` }}
                      className="shadow-lg hover:-translate-y-1 hover:brightness-70 transition-all ease-in-out bg-cover bg-center rounded-2xl w-full h-100 lg:h-120"
                    />
                    <h1 className={`${getTitleClass(painting.name)} lg:text-left text-center mt-5 mb-5 font-bold`}>{painting.name}</h1>
                    <div className="flex flex-row justify-between w-full">
                      <p>{painting.year}</p>
                      <p className='font-light opacity-70'>[{painting.size}]</p>
                    </div>
                  </Link>
                  </>)}
                </div>
              );
            })}
    </div>
    </div>
    </div>
    
    </div>
    
  )
}
