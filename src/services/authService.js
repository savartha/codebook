export async function login(authDetails){

    const requestOptons = {
        method: "POST",
        headers: {"content-Type":"application/json"},
        body : JSON.stringify(authDetails)
    }

    const response = await fetch(`${process.env.REACT_APP_HOST}/login`,requestOptons);
    if(!response.ok){
        throw {message: response.statusText , status: response.status}; //eslint-disable-line
    }
    const data = await response.json();
    if(data.accessToken){
        sessionStorage.setItem("token", JSON.stringify(data.accessToken));
        sessionStorage.setItem("cbid", JSON.stringify(data.user.id));
    }

    return data;
}

export async function register(authDetail){

    const requestOptions = {
        method: "POST",
        headers: {"content-Type" : "application/json"},
        body: JSON.stringify(authDetail)
    }

    const response = await fetch(`${process.env.REACT_APP_HOST}/register`,requestOptions);
    if(!response.ok){
        throw {message: response.statusText , status: response.status}; //eslint-disable-line
    }
    const data = await response.json();
    if(data.accessToken){
        sessionStorage.setItem("token", JSON.stringify(data.accessToken));
        sessionStorage.setItem("cbid", JSON.stringify(data.user.id));
    }
    return data;
}

export function logout(){
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("cbid");
}