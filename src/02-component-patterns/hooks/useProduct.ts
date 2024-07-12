import { useEffect, useState } from "react";
import { onChangeArgs, Product } from "../interfaces/interfaces";

interface useProductArgs {
    product: Product,
    onChange?: ( args: onChangeArgs ) => void,
    value?: number
}

export const useProduct = ( { onChange, product, value = 0 }:useProductArgs ) => {
    const [counter, setcounter] = useState(value);
    const increaseBy = (value: number) => {
        const newValue = Math.max(counter + value, 0);
        setcounter(newValue);
        onChange && onChange({ count: newValue, product });
    }

    useEffect(() => {
      setcounter(value);
    }, [value])
    

    return {
        counter,
        increaseBy
    }
}