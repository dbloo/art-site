import { X } from 'lucide-react'

interface Props{
    image: string,
    isOpen: boolean,
    setIsOpen: () => {}
}

export function Lightbox ({image}:Props){


    return (<div className = "w-full h-full">
        
        <div className='bg-black opacity-50 fixed -z-10'></div>
        <X></X>
        <img src = {image}></img>

    
    </div>)

}

