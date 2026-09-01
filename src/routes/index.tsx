import { createFileRoute } from '@tanstack/react-router'
import {StyledButton} from '../components/ui/button'
import {products} from '../siteinfo/products'
import {Link} from '@tanstack/react-router'
import { RotatingCarousel, SlidingCarousel  } from '#/components/ui/carousel'



export const Route = createFileRoute('/')({ component: Home })




function Home() {
  return (
    <main className="">
      <section><div className="overflow-clip w-screen  lg:w-auto bg-black h-auto lg:h-120 ">
              <video className='w-screen 'autoPlay loop muted playsInline src = "./assets/videos/flatground.mp4"></video>
              </div></section>
     <section className="w-screen lg:px-60 p-5  gap-4">
      <div className = "mt-10">


    <div className="mt-10 text-2xl lg:text-4xl font-light">
      <h1 className='lg:text-8xl text-4xl font-bold'>Shop Prints</h1>
      <p className="mb-10 text-xl font-light opacity-50 mt-3">
    Premium archival fine art prints
  </p>

  <SlidingCarousel prints={products.prints} />

  <div className="mt-5 flex flex-col">
      <StyledButton to ="/prints" className="bg-white border border-black text-black">
        Shop all prints
      </StyledButton>
  </div>
</div>

      {/* <div className="mt-20 w-full relative  text-2xl lg:text-4xl font-light">
      <h1 className=' right-0 flex flex-row-reverse text-4xl font-bold'>Past works</h1>
      <p className="mb-10 text-xl text-right font-light opacity-50 mt-3">
    Illustrations, Paintings, Graphic Design, and more projects.
  </p>
      <div className='w-full h-40 border border-black rounded-2xl'></div>
      </div> */}
      </div>

      </section>
    </main>
  )
}
