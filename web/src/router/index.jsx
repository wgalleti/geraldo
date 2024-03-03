import { Route, Routes } from "react-router-dom"
import {
  HomePage,
  LoginPage,
  PriceDetailsPage,
  CompanyPage,
  UserPage,
  BuyerPage,
  PaymentPage,
  ProductPage,
  ProductGroupPage,
  SupplierPage,
  UnityPage,
  PricePage,
} from "../pages"
import { Guard } from "./Guard"
import { AuthLayout } from "../layouts/Auth"
import { BaseLayout } from "../layouts/Base"

const Router = () => {
  return (
    <Routes>
      <Route element={<Guard isPrivate={false} />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Route>
      <Route element={<Guard isPrivate={true} />}>
        <Route element={<BaseLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/companies" element={<CompanyPage />} />
          <Route path="/users" element={<UserPage />} />

          <Route path="/buyers" element={<BuyerPage />} />
          <Route path="/payments" element={<PaymentPage />} />
          <Route
            path="/product-groups"
            element={<ProductGroupPage />}
          />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/suppliers" element={<SupplierPage />} />
          <Route path="/unities" element={<UnityPage />} />
          <Route path="/prices/:priceID" element={<PricePage />} />
          <Route
            path="/details/:priceID"
            element={<PriceDetailsPage />}
          />
        </Route>
      </Route>
    </Routes>
  )
}

export { Router }

