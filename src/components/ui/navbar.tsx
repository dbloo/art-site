
import { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import {ShoppingCart} from 'lucide-react'
import { useCart } from '#/context/CartContext'

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isShopOpen, setIsShopOpen] = useState(false);
    const [isWorksOpen, setIsWorksOpen] = useState(false);

    const {cart, getCartSize} = useCart();

    const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    setIsDesktop(mediaQuery.matches);

    const handler = (e:any) => setIsDesktop(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <div>
    <motion.div 
    initial = {{y:-130}}
    animate = {{y: isOpen ? 0 : -130}}
    
    className = {` z-100 fixed w-full`}>

      <div className={` h-50 ${isShopOpen ? ` transition-all h-70`: `transition-all ${isWorksOpen ? `h-90` : `h-50`}`}  fixed bg-white z-100   w-screen lg:items-center flex flex-row `}>
     
    <nav className=" flex py-8 px-5 lg:px-60 w-full fixed top-30 justify-between items-center  flex-row">
      <motion.div 
      
        initial = {{y:0}}
        animate = {{y: (!isDesktop ? (isShopOpen ? 70 : (isWorksOpen ? 150 : 0)) : 0)}}
      
      
      className='w-full flex flex-row'>
      <Link onClick={()=> {setIsOpen(false); setIsShopOpen(false); setIsWorksOpen(false)}} to="/"><h1>Dominic Bloomfield</h1></Link>
      </motion.div>
      <div className = "flex flex-row gap-8 items-center lg:text-lg text-xl ">
        
      <ul className="z-100 lg:top-0  lg:relative lg:right-0 absolute md:right-80 right-40 -top-27 flex lg:flex-row flex-col items-center justify-between gap-4">
        <motion.li className={`${isShopOpen || isWorksOpen ?  `opacity-30` : `opacity-100` } transition-all duration-150 cursor-pointer`} onClick={()=> {setIsShopOpen(!isShopOpen); setIsWorksOpen(false)}}>Shop</motion.li>
            
            <motion.div 
              initial={{opacity: 0}}
              animate = {{opacity: isShopOpen ? 1 : 0,  y: isShopOpen ? 0 : -10}}
              exit={{opacity: 0, y: -10}}
            
            className = {` ${!isShopOpen ? "hidden":"absolute top-10 "} flex flex-col gap-2 font-medium lg:right-27 text-center`}>
            <li className="cursor-pointer"><Link onClick={()=> {setIsOpen(false); setIsShopOpen(!isShopOpen); setIsWorksOpen(false)}} to="/originals">Originals</Link></li>
            <li className="cursor-pointer"><Link onClick={()=> {setIsOpen(false); setIsShopOpen(!isShopOpen); setIsWorksOpen(false)}} to="/prints">Prints</Link></li>
            </motion.div>

            <motion.div
            
            initial = {{y:0}}
        animate = {{y: (!isDesktop ?(isShopOpen ? 70 :  0) : 0 )}}

            className='lg:flex-row flex-col flex gap-4'
            
            >

        <li className={`${isShopOpen || isWorksOpen ?  `opacity-30` : `opacity-100` }`} onClick={()=> {{ setIsWorksOpen(!isWorksOpen); setIsShopOpen(false)}}}>Works</li>
        <motion.div 
        
        initial={{opacity: 0}}
              animate = {{opacity: isWorksOpen ? 1 : 0,  y: isWorksOpen ? (!isDesktop ? 55: 10 ): 0}}
              exit={{opacity: 0, y: 0}}
            

        className = {`text-center  ${!isWorksOpen ? "  hidden":" lg:w-full w-screen  lg:bg white font-medium absolute lg:left-0 md:-left-87 -left-43 flex flex-col gap-3 top-10 "}`}>
            <li className="cursor-pointer"><Link onClick={()=> {setIsOpen(false); setIsShopOpen(false); setIsWorksOpen(false)}} to="/paintings">Paintings</Link></li>
            <li className="cursor-pointer"><Link onClick={()=> {setIsOpen(false); setIsShopOpen(false); setIsWorksOpen(false)}} to="/drawings">Drawings</Link></li>
            <li className="cursor-pointer"><Link onClick={()=> {setIsOpen(false); setIsShopOpen(false); setIsWorksOpen(false)}} to="/graphicdesign">Graphic Design</Link></li>

            </motion.div>

            <motion.div
             initial = {{y:0}}
        animate = {{y: (!isDesktop ?(isShopOpen ? 0 : (isWorksOpen ? 150 : 0)): 0)}}>
        <li className={`${isShopOpen || isWorksOpen ?  `opacity-30` : `opacity-100` }`}><Link onClick={()=> {setIsOpen(false); setIsShopOpen(false); setIsWorksOpen(false)}} to="/about">About</Link></li>
        </motion.div>
        </motion.div>


      </ul>

      <motion.div

        initial = {{y:0}}
        animate = {{y: !isDesktop ? (isShopOpen ? 70 : isWorksOpen ? 150: 0): 0}}

        className='flex items-center gap-5 flex-row'
      
      >



         <div className = "relative"><Link onClick={()=> {setIsOpen(false); setIsShopOpen(false); setIsWorksOpen(false)}} to = "/cart"><ShoppingCart size={30}></ShoppingCart>{ getCartSize > 0 && <span className='absolute left-5 block rounded-full bg-black text-white size-4 text-xs text-center top-0 outline-3 outline-white '>{getCartSize}</span>}</Link></div>
            <div className="flex z-100 gap-1 flex-col lg:hidden cursor-pointer" onClick={() => {setIsOpen(!isOpen); setIsShopOpen(false); setIsWorksOpen(false)}}>
                <motion.span
                        animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                        transition={{ duration: 0.1 }}
                        className="rounded-2xl bg-black h-1 w-8 block"
                    />
                    <motion.span
                        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                        transition={{ duration: 0.1 }}
                        className="rounded-2xl bg-black h-1 w-8 block"
                    />
                    <motion.span
                        animate={isOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
                        transition={{ duration: 0.1 }}
                        className="justify-end rounded-2xl bg-black h-1 w-8 block"
                    />
                    

              </div>

              </motion.div>
              
              
    </div>

    
    
    </nav>


    </div>



      
    </motion.div>
            <div className={`${isOpen ? "opacity-50 fixed " :"opacity-0 hidden"}   z-10 transition-all w-screen h-screen  bg-black opacity-0 `}></div>

    </div>
  );
}

export default Navbar;