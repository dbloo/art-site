import { createFileRoute } from '@tanstack/react-router'
import {series} from "@/siteinfo/series"
import type { Series } from "#/siteinfo/app.types";
import { Lightbox } from "@/components/ui/lightbox";
import { useState } from "react";
import {items} from '@/siteinfo/gallery'
import { Gallery } from '#/components/ui/gallery';



export const Route = createFileRoute('/series/lightshow')({
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
    const paintings = items.paintings.filter((p)=> p.isSeries == true && p.series == "lightshow")
    
  return (
        <div className={` w-screen h-auto  px-5 lg:px-60 py-30  lg:py-40`}>

            <div className='border border-black rounded-2xl  p-3 lg:p-8 '>
    <h1 className='lg:text-6xl text-5xl  font-black mb-5'>Lightshow</h1>
    <p className='text-lg font-light lg:text-xl opacity-60 mb-5'>Lightshow takes place on the night of June 19th, 1798, where circus headliner 26 year old Bartholomew Braitworth, dubbed Mr. Crystal, is set to perform his world renowned routine. Born with diamond teeth, he is a global anomaly, and the world's most famous clown. Despite the glory, Braitworth's life is far from shiny. Disillusioned with the humiliation, the neglect, and the abuse, Braitworth is incredibly reluctant to perform again, and has developed a great deal of animosity towards his captors. </p>

    <hr/>
            <Gallery paintings = {paintings}></Gallery>

            </div>
       
        </div>
        
    )
}
