"use client"
import React from "react";
import { useAuth } from "@/context/authContext";
import Home from "./home";
import Loader from "@/components/loader";
import Login from "./login";


export default function app(){
    const {user, load} = useAuth();
    if( load){
        return(
        <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white flex">
            <Loader/>
        </div>  
        );
    }
    return user?<Home/>:<Login/>
}