import React, { useEffect, useState } from 'react'
import { DashboardCard } from './components/DashboardCard';
import { DashboardEmpty } from './components/DashboardEmpty';
import { getUserOrders } from '../../services';
import { useTitle } from '../../hooks/useTitle';
import { toast } from 'react-toastify';
export const DashboardPage = () => {
    const [orders,setOrders] = useState([])
    useTitle('Dashboard');
    useEffect(()=>{
        async function fetchOrders(){
            try{
              const data = await getUserOrders();
              setOrders(data) ;
            }catch(err){
              toast.error(err.message,{closeButton:true, closeOnClick:true})
            }
        }
        fetchOrders();

    },[])
    return (
        <main>
          <section>
            <p className="text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8">My Dashboard</p>
          </section>
          <section>
            {orders.length && orders.map((order)=>(
                <DashboardCard order={order}  />
            ))}
          </section>
          <section>
            {orders.length ===0 && <DashboardEmpty />}
          </section>
        </main>
      )
}
