
import { createContext } from "react";
import { IAuthContext } from "../Interfaces/ContextInterface";


export const AuthContext = createContext<IAuthContext | null>(null);

