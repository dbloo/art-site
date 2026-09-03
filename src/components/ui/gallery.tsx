import {products} from '@/siteinfo/products'

interface GalleryProps {
    images: string[];
    }
 
export const Gallery = ({images} : GalleryProps)  =>{

    
    return(

        <div className = "pt-10 rise-in lg:columns-5 colums-1 gap-5 w-full h-auto">
            
        
        {images.map((image) => {
                return(
                
                <div className = " pb-5  w-full " >
                
                <img draggable = {false} className = "rounded-lg shadow-lg" src = {image}></img>
                
                </div>)
        })}

        
        </div>
    )
}