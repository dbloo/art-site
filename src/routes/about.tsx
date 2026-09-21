import { createFileRoute } from '@tanstack/react-router'
import { ShowerHead } from 'lucide-react'

export const Route = createFileRoute('/about')({
  component: RouteComponent,
})



function RouteComponent() {

  const about = {
    description: "Dominic Bloomfield is an Afro-Caribbean multidisciplinary artist from Mandeville, Jamaica that specializes in acrylic canvas paintings, illustrations, and graphic design. His work offers vibrant colors and warped anatomy and perspective against liminal and abstract backgrounds, which communicates a sense of playfulness, with a grace of unease, that leaves the viewer filling in the pieces with their own experiences."
  }

  const awards =  {

      twentyFour: 
      
      [

      {
      year: "2024",
      title: "Creative Futures Collective Soho House Fellowship, Soho House",
      location: "Miami, FL"
      },
      ]
    

  }

  const bibliography =  {

    twentyFive: 
      
      [

      {
      title: "Selected Works",
      publication: "Elated Magazine"
      },


      
      ],

      twentyTwo: 
      
      [

      {
      title: "Meet Dominic Bloomfield",
      publication: "Canvas Rebel"
      },


      
      ],

      twentyOne: 
      
      [

      {
      title: "A Hushed Explosion",
      publication: "2020 Vision Digital"
      },

      {
      title: "Kasinator Visuals, With Space Between Us: An Anthology of Art During the COVID-19 Lockdown",
      publication: "Blurb"
      }


      
      ],

      twentyTwenty: 
      
      [

      {
      title: "Meet Dominic Bloomfield",
      publication: "Voyage MIA"
      },


      
      ],
    

  }



  const soloExhibitions =  {

      twentySix: 
      
      [

      {
      year: "2026",
      title: "Outside My Skin",
      venue: "The Cutting Gallery",
      location: "Miramar, FL"
      },
      ]
    

  }

  const groupExhibitions =  {

      twentySix: 
      
      [

      {
      title: "Bazaar Broward",
      venue: "MAD Arts",
      location: "Dania Beach, FL"
      },

      {

      title: "Hot Rod: Car Show and Art Exhibit",
      venue: "The Wisteria",
      location: "Southewest Ranches, FL"
      },

      {

      title: "BIG: Culture & Arts Festival",
      venue: "Downtown Gainesville",
      location: "Gainesville, FL"
      },

      {
   
      title: "Troubled Waters",
      venue: "Downtown Miami",
      location: "Miami, FL"
      },
      ],

      twentyFive: 
      
      [

      {

      title: "Bazaar a La Carte",
      venue: "Riverset Studios",
      location: "Miami, FL"
      },

      {

      title: "Miami Saves America",
      venue: "Dear Eleanor",
      location: "Miami, FL"
      },

      

      ],

      twentyFour: 
      
      [

      {

      title: "Miami Underground Showcase Feat. Atomik" ,
      venue: "2300 NW 7th Ave",
      location: "Miami, FL"
      },

      

      ],

      twentyTwo: 
      
      [

      {

      title: "Icon 2022" ,
      venue: "Boomer Gallery",
      location: "London, United Kingdom"
      },

      

      ],
    

  }
  
  return (<div className='rise-in pt-30 w-full flex flex-col justify-center items-center h-auto p-5 lg:p-60'>
    <div className=' '>
      <h1 className='text-5xl font-black lg:text-6xl mb-5'>About</h1>
      <hr className='mb-10 '/>
      <div className = "flex flex-col lg:flex-row gap-15 ">
    <p className='font-light text-xl'>
      {about.description}
      
      </p>


      
      </div>

      <div className='mt-40'>
        


        <h1 className='text-5xl lg:text-6xl mb-5 font-black '>CV</h1>
      <hr className='mb-15 '/>

      <div className='mb-20'>

      <h1 className='mb-15 text-4xl'>Solo Exhibitions</h1>
      <div className='flex flex-row gap-10'>
      <p className='text-2xl'>2026</p>
      <div className='flex gap-5 flex-col font-light justify-center'>
      {soloExhibitions.twentySix.map((i,e) =>{ return(
        
        
         
        <p className=''><span className='font-medium'>{i.title}</span>, {i.venue}, {i.location}</p>
  
        
      )
      
      
      })}
      </div>
      </div>

        </div>

        <div className=''>

      <h1 className='mb-15 text-4xl'>Group Exhibitions</h1>
      <div className='flex flex-row gap-10 mb-15 '>
      <p className='text-2xl'>2026</p>
      <div className='flex gap-5 flex-col font-light justify-center'>
      {groupExhibitions.twentySix.map((i,e) =>{ return(
        
        
         
        <p className='italics'><span className='font-medium'>{i.title}</span>, {i.venue}, {i.location}</p>
  
        
      )
      
      
      })}
      </div>
      </div>

      <div className='flex flex-row gap-10 mb-15'>
      <p className='text-2xl'>2025</p>
      <div className='flex gap-5 flex-col font-light justify-center'>
      {groupExhibitions.twentyFive.map((i,e) =>{ return(
        
        
         
        <p className='italics'><span className='font-medium'>{i.title}</span>, {i.venue}, {i.location}</p>
  
        
      )
      
      
      })}
      </div>
      </div>

      <div className='flex flex-row gap-10 mb-15'>
      <p className='text-2xl'>2024</p>
      <div className='flex gap-5 flex-col font-light justify-center'>
      {groupExhibitions.twentyFour.map((i,e) =>{ return(
        
        
         
        <p className='italics'><span className='font-medium'>{i.title}</span>, {i.venue}, {i.location}</p>
  
        
      )
      
      
      })}
      </div>
      </div>

      <div className='flex flex-row gap-10'>
      <p className='text-2xl'>2022</p>
      <div className='flex gap-5 flex-col font-light justify-center'>
      {groupExhibitions.twentyTwo.map((i,e) =>{ return(
        
        
         
        <p className='italics'><span className='font-medium'>{i.title}</span>, {i.venue}, {i.location}</p>
  
        
      )
      
      
      })}
      </div>

      
      </div>

      <h1 className='mb-15 text-4xl mt-20'>Awards</h1>
      <div className='flex flex-row gap-10'>
      <p className='text-2xl'>2024</p>
      <div className='flex gap-5 flex-col font-light justify-center'>
      {awards.twentyFour.map((i,e) =>{ return(
        
        
         
        <p className='italics'><span className='font-medium'>{i.title}</span>, {i.location}</p>
  
        
      )
      
      
      })}
      </div>
      </div>


      <h1 className='mb-15 text-4xl mt-20'>Bibliography</h1>
      <div className='flex flex-row gap-10'>
      <p className='text-2xl'>2025</p>
      <div className='flex gap-5 flex-col font-light justify-center mb-15'>
      {bibliography.twentyFive.map((i,e) =>{ return(
        
        
         
        <p className='italics'><span className='font-medium'>{i.title}</span>, {i.publication}</p>
  
        
      )
      
      
      })}
      </div>
      </div>

      <div className='flex flex-row gap-10'>
      <p className='text-2xl'>2022</p>
      <div className='flex gap-5 flex-col font-light justify-center mb-15'>
      {bibliography.twentyTwo.map((i,e) =>{ return(
        
        
         
        <p className='italics'><span className='font-medium'>{i.title}</span>, {i.publication}</p>
  
        
      )
      
      
      })}
      </div>
      </div>


      <div className='flex flex-row gap-10'>
      <p className='text-2xl'>2021</p>
      <div className='flex gap-5 flex-col font-light justify-center mb-15'>
      {bibliography.twentyOne.map((i,e) =>{ return(
        
        
         
        <p className='italics'><span className='font-medium'>{i.title}</span>, {i.publication}</p>
  
        
      )
      
      
      })}
      </div>
      </div>


      <div className='flex flex-row gap-10'>
      <p className='text-2xl'>2020</p>
      <div className='flex gap-5 flex-col font-light justify-center'>
      {bibliography.twentyTwenty.map((i,e) =>{ return(
        
        
         
        <p className='italics'><span className='font-medium'>{i.title}</span>, {i.publication}</p>
  
        
      )
      
      
      })}
      </div>
      </div>

        </div>


      </div>
      </div>
      
      </div>
      )
}
