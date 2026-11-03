import { createFileRoute } from '@tanstack/react-router'
import {series} from "@/siteinfo/series"
import type { Series } from "#/siteinfo/app.types";
import { Lightbox } from "@/components/ui/lightbox";
import { useState } from "react";



export const Route = createFileRoute('/series/lightshowtemp')({
  component: RouteComponent,
})

interface CardProps {

    title: string,
    image: string,
    description: string,
    seriesData: Series
    direction: string
    background: string;
    className: string;


}

const Card = ({title, className, image, background, description, seriesData, direction}:CardProps) => {

    const [isOpen, setIsOpen] = useState(false)

    return(

    <div className={`flex ${className} ${background} flex-col gap-10`}>
        <h1 className={`${seriesData.accent} text-4xl lg:text-6xl font-black ${direction == "left" ? "text-left": "text-right"}`}>{title}</h1>
        <div className={`flex flex-col  ${direction == "left" ? "lg:flex-row": "lg:flex-row-reverse"} gap-10 text-wrap`}>
        <img onClick = {()=>setIsOpen(true)}className = "rounded-lg shadow-lg w-full lg:w-120"src ={image}></img>
        
        <p className = "text-xl font-light">{description}</p>
        </div>
        </div>
        )

}

const HorizontalSpread = ({seriesData}: {seriesData : Series}) => {

    return (
        <div className = "flex  w-screen gap-20 scrollbar-noneoverflow-x-scroll flex-row">
        {seriesData.supportingImages.map(((p)=>{return(<>

            
                <img className = "w-150 " src = {p}></img>
    
    </>)}))}
    
</div>

)
}

function RouteComponent() {
    const seriesData = series.find((s)=> s.slug === "lightshow")
    
  return (
        <div className={` w-full relative mask-b-from-90% pb-50  ${seriesData?.background}`}>
        <div className="pt-10 overflow-clip w-screen text-center justify-center items-center relative lg:w-full bg-black h-auto lg:h-screen  ">
              <video className='w-screen 'autoPlay loop muted playsInline src = {seriesData?.banner}></video>
              </div>
                    <div className="absolute inset-x-0 lg:top-250 h-500 lg:h-200 z-0 overflow-hidden">
                    <img className="absolute top-0 left-0 w-600 h-full" src="/assets/graphics/lsbg1.webp" />

                {/* top fade */}
                <div className="pointer-events-none absolute inset-x-0 top-0 lg:top-0 h-72 z-10 bg-linear-to-b from-black via-black/50 to-transparent" />

                {/* bottom fade */}
                <div className="pointer-events-none absolute inset-x-0 bottom-220 lg:bottom-40 h-72 z-10 bg-linear-to-t from-black via-black/50 to-transparent" />
</div>

    <div className = "lg:px-60 p-5">
        <div className={` relative items-center justify-center mt-20 rounded-2xl flex flex-col gap-20`}>
            <div className={`rounded-2xl font-serif text-lightshow-bg bg-radial from-lightshow-accent to-black  border border-lightshow-bg/50  p-8`}>
                 <p className="  text-xl z-10 lg:text-3xl font-light text-center">{seriesData?.description}</p>
            </div>
            
            <hr className="border-lightshow-accent lg:mx-50"/>
            <Card 
            title = "The Circus"
            image = {seriesData?.images[5]}
            seriesData={seriesData}
            background = {seriesData?.background2}
            direction = "left"
            className = "w-screen p-5 lg:p-60 text-white"
            description = "Historically, circuses have always served as a pseudo-safe-haven for communities that live on the fringes of society. Typically neurodivergent people, transgender people, and people with deformities were desired extensively by the industry, and were oftentimes marketed in ways that exaggerated or sometimes fabricated their quirks. To many, the fame and starlight, coupled with what seemed like a meaningful place in society felt intuitive, but eventually became rotten, as many realized that they were being exploited and commodified. The freakshow is the epitome of this experience, where managers mainly targeted disabled children and people of color in an effort to dehumanize them for spectacle, and often facilitating a great deal of neglect and abuse."

            
            />

            <Card 
            title = "Pressure Makes Diamonds"
            image = {seriesData?.images[0]}
            seriesData={seriesData}
            direction = "right"
            description = "Lightshow takes place on the night of June 19th, 1798, where the Circus' headliner, 26 year old Bartholomew Braitworth, dubbed Mr. Crystal, is set to perform his world renowned routine. Born with diamond teeth, he is a global anomaly, and the world's most famous clown. Despite the glory, Braitworth's life is far from shiny. Disillusioned with the humiliation, the neglect, and the abuse, Braitworth is incredibly reluctant to perform again, and has developed a great deal of animosity towards his captors. "

            
            />

            <HorizontalSpread
                seriesData={seriesData}
            />
            
        </div>
        
        

        </div>
        </div>
        
    )
}
