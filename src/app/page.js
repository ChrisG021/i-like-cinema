"use client"
import Banner from "@/components/banner";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { useEffect, useState } from "react";

export default function Home() {

  //url base da API TMDB
  const BASE_URL = "https://api.themoviedb.org/3";
  const API_KEY = "9f44bb5cb496bc17bb97b5d2b65c7bc6";

  //url para mostra as imagens e backdrop
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
  const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/original';

  const[popularMovies, setPopularMovies] = useState([]);

  useEffect( ()=>{
    fetchData();
  },[]);
  //sem parametro, acionamento automatico qunado iniciar
  
  const fetchData = async () =>{
    try {
      //url para acessar os filmes populares no caso
      const popularResponse = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR`);
      const popularData = await popularResponse.json();
      
      setPopularMovies(popularData.results);
      console.log(popularMovies);
      //popularData.results armazena o array com "20" objetos no caso os filmes populares
      
    }
    catch(e){
      console.error(e);
    }
  }
  
  return (
    <div className="all-home min-h-screen bg-gray-900 text-white flex p-10 gap-8">

      {/* tag criada no componets */}
      <Sidebar BASE_URL={BASE_URL} API_KEY={API_KEY} IMAGE_BASE_URL={IMAGE_BASE_URL}/>
      <main className=" flex-1 flex flex-col gap-8  justify-center ">
        <Header/>
        <div className="flex-1 flex flex-col max-w-[1600px]">
        <section className="flex flex-1 ">
          <Banner BACKDROP_BASE_URL={BACKDROP_BASE_URL} popularMovies={popularMovies}/>
        </section>
        </div>
      </main>
    </div>
  );
}
