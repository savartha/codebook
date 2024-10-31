import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Rating } from '../components/Elements/Rating';
import { useTitle } from '../hooks/useTitle';
import { useCartContext } from '../context';
import { getProduct } from '../services';

export const ProductDetails = () => {
    const [product,setProduct] = useState({});
    const [isInList,setIsInList] = useState(false);
    const {cartList,addToCart,removeFromCart} = useCartContext();
    const {id} = useParams();
    useTitle(product.name)

    useEffect(()=>{
        const productInList = cartList.find((p)=> p.id === product.id);
        if(productInList){
            setIsInList(true);
        }else{
            setIsInList(false);
        }
    },[cartList,product.id])

    function handleAdd(product){
        addToCart(product)
    }

    function handleRemove(product){
        removeFromCart(product)
    }

    useEffect(()=>{
        async function fetchProductDetails(){
            const data = await getProduct(id)
            setProduct(data)
            
        }
        fetchProductDetails();
    },[id])
  return (
    <main>
        <section>
          <h1 className="mt-10 mb-5 text-4xl text-center font-bold text-gray-900 dark:text-slate-200">{product.name}</h1>
          <p className="mb-5 text-lg text-center text-gray-900 dark:text-slate-200">{product.overview}</p>
          <div className="flex flex-wrap justify-around">
            <div className="max-w-xl my-3">
              <img className="rounded" src={product.poster} alt={product.name} />
            </div>
            <div className="max-w-xl my-3">
              <p className="text-3xl font-bold text-gray-900 dark:text-slate-200">
                <span className="mr-1">$</span>
                <span className="">{product.price}</span>
              </p>
              <p className="my-3"> 
                <span>
                  <Rating rating={product.rating} />
                </span>
              </p>
              <p className="my-4 select-none">
                { product.best_seller && <span className="font-semibold text-amber-500 border bg-amber-50 rounded-lg px-3 py-1 mr-2">BEST SELLER</span> }
                { product.in_stock && <span className="font-semibold text-emerald-600	border bg-slate-100 rounded-lg px-3 py-1 mr-2">INSTOCK</span> }
                { !product.in_stock && <span className="font-semibold text-rose-700 border bg-slate-100 rounded-lg px-3 py-1 mr-2">OUT OF STOCK</span> }
                <span className="font-semibold text-blue-500 border bg-slate-100 rounded-lg px-3 py-1 mr-2">{product.size} MB</span>
              </p>
              <p className="my-3">
                { !isInList && <button onClick={()=>handleAdd(product)} className={`inline-flex items-center py-2 px-5 text-lg font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 ${product.in_stock ? "": "cursor-not-allowed"}`} disabled={ product.in_stock ? "" : "disabled" }>Add To Cart <i className="ml-1 bi bi-plus-lg"></i></button> }
                {isInList && <button onClick={()=>handleRemove(product)}  className={`inline-flex items-center py-2 px-5 text-lg font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 ${product.in_stock ? "": "cursor-not-allowed"}`}  disabled={ product.in_stock ? "" : "disabled" }>Remove Item <i className="ml-1 bi bi-trash3"></i></button> }
              </p>
              <p className="text-lg text-gray-900 dark:text-slate-200">
                {product.long_description}
              </p>
            </div>
          </div>
        </section>
      </main> 
  )
}
