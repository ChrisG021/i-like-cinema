"use client"
import { FaStar, FaPlay  } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import './style.css';

import Link from "next/link";
export default function Movies({IMAGE_BASE_URL, item, title ,menuItem}) {

    return(
    <div className="relative w-full">
        <div className="flex flex-1 flex-col  ">
            <h2 className="px-5 lg:px-0 text-lg mb-2 font-bold ">{title}</h2>
            <Swiper
                    slidesPerView={'auto'}
                    spaceBetween={12}
                    className="swiper-movies  w-full pr-10"
                >
                    {item.map((movies,index) =>(
                        <SwiperSlide key={index} className=" swiper-slide-movies" >
                            {/* tecnica isaque */}
                        
                            <Link href={`/details/${menuItem.value}/${movies.id}`} className={`relative hover:cursor-pointer group`}>                                
                                {/* grupo geral */}
                                <div className="group-hover:scale-95 transition-all duration-500">
                                    
                                    <img src={`${IMAGE_BASE_URL}/${movies.poster_path}`} />
                                    
                                    {/* overlay */}
                                    <div className="rounded-xl absolute  inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                                    {/* componentes dentro do filme */}
                                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 w-full h-full abolute inset-0 ">
                                        <div className="flex flex-row gap-2 px-2 py-1 rounded-4xl bg-black/30 backdrop-blur-md top-1 right-1 lg:top-3 lg:right-2 z-2 absolute">
                                            <p className="text-sm font-bold">{movies.vote_average.toFixed(1)}</p>
                                            <FaStar className="text-yellow-300"/>
                                        </div>
                                        <div className="text-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                            <FaPlay/>
                                        </div>
                                    </div>

                                </div>

                            </Link>

                            {/* keywords */}
                            <div>
                                <p className={`${index===0?"pl-5 lg:pl-0 ":""} text-md text-white mt-2 `}>{movies.title}</p>
                                <div className={`flex gap-1 mt-1 flex-wrap ${index===0?"pl-5 lg:pl-0 ":""}`}>
                                    {movies?.genreNames?.map((genreName,index) =>(
                                        <span className="bg-gray-800 rounded-xl text-sm px-2 py-1" key={index}>{genreName}</span>
                                    ))}
                                </div>
                            </div>
                            
                        </SwiperSlide>   
                    ))}
                </Swiper>
        </div>
        
    </div>
   ); 
}

{/* <Swiper
                            navigation={true}
                            slidesPerView={5}
                            spaceBetween={10}
                            pagination={{
                                clickable: true,
                            }}
                            breakpoints={{
                                1280: {
                                    slidesPerGroup: 5,
                                    slidesPerView: 5,
                                    spaceBetween: 10,
                                },
                                930: {
                                    slidesPerGroup: 5,
                                    slidesPerView: 5,
                                    spaceBetween: 10,
                                },
                                700: {
                                    slidesPerGroup: 4,
                                    slidesPerView: 4,
                                    spaceBetween: 10,
                                },
                                500: {
                                    slidesPerGroup: 3,
                                    slidesPerView: 3,
                                    spaceBetween: 10,
                                },
                                300: {
                                    slidesPerGroup: 2.3,
                                    slidesPerView: 2.3,
                                    spaceBetween: 10,
                                },
                                330: {
                                    slidesPerGroup: 2,
                                    slidesPerView: 2,
                                    spaceBetween: 10,
                                },
                                100: {
                                    slidesPerGroup: 2,
                                    slidesPerView: 2,
                                    spaceBetween: 10,
                                },

                            }}
                            modules={[Navigation]}
                            className='astrosSwiper swiperMobileAstors'
                        > */}