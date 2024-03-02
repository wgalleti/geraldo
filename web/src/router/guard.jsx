import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth"
import PropTypes from "prop-types";


const Guard = ({ isPrivate }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated && isPrivate) {
    return <Navigate to="/login" replace />;
  }

  if (isAuthenticated && !isPrivate) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;

}

Guard.propTypes = {
  isPrivate: PropTypes.bool,
}

export { Guard }
