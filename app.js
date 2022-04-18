const express = require("express");

const https = require("https");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){

  const query =  req.body.cityName;
  const apiKey = "43b07227f8a7df48745200ad1aad921d";
  // const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=metric";

  https.get(url,function(response){
  console.log(response.statusCode);

  response.on("data",function(data){
    // console.log(data)
    const weatherData = JSON.parse(data)
    // console.log(weatherData)

    const temp = weatherData.main.temp
    const weatherDescription = weatherData.weather[0].description
    const icon =weatherData.weather[0].icon
    const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"

    // console.log(temp,weatherDescription);
    res.write("<h1>The weather is currently "+weatherDescription+"</h1>");
    res.write("<h1>The Temperature in " +query+  " is "+ temp + " degrees Celcius.</h1>");
    res.write("<img src=" + imageURL +">")
    res.send();
});

});
})

app.listen(3000,function(){
  console.log("server is running on port 3000.");
})
