import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "./AuthContext";
import { ILoginData, IUser } from "../Interfaces/ContextInterface";
import { privateUserAxiosInstance } from "../Services/Axiosinstance";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export default function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [loginData, setLoginData] = useState<ILoginData | null>(null);
  const [userDetails, setUserDetails] = useState<IUser | null>(null); 
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);  

  const saveLoginData = () => {
    const bearerToken = localStorage.getItem("token");
    const encodedToken = bearerToken?.split(" ")[1];
    if (encodedToken) {
      const decodedToken: ILoginData = jwtDecode<ILoginData>(encodedToken);
      setLoginData(decodedToken);
      console.log(loginData);
      

    }
  };

useEffect(() => {
  if (loginData) {
    const GetCurrentUser = async () => {
      try {
        const userId = loginData?._id;
        if (userId) {
          const response = await privateUserAxiosInstance.get(`/users/${userId}`);
          setUserDetails(response.data.data.user);
        }
      } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data?.message || "Something Went Wrong");
        }
      }
    };

    GetCurrentUser();
  }
}, [loginData]);


  useEffect(() => {
    if (localStorage.getItem("token")) saveLoginData();

    setIsAuthLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ saveLoginData, loginData, userDetails, isAuthLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
