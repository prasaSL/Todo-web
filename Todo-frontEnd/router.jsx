import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./src/components/login";
import Signup from "./src/components/signup";
import ToDoList from "./src/components/ToDoList";
import NotFound from "./src/components/NotFound";
import DefaultLayout from "./src/components/DefaultLayout";
import GuestLayout from "./src/components/GuestLayout";

const router = createBrowserRouter([
    {
        path: "/",
        element:<DefaultLayout/>,
        children:[
            {
                path: '/',
                element: <Navigate to="/ToDo"/>
              },
            {

                path:"/ToDo",
                element:<ToDoList/>
            }
        ]
    },
    {
        path: '/',
        element: <GuestLayout/>,
        children: [
          {
            path: '/login',
            element: <Login/>
          },
          {
            path: '/signup',
            element: <Signup/>
          }
        ]
      },

   
    {
        path:"*",
        element:<NotFound/>

    }

]); 

export default router;