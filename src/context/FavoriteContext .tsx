
import { createContext } from "react"
import { toast } from "react-toastify"
import { privateAxiosInstance } from "../Services/Axiosinstance";
import { FAVORITE_ROOMS } from "../Services/Urls";
import { AxiosError } from "axios";

 
 
interface FavoriteContextType {
    addToFavorite: (roomId: string) => Promise<void>;
    RemoveFromeFavorite: (roomId: string) => Promise<void>;
  }

 export const FavoriteContext =   createContext <FavoriteContextType |null>(null)

 export default function FavoriteContextProvider ({children}: { children: React.ReactNode }) {


    // addToFavorite
    const addToFavorite =async (roomId:string)=>{
     try {
        let response= await privateAxiosInstance.post(FAVORITE_ROOMS.ADD_Fav,{roomId},
        )
        console.log(response);
        toast.success(response.data.message)
        
     } catch (error) {
        const err = error as AxiosError<{ message: string }>;

        toast.error(err?.response?.data?.message || "Something went wrong!");  
        
     }
    }


    // RemoveFromeFavorite
    const  RemoveFromeFavorite =async (roomId:string)=>{
     try {
        let response= await privateAxiosInstance.delete(FAVORITE_ROOMS.DELETE_Fav(roomId),
        {
            data: { roomId },
        }
        )
        console.log(response);
        toast.success(response.data.message)
        
     } catch (error) {
        const err = error as AxiosError<{ message: string }>;

        toast.error(err?.response?.data?.message || "Something went wrong!");  
        
     }
    }



      


    
  return (
    <FavoriteContext.Provider value={{addToFavorite,RemoveFromeFavorite}}>
        {children}
 </FavoriteContext.Provider>
  )
}
