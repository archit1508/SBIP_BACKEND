const express = require('express')
const router = express.Router()

const Web3 = require("web3")
const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/81acb5c99f1647078eec0feec9c59aac"))

let i = 0;

router.get('/',function (req, res) {

    web3.eth.getBlockNumber().then(
        async function(blockNum){
            i = blockNum
            blockNumbers = [i, i - 1,i-2,i-3,i-4,i-5]
            const blocks = await f(blockNumbers)
            res.send(blocks)
        }
    )  
})

async function f(blockNumbers){
    const b = await Promise.all(blockNumbers.map(n => web3.eth.getBlock(n)))
    return b
}

module.exports = router;