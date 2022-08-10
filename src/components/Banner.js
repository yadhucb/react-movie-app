import { height } from '@mui/system'
import React, { useEffect, useState } from 'react'
import axios from '../axios'
import { API_KEY, imageUrl } from '../constants/constants'

const Banner = () => {
    const [movie, setMoview] = useState([])
    useEffect(() => {
        axios.get(`trending/all/week?api_key=${API_KEY}`).then((resp) => {
            setMoview(resp.data.results[Math.floor(Math.random() * 11)])
        })
    }, [])

    return (
        <div className='banner' style={{ backgroundImage: `linear-gradient(180deg, transparent, rgba(37, 37, 37, .61), #111), url(${imageUrl + movie.backdrop_path})` }}>
            <div className='content text-light p-3' >
                <h4 className=''>{movie.title}</h4>
                <p className='d-none d-lg-block'>{movie.overview}</p>
            </div>
            <div className="fade_bottom"></div>
        </div>
    )
}

export default Banner