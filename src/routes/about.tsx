import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: RouteComponent,
})



function RouteComponent() {

  const about = {
    description: "Dominic Bloomfield is an Afro-Caribbean multidisciplinary artist from Mandeville, Jamaica that specializes in acrylic canvas paintings, illustrations, and graphic design. His work offers vibrant colors and warped anatomy and perspective against liminal and abstract backgrounds, which communicates a sense of playfulness, with a grace of unease, that leaves the viewer filling in the pieces with their own experiences."
  }
  return (<div className='pt-30 w-full flex flex-col justify-center items-center h-auto p-5 lg:p-60'>
    <div className=''>
      <h1 className='text-4xl lg:text-6xl mb-5'>About</h1>
      <hr className='mb-10 '/>
    <p className='text-xl'>
      {about.description}
      
      </p>
      
      </div>
      
      </div>
      )
}
