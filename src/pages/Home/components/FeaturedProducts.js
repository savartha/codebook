import React, { useEffect, useState } from 'react'
import { ProductCard } from '../../../components/Elements/ProductCard'
import { getFeaturedProducts } from '../../../services'
import { toast } from 'react-toastify'

export const FeaturedProducts = () => {
    const [products,setProducts] = useState([])
    useEffect(()=>{
        async function fetchProducts(){
            try{

            
            const data= await getFeaturedProducts();
            setProducts(data);
            }catch(err){
                toast.error(err.message,{closeButton:true, closeOnClick:true})
            }
        }
        fetchProducts();
    },[])
  return (
    <section className="my-20">
    <h1 className="text-2xl text-center font-semibold dark:text-slate-100 mb-5 underline underline-offset-8">Featured eBooks</h1>    
    <div className="flex flex-wrap justify-center lg:flex-row">
        {products.map((product) => (
                    <ProductCard key={product.id} product={product}/>
        ))}

    </div>
</section>)
}
