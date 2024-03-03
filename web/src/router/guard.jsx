import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../hooks/useAuth";


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
