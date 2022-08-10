import React, { useEffect, useState } from 'react'
import axios from '../axios'
import { API_KEY, imageUrl } from '../constants/constants'
import '@splidejs/react-splide/css';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
// import required modules
import { FreeMode } from "swiper";
import YouTube from 'react-youtube';
import Loading from './Loading';

const MovieList = ({ query, title, type }) => {
    const [movies, setMovies] = useState([])
    const [videoId, setVideoId] = useState()
    const [movieDetails, setMovieDetails] = useState()
    const [loading, setLoading] = useState(false)
    const [loadingVideo, setLoadingVideo] = useState(false)
    useEffect(() => {
        setLoading(true)
        axios.get(`${type}/${query}?api_key=${API_KEY}&language=en-US&page=${Math.floor(Math.random() * 11)}`).then((resp) => {
            setMovies(resp.data.results)
            setLoading(false)
        })

    }, [])
    function movieHandle(movie) {
        setLoadingVideo(true)

        axios.get(`movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`).then((resp) => {
            setVideoId(resp.data.results[0].key)
            setMovieDetails(movie)
            setLoadingVideo(false)
        })
    }

    const opts = {

        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters 
            autoplay: 0,
        },
    };


    return (
        <div className='ms-2'>
            <h4 className='px-3 mt-3'>{title}</h4>
            {loadingVideo ? <Loading /> : videoId &&
                <div className="row">
                    <div className="col-lg-6">
                        <YouTube videoId={videoId} opts={opts} className='video ' />
                    </div>
                    <div className="col-lg-6">
                        <h4>{movieDetails.title}</h4>
                        <em>Language:{movieDetails.original_language}</em><br />
                        <em>Popularity:{movieDetails.popularity} </em><br />
                        <em>Release date:{movieDetails.release_date} </em>
                        <hr />
                        <p>{movieDetails.overview}</p>
                    </div>

                </div>
            }
            <div className='posters'>
                <Swiper

                    slidesPerView={2.5}
                    breakpoints={{
                        767: { slidesPerView: 5.5 },
                    }}
                    spaceBetween={10}
                    freeMode={true}
                    modules={[FreeMode]}
                    className="mySwiper"
                >
                    {movies && movies.map((movie, index) => {
                        return (
                            <div key={index}>
                                {loading ? <Loading /> : movie.backdrop_path &&
                                    <SwiperSlide>
                                        <img className='poster' role='button' alt='poster' src={`${imageUrl + movie.backdrop_path}`}
                                            onClick={() => movieHandle(movie)}
                                        />
                                    </SwiperSlide>
                                }
                            </div>
                        )
                    })}
                </Swiper>
            </div>
        </div>
    )

}

export default MovieList