import { useState } from "react"

export const useTogglePassword=()=>{
const [visiablity,setVisiablity]=useState({
    password:false,
    confirmPassword:false
})

const toggleVisiblePassword=(type:string)=>{
    if(type==='password'){
        setVisiablity((prev)=>({...prev,password:!prev.password}))
    }else{
        setVisiablity((prev)=>({...prev,confirmPassword:!prev.confirmPassword}))
    }
}
return {toggleVisiblePassword,visiablity}
}