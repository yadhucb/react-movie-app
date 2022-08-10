import React, { useState } from 'react'
import { Link } from "react-router-dom";

const NavBar = ({ setSearch }) => {
    const [searchQuery, setSearchQuery] = useState()
    return (
        <div>
            <nav className="navbar bg-dark">
                <div className="container-fluid">
                    <Link to='/' className="navbar-brand" style={{ color: 'red' }}>MOVIE</Link>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                            onChange={(e) => { setSearchQuery(e.target.value) }}
                        />
                        <Link to='search' onClick={(e) => { setSearch(searchQuery) }} className="btn btn-outline-danger">Search</Link>
                    </form>
                </div>
            </nav>
        </div>
    )
}

export default NavBar