import {createBrowserRouter} from "react-router-dom";
import Layout from "@/pages/Layout/index.jsx";
import Login from "@/pages/Login/index.jsx";
import AuthRoute from "@/components/AuthRoute.jsx";
import {lazy, Suspense} from "react";
const Home=lazy(()=>import("@/pages/Home/index.jsx"))
const Article=lazy(()=>import("@/pages/Article/index.jsx"))
const Publish=lazy(()=>import("@/pages/Publish/index.jsx"))
const router = createBrowserRouter([
    {
        path:'/',
        element:<AuthRoute><Layout/></AuthRoute>,
        children:[
            {
                index:true,
                element:<Suspense fallback={'加载中'}><Home/></Suspense>
            },
            {
                path:'article',
                element:<Suspense fallback={'加载中'}><Article/></Suspense>
            },
            {
                path:'publish',
                element:<Suspense fallback={'加载中'}><Publish/></Suspense>
            }
        ]
    },
    {
        path:'/login',
        element:<Login/>
    }
]);

export default router