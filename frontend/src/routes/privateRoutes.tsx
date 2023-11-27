import { Outlet, Navigate } from "react-router-dom";

export const useAuth = () => {
  return !!localStorage.getItem("userDetails");
};

function PrivateRoutes() {
  const token = useAuth();
  return token ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoutes;
