import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './HeroBanner.scss'

import { useSelector } from 'react-redux'

import useFetch from '../../../hooks/useFetch'
import { Img, ContentWrapper } from '../../../components/index'

const HeroBanner = () => {

    const navigate = useNavigate()
    const { url } = useSelector((state) => state.home)


    const [background, setBackground] = useState("")
    const [query, setQuery] = useState("")

    const { data, loading } = useFetch("/movie/upcoming")

    useEffect(() => {
        const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
        setBackground(bg);
    }, [data])


    const searchQueryHandle = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`)
        }
    }


    return (
        <div className="heroBanner">

            {!loading && (<div className='backdrop-img'>
                <Img src={background} />
            </div>)}

            <div className='opacity-layer'></div>

            <ContentWrapper>

                <div className='heroBannerContent'>
                    <span className='title'>Welcome.</span>
                    <span className='subTitle'>Millions of movies, TV shows and people to discover. <br />
                        Explore Now.
                    </span>

                    <div className='searchInput'>
                        <input
                            type="text"
                            placeholder='Search for movies or TV shows......'
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyUp={searchQueryHandle}
                        />
                        <button>Search</button>
                    </div>

                </div>

            </ContentWrapper>

        </div>
    )
}

export default HeroBanner
