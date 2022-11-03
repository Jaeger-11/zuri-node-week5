const express = require("express");
const app = express();
require('dotenv').config();

// HOME PAGE
app.use(express.static('./public'))
app.use(express.urlencoded({extended:false}))
app.use(express.json());

// ROUTER
const flights = require("./routes/flightRoute");
app.use('/flightAPI/', flights)

const port = process.env.PORT || 5000;

const start = async () => {
    try {
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start();