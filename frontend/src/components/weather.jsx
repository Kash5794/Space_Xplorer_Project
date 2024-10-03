import React, {useState, useEffect} from 'react'
import '../css/Weather.css';
import { MdWbSunny } from "react-icons/md";
import { PiWindBold } from "react-icons/pi";
import { PiTimerBold } from "react-icons/pi";
import { FaTemperatureHigh } from "react-icons/fa";
import { GiAirZigzag } from "react-icons/gi";
import axios from 'axios'
import mars from '../images/mars.png'
import { LineChart } from '@mui/x-charts/LineChart';
import Spinner from 'react-bootstrap/Spinner';


const Weather = () => {



const [xLabel, setXLabel] = useState([])
const [xData1, setXData1] = useState([])
const [xData2, setXData2] = useState([])


const [marsData, setMarsData] = useState([])
const [analysis, setAnalysis] = useState(null)

const [showInsight,setShowInsight] = useState(false)

const months = [ "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December" ];


const dateFormat = (date)=>{

const year = new Date(date).getFullYear()
const month = new Date(date).getMonth()
const day = new Date(date).getDate()

return [month,day,year]
}





useEffect(()=>{

const fetchMarsData = async()=>{ // on component mount, this function calls the mars weather API and load the content into the state marsData and analysis


  if(localStorage.getItem("marsData")==null){ //this logic optimizes the number of API calls by checking the local storage first before fetching the data

    //if there is a match in the localstorage, update the state variables directly without calling any API, otherwise axios.get the data
    await axios.get('/marsWeather')

    .then(response=>{
    
    setMarsData(response.data["weatherData"].reverse())
    
    setAnalysis(response.data["analysis"])

    const data = {
      weather:response.data["weatherData"].reverse(),
      analysis:response.data["analysis"]
    }

    localStorage.setItem("marsData",JSON.stringify(data))
    
    
    
    })
    
    .catch(error=>console.log('error from fetching Mars Data'))
  }

  else{
    const data = JSON.parse(localStorage.getItem("marsData"))

    setMarsData(data.weather)
    setAnalysis(data.analysis)
  }



}

fetchMarsData()

//return setMarsData([]),setAnalysis(null)

},[])




useEffect(()=>{

marsData.map(item=>{

  setXLabel(prevItems => [...prevItems, `${item["sol"]}`])
  setXData1(prev => [...prev, item["maxTemp"]])
  setXData2(prev => [...prev, item["minTemp"]])
})

},[marsData])


  return (
    <main>
      
     <div className='weather-container'>

    <div className='first-pane'>
    <div className='temperature-container'>
    <div>
      <h5>Elysium Planitia</h5>
      {marsData.length<1 ? <p>Sol</p>:
      <p>Sol {marsData[0]["sol"]}: {months[dateFormat(marsData[0]["date"])[0]-1]} {dateFormat(marsData[0]["date"])[1]},{dateFormat(marsData[0]["date"])[2]} </p> 
      }
      
      {marsData.length<1 ? <h4>Temp:</h4> :
      <h4>{marsData[0]["maxTemp"]}<sup>0</sup>C / {marsData[0]["minTemp"]}<sup>0</sup>C</h4>
      
      }

{marsData.length<1 && <div className='spin-container'> 
    <p style={{color:'gray'}}>Loading data ....</p>
    <Spinner animation="border" role="status"></Spinner>
    </div>
    }
      
    </div>

    
      <div className='mars-container'>
      </div>
   
    
      

    </div>

    <div className='aircondition-container'>

    <div>
    <p><PiWindBold /> Wind</p>

    {marsData.length<1 ?<p></p>:
     <p>{marsData[0]["windSpeed"]}m/s</p>
    }
   
    </div>

    <div>
    <p><GiAirZigzag /> Pressure</p>
    {marsData.length<1 ?<p></p>:
     <p>{marsData[0]["maxPressure"]}Pa</p>

    }
    </div>

    <div>
    <p><PiTimerBold /> Season</p>
    {marsData.length<1 ?<p></p>:
     <p>{marsData[0]["season"]}</p>
    }
    </div>

    <div>
    <p><FaTemperatureHigh /> Av.</p>
    
    {marsData.length<1 ?<p></p>:
     <p>{marsData[0]["avTemp"]}<sup>0</sup>C</p>
    }
    </div>


    </div>



   
{marsData.length<1 ? <div className='spin-container'> 
    <p style={{color:'gray'}}>Loading data ....</p>
    <Spinner animation="border" role="status"></Spinner>
    </div>:

<div className='line-chart-container'>
    <LineChart
      
      sx={{"& .MuiChartsAxis-left .MuiChartsAxis-line ":{
      stroke:"white",
      strokeWidth:0.7
     },
    
     "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel":{
    strokeWidth:0.4,
    fill:"white"
   },
   "& .MuiChartsAxis-left .MuiChartsAxis-label":{
    strokeWidth:0.4,
    fill:"white"
   },

   "& .MuiChartsAxis-bottom .MuiChartsAxis-line ":{
      stroke:"white",
      strokeWidth:0.7
     },
    
     "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel":{
    strokeWidth:0.4,
    fill:"white"
   },
   "& .MuiChartsAxis-bottom .MuiChartsAxis-label":{
    strokeWidth:0.4,
    fill:"white"
   },
    

     
      }}
      yAxis={ [{label: 'Temperature (C)', min:-100,max:0,reverse:true}]}
      
      series={[
        { data:xData1.reverse(),label:'minimum'},
        { data:xData2.reverse(),label:'maximum'}
        
      ]}
      xAxis={[{scaleType: 'point', data:xLabel.reverse(),label: 'Martian Day (Sol)'}]}
      
    />
    </div>


    }
    
    

    </div>

    <div className='second-pane'>
    <div className='weather-report-container'>

    <h5>Last 7-Days Report From Mars</h5>

      {marsData.length<1 && <div className='spin-container'> 
    <p style={{color:'gray'}}>Loading data ....</p>
    <Spinner animation="border" role="status"></Spinner>
    </div>
    }
   
    
    {marsData.length<1 ?<div className='weather-report-data'></div>:

      marsData.map((item, index)=>{
        return(
          <div key={index}>

<div className='weather-report-data'>
    <p>Sol {item["sol"]}</p>

    <div className='d-flex'>
    <PiWindBold size={22} />
    <p>{item["windSpeed"]}m/s</p>
    </div>
    <p>{item["maxTemp"]}/{item["minTemp"]}</p>

    </div><hr/>

          </div>
      
        )
        

      })
    
    }
   

{marsData.length>0&&<button onClick={()=>showInsight?setShowInsight(false):setShowInsight(true)}>{showInsight?<>Hide Insight</>:<>More Insight</>}</button> }

{showInsight && 
  <div className='insight'>
<p>
{analysis!==null && analysis}

</p>

<p style={{color:'orange'}}>Note:This analysis is powered by gpt-3.5-turbo</p>
</div>
}

    

  

    </div>

  </div>


     </div>
      
   
      </main>
  )
}

export default Weather