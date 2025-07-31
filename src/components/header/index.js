import { UserCircle,Bell, ChevronDown, Search, User, Divide } from "lucide-react";

export default function Header(){
    return(
        <div className="flex justify-between items-center all-header gap-3 ">
            <div className="gap-2  flex flex-row types bg-gray-800 rounded-4xl space-x-2 px-4 py-2 hover:cursor-pointer ">
                <p>All</p>
                <ChevronDown/>
            </div>
            <div className="w-full  flex justify-between items-center px-4 py-2 rounded-4xl bg-gray-800 search-bar">
                <input className="w-full outline-none" type="search" placeholder="Pesquisar"/>
                <Search size={20}/>
            </div>
            <div className="bell bg-gray-800 p-3 rounded-4xl">
                <Bell size={20}/>
            </div>
            <div className="profile flex flex-1 flex-row items-center justify-between bg-gray-800 gap-2 p-[2px] rounded-full max-w-[150px]">
                <div className="flex flex-1 min-w-10">
                    <img className="object-cover rounded-full"  src="https://hips.hearstapps.com/hmg-prod/images/gettyimages-1061959920.jpg?*" alt="foto do the rock"/>
                </div>
                {/* <UserCircle size={35}/> */}
                <div className="flex flex-1 flex-col mr-2 w-full max-w-[90px]">
                    <h3 className="text-sm truncate">isaqueSangley</h3>
                    <p className=" text-xs text-gray-400 truncate">Email</p>
                </div>
            </div>
        </div>
    );
}