import { useState, useEffect } from 'react'
import {fetchDataFromApi} from './utils/Api'

import {BrowserRouter, Route, Routes} from 'react-router-dom'

import {useSelector, useDispatch} from 'react-redux'

import {getApiConfiguration, getGenres} from './store/homeSlice'

import {Home, PageNotFound, Details, Explore, SearchResult} from './pages/index'
import {Header, Footer} from './components/index'

function App() {

  const dispatch = useDispatch()
  const url = useSelector((state) => state.home.url);

  useEffect(() => {
    apiTesting()
    genresCall()
  }, [])

  const apiTesting = () => {
    fetchDataFromApi('/configuration')
    .then((res) => {
      console.log(res);
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };
      dispatch(getApiConfiguration(url))
    })
  }

  const genresCall = async () => {
    let promises = []
    let endPoints = ["tv", "movie"]
    let allGenres = {}

    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`))
    })

    const data = await Promise.all(promises)
    data.map(({genres}) => {
      return genres.map((item) => (allGenres[item.id] = item))
    })
    
    dispatch(getGenres(allGenres))
  }

  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/:mediaType/:id" element={ <Details /> } />
        <Route path="/search/:query" element={ <SearchResult /> } />
        <Route path="/explore/:mediaType" element={ <Explore /> } />
        <Route path="*" element={ <PageNotFound /> } />
      </Routes>
    <Footer />
    </BrowserRouter>
  )
}

export default App
