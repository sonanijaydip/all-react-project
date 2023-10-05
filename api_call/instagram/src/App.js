/* eslint-disable no-unused-vars */
import { Routes, Route } from "react-router-dom"
import User from './Componants/User'
import Profile from './Componants/Profile'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <User/> } />
        <Route path="/Profile/:id/:name" element={ <Profile/> } />
      </Routes>
    </div>
  )
}

export default App;