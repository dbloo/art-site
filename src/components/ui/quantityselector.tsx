import { Button } from './button'

interface Props {
    disabled?: boolean,
    quantity: number,
    setQuantity: (value: number) => void
    setPrice?: (value: number) => void
    className?: string
}

export function QuantitySelector({disabled, quantity, setQuantity, setPrice, className}: Props) {
    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }; 

    return (
        <div className="flex items-center gap-2">
            <Button disabled = {disabled} onClick = {handleDecrement} color = "white" className = {` ${className}  bg-white border border-black text-black cursor-pointer `}> - </Button>
            <span className={`${disabled == true ? "opacity-50" : ""}tabular-nums`}>{quantity}</span>
            <Button disabled = {disabled} onClick = {handleIncrement} color = "white" className = {` ${className} bg-white border border-black text-black cursor-pointer `}> +</Button>
        </div>
    );
}

