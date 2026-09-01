import { createContext, useState, useContext, useEffect  } from "react";
import {Spinner} from "@/components/ui/spinner"



interface CartProviderProps {
  children: React.ReactNode;
}

export interface CartItem {
  id: number;
  name: string;
  selectedSize?: string;
  productType: string;
  price: number;
  quantity: number;
  [key: string]: any;
  slug: string;
}

interface CartContextType {
  cart: CartItem[];
  subtotal: number;
  addToCart: (item: CartItem) => Promise<void>;
  removeFromCart: (
    productId: string,
    size: string,
    productType: string,
    forceRemove?: boolean
  ) => Promise<void>;
  clearCart: () => void;
  isItemInCart: (productId: string, productType: string) => CartItem | undefined;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  setStatus: (status: string) => void;
  getCartSize: number,
  status: string,
}


const defaultCartValue: CartContextType = {
  cart: [],
  subtotal: 0,
  addToCart: async () => {},
  removeFromCart: async () => {},
  clearCart: () => {},
  isItemInCart: () => undefined,
  isLoading: false,
  setIsLoading: ()=>{},
  getCartSize: 0,
  status: "",
  setStatus: ()=> {},
};
const CartContext = createContext(defaultCartValue);


export function CartProvider({children} : CartProviderProps) {


  const [added, setAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("");


  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(cart)
  }, [cart]);

  const addToCart = async (item:CartItem) => {
    setIsLoading(true);
    try{

    await new Promise(resolve => setTimeout(resolve, 800));   


    setCart((prevCart:any) => {


      
      const existingItem = prevCart.find(
        (cartItem:CartItem) => cartItem.id === item.id && cartItem.selectedSize === item.selectedSize && item.productType == cartItem.productType
      );
  
      if (existingItem) {
        return prevCart.map((cartItem:CartItem) =>
          cartItem.id === item.id && cartItem.selectedSize === item.selectedSize && cartItem.productType == item.productType
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, item];
      }

      

    });

    

  }catch (e){
    console.log(e)
      setStatus("Sorry, we couldn't add this item to your cart, please try again later");
      
  }
  setIsLoading(false);
    console.log("success")

    setStatus("Item successfully added to your cart!");



  };

  


  const isItemInCart = (productId:string, productType:any) => {
    console.log(productId, productType)

    return cart.find((item:any)=> 
      item.id === productId && 
      item.productType === productType &&
      (productType !== "print" )
      
    );
    
  };

  const removeFromCart = async (productId:any, size:any, productType:any, forceRemove = false) => {
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 800));
    setCart((prevCart:any) => {
      // Filter out the item completely if forceRemove is true
      if (forceRemove) {
        return prevCart.filter((item:any) => 
          !(item.id === productId && 
            item.selectedSize === size && 
            item.productType === productType)
        );
      }
      
      // Otherwise decrease quantity
      return prevCart.map((item:any)=> {
        if (item.id === productId && 
            item.selectedSize === size && 
            item.productType === productType) {
          return {
            ...item,
            quantity: item.quantity > 1 ? item.quantity - 1 : 1
          };
        }
        return item;
      });
    });
    setIsLoading(false);

  };
  const subtotal = cart.reduce(
    (sum:any, item:any) => sum + item.price * item.quantity,
    0
  );

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart'); // or sessionStorage, whichever you use
  };

  const getCartSize = cart.reduce(
    (sum:number, item:CartItem) => sum + item.quantity, 0
  );

 
  return (
    <CartContext.Provider value={{ getCartSize, cart, status, addToCart, removeFromCart, subtotal, isItemInCart, isLoading, setStatus, setIsLoading, clearCart}}>
      {isLoading && <Spinner />}
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}