import { useEffect, useRef, useState } from "react";
import { InitialValues, onChangeArgs, Product } from "../interfaces/interfaces";

interface useProductArgs {
    product: Product,
    onChange?: ( args: onChangeArgs ) => void,
    value?: number,
    initialValues?: InitialValues
}

export const useProduct = ( { onChange, product, value = 0, initialValues }:useProductArgs ) => {
    const [counter, setcounter] = useState<number>(initialValues?.count || value);
    const isMounted = useRef(false);
    const increaseBy = (value: number) => {
        const newValue = initialValues?.maxCount ? Math.min(Math.max(counter + value, 0), initialValues.maxCount) : Math.max(counter + value, 0);
        setcounter(newValue);
        onChange && onChange({ count: newValue, product });
    }

    const reset = () => {
        setcounter(initialValues?.count || value);
    }

    useEffect(() => {
        if (!isMounted.current) return;
      setcounter(value);
    }, [value])
    
    useEffect(() => {
      isMounted.current = true;
    }, [])
    

    return {
        counter,
        isMaxCountReached: !!initialValues?.count && initialValues.maxCount == counter,
        maxCount: initialValues?.maxCount,
        increaseBy,
        reset
    }
}