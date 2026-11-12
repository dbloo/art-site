import { Link } from "@tanstack/react-router"
import { EmailCapture } from "./emailCapture"

export function Footer  () {

    return (<>        
<div id= "newsletter" className="w-full rise-in relative mt-30 scroll-mt-30">
    <img onContextMenu={(e) => e.preventDefault()} draggable = {false} className = "h-5 lg:h-full  lg:relative absolute  lg:top-0 -top-3 w-full"src = "/assets/graphics/footer-graphic_2.svg"></img>
    <img onContextMenu={(e) => e.preventDefault()} draggable = {false} className = "h-15 lg:h-20   absolute  lg:top-0 -top-9 w-full"src = "/assets/graphics/graphic2.svg"></img>

    <div className="p-5  w-full  lg:px-60 py-20 text-black h-auto  bg-accent1 ">

        <div className = "w-full grid mb-10 lg:grid-cols-2">

            <div className="lg:w-1/2 w-full">

                    <h1 className="text-2xl lg:text-4xl font-bold mb-10">Dominic Bloomfield Art</h1>

                    <p className="mb-5 ">Enter your email to get notified when I release new work!</p>
                    <EmailCapture/>



                </div>
                <div className=" w-full grid grid-cols-2  lg:flex justify-between lg:pt-0 pt-10 lg:justify-end mb-20  gap-10 lg:flex-row lg:gap-20">

                    <ul className = "flex flex-col gap-3 "><p className="text-2xl  font-bold">CONNECT</p>
                <li className="cursor-pointer "><Link  to="/about">About</Link></li>
                                <li className="cursor-pointer "><Link  to="/contact">Contact</Link></li>

                <div className="flex flex-row w-full gap-2 lg:gap-5 items-center ">
                <li className="cursor-pointer "><a href = "https://www.instagram.com/dom.ozail"><img className = "w-5 invert" src = "/assets/icons/instagram.svg"></img></a></li>
                <li className="cursor-pointer "><a href = "https://www.youtube.com/@dominic.bloomfield"><img className = "w-6 invert" src = "/assets/icons/YT.svg"></img></a></li>
                <li className="cursor-pointer "><a href = "https://www.tiktok.com/@dom.ozail"><img className = "w-5 invert" src = "/assets/icons/tiktok.svg"></img></a></li>
                </div>
                </ul>
                    
                    <ul className = "flex flex-col gap-3 "><p className="text-2xl font-bold ">SHOP</p>
                    <li className="cursor-pointer "><Link  to="/originals">Originals</Link></li>
                <li className="cursor-pointer "><Link to="/prints">Prints</Link></li></ul>

                <ul className = "flex flex-col gap-3 "><p className="text-2xl  font-bold">Portfolio</p>
                <li className="cursor-pointer "><Link  to="/paintings">Paintings</Link></li>
                <li className="cursor-pointer "><Link to="/drawings">Drawings</Link></li>
                <li className="cursor-pointer "><Link  to="/graphicdesign">Graphic Design</Link></li>
                </ul>

                
                
                
                </div>
                </div>

                <hr className="border-black/50 mb-10 "/>


    

        

        <div><p className="text-center mt-10 opacity-50 font-light ">&copy; 2026 Dominic Bloomfield Art. All Rights Reserved.</p></div>


    </div>


  

    </div>
    </>)
}

 