import styles from '../styles/styles.module.css';
import { useProduct } from '../hooks/useProduct';
import { createContext, ReactElement } from 'react';
import { Product, ProductContextProps } from '../interfaces/interfaces';

export const ProductContext = createContext({} as ProductContextProps)
const { Provider } = ProductContext;

export interface Props {
  product: Product,
  children?: ReactElement | ReactElement[],
  className?: string
}

export const ProductCard = ({ children, product, className }: Props) => {
    const { counter, increaseBy  } = useProduct();
    
  return (
    <Provider value={{
        counter, 
        increaseBy, 
        product
    }}>
        <div className={ `${ styles.productCard } ${ className }` }>
            {children}
        </div>
    </Provider>
  )
}
