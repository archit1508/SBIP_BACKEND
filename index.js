require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const app = express();

const getEthPrice = require('./routes/api/getEthPrice.js')
const getTxnHash = require('./routes/api/getTxnHash.js')
const getBlock = require('./routes/api/getBlock.js')
const getRctTxn = require('./routes/api/getRctTxn.js')
const getRctBlk = require('./routes/api/getRctBlk.js')
const getStats = require('./routes/api/getStats')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use("/api/getEthPrice", getEthPrice)
app.use("/api/getTxnHash", getTxnHash)
app.use("/api/getBlock", getBlock)
app.use("/api/getRctTxn", getRctTxn)
app.use("/api/getRctBlk", getRctBlk)
app.use("/api/getStats", getStats)

app.get("/", function(req,res){
    res.send("hello")
})

app.listen(4000, function(){
    console.log("running on 4000")
})

