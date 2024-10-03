const express = require('express');
require("dotenv").config();
const path = require('path')

const app = express();

const apiRouter = require('./route/API_Router')

const helmet = require("helmet")
const xss = require("xss-clean")
const cors = require("cors")

app.use(express.json());
app.use(express.static(path.join(__dirname,'build')))
app.use(express.static('public'))
app.use(helmet()) //protecting server response header information in order to hide the technology from attackers
app.use(cors()) //cross origin resource sharing is prohibited by this middleware
app.use(xss()) //protect the server header response against cross-site scripting attack


app.use(express.urlencoded({ extended: false }))

app.use(apiRouter)

const port = process.env.PORT || 3001;

const start = () => {
    
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
   
  };
  
  start();