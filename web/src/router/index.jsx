import { Route, Routes } from "react-router-dom"
import BuyerPage from "../pages/commons/buyer"
import PaymentPage from "../pages/commons/payment"
import ProductPage from "../pages/commons/product"
import ProductGroupPage from "../pages/commons/product.group"
import SupplierPage from "../pages/commons/supplier"
import UnityPage from "../pages/commons/unity"
import PriceDetailsPage from "../pages/details"
import HomePage from "../pages/home"
import PricePage from "../pages/price"
import CompanyPage from "../pages/registrations/company"
import UserPage from "../pages/registrations/user"
import { Guard } from "./guard"
import { LoginPage } from "../pages/login"
import { BaseLayout } from "../layouts/base"
import { AuthLayout } from "../layouts/auth"

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Guard isPrivate={false} />}>
        <Route element={<AuthLayout />}>
          <Route exact path="/login" element={<LoginPage />} />
        </Route>
      </Route>
      <Route element={<Guard isPrivate={true} />}>
        <Route element={<BaseLayout />}>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/companies" element={<CompanyPage />} />
          <Route exact path="/users" element={<UserPage />} />

          <Route exact path="/buyers" element={<BuyerPage />} />
          <Route exact path="/payments" element={<PaymentPage />} />
          <Route
            exact
            path="/product-groups"
            element={<ProductGroupPage />}
          />
          <Route exact path="/products" element={<ProductPage />} />
          <Route exact path="/suppliers" element={<SupplierPage />} />
          <Route exact path="/unities" element={<UnityPage />} />
          <Route exact path="/prices/:priceID" element={<PricePage />} />
          <Route
            exact
            path="/details/:priceID"
            element={<PriceDetailsPage />}
          />
        </Route>
      </Route>
    </Routes>
  )
}

export { AppRoutes }

