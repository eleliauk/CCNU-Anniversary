import { Navigate } from "react-router-dom";
import Cutt from "../components/cutavatar";
import Main from "../components/main";
const router = [
    {
        path:'/home',
        element: <Main/>
    },
    {
        path:'/editImage',
        element:<Cutt/>
    },
    {
        path:'/',
        element:<Navigate to='/home'/>
    },

]
export default router