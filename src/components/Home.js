import React, { useState } from 'react'
import Banner from './Banner'
import Category from './Category'
import MovieGrid from './MovieGrid'
import MovieList from './MovieList'

const Home = () => {
    const [movies, setMovies] = useState(false)
    return (
        <div>
            <Banner />
            <Category setMovies={setMovies} />
            {movies ?
                <MovieGrid movies={movies} />
                : <div className='mb-3'>
                    <MovieList type='movie' query='now_playing' title='Now Playing' />
                    <MovieList type='movie' query='popular' title='Popular' />
                    <MovieList type='movie' query='top_rated' title='Top Rated' />
                    <MovieList type='tv' query='top_rated' title='Top Rated on TV' />

                </div>
            }

        </div>
    )
}

export default Home