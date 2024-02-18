import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "./ContextProvider";
import "./guest.css"


export default function GuestLayout() { 
    // eslint-disable-next-line no-unused-vars
    const {user,token}= useStateContext();
 if(token){
        return <Navigate to="/ToDo"/>
    
 }

  return (
    <div className="d-flex justify-content-center" id="GPage">
    
        <Outlet/>
    </div>
  )
}
