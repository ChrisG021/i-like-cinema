import Link from "next/link";
import React from "react";// :(
import { FaPlay } from "react-icons/fa";
export default function SearchResults({ results, IMAGE_BASE_URL ,menuItem }){
    return(
        
        <div className=" w-full  overflow-hidden relative grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
        {
        results.map((multi,index)=>(
            <>
            {
                multi.poster_path!=null? 
                    <Link href={`details/${menuItem.value}/${multi.id}`} className="relative overflow-hidden group cursor-pointer">
                        <div className="group-hover:scale-95 transition-all duration-500 opaccity-0">
                            {/* overlay */}
                            <div className="opacity-0 transition-all duration-500 group-hover:opacity-100">
                                <div className="bg-black/60 absolute inset-0 rounded-xl w-[200px]"></div>
                                <div className="text-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <FaPlay/>
                                </div>
                            </div>
                        <img src={`${IMAGE_BASE_URL}/${multi.poster_path}`} className="rounded-xl w-[200px] h-[300px]"/>
                        </div>
                    </Link>:""
            }
            </>
        ))}
        </div>
    );
}