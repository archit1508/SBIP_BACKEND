const express = require('express')
const router = express.Router()

const Web3 = require("web3")
const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/81acb5c99f1647078eec0feec9c59aac"))

router.get('/', function (req, res) {
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
                                    let transactions = [
                                        ...pendingBlock.transactions,
                                        ...latestBlock.transactions,
                                        ...parentBlock.transactions,
                                    ]
                                    res.send(transactions)
                                }
                            )
                        }
                    )
                }
    ).catch(err => {
        res.send(err)
    })
})

module.exports = router;