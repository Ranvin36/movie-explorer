import Card from './components/card';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [intital,setInitial] = useState([])
  const [searchText,setSearchText] = useState("")

  async function getInitialData(){
    const response = await axios.get('https://www.omdbapi.com/?s=2025&page=1&apikey=7df11147')
    setInitial(response.data.Search)
  }

  async function getSearchDetails(){
    const response = await axios.get(`http://www.omdbapi.com/?s=${searchText}&page={1}&apikey=7df11147`)
    console.log(response.data)
     setInitial(response.data.Search)
  }

  useEffect(() => {
    getInitialData()
  },[])

  return (
    <div className='container'>
      <div className='navbar'>
        <div className="logo"  onClick={getInitialData}>
          <h1>STEARIFY.</h1>
        </div>
        <div className='input-field'>
          <input type="text" placeholder='Search for a movie/tv-show' onChange={(e) =>  setSearchText(e.target.value)}/>
          <div className="search" onClick={getSearchDetails}>
            <p>Search</p>
          </div>
        </div>
        <div className='logins'>
          <div className='btn outline'>
            <a href="#">Sign In</a>
          </div>
          <div className='btn'>
            <a href="#">Sign Up</a>
          </div>
        </div>
      </div>

      <div className="trending">
        <div className="trending-title">
          <h3>Trending Now</h3>
        </div>
        <div className="cards-layout">
          {intital && intital.map((item,index) => {
            return(
              <Card item={item} key={index}/>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
