
import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { IAuthContext, ILoginData ,IUser} from "../Interfaces/ContextInterface";
import { privateUserAxiosInstance } from "../Services/Axiosinstance";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const AuthContext = createContext<IAuthContext | null>(null);

//  Component to wrap app
export default function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [loginData, setLoginData] = useState<ILoginData | null>(null);
  const [userDetails, setUserDetails] = useState<IUser | null>(null);   

const saveLoginData = () => {
    const bearerToken = localStorage.getItem("token");
    const encodedToken = bearerToken?.split(" ")[1];
    if (encodedToken) {
      const decodedToken: ILoginData = jwtDecode<ILoginData>(encodedToken);
      setLoginData(decodedToken);
      console.log(decodedToken);
    }
  };

  const GetCurrentUser = async () => {
    try {
      const userId = loginData?._id;
      if (userId) {
        const response = await privateUserAxiosInstance.get(`/users/${userId}`);
        setUserDetails(response.data.data.user);    
        console.log("User Data:", response.data.data.user);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message || "Something Went Wrong");
      }
    }
  };

  useEffect(() => {
    if (loginData) {
      GetCurrentUser();
    }
  }, [loginData]);

  useEffect(() => {
    if (localStorage.getItem("token")) saveLoginData();
  }, []);

  return (
    
    <AuthContext.Provider value={{ saveLoginData, loginData, userDetails }}>
      {children}
    </AuthContext.Provider>
  );
}
