function getSessionData(){
    const token =JSON.parse(sessionStorage.getItem("token"))
    const cbid =JSON.parse(sessionStorage.getItem("cbid"))
    return {token,cbid};
}

export async function getUserDetails(){
    const sessionData = getSessionData();
    const requestOptions={
        method:"GET",
        headers: {"content-Type":"application/json" ,Authorization : `Bearer ${sessionData.token}`}
    }
    const response = await fetch(`${process.env.REACT_APP_HOST}/600/users/${sessionData.cbid}`,requestOptions);
    if(!response.ok){
        throw {message: response.statusText , status: response.status}; //eslint-disable-line
    }
    const data = await  response.json();
    return data;
}

export async function getUserOrders(){
    const sessionData = getSessionData();
    const requestOptions={
        method:"GET",
        headers: {"content-Type":"application/json" ,Authorization : `Bearer ${sessionData.token}`}
    }
    const response = await fetch(`${process.env.REACT_APP_HOST}/660/orders?user.id=${sessionData.cbid}`,requestOptions);
    if(!response.ok){
        throw {message: response.statusText , status: response.status}; //eslint-disable-line
    }
    const data = await response.json();
    return data;
}

export async function createOrder(cartList,total,user){
    const sessionData = getSessionData();
    const orderDetails = {
        cartList:cartList,
        ammount_paid:total,
        items_count: cartList.length,
        user:{
            name:user.name,
            email:user.email,
            id:user.id
        }
    }
    const requestOptions={
        method: "POST",
        headers: {"content-type":"application/json", Authorization: `Bearer ${sessionData.token}`},
        body: JSON.stringify(orderDetails)
    }
    const response = await fetch(`${process.env.REACT_APP_HOST}/660/orders`,requestOptions);
    if(!response.ok){
        throw {message: response.statusText , status: response.status}; //eslint-disable-line
    }
    const data = await response.json();
    return data;
}
