const express = require('express')
const router = express.Router()

const Web3 = require("web3")
const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/81acb5c99f1647078eec0feec9c59aac"))
const axios = require('axios')
const moment = require('moment')
const lodash = require('lodash')

router.get("/weekTxnNum",function(req,res){
    let currentTime = moment()
    web3.eth.getBlockNumber()
    .then(async function(blockNum){
        let latestBlock = blockNum
        let oldBlock = 0
        let oldTime = moment().subtract(7,'days')
        await axios.get('https://api.etherscan.io/api' + `?module=block`,{params:{
            "action":"getblocknobytime",
            "timestamp":oldTime.unix(),
            "closest":"after",
            "apiKey":"7495UFP6DAHAPMC8CEU8IF1T4CXK35B28T"
        }}).then(
            async function(a){
                oldBlock = a
                let sum = await tnum(a,latestBlock)
                res.status(200).json({"tn":lodash.sum(sum)})
            }
        )
    })
})

async function tnum(fromBlock,toBlock){
    let s = 0
    let range = [...Array(toBlock).keys()]
    let rangeN = range.splice(fromBlock.data.result,toBlock)
    const sum = await Promise.all(
        rangeN.map(n=>web3.eth.getBlockTransactionCount(n)
        )
    )
    return sum
}

router.get("/dailyTxnNum",function(req,res){
    try{
        let currentTime = moment()
        web3.eth.getBlockNumber()
        .then(async function(blockNum){
            let latestBlock = blockNum
            let oldBlock = 0
            let oldTime = moment().subtract(1,'days')
            await axios.get('https://api.etherscan.io/api' + `?module=block`,{params:{
                "action":"getblocknobytime",
                "timestamp":oldTime.unix(),
                "closest":"after",
                "apiKey":"7495UFP6DAHAPMC8CEU8IF1T4CXK35B28T"
            }}).then(
                async function(a){
                    oldBlock = a
                    let sum = await tnum(a,latestBlock)
                    res.status(200).json({"tn":lodash.sum(sum)})
                }
            )
        })
    }
    catch(e){
        res.send(e)
    }
    
})

router.get('/currTPS', function (req, res) {
    let latestBlock = {}
    let parentBlock = {}
    let pendingBlock = {}
    web3.eth.getBlock('latest', true).then(
        block=>{
                    latestBlock=block
                    web3.eth.getBlock(latestBlock.parentHash, true).then(
                        block2=>{
                            parentBlock = block2
                            web3.eth.getBlock('pending',true).then(
                                block3=>{
                                    pendingBlock = block3
                                    let transactions = latestBlock.transactions.length+ parentBlock.transactions.length
                                    let tt = latestBlock.timestamp - parentBlock.timestamp
                                    let tps = transactions / tt
                                    res.status(200).json({"TPS":tps})
                                }
                            )
                        }
                    )
                }
    ).catch(err => {
        res.send(err)
    })
})


module.exports = router