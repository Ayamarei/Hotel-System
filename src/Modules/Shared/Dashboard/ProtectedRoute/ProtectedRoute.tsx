import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";

export default function ProtectedRoute({
  children,
}: {
  children: ReactNode;
}) {
  const { loginData, isAuthLoading } = useContext(AuthContext) || {};


  if (!isAuthLoading) {
    if (
      localStorage.getItem("token") && loginData?.role === "admin"
    ) {
      return children;
    } else {
      return <Navigate to={"/auth/login"}/>;
}
}
}