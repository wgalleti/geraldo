import { Outlet } from "react-router-dom"
import { CustomNavbar } from "../components/Navbar"

export const BaseLayout = () => {
  return (
    <div className="w-full px-2">
      <CustomNavbar />
      <Outlet />
    </div>
  )
}
