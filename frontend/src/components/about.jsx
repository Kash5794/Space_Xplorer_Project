import React, { useState } from 'react'
import '../css/About.css'

const About = () => {

const [display, setDisplay] = useState(false) //a state hook that helps render the "about the developer" content when the container is clicked


  return (
    <div className='about'>
  <div className='about-content' >
        
        <p>Xpacio or Espacio is an application that provides imagery and weather information about the space and other planets in real-time. 
        It is integrated with NASA APIs such as astronomer picture of the day (APOD) and Mars weather service. </p>
         <p>More information about the libraries, APIs, and other packages necessary to setup and run this application can be found<a style={{textDecoration:'underline',color:'lightblue'}} href='https://github.com/Kash5794/SpaceXplorer' target="_blank"> here:</a></p>

        <div className='about-developer-container' onClick={()=>display?setDisplay(false):setDisplay(true)}>
        <h4>About the Developer</h4>
    {display &&
    <div>
 <p>Xpacio is developed by Saheed, an award-winning AI researcher and full-stack developer holding a bachelor's degree in computer engineering and a postgraduate research degree in machine learning.
        He graduated with a first-class honors degree, bagging several awards, including the Vice-Chancellor award of excellence.
        In 2022, Saheed stood out from 2049 applicants to receive a prestigious postgraduate scholarship award from the Polish National Agency for Academic Exchange.
        In the same year, he won a research grant of £50,000 in value from the Atlantic Technological University in Ireland. 
        Recently, he plays the role of an AI software engineer in a team of 4 to develop <a style={{textDecoration:'underline',color:'lightblue'}} href='https://github.com/Kash5794/mAIt-telehealth-app' target="_blank">  mAIte</a>,
        an AI-powered medical assistive application for consultants at the National AI challenge organized by TechIreland.
        </p>

        <p>He is passionate about researching and developing software solutions that tackle critical business challenges.</p>
         
    </div>
    }
       

        </div> 

        

       



    </div>


    </div>
  
  )
}

export default About