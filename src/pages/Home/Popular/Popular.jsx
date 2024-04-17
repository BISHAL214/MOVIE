import React, {useState} from 'react'

import {ContentWrapper, SwitchTabs, Carousel} from '../../../components/index'
import useFetch from '../../../hooks/useFetch'

const Popular = () => {

    const [endPoint, setEndPoint] = useState("movie")

    const {data, loading} = useFetch(`/${endPoint}/popular`)

    const onTabChange = (tab) => {
        setEndPoint(tab === "Movies" ? "movie" : "tv")
    }

  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <span className='carouselTitle'>What's Popular</span>
            <SwitchTabs data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
        </ContentWrapper>
        <Carousel data={data?.results}  endPoint={endPoint} loading={loading} />
    </div>
  )
}

export default Popular
