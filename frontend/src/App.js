import React from 'react'
import './App.css';
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import Header from './components/header'
import Landing from './components/landing'
import Weather from './components/weather'
import Footer from './components/footer';
import About from './components/about';


const App = () => {
  return (
<Router>

<div className='App'>
<Header/>


<Routes>
  
<Route path='/' element={<Landing/>}/>
<Route path='/weather' element={<Weather/>}/>
<Route path='/about' element={<About/>}/>

</Routes>

<Footer/>



</div>

</Router>

   
  )
}

export default App