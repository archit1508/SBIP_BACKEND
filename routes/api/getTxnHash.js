const express = require('express')
const router = express.Router()

const Web3 = require("web3")
const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/81acb5c99f1647078eec0feec9c59aac"))

router.get('/Hash', function(req,res){
    let txnHash = req.query.hash
    web3.eth.getTransaction(txnHash.toString()).then(
        txn=>{res.send(txn)}
    ).catch(err=>{
        res.send(err)
    })
})

module.exports = router;