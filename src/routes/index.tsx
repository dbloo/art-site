import { useEffect, useRef } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { StyledButton } from '../components/ui/button'
import { products } from '../siteinfo/products'
import { SlidingCarousel } from '#/components/ui/carousel'
import {ArrowRight} from "lucide-react"

export const Route = createFileRoute('/')({
  component: Home,
  head: () => ({
    meta: [
      { title: 'Dominic Bloomfield | Fine Art Prints and Originals' },
      {
        name: 'description',
        content:
          'Premium archival fine art prints and originals by Dominic Bloomfield. Illustrations, paintings, and graphic design.',
      },
    ],
  }),
})

function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)

  // Respect reduced-motion: show the first frame instead of autoplaying.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) videoRef.current?.pause()
  }, [])

  return (
    <section
      aria-label="Introduction"
      className="relative h-[70svh] min-h-[420px] w-full overflow-hidden bg-black lg:h-[88svh]"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        // poster="/assets/images/hero-poster.jpg"  // add a still frame for instant paint
        aria-hidden="true"
      >
        <source src="/assets/videos/flatground(web).mp4" type="video/mp4" />
      </video>

      {/* Scrim so the name stays legible over any frame */}
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-7xl px-5 pb-8 lg:px-12 lg:pb-14">
        <h1 className="text-balance text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-9xl">
          Dominic
          <br />
          Bloomfield
        </h1>
        <p className="mt-4 max-w-md text-lg font-light text-white/80 lg:text-xl">
          I rlly like making things that my younger self would think is cool.
        </p>
      </div>
    </section>
  )
}

function Home() {
  return (
    <main>
      <Hero />

      <section
        aria-labelledby="prints-heading"
        className="mx-auto w-full max-w-7xl px-5 py-14 lg:px-12 lg:py-24"
      >
        <div className="mb-8 flex flex-col gap-2 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2
              id="prints-heading"
              className="text-4xl font-black tracking-tight lg:text-6xl"
            >
              Shop prints
            </h2>
            <p className="mt-2 text-lg font-light text-black/60 lg:text-xl">
              Premium archival-quality fine art prints.
            </p>
          </div>

          
          <Link
            to="/prints"
            className=" hidden text-lg underline underline-offset-4 decoration-black/30 hover:decoration-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black lg:flex lg:items-center lg:gap-2"
          >
            View all prints
            <ArrowRight></ArrowRight>
          </Link>
        </div>

        <SlidingCarousel prints={products.prints} />

        <div className="mt-8 lg:hidden">
          <StyledButton
            to="/prints"
            className="w-full border border-black bg-white text-black"
          >
            Shop all prints
          </StyledButton>
        </div>
      </section>
    </main>
  )
}