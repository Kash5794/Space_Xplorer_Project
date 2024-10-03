import React, {useState, useEffect} from 'react'
import '../css/Section.css'
import axios from 'axios'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const Landing = () => {

const [title, setTitle] = useState()
const [imgURL, setImgURL]  = useState()
const [content, setContent] = useState()
const [date,setDate] = useState(null)

const [startDate, setStartDate] = useState(new Date());

useEffect(()=>{   
const fetchAPOD = async()=>{ //on component mount, this function calls the apod API and load the content into the state variables title, imgURL, content, and date

    //this logic optimizes the number of API calls by checking the local storage first before fetching the data

    //if there is a match in the localstorage, update the state variables directly without calling any API, otherwise axios.get the data
    if(localStorage.getItem("apodData")==null){ 

      await axios.get('/apod')
    .then(response=>{
        
        const apodData = {
          title:response.data.title,
          hdurl:response.data.hdurl,
          explanation:response.data.explanation,
          date:response.data.date

        }

        localStorage.setItem("apodData",JSON.stringify(apodData))

      
        setTitle(response.data.title)
        setImgURL(response.data.hdurl)
        setContent(response.data.explanation)
        setDate(response.data.date)  

    })

    .catch(error=>{
        console.log(error)
    })



    }
    else{
      const apodData = JSON.parse(localStorage.getItem("apodData"))
     
      setTitle(apodData.title)
      setImgURL(apodData.hdurl)
      setContent(apodData.explanation)
      setDate(apodData.date)

    }

    
}

fetchAPOD()

},[])





const formatNewDate=(date)=>{ //this returns a given date in the format yyyy-MM-dd 
const formattedDate= `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${date.getDate()}`
return formattedDate
}

const handleSelect= async(startDate)=>{ //this function fetches the apod API by the given date
  

const formattedDate = formatNewDate(startDate)

if(formattedDate!==date && date!==null){
    
    //fetch by startDate

    await axios.post('/apod/date', {startDate:formattedDate})
    .then(response=>{
  
      setTitle(response.data[0].title)
      setImgURL(response.data[0].hdurl)
      setContent(response.data[0].explanation)
      setDate(response.data[0].date)

    })

    .catch(error=>console.log(error))

  }
}


  return (

<div className='section'>

<div>
    <h1>Astronomy Picture of the Day</h1>

    <div className='filter-container'>
    <h5>By Date:</h5>
    <DatePicker selected={startDate}  onChange={(date) => setStartDate(date)} 
          excludeDateIntervals={[
            { start: new Date().setDate(new Date().getDate()), end: new Date().setDate(new Date().getDate()+1000000) },
          ]}
  
          onSelect={(date)=>handleSelect(date)}
        
          dateFormat="yyyy-MM-dd"    
        />

    </div>

    <div className='card'>
    <div className='card-title'>
    <h3>{title}</h3>
    </div>
    <div className='card-image'>
    {<img src={imgURL} alt='The astronomy picture of the day' />}
    </div>
    <div className='card-content'>
    <p>{content}</p>
    </div>


    </div>



</div>


</div>


  )
}

export default Landing