"use client"
import Banner from "@/components/banner";
import Header from "@/components/header";
import Movies from "@/components/movies";
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
  const[horrorMovies, setHorrorMovies] = useState([]);
  const[nowPLayingMovies, setNowPlayingMovies] = useState([]);
  const [genre, setGenre] = useState([]);


  useEffect( ()=>{
    fetchPopularData();
    fectchNowPLayingData();
    fetchGenre();
    fetchHorrorMovies();
  },[]);
  //sem parametro, acionamento automatico qunado iniciar
    
  const fetchPopularData = async () =>{
    try {
      //url para acessar os filmes populares no caso
      const popularResponse = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR`);
      const popularData = await popularResponse.json();
      
      setPopularMovies(popularData.results);
      //popularData.results armazena o array com "20" objetos no caso os filmes populares
      
    }
    catch(e){
      console.error(e);
    }
  }

  const fectchNowPLayingData = async () =>{
        try {

      const nowPLayingResponse = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=pt-BR`);
      const nowPLayingData = await nowPLayingResponse.json();

      setNowPlayingMovies(nowPLayingData.results);
    }
    catch(e){
      console.error(e);
    }
  }

  // const[ ]

  //================================agr tratar os generos para =======================================
  const fetchGenre = async () =>{
    try{
      const genreResponse = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=pt-BR`);
      const genreData = await genreResponse.json();
      
      setGenre(genreData.genres);
    }catch(e){
      console.error(e)
    }

  }
  
  const mapGenreIdsToNames = (movies, genres) =>{//reduce transforma array em objeto de busca
    const genreMap = genres.reduce((acc,genre) => {
        acc[genre.id] = genre.name;//acc[878] = "ficção cientifica"
        return acc; //retorna para ser reutilizado
    },{})

    return movies.map( (movie) =>({
      ...movie,
      //Oque o gerneMap: 

    // {
      //   878: "Ficção científica",
      //   53: "Thriller", 
      //   16: "Animação",
      //   18: "Drama"
    // }
      genreNames:movie.genre_ids.map(genreId => genreMap[genreId]).filter(Boolean)
    }));
  }

  useEffect(()=>{
    if (nowPLayingMovies.length > 0 && genre.length > 0 && !nowPLayingMovies[0]?.genreNames){
      setNowPlayingMovies(mapGenreIdsToNames(nowPLayingMovies,genre));
    }
    if( popularMovies.length > 0 && genre.length > 0 && !popularMovies[0]?.genreNames){
      setPopularMovies(mapGenreIdsToNames(popularMovies,genre))
    }
  },[genre])

 const fetchHorrorMovies = async () => {
  try {
    const results = [];
    for (let i = 1 ; i <=3; i++) {
        const horrorMoviesResponse = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&language=pt-BR&with_genres=27&page=${i}`)
        const horrorMoviesData = await horrorMoviesResponse.json();

        results.push(...horrorMoviesData.results);
    }
    setHorrorMovies(results);
  } catch (error) {
      console.error(error);
  }
 }


  return (
    <div className="all-home min-h-screen bg-gray-900 text-white flex p-10 gap-8">

      {/* tag criada no componets */}
      <Sidebar BASE_URL={BASE_URL} API_KEY={API_KEY} IMAGE_BASE_URL={IMAGE_BASE_URL}/>
      <main className=" flex-1 flex flex-col gap-8  justify-center ">
        <Header/>
        <div className= "flex-1 flex flex-col max-w-[1600px] self-center gap-8 ">
          <section className="flex flex-1 ">
            <Banner BACKDROP_BASE_URL={BACKDROP_BASE_URL} item={nowPLayingMovies}/>
          </section>
          <section className="">
            <Movies IMAGE_BASE_URL={IMAGE_BASE_URL} item={popularMovies} title='Filmes populares' />
            <Movies IMAGE_BASE_URL={IMAGE_BASE_URL} item={horrorMovies} title='Filmes de terror' />
          </section>
        </div>
      </main>
    </div>
  );
}
