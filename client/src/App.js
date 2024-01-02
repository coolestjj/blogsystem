import {
    createBrowserRouter,
    RouterProvider,
    Route, Outlet
} from "react-router-dom";
import React from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Single from "./pages/Single";
import Write from "./pages/Write";
import "./style.scss"

const Layout = () => {
    return (
        <>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </>
    )
}

const Router = createBrowserRouter([
    {
        path: "/", // Visiting "/" will show this content
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/single",
                element: <Single/>
            },
            {
                path: "/write",
                element: <Write/>
            }
        ]
    },
    {
        path: "/register",
        element: <Register/>
    },
    {
        path: "/login",
        element: <Login/>
    }
]);

function App() {
  return (
    <div className="app">
        <div className="container">
            <RouterProvider router={Router}/>
        </div>
    </div>
  );
}



export default App;
