// components/PrintsCarousel.tsx
import { useEffect, useRef, useState } from 'react'
import { Link } from '@tanstack/react-router'

interface Print {
  slug: string
  image: string
  [key: string]: any
}

interface PrintsCarouselProps {
  prints: Print[]
  autoScrollInterval?: number // ms between slides
  autoRotateInterval?: number
}

export function SlidingCarousel({ prints, autoScrollInterval = 2000 }: PrintsCarouselProps) {
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
              className="rounded-xl w-50 lg:w-100 shadow-lg"
              src={product.image}
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

export function RotatingCarousel({prints, autoRotateInterval = 2000}: PrintsCarouselProps){

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
              className={`rounded-xl absolute   w-50 lg:w-100 shadow-lg`}
              src={product.image}
              alt={product.slug}
            />
          </Link>
        ))}
      </div>)
}