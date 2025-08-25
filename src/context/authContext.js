"use client"

import { useEffect,useState,useContext,createContext, use } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/firebase"

const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [load, setLoad] = useState(true);
    const [user, setUser] = useState(null);
    
    useEffect(()=>{
        const unsub = onAuthStateChanged(auth,(user)=>{
            setUser(user);
            setLoad(false);
        })
        return ()=>unsub(

        );
    },[])
    return(
        <AuthContext.Provider value={{user,load}}>
            {children}
        </AuthContext.Provider>
    )
};
export const useAuth = ()=>useContext(AuthContext);