import { createFileRoute, Link } from '@tanstack/react-router'
import { products, sellingOriginals } from '#/siteinfo/products'
import { useState, useEffect } from 'react'
import {getStock} from "@/serverFunctions/stock"
import {Skeleton} from "@/components/ui/skeleton"
import { applySale } from '@/components/ui/sale'

import {EmailCapture} from "@/components/ui/emailCapture"


export const Route = createFileRoute('/originals')({
  component: RouteComponent,
})

function RouteComponent() {

  const notForSale = false;

  const paintings = products.paintings.filter((p)=>  sellingOriginals.includes(p.name))

  const [stockMap, setStockMap] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    const fetchAllStock = async () => {
      setLoading(true);
      const entries = await Promise.all(
        paintings.map(async (painting) => {
          const stock = await getStock({ data: painting.name }); 
          return [painting.name, stock !== null && stock > 0] as const;
        })
      );
      setStockMap(Object.fromEntries(entries));
      setLoading(false);
    };
    fetchAllStock();
  }, []);

  function getTitleClass(title: string) {
        const len = title.length;
        if (len <= 8) return "text-4xl";
        if (len <= 14) return "text-3xl";
        if (len <= 20) return "lg:text-4xl text-xl";
        return "text-3xl";
}

  if (notForSale) {
    return (<div className='rise-in items-center justify-center flex flex-col  gap-5 px-5 pt-40 lg:py-60 text-center  w-screen h-1/2 '>
      <span className='text-6xl p-2 font-black bg-[#FADE22]'>Sorry,</span>
      <h2 className='lg:text-4xl text-4xl font-black '> I'm not selling any originals rn.</h2>
      <p className='mb-10'>Drop your email below to get notified as soon as I release new work.</p>
      <EmailCapture/>

    </div>)}
  
  return (
  
    <div className='-z-100 rise-in w-full h-auto p-5  py-10  lg:px-60 lg:py-20'>
      <div className='pt-30 relative items-center justify-center flex flex-col'>
        <img onContextMenu={(e) => e.preventDefault()} className = "w-60 top-17 lg:w-80 absolute lg:top-12" src= "/assets/graphics/graphic3.svg"></img>
      <div className = " w-full border border-black rounded-2xl  px-3 py-5  lg:p-8 "> 
        <div className=' '> 
          <div className='flex flex-col mb-10'>
                <h1 className='lg:text-7xl text-4xl font-black  mt-2'>Originals</h1>
                <p className='text-lg opacity-70 font-light mb-5'>One of one canvas paintings. </p>

                <hr className=''></hr>
                </div>
                </div>

<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {paintings.reverse().map((painting) => {
          const price = applySale(painting.price, painting.slug)
          const discounted = price < painting.price
              const inStock = stockMap[painting.name] ?? true;

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
                      className="shadow-lg relative hover:-translate-y-1 hover:brightness-70 transition-all ease-in-out bg-cover bg-center rounded-2xl w-full h-100 lg:h-120"
                    />
                    <h1 className={`${getTitleClass(painting.name)} lg:text-left text-center mt-5 mb-5 font-medium`}>{painting.name}</h1>
                    <div className="flex flex-row justify-between w-full">
                      <div className = "flex flex-row items-center gap-5 ">
                      {/* {discounted && inStock && <img className="absolute w-15 m-3 top-0 right-0" src="/assets/graphics/50sale.webp" />} */}

                        <div className="flex flex-row items-center gap-5">
                          {discounted && (
                            <p className="line-through decoration-2 opacity-30 font-light text-center">
                              ${painting.price.toLocaleString()}
                            </p>
                          )}
                          <p className={discounted ? 'font-bold bg-[#FAD305]' : ''}>${price.toLocaleString()}</p>
                        </div>
                      </div>
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
