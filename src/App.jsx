import Card from './components/card';
import './App.css';
import { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import { CiLogout } from "react-icons/ci";
import { FaRegHandPeace } from "react-icons/fa";



function App() {
  const {user,isAuthenticated,loginWithRedirect,logout} = useAuth0()
  const [intital,setInitial] = useState([])
  const [searchText,setSearchText] = useState("")
  const [page,setPage] = useState(1)
  const [loading,setLoading] =  useState(0)


  function login(){
  }

  async function cacheData(key){
    const data ={
      value:key,
      expiry:  new Date().getTime() + 5 * 60 * 1000
    }
    await localStorage.setItem(searchText,JSON.stringify(data)) 
  }

  function getkey(key){
    try{      
      const data = localStorage.getItem(key)
      if(data == null) return;
      const currentTime = new Date().getTime() ;
      const item = JSON.parse(data)
      if(currentTime > item.expiry){
         localStorage.removeItem(key)
         return null
      }
      return item
    }
    catch(error){
      localStorage.removeItem(key)
      console.log(error)
    }
  }

  async function getInitialData(page){
    if(loading)return;
    setLoading(true)
    const response = await axios.get(`https://www.omdbapi.com/?s=2025&page=${page}&apikey=7df11147`)
        if(response.data.Response === "True"){
          if(intital.length>0){
            setInitial((prev) => [...prev,...response.data.Search])
          }
          else{
            setInitial(response.data.Search)
          }
        }
    setLoading(false)
  }

  async function getSearchDetails(){
    const cache = getkey(searchText)
    if(cache){
      setInitial(cache.value)
      return;
    }
    const response = await axios.get(`http://www.omdbapi.com/?s=${searchText}&page={1}&apikey=7df11147`)
    if(response.data.Response === "True"){
      setInitial(response.data.Search)
      cacheData(response.data.Search)
    }
  }

  function handleScroll(){
      const bottom =Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 200;
      if(bottom){
        setPage((prevPage) =>  prevPage +1)
      }
  }

  useEffect(() => {
    window.addEventListener('scroll',handleScroll);
    return () => {
      window.removeEventListener('scroll',handleScroll)
    }
    
  },[])
  
  useEffect(() => {
      getInitialData(page)
  },[page])

  return (
    <div className='container'>
      <div className='navbar'>
        <div className="logo"  onClick={() => {
          setInitial([])
          setPage(1)
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
          {/* <div className='btn'>
            <a href="#">Sign Up</a>
          </div> */}
        </div>
      </div>

      <div className="trending">
        <div className="trending-title">
          <h3>Trending Now</h3>
        </div>
        <div className="cards-layout">
          {intital && intital.map((item,index) => {
            return(
              item.Poster &&
              <Card item={item} key={index}/>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default App;


// Z29HDGSXXHV9HTCV2ZWWN9MJ