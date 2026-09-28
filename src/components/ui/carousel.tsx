import { useEffect, useRef, useState } from 'react'
import { Link } from '@tanstack/react-router' 
import {ChevronLeft, ChevronRight, X} from 'lucide-react'
import { createPortal } from 'react-dom'


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

export function GalleryCarousel({ images }: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <div className=''>
      {mounted && isOpen && createPortal(
        <div
          className='w-screen h-screen fixed z-9999 left-0 top-0'
          onClick={() => setIsOpen(false)}
        >
          <div className=' bg-black w-screen h-screen absolute opacity-40 top-0 -z-10' />
          <div className=' flex fixed justify-center items-center  w-full h-full'>
            <div className='relative'>
            <div className='w-10 z-100 rise-in cursor-pointer hover:brightness-110 transition all h-10 shadow-lg rounded-full m-2 absolute right-0 justify-center items-center flex bg-white/50 backdrop-blur-2xl '><X></X></div>
            <img
              draggable={false}
              className='rise-in rounded-xl w-full lg:w-180  shadow-lg'
              src={images[activeIndex]}
              onClick={(e) => e.stopPropagation()}
            />
            </div>
          </div>
        </div>,
        document.body
      )}

      <div className='flex flex-row w-auto'>
        <img
          onClick={() => setIsOpen(true)}
          draggable={false}
          className='cursor-pointer hover:-translate-y-0.5 transition-all rounded-xl w-full lg:w-200 shadow-lg'
          src={images[activeIndex]}
        />
      </div>

      {images.length > 1 && (
        <div className='flex flex-row w-full gap-3 lg:gap-5 bg-black/2 border border-black/10 rounded-2xl mt-5 items-center lg:p-3 p-2'>
          {images.map((image, e) => (
            <div
              draggable={false}
              style={{ backgroundImage: `url(${image})` }}
              key={e}
              className={`${activeIndex === e ? 'opacity-100' : 'hover:opacity-80 transition-all opacity-50'} cursor-pointer w-10 h-10 lg:w-20 lg:h-20 bg-cover bg-center rounded-lg`}
              onClick={() => setActiveIndex(e)}
            />
          ))}
        </div>
      )}
    </div>
  )
}