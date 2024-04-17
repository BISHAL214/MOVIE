import React, {useState} from 'react'

import {ContentWrapper, SwitchTabs, Carousel} from '../../../components/index'
import useFetch from '../../../hooks/useFetch'

const TopRated = () => {

    const [endPoint, setEndPoint] = useState("movie")

    const {data, loading} = useFetch(`/${endPoint}/top_rated`)

    const onTabChange = (tab) => {
        setEndPoint(tab === "Movies" ? "movie" : "tv")
    }

  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <span className='carouselTitle'>Top Rated</span>
            <SwitchTabs data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
        </ContentWrapper>
        <Carousel data={data?.results}  endPoint={endPoint} loading={loading} />
    </div>
  )
}

export default TopRated
