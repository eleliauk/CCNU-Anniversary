import { Navigate } from "react-router-dom";
import Cutt from "../components/cutavatar";
import Main from "../components/main";
import React from "react";
const router = [
    {
        path:'/',
        element: <Main/>
    },
    {
        path:'/editImage',
        element:<Cutt/>
    },

]
export default router