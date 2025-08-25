import { ChevronDown, Search } from "lucide-react";
import { use, useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";


export default function Header({ menuItem, setMenuItem, API_KEY, BASE_URL, setResults, }){
    const {user} = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const [searching, setSearching] = useState("");

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log("Saidooooo");
        } catch (error) {
            console.error("Deu b.o  ate aqui: "+error);
        }
    }

    useEffect(()=>{
        if  ( searching.trim()==='' )  {
            setResults([]);
            return;
        }

        const timer = setTimeout(()=>{
            fetch(`${BASE_URL}/search/${menuItem.value}?api_key=${API_KEY}&query=${searching}&include_adult=false`)
            .then((res) => res.json())
            .then((data) =>{
                const sortedData = (data.results || []).sort((a,b)=>{
                    const dateA = new Date(a.release_date||a.first_air_date||0);
                    const dateB = new Date(b.release_date||b.first_air_date||0);
                    return dateB-dateA;
                })
                console.log(sortedData);
                setResults(sortedData);
            }).catch((error)=>console.error(error))    
        },500)
        return () => clearTimeout(timer);

    },[searching,menuItem.value])
    
    return(
        <div className="flex justify-between items-center all-header gap-3 ">
            <div className="relative">
                <div onClick={()=>setMenuOpen(!menuOpen)} className="gap-2 cursor-pointer  flex flex-row types bg-gray-800 rounded-4xl space-x-2 px-4 py-2 hover:cursor-pointer ">
                    <p>{menuItem.name}</p>
                    <ChevronDown className={`${menuOpen?"rotate-180 transition-all duration-500":"transition-all duration-500"}`}/>
                </div>
                <div className={`absolute z-2 bg-gray-800 p-2 min-w-[100px] rounded-xl mt-1 transition-all origin-top duration-5000${menuOpen?"opacity-1 scale-100":"opacity-0 scale-0"}`}>
                    <ul className="">
                        {/* <li className="hover:bg-gray-700 px-2 py-1 rounded-xl " onClick={()=>setMenuItem({value:"",name:"Tudo"})}>Tudo</li> */}
                        <li className={`cursor-pointer hover:bg-gray-700 px-2 py-1 rounded-xl ${menuItem.value==="tv"?"hidden":""}`}onClick={()=>{setMenuItem({value:"tv",name:"Séries"}); setMenuOpen(!menuOpen)}}>Séries</li>
                        <li className={`cursor-pointer hover:bg-gray-700 px-2 py-1 rounded-xl ${menuItem.value==="movie"?"hidden":""}`} onClick={()=>{setMenuItem({value:"movie",name:"Filmes"}),setMenuOpen(!menuOpen)}}>Filmes</li>
                    </ul>
                </div>            
            </div>
            <div className="w-full  flex justify-between items-center px-4 py-2 rounded-4xl bg-gray-800 search-bar">
                {/* search */}
                <input className="w-full outline-none" value={searching} onChange={(e)=>setSearching(e.target.value)} type="search"  placeholder="Pesquisar"/>
                <Search size={20}/>
            </div>

            <div onClick={()=>handleLogout()} className="cursor-pointer profile flex flex-1 flex-row items-center justify-between bg-gray-800 gap-2 p-[2px] rounded-full max-w-[150px]">
                <div className="flex flex-1 min-w-10">
                    <img className="object-cover rounded-full"  src={user.photoURL?user.photoURL:`https://hips.hearstapps.com/hmg-prod/images/gettyimages-1061959920.jpg?*`} alt="foto do the rock"/>
                </div>
                {/* <UserCircle size={35}/> */}
                <div className="flex flex-1 flex-col mr-2 w-full max-w-[90px] hidden lg:flex">
                    <h3 className="text-sm truncate">{user.displayName?.toLowerCase()}</h3>
                    <p className=" text-xs text-gray-400 truncate">{user.email}</p>
                </div>
            </div>
        </div>
    );
}