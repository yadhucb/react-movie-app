import React, { useState } from 'react'
import axios from '../axios'
import { API_KEY, imageUrl } from '../constants/constants'
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

const MovieGrid = ({ movies, loading }) => {
    const [videoId, setVideoId] = useState()
    const [movieDetails, setMovieDetails] = useState()
    const [loadingVideo, setLoadingVideo] = useState(false)
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
        <div className='mb-3'>
            <h4 className='px-3'></h4>
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
            <div className='row'>


                {loading ? <Loading /> : movies.map((movie, index) => {
                    return (
                        <>
                            {movie.backdrop_path &&
                                <div className='col-6 col-lg-2 p-2 m-0' style={{ position: 'relative' }} key={movie.id}
                                    onClick={handleClickOpen}
                                >

                                    <img className='poster movie-grid' role='button' alt='poster' src={`${imageUrl}/w200${movie.backdrop_path}`}
                                        onClick={() => movieHandle(movie)}
                                    />
                                    <h6 className='movie-title p-2 m-0' style={{ position: 'absolute', zIndex: '10', top: '50%' }}>{movie.title} </h6>
                                </div>
                            }
                        </>
                    )
                })}
            </div>
        </div>
    )

}



export default MovieGrid