import React, { useState } from 'react'
import Banner from './Banner'
import Category from './Category'
import MovieGrid from './MovieGrid'
import MovieList from './MovieList'

const Home = () => {
    const [movies, setMovies] = useState(false)
    const [loading, setLoading] = useState(false)
    return (
        <div>
            <Banner />
            <Category setLoading={setLoading} setMovies={setMovies} />
            {movies ?
                <MovieGrid loading={loading} movies={movies} />
                : <div className='mb-3'>
                    <MovieList type='movie' query='now_playing' title='Now Playing' />
                    <MovieList type='movie' query='popular' title='Popular' />
                    <MovieList type='movie' query='top_rated' title='Top Rated' />

                </div>
            }

        </div>
    )
}

export default Home