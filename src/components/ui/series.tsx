import {series} from "@/siteinfo/series"
import type { Series } from "#/siteinfo/app.types";
import { Lightbox } from "./lightbox";
import { useState } from "react";




interface SeriesParams  {

    slug: string,
    backgroundColor: string;
    accentColor: string;
    

}


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




export function Series ({slug}: SeriesParams) {
    const seriesData = series.find((s)=> s.slug === slug)

    return (
        <div className={`w-full mask-b-from-90% pb-50  ${seriesData?.background}`}>
        <div className="pt-10 overflow-clip w-screen text-center justify-center items-center relative lg:w-full bg-black h-auto lg:h-screen  ">
              <video className='w-screen 'autoPlay loop muted playsInline src = {seriesData?.banner}></video>
              </div>
    <div className = "lg:px-60 p-5">
        <div className={` items-center justify-center mt-20 ${seriesData?.background} rounded-2xl flex flex-col gap-30`}>
            <p className=" text-2xl lg:text-3xl font-light text-center">{seriesData?.description}</p>
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