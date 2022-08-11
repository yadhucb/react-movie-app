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

import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const MovieList = ({ query, title, type }) => {
    const [movies, setMovies] = useState([])
    const [videoId, setVideoId] = useState()
    const [movieDetails, setMovieDetails] = useState()
    const [loading, setLoading] = useState(false)
    const [loadingVideo, setLoadingVideo] = useState(false)
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        setLoading(true)
        axios.get(`${type}/${query}?api_key=${API_KEY}&language=en-US&w=5&page=${Math.floor(Math.random() * 11)}`).then((resp) => {
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
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }} color="inherit">
                    <Toolbar>


                        <IconButton

                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>


                {loadingVideo ? <Loading /> : videoId ?
                    <div className="bg-dark text-light" id='video'>
                        <div className="">
                            <YouTube videoId={videoId} opts={opts} className='video ' />
                        </div>
                        <div className=" p-2">
                            <h4>{movieDetails.title}</h4>
                            <em>Language:{movieDetails.original_language}</em><br />
                            <em>Popularity:{movieDetails.popularity} </em><br />
                            <em>Release date:{movieDetails.release_date} </em>
                            <hr />
                            <p>{movieDetails.overview}</p>
                        </div>

                    </div> : <h4 className='text-muted text-center mt-5'>No video available</h4>
                }
            </Dialog>
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
                    {loading ? <Loading /> : movies && movies.map((movie, index) => {
                        return (
                            <div key={index}>
                                {movie.backdrop_path &&
                                    <SwiperSlide onClick={handleClickOpen} style={{ position: 'relative' }}>
                                        <div onClick={handleClickOpen}>
                                            <img className='poster' role='button' alt='poster' src={`${imageUrl}/w200${movie.backdrop_path}`}
                                                onClick={() => movieHandle(movie)}

                                            />
                                        </div>
                                        <h6 className='movie-title p-2 m-0' style={{ position: 'absolute' }}>{movie.title} </h6>
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