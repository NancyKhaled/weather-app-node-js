const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req, res){

const key = "b0750a0e45a248c1a8c91828231605"
    const query = req.body.cityName
    const url =
        "https://api.weatherapi.com/v1/current.json?key=" + key +"&q=" + query;

    https
        .get(url, (response) => {
            response.on("data", (d) => {
                //1   console.log(process.stdout.write(d))
                //2   console.log(JSON.stringify(d))

                const weatherData = JSON.parse(d);

                const location = weatherData.location.name;
                const temp = weatherData.current.temp_c;
                const des = weatherData.current.condition.text;
                const desIcon = weatherData.current.condition.icon;

                res.write(
                    "<h1>The temperature in " +
                    location +
                    " is " +
                    temp +
                    " degrees Celcius</h1>"
                );
                res.write(
                    "<p><strong>Description is </strong>" +
                    des +
                    "</p> " +
                    "<img src=" +
                    desIcon +
                    ">"
                );
                res.send();
            });
        })
        .on("error", (e) => {
            console.error(e);
        });

})

app.listen(3000, function () {
    console.log("Server is running on port 3000.");
});

