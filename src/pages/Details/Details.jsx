import React from 'react'
import './Details.scss'
import {useParams} from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import DetailsBanner from './DetailsBanner/DetailsBanner'
import Cast from './Cast/Cast'
import VideosSection from './VideosSection/VideosSection'
import Similar from './Carousels/Similar'
import Recomm from './Carousels/Recomm'


const Details = () => {

  const { mediaType, id } = useParams()
  const {data, loading} = useFetch(`/${mediaType}/${id}/videos`)
  const {data: credits, loading: creditsLoading} = useFetch(`/${mediaType}/${id}/credits`)

  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
      <Cast  data={credits?.cast} loading={creditsLoading} />
      <VideosSection data={data} loading={loading} />
      <Similar mediaType={mediaType} id={id} />
      <Recomm mediaType={mediaType} id={id} />
    </div>
  )
}

export default Details
