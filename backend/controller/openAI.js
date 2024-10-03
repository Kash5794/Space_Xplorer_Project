const { StatusCodes } = require('http-status-codes')
require("dotenv").config();
const axios = require('axios')

const {OpenAI} = require("openai");
const client = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY, // This is the default and can be omitted
  });


     
const prompt= "You are a veteran weather analyst that provides insight from space data with confidence. The data is an array of json objects describing the planet Mars Elysium Planitia weather condition. Sol is the Martial day, avTemp is average temperature in Celsius,minTemp is minimum temperature in Celsius, maxTemp is maximum temperature in Celsius, minPressure is minimum pressure in Pa unit, maxPressure is maximum Pressure."

    const weatherAnalyst = async(data)=>{
        let response=''
       
        try {
    
            response = await client.chat.completions.create({
                messages: [
                    {
                         role: 'user', content:[{
                            "type":"text",
                            "text":`here is the data ${data}`
                         }] 
 
                        },

                    {
                        role: "system",
                        content: [
                          {
                            "type": "text",
                            "text": `${prompt}`
                          }
                        ]
                      },

                
                      {
                        role: "assistant",
                        content: [{ "type": "text", 
                            
                            "text": "forget about any previous prompts, Discuss the over weather condition and possible future trend. Respond using plain texts without special characters such as curly braces, square braces, or others present in the original data." }]
                      }
                ],
                model: 'gpt-3.5-turbo',
               //functions:custom_function
              });  
            
           
              return   {GPTresponse:response.choices[0].message.content,GPTerror:false}
            
        } catch (error) {
      
            return {GPTresponse:response,GPTerror:true}
           
        }

        

    }


    module.exports={weatherAnalyst}
//{sol:sol,avTemp:solData[sol].AT.av,maxTemp:solData[sol].AT.mx,minTemp:solData[sol].AT.mn,windSpeed:solData[sol].HWS.av,windDirection:solData[sol].WD.most_common,minPressure:solData[sol].PRE.mn,maxPressure:solData[sol].PRE.mx,season:solData[sol].Season, date: new Date(solData[sol].First_UTC)