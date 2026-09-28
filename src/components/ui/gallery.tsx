import {products} from '@/siteinfo/products'
import { Link } from '@tanstack/react-router'

export interface Painting {
    id: number;
    name: string;
    slug: string;
    medium: string;
    size: string;
    images: string[];
    description: string;
    year: string;
    thumbnail: string;
}

interface GalleryProps {
    paintings: Painting[];
    }
 
export const Gallery = ({paintings} : GalleryProps)  =>{

    
    return(

        <div className = "pt-10 rise-in lg:columns-5 colums-1 gap-5 w-full h-auto">
            
        
        {paintings.map((painting, i) => {
                return(
                    <div className='lg:hover:-translate-y-2 lg:hover:brightness-80 duration-300 ease-in-out'>
                    <Link to = {`/painting/${painting.slug}`}>
                
                <div className = " pb-5  w-full " >
                
                <img draggable = {false} className = "rounded-lg shadow-lg" src = {painting.thumbnail}></img>
                
                </div>
                </Link>
                </div>)
        })}

        
        </div>
    )
}