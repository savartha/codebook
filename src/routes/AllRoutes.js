import { Routes,Route } from "react-router-dom"

import { CartPage, DashboardPage, HomePage,Login,PageNotFound,ProductsList, Register } from "../pages"
import { ProductDetails } from "../pages/ProductDetails"
import { ProtectedRoutes } from "./ProtectedRoutes";
import { OrderPage } from "../pages/Order/OrderPage";

export const AllRoutes = () => {
  return (
    <>
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/products' element={<ProductsList />} />
            <Route path="/products/:id" element={<ProductDetails />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path='/cart' element={<ProtectedRoutes><CartPage /></ProtectedRoutes> } />
            <Route path='/order-summary' element={<ProtectedRoutes><OrderPage /></ProtectedRoutes> } />
            <Route path='/dashboard' element={<ProtectedRoutes><DashboardPage /></ProtectedRoutes> } />

            <Route path="*" element={<PageNotFound />}  />
        </Routes>
    </>
  )
}
