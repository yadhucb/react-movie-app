import React, { useEffect, useState } from 'react'
import axios from '../axios'
import { API_KEY, imageUrl } from '../constants/constants'
import YouTube from 'react-youtube';
import Loading from './Loading';

const Search = ({ search }) => {
    const [movies, setMovies] = useState([])
    const [videoId, setVideoId] = useState()
    const [movieDetails, setMovieDetails] = useState()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        axios.get(`search/movie?api_key=${API_KEY}&query=${search}&page=1&include_adult=false`).then((resp) => {
            setMovies(resp.data.results)
            setLoading(false)
        })
    }, [search])


    function movieHandle(movie) {
        setLoading(true)

        axios.get(`movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`).then((resp) => {
            setVideoId(resp.data.results[0].key)
            setMovieDetails(movie)
            setLoading(false)
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
        <div className="">
            {loading ? <Loading /> : videoId &&
                <div className="row" id='video'>
                    <div className="col-lg-6">
                        <YouTube videoId={videoId} opts={opts} className='video ' />
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
                        <div className='search-items col-6'>
                            {loading ? <Loading /> : movie.backdrop_path &&
                                <div className='w-100'>
                                    <a href='#video'></a>
                                    <img className='p-3 w-100' role='button' alt='poster' src={`${imageUrl + movie.backdrop_path}`}
                                        onClick={() => movieHandle(movie)}
                                    />
                                    <a />
                                    <h5 className='movie-title p-2 m-0'>{movie.title}</h5>
                                </div>
                            }
                        </div>
                    )
                })}
            </div>


        </div >
    )
}

export default Search