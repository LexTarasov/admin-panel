import { Navigate } from "react-router-dom";


export default function ProtectedRoute({ canActivate, redirectPath = '/', children }){
if (!canActivate){
    return <Navigate to={redirectPath}/>
}
    return(
       children
    )
}