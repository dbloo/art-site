// components/PrintsCarousel.tsx
import { useEffect, useRef, useState } from 'react'
import { Link } from '@tanstack/react-router' 
import {ChevronLeft, ChevronRight} from 'lucide-react'

interface Print {
  slug: string
  image: string
  images: string[]
  [key: string]: any
}

interface CarouselProps {
  images: string[];
  prints: Print[]
  autoScrollInterval?: number // ms between slides
  autoRotateInterval?: number
}

export function SlidingCarousel({ prints, autoScrollInterval = 2000 }: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const isHovering = useRef(false)

  // Autoscroll
  useEffect(() => {
    const interval = setInterval(() => {
      if (isHovering.current) return
      setActiveIndex((prev) => (prev + 1) % prints.length)
    }, autoScrollInterval)

    return () => clearInterval(interval)
  }, [prints.length, autoScrollInterval])

  // Scroll to active index whenever it changes
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return
    const child = container.children[activeIndex] as HTMLElement | undefined
    if (child) {
      container.scrollTo({
        left: child.offsetLeft - container.offsetLeft,
        behavior: 'smooth',
      })
    }
  }, [activeIndex])

  return (
    <div
      onMouseEnter={() => (isHovering.current = true)}
      onMouseLeave={() => (isHovering.current = false)}
    >
      <div
        ref={scrollRef}
        className="w-full items-center  overflow-x-scroll scrollbar-none lg:w-full flex flex-row gap-5 lg:p-8 p-5 border border-black rounded-2xl snap-x snap-mandatory"
      >
        {prints.map((product, i) => (
          <Link
            key={product.slug}
            to={`/print/${product.slug}`}
            className="shrink-0 snap-center"
          >
            <img
            draggable = {false}
              className="rounded-xl w-50 lg:w-100 shadow-lg"
              src={product.images[0]}
              alt={product.slug}
            />
          </Link>
        ))}
      </div>

      {/* Pagination dots */}
      <div className="lg:hidden flex flex-row justify-center gap-2 mt-4">
        {prints.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === activeIndex ? 'w-6 bg-black' : 'w-2 bg-black/30'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export function RotatingCarousel({prints, autoRotateInterval = 2000}: CarouselProps){

  const scrollRef = useRef(null)

  useEffect(() => {
    
  }, [prints.length, autoRotateInterval]);

  return (<div
        ref={scrollRef}
        className="items-center  overflow-x-scroll justify-center h-auto scrollbar-none w-full flex flex-row gap-5 lg:p-8 p-5 border border-black rounded-2xl snap-x snap-mandatory"
      >
        {prints.map((product, i) => (
          <Link
            key={product.slug}
            to={`/print/${product.slug}`}
            className="shrink-0 snap-center"
          >
            <img
            draggable = {false}
              className={`rounded-xl absolute   w-50 lg:w-100 shadow-lg`}
              src={product.image}
              alt={product.slug}
            />
          </Link>
        ))}
      </div>)
}

export function GalleryCarousel({images}: CarouselProps){

  const [activeIndex, setActiveIndex] = useState(0)

  return (
  
  <div className=''>
  

    <div className='flex flex-row w-auto'> 
      
      <ChevronLeft size = {20 } className=''/>

      <img  draggable = {false} className = " rounded-xl   w-full lg:w-200 shadow-lg"src = {`${images[activeIndex]}`}></img>
     
     <ChevronRight/>
     
      </div>
     {images.length > 1 &&
    <div className=' flex flex-row w-full gap-3 lg:gap-5 bg-black/2 border border-black/10 rounded-2xl mt-5 items-center  lg:p-3 p-2 '>{images.map((image ,e)=> (

        <div  draggable = {false} style = {{backgroundImage: `url(${image})`}}key = {e} className = {`${activeIndex == e ? "opacity-100"  : " hover:opacity-80 transition-all opacity-50"} cursor-pointer w-10 h-10 lg:w-20 lg:h-20 bg-cover bg-center rounded-lg`}onClick = {() => setActiveIndex(e)}></div>
    )
       
    )}</div>
    }
   
  </div>)



}