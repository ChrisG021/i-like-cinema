import React,{ useEffect, useState } from "react"
import { House, Compass, Heart , User, Settings, PlaySquare} from "lucide-react"
import './styles.css';
import Link from "next/link";


export default function Sidebar({ BASE_URL, API_KEY, IMAGE_BASE_URL, setResults }){

    const [ upComingMovies, setUpComingMovies] = useState([]);

    useEffect( ()=>{
        fetchData();
      },[]);
    const fetchData = async () =>{
        try {
        //url para acessar os filmes populares no caso
        const upComingResponse = await fetch(`${BASE_URL}/movie/upcoming?language=pt-BRS&page=1&api_key=${API_KEY}`);
        const upComingData = await upComingResponse.json();
        
        setUpComingMovies(upComingData.results.slice(0,3));
        //popularData.results armazena o array com "20" objetos no caso os filmes populares
        
        }
        catch(e){
        console.error(e);
        }
    }

    const UpComingCard = ({item}) => (
        <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors duration-200">
            <div className="relative ">
                <img src={IMAGE_BASE_URL+ item.poster_path} alt="" className="w-16 h-24 object-cover rounded" />
                <PlaySquare className="absolute inset-0 m-auto text-white oppacity-70"/>
            </div>
            <div className="flex-1  overflow-hidden">
                <h4 className="text-white font-median text-sm truncate ">{item.title}</h4>
                <p className="text-gray-400 text-xs">Data de lançamento: {item.release_date}</p>
            </div>
        </div>
    );

    const MenuItem = ({ icon:Icon, label, active = false ,url="", f}) => (
        <Link href={url} onClick={f?f:undefined}  className={`flex items-center space-x-3 px-2 py-3 rounded-lg cursor-pointer transition-all ${active?'text-white':'text-gray-400 hover:text-white hover:bg-gray-800'}`}>
            <Icon size ='20' />
            <span className="font-median">{label}</span>
        </Link>
    );

    return(
        <div className="ml-10 rounded-4xl w-64 bg-gray-800  sticky top-[40px] h-[calc(100vh-80px)]  overflow-hidden hidden lg:flex
        ">
            <div className="sidebar-scroll flex flex-col justify-between  overflow-auto p-6 rounded-4xl  bg-gray-800 h-[calc(100vh-80px)] ">
                <div className="settings flex flex-col gap-8">
                    <header>
                        <h1 className="px-2">I like cinema</h1>
                    </header>
                    <nav className="flex flex-col gap-4">
                        <ul>
                            <MenuItem f={()=>setResults([])} url={`/`} icon={House} label={'Inicio'} active/>
                            <MenuItem icon={Compass} label={'Explorar'} />
                            <MenuItem icon={Heart} label={'Favoritos'} />

                        </ul>
                        
                        <hr className=""/>

                        <ul>
                            <MenuItem icon={Settings} label={'Configuração'} />
                        </ul>
                    </nav>
                </div>
                <div className="upcoming">
                    { upComingMovies.map((item,index) => (
                        <Link href={`/details/movie/${item.id}`}>
                            <UpComingCard item={item} key={item.id}/>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
} 