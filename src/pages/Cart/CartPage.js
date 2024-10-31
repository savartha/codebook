import { useCartContext } from "../../context"
import { useTitle } from "../../hooks/useTitle";
import { CartEmpty } from "./components.js/CartEmpty"
import { CartList } from "./components.js/CartList"


export const CartPage = () => {
    const {total,cartList} = useCartContext();
    useTitle(`Cart (${cartList.length})`)
  return (
    total ? <CartList /> : <CartEmpty />
  )
}
