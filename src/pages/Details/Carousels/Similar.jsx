import React from 'react'

import {Carousel} from '../../../components/index'
import useFetch from '../../../hooks/useFetch'

const Similar = ({ mediaType, id }) => {

    const {data, loading, error} = useFetch(`/${mediaType}/${id}/similar`)

    const title = mediaType === 'tv' ? "Similar TV Shows" : "Similar Movies";

  return (

    <>
    {data?.results.length > 0 ? 
        <Carousel
        title={title}
        data={data?.results}
        loading={loading}
        endPoint={mediaType}
    /> : error  
}
</>

  )
}



export default Similar
