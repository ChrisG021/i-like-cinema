"use client"

import Loader from "@/components/loader";
import { Divide, Share2Icon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState,useRef } from "react";
import { FaShare } from "react-icons/fa";
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { SwiperSlide,Swiper } from "swiper/react";
import "./styles.css";
import TabBar from "@/components/tabBar";
export default function DetailsPage({ params }) {    
  //url base da API TMDB
    const BASE_URL = "https://api.themoviedb.org/3";
    const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/original';
    const API_KEY = "9f44bb5cb496bc17bb97b5d2b65c7bc6";
    const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w300';

    const { type, id } = params;
    const [data, setData] = useState(null);
    const [loading, setLoading] =useState(true);
    const [error, setError] =useState(false);

    // const [menuItem, setMenuItem] = useState({value:"movie", name:"Filmes"});
    // const [results, setResults ] = useState([]);
    const [casts, setCasts] = useState([]);

    const[color, setColor] = useState("");
    const imgRef= useRef();

    //loading setado com a bolinha quicante

    const fetchMovies = async () => {
        setLoading(true);
        setError(false);

        try {
            const Response = await fetch(`${BASE_URL}/${type}/${id}?api_key=${API_KEY}&language=pt-BR`);
            const Data = await Response.json();
            if(!Data.status_code){
                console.log(Data);
                setData(Data);
                setLoading(false);
            }else{
                setLoading(false);
                setError(true);
            }

            }catch(e){
                console.error(e);
                setLoading(false);
                setError(true);
            }
    }   

    const fetchCasts = async () =>{
        const response  = await fetch(`${BASE_URL}/${type}/${id}/credits?api_key=${API_KEY}&language=pt-BR`)     
        const data = await response.json();
        console.log(data.cast)
        setCasts(data.cast.slice(0,5));//array com os atores sendo numerados ja em ordem de importancia no filme
    }

    useEffect(()=>{
        fetchMovies();
        fetchCasts();
    },[]);


    

    if(loading){
        return(
        <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white flex">
            <Loader/>
        </div>  
        );
    }

    if(error){
        return(
            <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-white flex gap-8">
                <h1 className="font-bold text-2xl text-white">
                    ops!!! parece que esse conteúdo não está disponível.
                </h1>
                <Link className="content-fit px-2 py-3 bg-white text-black rounded-4xl transition-all duration-300 focus:scale-95 hover:scale-110" href={"/"}>
                    Retornar ao explorar
                </Link>
            </div>
        );
    }


    // let date_release = data.release_date.replace("-","/");
    // date_release = date_release.replace("-","/");
    // tirei pq falaram mal mas ta funcionando

    const formattedDate = (dataStr) => {
        const data = new Date(dataStr)
        return data.toLocaleDateString("pt-BR",{
            day:"2-digit",
            month:"2-digit",
            year:"numeric"
        });
    }
    
    const budget = data.budget;
    // const newBudget = budget.toLocaleString("pt-BR", {
    // style: "currency",
    // currency: "BRL",
    // })


    const formatatedBudget = (num) =>{
//9 zero Bi
// 6 zero M
// 3 zero K
        if(num >= 1e9){
            return (num/1e9).toFixed(1).replace(/\.0$/, " ") + "Bi";
        } 
        if(num>= 1e6){
            return (num/1e6).toFixed(1).replace(/\.0$/, " ") + "M";
        }   
        if(num>= 1e3){
            return (num/1e3).toFixed(1).replace(/\.0$/, " ") + "K";
        }
    }

    const share = async ()=>{
        const url = window.location.href;
        const message = `Olha esse filme maravilhoso que encontrei!!!!!!!!!! :${url}`
        if( navigator.share){
            try{
                await navigator.share({
                    title:"filme incrivel",
                    text:message,
                })
            }catch(e){
                console.error(e);
            }
        }      
    }

    const formattedStatus = (msg)=>{
        switch(msg){
            case "Ended":
                return "Concluido";
            case"Returning Series":
                return "Em andamento";
            case "In Production":
                return "Em produção";
            case "Planned":
                return"Em planejamento";
            case "Canceled":
                return"Cancelada";
            case "Pilot":
                return "Piloto lançado";
            case "Released":
                return "Lançado"
            case "Post Production":
                return "Pós-produção"
            case "Rumored":
                return "Há rumores";
            default:
                return"Sem confirmação";
                break
        }
    }
    return (
        <div className="flex flex-col w-full relative min-h-screen bg-gray-900 text-white flex">
            {/* <div className="absolute w-full h-[700px] overflow-hidden"> */}

            <div className="absolute w-full h-[400px] lg:h-[700px] overflow-hidden">
                {/* <div className="absolute z-1 w-full fixed">
                    <Header API_KEY={API_KEY} BASE_URL={BASE_URL} menuItem={menuItem} setMenuItem={setMenuItem} setResults={setResults}/>
                </div> */}

                <div className="absolute bottom-0 left-0 w-full h-1/5 bg-gradient-to-t from-gray-900 to-trasparent z-1"></div>
                <img ref={imgRef} src={`${BACKDROP_BASE_URL}/${data.backdrop_path}`} className="absolute h-full w-full object-cover "/>
                
            </div>

            {/* detalhes do filme */}
            <div className="z-2 w-full max-md:px-4 lg:w-[1500px] self-center min-h-screen ">
                <div className="flex flex-col ">
                    <Link href={"/"} className=" backdrop-blur px-4 py-3 w-fit mb-80 mt-10 rounded-3xl">
                        <p className="italic ">
                            <sup className="text-xs">I like </sup>
                            <span className="text-2xl font-bold">cinema</span>
                        </p>
                    </Link>
                    
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-3">
                        <h1 className="text-4xl lg:text-6xl font-bold text-shadow-lg">
                                {data?.title ||data.name}
                            </h1>

                            <div className="flex justify-between">
                                <ul className="flex flex-wrap gap-2 ">
                                    {data.genres.map( (genre)=>(
                                        <span className="bg-black/60 backdrop-blur px-3 py-2 rounded-xl text-sm border-white-200 border-2">{genre.name}</span>
                                    ))}
                                </ul>
                                <button onClick={()=>share()} className="flex bg-white rounded-4xl w-10 h-10 justify-center items-center transition-all duration-500 inset-0 hover:scale-110 focus:scale-85">
                                    <FaShare className="p-1" color="black" size={30}/>
                                </button>
                            </div>
                        </div>
  

                        <div>
                            {/* full screen */}
                            <ul className="flex flex-row gap-8">
                                <Swiper
                                    slidesPerView={'auto'}
                                    spaceBetween={12}
                                    className="w-full swiper-cards"
                                >


                                {budget>0&&(
                                // <SwiperSlide className="swiper-slide-cards relative bg-white/10 px-3  h-[100px] lg:h-[150px] backdrop-blur rounded-3xl flex flex-row items-center justify-center">

                                <SwiperSlide className="swiper-slide-cards relative bg-white/10 px-3 backdrop-blur rounded-3xl flex flex-row ">
                                    <div className="[writing-mode:vertical-rl] rotate-180">
                                        <span className="text-white/30 font-bold">Orçamento</span>
                                    </div>
                                    <div className="px-10">
                                        <h2 className="self-center text-3xl font-bold text-center ">${formatatedBudget(budget)}</h2>
                                    </div>
                                </SwiperSlide>
                            )}
                                <SwiperSlide className="swiper-slide-cards relative bg-white/10 px-3 backdrop-blur rounded-3xl flex flex-row ">
                                    <div className="[writing-mode:vertical-rl] rotate-180">
                                        <span className=" text-white/30 font-bold">Estreia</span>
                                    </div>
                                    <div className="px-8">
                                        <h2 className="self-center text-3xl font-bold">{formattedDate(data.release_date||data.first_air_date)}</h2>
                                    </div>
                                </SwiperSlide>

                                <SwiperSlide className="swiper-slide-cards relative bg-white/10 px-3 backdrop-blur rounded-3xl flex flex-row ">
                                    <div className="[writing-mode:vertical-rl] rotate-180">
                                        <span className="text-white/30 font-bold ">{data.runtime?"Tempo":"Temporadas"}</span>
                                    </div>
                                    <div className="px-8">
                                        <h2 className="self-center text-3xl font-bold">{data.runtime||data.number_of_seasons} {data.runtime?"minutos":" Lançadas"} </h2>
                                    </div>
                                </SwiperSlide>   
                                {data.status&&(
                                <SwiperSlide className="swiper-slide-cards relative bg-white/10 px-3 backdrop-blur rounded-3xl flex flex-row ">
                                    <div className="[writing-mode:vertical-rl] rotate-180">
                                        <span className="text-white/30 font-bold ">Status</span>
                                    </div>
                                    <div className="px-8">
                                        <h2 className="self-center text-3xl font-bold">{formattedStatus(data.status)}</h2>
                                    </div>
                                </SwiperSlide>   
                                )}      
                                </Swiper>                        
                            </ul> 

                        </div>
                        
                        {/* descricao do filme/serie */}
                        <div className="flex flex-col ">
                            <h2 className="text-2xl text-white/40">Descrição</h2>
                            <p className="lg:w-[50vw] py-2">
                                {data.overview || "Ops! Parece que este filme ainda não possui uma descrição cadastrada.Mas não se preocupe! Mesmo sem sinopse oficial, você ainda pode aproveitar a experiência e descobrir por conta própria o que essa obra tem a oferecer."}
                            </p>
                        </div>
                            
                        {/* cast */}
                        <div className="flex flex-col gap-5">
                            <h2 className="text-2xl text-white/40">Atores relevantes</h2>
                            <div className="max-md:flex-wrap flex gap-5  lg:gap-20 ">
                            {casts.map((cast)=>(
                                <div className="flex flex-col lg:justify-center lg:items-center gap-1  max-md:p-2 max-md:w-[120px] max-md:overflow-hidden lg:p-0">
                                    <div className="rounded-4xl ">
                                        <img src={`${IMAGE_BASE_URL}/${cast.profile_path}`} className="w-[100px] h-[100px] object-cover rounded-full"/>
                                    </div>
                                    <div className="">
                                        <p className="text-center text-md font-semibold">{cast.name}</p>
                                        <p className="text-center text-sm text-white/30 truncate">{cast.character}</p>
                                    </div>
                                </div>
                            ))}
                            </div>
                        </div>
                        {/* <ColorPicker src={`${BACKDROP_BASE_URL}/${data.backdrop_path}`} setColor={setColor} imgRef ={imgRef} color ={color}/> */}


                    </div>

                </div>
                                    
            </div>
            <TabBar/>
        </div>
    );
}