import Card from './components/card';
import './App.css';
import { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import { CiLogout } from "react-icons/ci";
import { FaRegHandPeace } from "react-icons/fa";
import {CopperLoading} from 'respinner'
import throttle from 'lodash.throttle';


function App() {
  const {user,isAuthenticated,isLoading,loginWithRedirect,logout} = useAuth0()
  const {REACT_APP_OMDB_API_KEY} = process.env
  const [intital,setInitial] = useState([])
  const [searchText,setSearchText] = useState("")
  const [page,setPage] = useState(1)
  const [searchPage,setSearchPage] = useState(1)
  const [totalResults,setTotalResults] = useState(1)
  const [loading,setLoading] =  useState(false)
  const [searching,setSearching] = useState(false)

  // Stores the results of a search - caching
  function cacheData(value){
    const data ={
      value,
      expiry:  new Date().getTime() + 5 * 60 * 1000
    }
    localStorage.setItem(`${searchText}-${searchPage}`,JSON.stringify(data)) 
  }

  // Retrieves Results If Exists From LocalStorage
  function getkey(){
    try{      
      const data = localStorage.getItem(`${searchText}-${searchPage}`)
      if(data == null) return;
      const currentTime = new Date().getTime() ;
      const item = JSON.parse(data)
      if(currentTime > item.expiry){
         localStorage.removeItem(`${searchText}-${searchPage}`)
         return null
      }
      return item
    }
    catch(error){
      localStorage.removeItem(`${searchText}-${searchPage}`)
      console.log(error)
    }
  }

  // Fetching The Initial Data
  async function getInitialData(page){
    if(intital.length >= totalResults)return;
    // setLoading(true)
    try{
      const response = await axios.get(`https://www.omdbapi.com/?s=2025&page=${page}&apikey=${REACT_APP_OMDB_API_KEY}`)
          if(response.data.Response === "True"){
            setTotalResults(Number(response.data.totalResults))
            if(intital.length>0){
              setInitial((prev) => [...prev,...response.data.Search])
            }
            else{
              setInitial(response.data.Search)
            }
          }
    }
    catch(error){
      console.log(error)
    }
    setLoading(false)
  }

  // Fetch any searched movies
  async function getSearchDetails(){
    if(intital.length >= totalResults) return;
    setSearching(true)
    setInitial([])
    setLoading(true)
    
    const cache = getkey()
    if(cache){
      setInitial(cache.value)
      setLoading(false)
      return;
    }
    try{
      const response = await axios.get(`http://www.omdbapi.com/?s=${searchText}&page=${searchPage}&apikey=${REACT_APP_OMDB_API_KEY}`)
      if(response.data.Response === "True"){
        setTotalResults(Number(response.data.totalResults))
        setInitial(response.data.Search)
        cacheData(response.data.Search)
        setSearchPage(2)
      }
    }
    catch(error){
      console.log(error)
    }
    setLoading(false)
  }
  
  // Fetching data when scrolling
  async function getSearchData(){
    const cache = getkey()
    if(cache){
      setInitial((prev) => [...prev,...cache.value])
      setLoading(false)
      return;
    }
    try{
      const response = await axios.get(`http://www.omdbapi.com/?s=${searchText}&page=${searchPage}&apikey=${REACT_APP_OMDB_API_KEY}`)
      if(response.data.Response === "True"){
        setInitial((prev)=>[...prev,...response.data.Search])
        cacheData(response.data.Search)

      }
    }
    catch(error){
      console.log(error)
    }
  }

  // Creates a trigger if the user has scrolled to the end
  function handleScroll(){
      const bottom =Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight -500;
      if(bottom){
        if(searching){
         setSearchPage((prevPage) => prevPage + 1) 
        }
        else{
          setPage((prevPage) =>  prevPage +1)
        }
      }
  }

  useEffect(() => {
    setLoading(true)
    const throttledScroll = throttle(handleScroll,3000)
    window.addEventListener('scroll',throttledScroll);
    return () => {
      window.removeEventListener('scroll',throttledScroll)
    }
    
  },[searching])
  
  useEffect(() => {
      if (!searching){
        getInitialData(page)
      }
  },[page])

  useEffect(() => {
    if(searching &&  searchPage>1){
      getSearchData(searchPage)
    }
  },[searchPage])

  useEffect(() =>{
      if(!isLoading && !isAuthenticated){
        loginWithRedirect()
      }
  },[isLoading,isAuthenticated])
  
  return (
    <div className='container'>
      <div className='navbar'>
        <div className="logo"  onClick={() => {
          setInitial([])
          setPage(1)
          setSearchText("")
          setSearching(false)
          getInitialData(1)
        }}>
          <h1>STEARIFY.</h1>
        </div>
        <div className='input-field'>
          <input type="text" placeholder='Search for a movie/tv-show' value={searchText} onChange={(e) =>  setSearchText(e.target.value)}/>
          <div className="search" onClick={getSearchDetails}>
            <p>Search</p>
          </div>
        </div>
        <div className='logins'>
          {isAuthenticated ?
            <div className='btn outline'>
              <p>Hi, {user.nickname}<FaRegHandPeace/></p>
              <div className='logout'  onClick={() => logout({logoutParams:{returnTo:window.location.origin}})}>
                <CiLogout color='#fff'/>
              </div>
            </div>
                          :
            <div className='btn login' onClick={loginWithRedirect}>
              <a href="#">Sign In</a>
            </div>
        }
        </div>
      </div>

      {isLoading?
        <div className='loader'>
          <CopperLoading fill='#fff' size={50}/> 
        </div>
              :
        <div className="trending">
          <div className="trending-title">
            <h3>{searching?`Search Results For ${searchText}`:'Trending Now'}</h3>
          </div>
          <div className="cards-layout">
            {intital && intital.map((item,index) => {
              if(item.Poster.length>10){
                return(
                  item.Poster &&
                  <Card item={item} key={index}/>
                )
              }
            })}
          </div>
          {loading && <div className='loader'>
          <CopperLoading fill='#fff' size={50}/> 
        </div>}
        </div>
      }

    </div>
  );
}


export default App;

