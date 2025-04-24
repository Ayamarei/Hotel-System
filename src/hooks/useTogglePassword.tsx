import { useState } from "react";

export const useTogglePassword = () => {
  const [visiablity, setVisiablity] = useState({
    password: false,
    confirmPassword: false,
    oldPassword: false,
  });

  const toggleVisiblePassword = (type: string) => {
    if (type === "password") {
      setVisiablity((prev) => ({ ...prev, password: !prev.password }));
    } else if (type === "confirmPassword") {
      setVisiablity((prev) => ({
        ...prev,
        confirmPassword: !prev.confirmPassword,
      }));
    } else {
      setVisiablity((prev) => ({
        ...prev,
        oldPassword: !prev.oldPassword,
      }));
    }
  };
  return { toggleVisiblePassword, visiablity };
};
