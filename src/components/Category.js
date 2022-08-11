import React, { useEffect, useState } from 'react'
import axios from '../axios'
import { API_KEY } from '../constants/constants'
import '@splidejs/react-splide/css';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
// import required modules
import { FreeMode } from "swiper";

const Category = ({ setMovies, setLoading }) => {

    const [category, setCategory] = useState([])
    useEffect(() => {
        setLoading(true)
        axios.get(`genre/movie/list?api_key=${API_KEY}&language=en-US&page=1`).then((resp) => {
            setCategory(resp.data.genres)
        })
        setLoading(false)

    }, [])
    function handleCategory(category) {
        axios.get(`discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${category.id}`).then((resp) => {
            setMovies(resp.data.results)
        })
    }

    return (
        <div className='ms-2'>
            <h4 className='px-3'></h4>
            <div className='posters'>
                <Swiper

                    slidesPerView={2.5}
                    breakpoints={{
                        767: { slidesPerView: 6.5 },
                    }}
                    spaceBetween={10}
                    freeMode={true}
                    modules={[FreeMode]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <div className="category bg-dark text-light rounded d-flex align-items-center justify-content-center" role='button'
                            onClick={() => setMovies(false)}
                        >
                            <h4 className='p-3'>Home</h4>
                        </div>
                    </SwiperSlide>
                    {category.map((category, index) => {
                        return (
                            <div key={index}>

                                <SwiperSlide>
                                    <div className="category bg-dark text-light rounded d-flex align-items-center justify-content-center" role='button'
                                        onClick={() => handleCategory(category)}
                                    >
                                        <h4 className='p-3'>{category.name}</h4>
                                    </div>
                                </SwiperSlide>
                            </div>
                        )
                    })}
                </Swiper>
            </div>
        </div>
    )

}

export default Category