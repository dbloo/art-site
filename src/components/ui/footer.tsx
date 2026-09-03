import { Link } from "@tanstack/react-router"

export function Footer  () {

    return (<>        
<div className="w-full sticky top-[100vh] mt-30 ">
    <img onContextMenu={(e) => e.preventDefault()} draggable = {false} className = "h-5 lg:h-full lg:relative absolute  lg:top-0 -top-3 w-full"src = "/assets/graphics/footer-graphic_2.svg"></img>
    <img onContextMenu={(e) => e.preventDefault()} draggable = {false} className = "h-15 lg:h-20  absolute  lg:top-0 -top-9 w-full"src = "/assets/graphics/graphic2.svg"></img>

    <div className="p-5  w-full  lg:px-60 py-20 text-black h-auto  bg-accent1 ">

        <div className = "w-full grid lg:grid-cols-2">

            <div className="lg:w-1/2 w-full">
                    <h1 className="text-2xl lg:text-4xl font-bold mb-5">Dominic Bloomfield Art</h1>


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


    

        <div><h1 className="text-center lg: text-leftlg:mt-20 lg:text-lg opacity-60">The artist, (Dominic Bloomfield and All Associated Works), rights are protected by the Federal Copyright Act of 1976 and the Federal Visual Rights Act of 1990. Purchase of a copyrighted artwork does not transfer the copyright. The copyright to produce the works in copies, to produce derivative work based on the copyrighted image, and distribute copies is retained by the Visual Artist. Any transfer of this copyright must be in writing expressly identifying what rights are being sold and for what purpose. ​ Works of art cannot be modified without the permission of the artist. Works cannot be distributed, mutilated, or modified in any way that would prejudice the reputation of the Artist.</h1></div>

        <div><p className="text-center mt-10 opacity-50">&copy; 2026 Dominic Bloomfield Art</p></div>


    </div>


  

    </div>
    </>)
}

 