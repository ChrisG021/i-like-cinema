import { Diameter } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import './style.css';

// import required modules
import { Pagination } from 'swiper/modules';

export default function Movies({IMAGE_BASE_URL, item, title}) {
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
                        <SwiperSlide key={index} className={` swiper-slide-movies hover:cursor-pointer ${index===0?"pl-5 lg:pl-0 ":""} ${index===item.length-1?"pr-5 lg:pr-10":""}`}>
                            <div>
                                <img src={`${IMAGE_BASE_URL}/${movies.poster_path}`} />
                            </div>
                            <div>
                                <p>{movies.genres}</p>
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