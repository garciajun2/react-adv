import { useState } from 'react';
import { ProductCard, ProductImage, ProductTitle, ProductButtons } from '../components';
import { Product } from '../interfaces/interfaces';
import '../styles/custom-styles.css';

const product = {
    id: '1',
    title: 'Coffee Mug - Card',
    img: './coffee-mug.png'
}

const product2 = {
  id: '2',
  title: 'Coffee Mug - Meme',
  img: './coffee-mug2.png'
}

const products: Product[] = [product, product2];

interface ProductInCart extends Product {
  count: number;
}

export const ShoppingPage = () => {
  const [shoppingCart, setShoppingCart] = useState<{ [key: string]: ProductInCart }>({});
  const onProductCountChange = ({ count, product }: { count: number, product: Product }) => {
    setShoppingCart( oldShoppingCart => {
      if (count === 0) {
        const { [product.id]: toDelete, ...rest } = oldShoppingCart;
        return rest;
      }

      return {
        ...oldShoppingCart,
        [ product.id ]: { ...product, count }
      }
    } )
  }

  return (
    <div>
        <h1>Shopping Store</h1>
        <hr/>
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap'
        }}>

        {
          products.map(product => (
            <ProductCard
              product={ product }
              className="bg-dark text-white"
              key={ product.id }
              onChange={ (e) => onProductCountChange(e) }
              value={shoppingCart[product.id]?.count || 0 }
            >
              <ProductImage className="custom-image" />
              <ProductTitle className="text-bold" />
              <ProductButtons className="custom-buttons" />
            </ProductCard>
          ))
        }
        </div>

        <div className='shopping-cart'>
          {
            Object.entries(shoppingCart).map( ([key, product]) => (
              <ProductCard
                product={ product }
                className="bg-dark text-white"
                style={{ width: '100px' }}
                key={key}
                value={product.count}
                onChange={ (e) => onProductCountChange(e) }
              >
                <ProductImage className="custom-image" />
                <ProductButtons 
                  className="custom-buttons" 
                  style={{
                    display: 'flex',
                    justifyContent: 'center'
                  }}/>
              </ProductCard>
            ))
          }
        </div>
    </div>
  )
}
