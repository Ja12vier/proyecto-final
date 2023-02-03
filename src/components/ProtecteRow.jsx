


import { Navigate, Outlet } from "react-router-dom";

const ProtecteRow=()=>{
  const token=localStorage.getItem("token")

  if(token){
    return<Outlet/>
  }else{

    return<Navigate to= '/login'/>
  }
}


export default ProtecteRow