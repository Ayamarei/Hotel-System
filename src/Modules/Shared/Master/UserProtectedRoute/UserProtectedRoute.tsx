import { ReactNode, useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { Navigate } from "react-router-dom";


export default function UserProtectedRoute({
    children,
  }: {
    children: ReactNode;
  }) {
    const { loginData, isAuthLoading } = useContext(AuthContext) || {};
  
  
    if (!isAuthLoading) {
      if (
        localStorage.getItem("token") && loginData?.role === "user"
      ) {
        return children;
      } else {
        return <Navigate to={"/auth/login"}/>;
  }
  }
  }