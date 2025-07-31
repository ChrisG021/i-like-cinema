import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ArrowRight } from "lucide-react";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "./style.css"

import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function Banner({BACKDROP_BASE_URL, popularMovies}) {
  return (
    <div className="h-[600px] w-full rounded-4xl overflow-hidden relative">
    {popularMovies&&(
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: false,
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {popularMovies.map((movies)=>(
        <SwiperSlide className='swiper_slide'>
            <img className='object-cover w-full' src={`${BACKDROP_BASE_URL}${movies.backdrop_path}`}/>
            <div className='p-8 flex flex-col justify-between absolute -red-800 w-full h-full zindex-100'>
                <div className='zindex'>
                    <span className='teste p-2 rounded-4xl'>🔥 Now popular</span>
                </div>
                <div className='flex flex-col max-w-150 gap-4 zindex'>
                    <h2 className='text-4xl font-bold'>{movies.title}</h2>
                    <p className='line-clamp-4'>{movies.overview}</p>
                    <button className='flex flex-row w-fit bg-white text-black gap-4 px-4 py-2 rounded-4xl'>Saiba Mais <ArrowRight/></button>
                </div>
            </div>
        </SwiperSlide>
        ))}
      </Swiper>
    )}
    </div>
  );
}
