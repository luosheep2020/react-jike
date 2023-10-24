import {getToken} from "@/utils/index.js";
import {Navigate} from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function AuthRoute({children}) {
    const token=getToken()
    if (token){
        return <>{children}</>
    }else{
        return <Navigate to={'/login'} replace/>
    }
}