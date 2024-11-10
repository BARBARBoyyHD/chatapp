const path = require('path')
const express = require("express")

const publicPath = path.join(__dirname, 'public')
const app = express()

app.use(express.static(publicPath));

app.listen(5000,()=>{
    console.log(`http://localhost:5000`);
})