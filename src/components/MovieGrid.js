import React, { useState } from 'react'
import axios from '../axios'
import { API_KEY, imageUrl } from '../constants/constants'
import YouTube from 'react-youtube';
import Loading from './Loading';

const MovieGrid = ({ movies }) => {
    const [videoId, setVideoId] = useState()
    const [movieDetails, setMovieDetails] = useState()
    const [loading, setLoading] = useState(false)
    const [loadingVideo, setLoadingVideo] = useState(false)

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
            {loadingVideo ? <Loading /> : videoId &&
                <div className="row bg-dark" id='video'>

                    <div className="col-lg-6">
                        <YouTube videoId={videoId} opts={opts} className='video' />
                    </div>
                    <div className="col-lg-6 p-2">
                        <h4>{movieDetails.title}</h4>
                        <em>Language:{movieDetails.original_language}</em><br />
                        <em>Popularity:{movieDetails.popularity} </em><br />
                        <em>Release date:{movieDetails.release_date} </em>
                        <hr />
                        <p>{movieDetails.overview}</p>
                    </div>

                </div>
            }
            <div className='row'>


                {movies.map((movie, index) => {
                    return (
                        <>
                            {loading ? <Loading /> : movie.backdrop_path &&
                                <div className='col-6 col-lg-2 p-2 m-0' key={movie.id}>

                                    <a href='#video'>
                                        <img className='poster movie-grid' role='button' alt='poster' src={`${imageUrl + movie.backdrop_path}`}
                                            onClick={() => movieHandle(movie)}
                                        />
                                    </a>
                                    <h5 className='movie-title p-2 m-0'>{movie.title}</h5>
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