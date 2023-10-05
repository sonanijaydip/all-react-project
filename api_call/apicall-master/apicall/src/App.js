import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import {useEffect, useState} from 'react'


function App() {
    const [val, setval] = useState([])

    useEffect(() =>{
        axios.get('https://rickandmortyapi.com/api/character')
  .then(function (response) {
    // handle success
    console.log(response.data.results);
    setval(response.data.results)
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })

    })

  return (
    <>
    {
        val.map((item,index) => {
          return(
            <div key={index} className='parent'>
              <div className='children'>
              <img src={item.image}></img>
              </div>
              <div className='children1'>
              <h2>{item.name}</h2>
              <h3>{item.status}</h3>
              </div>

            </div>
          )

        })
        }
    </>
  );
}

export default App;
