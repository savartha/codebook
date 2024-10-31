

export const filterReducer = (state,action) => {
    const {type,payload} = action;

    switch(type)
    {
        case "PRODUCT_LIST":
            return {products: payload.products};
        case "SORT_BY":
            return {...state, sortBy:payload.sortBy}
        case "RATING":
            return {...state, rating:payload.rating}
        case "IN_STOCK":
            return {...state, inStockOnly:payload.inStock}
        case "BEST_SELLER":
            return {...state, bestSellerOnly:payload.bestSeller}
        case "CLEAR_FILTER":
            return {...state,
                bestSellerOnly:false,
                inStockOnly:false,
                rating:null,
                sortBy:null}
        default:
            throw new Error('Invalid Action')

    }
       
 
}
