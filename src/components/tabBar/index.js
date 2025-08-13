import "react";
import React,{ useEffect, useState } from "react"
import { House, Compass, Heart ,Settings } from "lucide-react"

export default function TabBar(){
    const MenuItem = ({ icon:Icon, label, active = false }) => (
        <div className={`flex items-center flex-col p-2 rounded-4xl cursor-pointer  ${active?'text-white bg-black/10 backdrop-blur-md shadow-x1':'text-gray-400 hover:text-white hover:bg-black/10 hover:backdrop-blur-md'}`}>
            <Icon size='23'/>
            <span className="font-median">{label}</span>
        </div>
    );
    return(
        <div className="lg:hidden fixed bottom-0 w-full p-6  z-1 flex justify-between">
            <div className="p-2 rounded-4xl bg-black/30 backdrop-blur-md flex flex-row gap-3">
                <MenuItem icon={House} label="" active/>
                <MenuItem icon={Compass} label=""/>
                <MenuItem icon={Heart} label=""/>
            </div>
            <div className="p-2 rounded-4xl bg-black/30 backdrop-blur-md">
                <MenuItem icon={Settings} label=""/> 
            </div>
        </div>
    );
}