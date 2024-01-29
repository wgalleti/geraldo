import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/home.jsx";
import CompanyPage from "./pages/registrations/company.jsx";
import UserPage from "./pages/registrations/user.jsx";
import BuyerPage from "./pages/commons/buyer.jsx";
import PaymentPage from "./pages/commons/payment.jsx";
import ProductGroupPage from "./pages/commons/product.group.jsx";
import ProductPage from "./pages/commons/product.jsx";
import SupplierPage from "./pages/commons/supplier.jsx";
import UnityPage from "./pages/commons/unity.jsx";
import CustomNavbar from "./components/Navbar.jsx";
import {Container} from "react-bootstrap";

export default function App() {

    return (
        <>
            <BrowserRouter>
                <CustomNavbar/>
                <Container>
                    <Routes>
                        <Route exact path="/" element={<HomePage/>}/>
                        <Route exact path="/companies" element={<CompanyPage/>}/>
                        <Route exact path="/users" element={<UserPage/>}/>

                        <Route exact path="/buyers" element={<BuyerPage/>}/>
                        <Route exact path="/payments" element={<PaymentPage/>}/>
                        <Route exact path="/product-groups" element={<ProductGroupPage/>}/>
                        <Route exact path="/products" element={<ProductPage/>}/>
                        <Route exact path="/suppliers" element={<SupplierPage/>}/>
                        <Route exact path="/unities" element={<UnityPage/>}/>
                    </Routes>
                </Container>

            </BrowserRouter>
        </>
    )
}
