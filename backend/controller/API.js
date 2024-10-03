const { StatusCodes } = require('http-status-codes')
require("dotenv").config();
const axios = require('axios')
const {weatherAnalyst} = require('../controller/openAI');


const API_KEY=process.env.API_KEY


const temperatureConverter = (f)=>{
    return Math.round((f-32) * (5/9))
  
  }

  const page= (req, res)=>{
    res.status(201).sendFile('index.html',{root:'build'}) 
}



const apod = async(req, res)=>{

 await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
.then((response)=>{
res.send(response.data)
})
.catch((error)=>{
    console.log(error)

}
)
}

const apodByDate = async(req,res)=>{ //a function that respond to the /apod endpoint
    const {startDate} = req.body

    await axios.get(`https://api.nasa.gov/planetary/apod?start_date=${startDate}&end_date=${startDate}&api_key=${API_KEY}`)
    .then(response=>{
       
        res.send(response.data)
    })
    .catch(error=>console.log(''))

}


const marsWeather = async(req,res)=>{//a function that respond to the /marsWeather endpoint
    const weatherData =[]

    await axios.get(`https://api.nasa.gov/insight_weather/?api_key=${API_KEY}&feedtype=json&ver=1.0`)

    .then(response=>{

    const {sol_keys, ...solData} = response.data
   
   
    sol_keys.map(sol=>{
      
        weatherData.push({sol:sol,avTemp:temperatureConverter(solData[sol].AT.av),maxTemp:temperatureConverter(solData[sol].AT.mx),minTemp:temperatureConverter(solData[sol].AT.mn),windSpeed:solData[sol].HWS.av,windDirection:solData[sol].WD.most_common,minPressure:solData[sol].PRE.mn,maxPressure:solData[sol].PRE.mx,season:solData[sol].Season, date: new Date(solData[sol].First_UTC)})
   
   
    })
    //const GPTresponse,GPTerror = weatherAnalyst(weatherData)
    weatherAnalyst(weatherData)  // this function calls OpenAI API to analyse the weather data

    .then(respo=>{
       
        if(!respo.GPTerror){
            return res.json({weatherData:weatherData,analysis:respo.GPTresponse})
        }
        else{
            return res.json({weatherData:weatherData,analysis:"No response from the AI, try again"})
        }
    })
      

    })
    .catch(error=>console.log(error))
}





module.exports={apod,apodByDate,marsWeather,page}