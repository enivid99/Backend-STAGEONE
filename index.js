const express = require('express')
const app = express()
const axios = require("axios")
require("dotenv").config()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", true);

app.get("/", (req,res) => {
    res.send("Welcome to my server")
})

app.get("/api/hello", async (req, res) => {
    const visitorName = req.query.visitor_name || "Guest";
    const clientAddr = req.ip;

    try {
        const response = await axios.get( "http://api.weatherapi.com/v1/current.json", {
        params: {
        key: process.env.key,
        q: clientAddr,
        aqi: "no"
        }});
        
        const clientCity = response.data.location.name 
        const clientTemp = response.data.current.temp_c
        
        res.status(200).json({
              client_ip: ipAddr,
              location: clientCity,
              greeting: `Hello, ${visitorName}!, the temperature is ${clientTemp} degrees Celcius in ${clientCity}`,});
        
        } catch (err) {
        res.status(500).json({
              error: err,
              msg: "Something went wrong!",
        });
        }
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});