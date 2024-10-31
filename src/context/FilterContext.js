import { createContext, useContext, useReducer } from "react"
import { filterReducer } from "../reducers";

const filterInitialState ={
    products: [],
    inStockOnly:false,
    bestSellerOnly:false,
    sortBy:null,
    rating:null
}

const FilterContext = createContext(filterInitialState);

export const FilterProvider = ({children}) => {
    const [state,dispatch] = useReducer(filterReducer,filterInitialState);

    function initialProducts(products){

        dispatch({
            type : "PRODUCT_LIST",
            payload: {
                products: products,
            }
        });

    }

    function bestSeller(products){
        return state.bestSellerOnly ? products.filter((p)=>p.best_seller===true):products
    }
    function inStock(products){
        return state.inStockOnly ? products.filter((p)=>p.in_stock===true):products
    }
    function rating(products){
        console.log("triggered")
        if (state.rating === "4STARABOVE"){
            return products.filter((p)=>p.rating >= 4 )
        }
        if (state.rating === "3STARABOVE"){
            return products.filter((p)=>p.rating >= 3 )
        }
        if (state.rating === "2STARABOVE"){
            return products.filter((p)=>p.rating >= 2 )
        }
        if (state.rating === "1STARABOVE"){
            return products.filter((p)=>p.rating >= 1 )
        }
        return products;
    }
    function sortBy(products){
        if(state.sortBy ==="lowtohigh"){
            return products.sort((a,b)=> Number(a.price) - Number(b.price))
        }
        if(state.sortBy ==="hightolow"){
            return products.sort((a,b)=> Number(b.price) - Number(a.price))
        }
        return products;
    }

    const filteredProductslIst = rating(sortBy(inStock(bestSeller(state.products))));

    const value= {
        state,
        dispatch,
        products : filteredProductslIst,
        initialProducts,
    }

    return (
        <FilterContext.Provider  value={value}> 
            {children}
        </FilterContext.Provider>

    )

}

export const useFilterContext = () => {
    const context = useContext(FilterContext);
    return context;
}