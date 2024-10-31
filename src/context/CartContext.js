import {  createContext, useContext, useReducer } from "react"
import { cartReducer } from "../reducers/cartReducer";

const initialCartList ={
    cartList: [],
    total:0
}

const CartContext = createContext(initialCartList);

export const CartProvider = ({children}) =>{
    const [state,dispatch] = useReducer(cartReducer,initialCartList);

    function addToCart(product){
        const updatedCartList = state.cartList.concat(product);
        const updateTotal = state.total+product.price
        dispatch({
            type: "ADD_TO_CART",
            payload: {
                products: updatedCartList,
                total: updateTotal
            }
        })
    }
    
    function removeFromCart(product){
        const updatedCartList = state.cartList.filter((cartItem) => cartItem.id !== product.id )
        const updateTotal = state.total-product.price
        dispatch({
            type: "REMOVE_FROM_CART",
            payload:{
                products: updatedCartList,
                total:updateTotal
            }
        })
    }
    function clearCart(){
        dispatch({
            type: "CLEAR_CART",
            payload:{
                products : [],
                total:0
            }
        })
    }

    const value ={
        cartList: state.cartList,
        total:state.total,
        addToCart,
        removeFromCart,
        clearCart

    }


    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}

export const useCartContext = () =>{
    const context = useContext(CartContext)
    return context;
}