import { products } from '../../siteinfo/products'
import { useState } from 'react'
import { StyledButton, Button} from './button'
import {QuantitySelector} from "./quantityselector"
import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectValue, SelectTrigger} from './select'
import {Spinner} from './spinner'
import { ChevronLeft } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { useCart } from '#/context/CartContext'

export function ProductInfoPrints ({slug} : {slug: string}) {

    const [quantity, setQuantity] = useState(1);

    const {addToCart, setStatus, isLoading, status} = useCart();


    const product = products.prints.find((product) => product.slug === slug);
    const [price, setPrice] = useState(product?.prints[0].price);
    const[selectedSize, setSelectedSize] = useState({size:product?.prints[0].sizes, price: product?.prints[0].price});
    const [loading, setLoading] = useState(false);

    const handleSizeChange = (size: string) => {
        setSelectedSize({size: size, price: product?.prints.find((print) => print.sizes === size)?.price});
        setPrice(product?.prints.find((print) => print.sizes === size)?.price);
    }

    const handleAddToCart = async () => {
        setStatus('');

        const item = {

            id: product ? product.id : 0,
                name: product ? product.name : " ",
                selectedSize: selectedSize.size,
                price: price ? price : 0,
                image: product ? product.image : "",
                quantity: quantity,
                productType: "fine art print",
                slug: product ? product.slug : "",
        }

        addToCart(item);
        setTimeout(()=> {setStatus("")},7000)
                        
       
    }

    return (
        <div className='rise-in lg:w-screen w-full h-full lg:h-auto justify-center flex items-center transition-all ease-in-out duration-75'>

        <div className="justify-center w-full lg:pt-30 pt-25 h-auto  relative  flex flex-col  gap-5 lg:px-60  p-5 ">
            <Link className = "w-25"to = {`/prints`}><Button className = " cursor-pointer hover:bg-black/10 justify-baseline items-center w-25 -z-10  bg-white text-black border border-black"><ChevronLeft></ChevronLeft>Back </Button></Link>

        <div className='   w-full gap-5 h-auto lg:h-5/6 flex flex-col lg:flex-row lg:p-8 p-5 border z-1000 bg-white  border-black rounded-2xl'>

            <div className = "flex flex-col h gap-5 text-center ">
                <img className = "rounded-xl   w-full lg:w-275 shadow-lg"src={product?.image}></img>
            </div>
            <div className = "lg:ml-10 flex flex-col gap-5 text-left">
                <h1 className='text-4xl text-center lg:text-8xl  lg:text-left font-black mt-5'>"{product?.name}"</h1>
                <p className='opacity-60'>Printed onto acid-free archival paper via a high-resolution digital ink-jet that offers unrivaled UV resistance and color depth.</p>
                

            <hr className=' w-full border-black/30 mb-5'/>
 
                                <div className='flex flex-row gap-5'>
                    <Select onValueChange={handleSizeChange} defaultValue={product?.prints[0].sizes}>
                        <SelectTrigger disabled = {loading} className="w-full py-5 cursor-pointer border-black">
                            <SelectValue placeholder="Select a size"/>
                                                    </SelectTrigger>
                        <SelectContent >
                                <SelectGroup >
                                <SelectLabel>Select a Size</SelectLabel>
                                
                                {product?.prints.map((print) => (
                                    <SelectItem key={print.sizes} value={print.sizes}>
                                        {print.sizes} - ${print.price}
                    
                                        
                                        
                                    </SelectItem>
                                ))}
                                </SelectGroup>
                        </SelectContent>
                    </Select>
                <QuantitySelector disabled = {isLoading} setQuantity ={setQuantity} setPrice = {setPrice} quantity={quantity}/>
                </div>
                <p className='lg:text-6xl text-4xl font-bold lg:font-light mt-10 mb-10 text-center'>${price ? price * quantity : 0}</p>

                <div className=' relative w-full flex flex-col'>
                <StyledButton disabled = {isLoading} onClick = {handleAddToCart} color = " bg-white" className = " border-black border w-full cursor-pointer ">{isLoading ? "Adding to your cart..." : "Add to your cart"}</StyledButton>
                {isLoading && <Spinner color="black" className = "z-10  top-2 right-5 absolute "></Spinner>}
                </div>
                 <p className={`${status ? "rise-in opacity-100": "translate-3 opacity-0"}  opacity-0 text-center mt-5 duration-100 transition-all`}>{status}</p>
                
            </div>
        </div>
        
        </div>
        </div>
    )
}

export function ProductInfoOriginals ({slug} : {slug: string}) {

    const [quantity, setQuantity] = useState(1);
    

    const product = products.paintings.find((product) => product.slug === slug);
    const [price, setPrice] = useState(product?.prints[0].price);
    const[selectedSize, setSelectedSize] = useState({size:product?.prints[0].sizes, price: product?.prints[0].price});
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');

    const handleSizeChange = (size: string) => {
        setSelectedSize({size: size, price: product?.prints.find((print) => print.sizes === size)?.price});
        setPrice(product?.prints.find((print) => print.sizes === size)?.price);
    }

    const handleAddToCart = async () => {


        try{                                           setLoading(true)

            
             setTimeout(() => {

        
                    setStatus('This item has been added to your cart!');
                                setLoading(false);

                    }, 1000);

        }
        
        catch (error) {            
            
            setLoading(false);
            setStatus('Sorry, Something went wrong. Please try again later.');



        }
                        
       
    }

    return (
        <div className="w-screen h-screen lg:p-8 p-5  gap-4">
        <div className='w-full mt-20 gap-5 h-full flex flex-col lg:flex-row lg:p-8 p-5 border border-black rounded-2xl'>
            <div className = "flex flex-col gap-5 text-center ">
                <img className = "rounded-xl  w-180 shadow-lg"src={product?.image}></img>
            </div>
            <div className = "lg:ml-10 flex flex-col gap-5 text-left">
                <h1 className='text-3xl lg:text-4xl text-center lg:text-leftfont-black mt-5'>{product?.name}</h1>
            <p className='text-sm lg:text-xl font-light text-black/40 italic '>[{product?.size} {product?.medium}]</p>
            <hr className=' w-full border-black/50 '/>
                <p className='text-lg lg:text-xl font-light'>Printed on premium Giclee fine art paper.</p>
                                <div className='flex flex-row gap-5'>
                    <Select onValueChange={handleSizeChange} defaultValue={product?.prints[0].sizes}>
                        <SelectTrigger disabled = {loading} className="w-100 py-5 cursor-pointer border-black">
                            <SelectValue placeholder="Select a size"/>
                                                    </SelectTrigger>
                        <SelectContent >
                                <SelectGroup >
                                <SelectLabel>Select a Size</SelectLabel>
                                
                                {product?.prints.map((print) => (
                                    <SelectItem key={print.sizes} value={print.sizes}>
                                        {print.sizes}
                    
                                        
                                        
                                    </SelectItem>
                                ))}
                                </SelectGroup>
                        </SelectContent>
                    </Select>
                <QuantitySelector disabled = {loading} setQuantity ={setQuantity} setPrice = {setPrice} quantity={quantity}/>
                </div>
                <p className='lg:text-4xl text-4xl font-bold lg:font-light mt-10 mb-10 text-center'>${price ? price * quantity : 0}</p>

                <div className=' relative w-full flex flex-col'>
                <StyledButton disabled = {loading} onClick = {handleAddToCart} color = "black" className = " w-full cursor-pointer ">Add to Cart</StyledButton>
                {loading && <Spinner color="black" className = "z-10  top-2 right-5 absolute "></Spinner>}
                </div>
                {status && <p className='text-center mt-5'>{status}</p>}
            </div>
        </div>
        
        </div>
    )
}
