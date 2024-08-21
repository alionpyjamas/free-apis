import express from "express";
import {stocksymbols} from "./index2.js";

import axios from "axios";
const port = 3000;
const app = express();
const defaultLocation = 'Texas';
const defaultstock = 'ABCL'
const APIkey = 'YqpOte0iMUMbPHkJlWvpsv9t52zPEJL1';
const key2 = '652237a8d4373f3609a372ddf11b53e5';


app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    const reqLocation = req.query.location ?? defaultLocation;
    const symbols = req.query.symbol ?? defaultstock ;
    const response2 = await axios.get(`https://api.marketstack.com/v1/eod/latest?access_key=${key2}&symbols=${symbols}`);
    const response = await axios.get(`https://api.tomorrow.io/v4/weather/forecast?location=${reqLocation}&apikey=${APIkey}`);
    const result2 = response2.data.data[0];
    const avg = (result2.high + result2.low)/2;

// this sections contains data for weather 
    
    const singledata = response.data.timelines.daily[0];
    console.log(result2);
    const result = {
        location: response.data.location.name,
        minTemp: singledata.values.temperatureMin,
        maxTemp: singledata.values.temperatureMax,
        avgTemp: singledata.values.temperatureAvg,
        raincheck: singledata.values.rainAccumulationAvg};
                
        res.render('index.ejs', {
            location:  reqLocation,
            minTemp: result.minTemp,
            maxTemp:   result.maxTemp,
            avgTemp:  result.avgTemp,
            raincheck: result.raincheck,
            avgtoday:avg, 
            symbol:result2.symbol, 
            stockvolume: result2.volume 
        });
        //res.send(stocksymbols);
});




app.listen(3000, () => {
    console.log('Server is running on port 3000');
    //console.log(stocksymbols)
});



