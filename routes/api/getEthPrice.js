const express = require('express')
const router = express.Router()
const Web3 = require("web3")
const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/81acb5c99f1647078eec0feec9c59aac"))
const axios = require('axios')


router.get('/ethPrice', function(req,res){
    let price = 0
    axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=SGD').then(
        resp => {
            price = resp.data.SGD
            return res
                .status(200)
                .json({ethPrice:price})
        }
    ).catch(error => {
        return res
            .status(200)
            .json({ err: error })
    });
})

router.get('/ethGas', function(req,res){
    web3.eth.getGasPrice().then(
        p=>{
            return res
            .status(200)
            .json({ehtGas:web3.utils.toWei(p,"wei")})
        }
    )
})

module.exports = router;