import { createFileRoute } from '@tanstack/react-router'
import { ConstructionPage } from '#/components/ui/construction'
import {Gallery} from '@/components/ui/gallery'
import {images} from '@/siteinfo/gallery'
import { useEffect } from 'react'

export const Route = createFileRoute('/paintings')({
  component: RouteComponent,
})




function RouteComponent() {

  const imageArray = images.paintings.map((painting, i) => {
  return painting.images[0]
})


  return (<div className='w-screen h-auto p-5 lg:px-60 py-30  lg:py-40'>

    <div className='border border-black rounded-2xl  p-3 lg:p-8 '>
    <h1 className='lg:text-6xl text-4xl  font-black mb-2'>Paintings</h1>
    <p className='text-lg font-light lg:text-xl opacity-60 mb-5'>(almost) Everything I've ever painted.</p>

    <hr/>
    <Gallery images = {imageArray} type = "paintings"/>

</div>
    
    
    </div>)
}
