import { Route, Routes } from "react-router-dom"
import './scss/style.scss'

// Toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages 
import Auth from "./pages/auth/Auth"
import Login from "./pages/login/Login"
import Signup from "./pages/login/Signup";
import Admin from "./pages/admin/Admin"
import CreateProduct from "./pages/admin/create-product/CreateProduct"
import ManageProduct from "./pages/admin/manage-product/ManageProduct"
import Home from "./pages/home/Home";

// Components
import NotFound from "./components/notFound/NotFound"
import Backtop from "./components/backtop/Backtop"

function App() {
    return (
        <>
            <Backtop />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Login />} />
                <Route path="/sign-up" element={<Signup />} />
                <Route path="/" element={<Auth />}>
                    <Route path="admin" element={<Admin />} >
                        <Route path='create-blog' element={<CreateProduct />} />
                        <Route path='manage-blog' element={<ManageProduct />} />
                    </Route>
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
            <ToastContainer />
        </>
    )
}

export default App
