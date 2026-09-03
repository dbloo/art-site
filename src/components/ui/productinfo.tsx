import { products } from '../../siteinfo/products'
import { useState, useEffect } from 'react'
import {getStock} from "@/serverFunctions/stock"
import { StyledButton, Button} from './button'
import {QuantitySelector} from "./quantityselector"
import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectValue, SelectTrigger} from './select'
import {Spinner} from './spinner'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link, useNavigate } from '@tanstack/react-router'
import { useCart } from '#/context/CartContext'
import {GalleryCarousel} from './carousel'

export function ProductInfoPrints ({slug} : {slug: string}) {

    const [quantity, setQuantity] = useState(1);

    const {addToCart, setStatus, isLoading, status, isItemInCart} = useCart();

    useEffect(() => {
        setStatus('');
    }, [slug]);


    const [product, setProduct] = useState(products.prints.find((product) => product.slug === slug));
    const productID = product?.id

    const navigate = useNavigate();
 

 
    const [price, setPrice] = useState(product?.prints[0].price);
    const[selectedSize, setSelectedSize] = useState({size:product?.prints[0].sizes, price: product?.prints[0].price});
    const [loading, setLoading] = useState(false);
    const nextProduct = "overcrook"

    const handleSizeChange = (size: string) => {
        setSelectedSize({size: size, price: product?.prints.find((print) => print.sizes === size)?.price});
        setPrice(product?.prints.find((print) => print.sizes === size)?.price);
    }

    function getTitleClass(title: string) {
        const len = title.length;
        if (len <= 8) return "text-5xl";
        if (len <= 14) return "text-4xl";
        if (len <= 20) return "text-xl";
        return "text-xl";
}


    const handleAddToCart = async () => {
        setStatus('');

        const item = {

            id: product ? product.id : 0,
                name: product ? product.name : " ",
                selectedSize: selectedSize.size,
                price: price ? price : 0,
                image: product ? product.images[0] : "",
                quantity: quantity,
                productType: "print",
                slug: product ? product.slug : "",
        }

        addToCart(item);
        setTimeout(()=> {setStatus("")},7000)
                        
       
    }

    return (
        <div className='rise-in lg:w-screen w-full mb-30 h-full lg:h-auto justify-center flex items-center transition-all ease-in-out duration-75'>


        <div className="justify-center w-full lg:pt-30 pt-25 h-auto  relative  flex flex-col  gap-5 lg:px-60  p-5 ">
            <Link className = "w-25"to = {`/prints`}><Button className = " cursor-pointer hover:bg-black/10 justify-baseline items-center w-25 -z-10  bg-white text-black border border-black"><ChevronLeft></ChevronLeft>Back </Button></Link>

        <div className='   w-full gap-5 h-auto lg:h-5/6 flex flex-col lg:flex-row lg:p-8 p-5 border z-1000 bg-white  border-black rounded-2xl'>


                <GalleryCarousel images = {product ? product?.images : []}></GalleryCarousel>
      
            <div className = "lg:ml-10 flex flex-col gap-5 text-left">
                <h1 className='text-4xl text-center lg:text-6xl  lg:text-left font-bold mt-5'>{product?.name}</h1>
                <p className='opacity-60 font-light'>Printed onto acid-free archival paper via a high-resolution digital ink-jet that offers unrivaled UV resistance and color depth.</p>
                

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
                                        {print.sizes}
                    
                                        
                                        
                                    </SelectItem>
                                ))}
                                </SelectGroup>
                        </SelectContent>
                    </Select>
                <QuantitySelector disabled = {isLoading} setQuantity ={setQuantity} setPrice = {setPrice} quantity={quantity}/>
                </div>
                <p className='lg:text-6xl text-4xl  lg:font-light mt-10 mb-10 text-center'>${price ? price * quantity : 0}</p>

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
    const [price, setPrice] = useState(product?.price);
    const[selectedSize, setSelectedSize] = useState({size:product?.size, price: product?.price});
    const [stock, setStock] = useState(0);


       const [stockMap, setStockMap] = useState<Record<number, boolean>>({});

       async function fetchStock() {
            try {
                const stock = await getStock({ data: product.id });
                setStock(stock !== null ? stock : 0);
            } catch (e) {
                console.error('Failed to fetch stock', e);
                setStock(0); 
            }
                }
    
      useEffect(() => {
        fetchStock();
        
      }, []);

      const {addToCart, setStatus, isLoading, status, isItemInCart} = useCart();

      const isInCart = isItemInCart(product.id ? product.id : 0, "original") ? true : false;


      function getTitleClass(title: string) {
        const len = title.length;
        if (len <= 8) return "text-5xl";
        if (len <= 14) return "text-4xl";
        if (len <= 20) return "text-xl";
        return "text-xl";
}

    const handleAddToCart = async () => {
            
                
                try{

                fetchStock();
                } catch (e){
                    setStatus("Sorry, something went wrong checking the stock of this item.")
                }

        setStatus('');

        const item = {

            id: product ? product.id : 0,
                name: product ? product.name : " ",
                selectedSize: selectedSize.size,
                price: price ? price : 0,
                image: product ? product.images[0] : "",
                quantity: quantity,
                productType: "original",
                slug: product ? product.slug : "",
        }

      


    



        if(stock === 0 || stock === null){

            setStatus("Sorry, this item is no longer available")

        }else {
            addToCart(item);
            setTimeout(()=> {setStatus("")},7000)

        }
                        
       
    
                        
       
    }

     return (
        <div className='rise-in mb-30 lg:w-screen w-full h-full lg:h-auto justify-center flex items-center transition-all ease-in-out duration-75'>

        <div className="justify-center w-full lg:pt-30 pt-25 h-auto  relative  flex flex-col  gap-5 lg:px-60  p-5 ">
            <Link className = "w-25"to = {`/originals`}><Button className = " cursor-pointer hover:bg-black/10 justify-baseline items-center w-25 -z-10  bg-white text-black border border-black"><ChevronLeft></ChevronLeft>Back </Button></Link>

        <div className='   w-full gap-5 h-auto lg:h-5/6 flex flex-col lg:flex-row lg:p-8 p-5 border z-1000 bg-white  border-black rounded-2xl'>


                <GalleryCarousel images = {product ? product?.images : []}></GalleryCarousel>
      
            <div className = "lg:ml-10 flex flex-col gap-5 text-left w-full">
                <h1 className={`text-4xl text-center lg:text-6xl  lg:text-left font-bold mt-5 w-full break-all ${getTitleClass(product.name)} `}>{product?.name}</h1>
                <p className='opacity-60 font-light w-full lg:w-150'>[{product?.year} |  {product?.size} | {product?.medium}] </p>
                

            <hr className=' w-full border-black/30 mb-5'/>
 
                <p className='lg:text-6xl text-4xl  lg:font-light mt-10 mb-10 text-center'>${price ? (price * quantity).toLocaleString() : 0}</p>

                <div className=' relative w-full flex flex-col'>
                <StyledButton disabled = {isLoading || stock == 0 || isInCart} onClick = {isLoading || stock != 0  && !isInCart ? handleAddToCart : () =>{}} color = " bg-white" className = {`${isLoading || stock == 0 || isInCart ? "cursor-not-allowed" : "cursor-pointer"} border-black border w-full `}>{stock == 0 ? "Sorry, this item has already been sold." : isLoading ? "Adding to your cart..." : isInCart ? "This item is in your cart." : "Add to your cart"}</StyledButton>
                {isLoading && <Spinner color="black" className = "z-10  top-2 right-5 absolute "></Spinner>}
                </div>
                 <p className={`${status ? "rise-in opacity-100": "translate-3 opacity-0"}  opacity-0 text-center mt-5 duration-100 transition-all`}>{status}</p>
                
            </div>
        </div>
        
        </div>
        </div>
    )
}

