import { Outlet } from "react-router-dom"
import { CustomNavbar } from "../components/Navbar"

const BaseLayout = () => {
  return (
    <div className="w-full px-2">
      <CustomNavbar />
      <Outlet />
    </div>
  )
}

export { BaseLayout }
