

// export default function AuthContext() {
//   return (
//     <div>AuthContext</div>
//   )
// }



import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { IAuthContext, ILoginData } from "../Interfaces/ContextInterface";



export const AuthContext = createContext<IAuthContext | null>(null);

//  Component to wrap app
export default function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [loginData, setLoginData] = useState<ILoginData | null>(null);

  const saveLoginData = () => {
    const bearerToken = localStorage.getItem("token");
    // const encodedToken = localStorage.getItem("token");
    const encodedToken = bearerToken?.split(" ")[1];
    if (encodedToken) {
      const decodedToken: ILoginData = jwtDecode<ILoginData>(encodedToken);
      setLoginData(decodedToken);
      console.log(decodedToken);
      
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) saveLoginData();
  }, []);

  return (
    <AuthContext.Provider value={{ saveLoginData, loginData }}>
      {children}
    </AuthContext.Provider>
  );
}
