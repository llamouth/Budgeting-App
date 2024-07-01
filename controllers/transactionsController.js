const express = require("express")
const transactions = express()
const transactionsArray = require("../models/transactions")

transactions.get("/", (req, res) => {
    res.json(transactionsArray)
})

transactions.get("/:id", (req, res) => {
    const {id} = req.params;
    if(transactionsArray[id]) {
        res.json(transactionsArray[id])
    }else {
        res.json({error: "invalid index please enter a valid index"})
    }
})

transactions.post("/", (req, res) => {
    transactionsArray.push(req.body)
    res.json(transactionsArray[transactionsArray.length - 1])
})

transactions.put("/edit/:id", (req, res) => {
    const { id } = req.params
    if(transactionsArray[id]){
        transactionsArray[id] = req.body
    }else {
        res.json({error: "invalid index please enter a valid index"})
    }
    res.status(200).json(transactionsArray[id])
})

transactions.delete("/:id", (req, res) => {
    const { id } = req.params
    if(transactionsArray[id]){
        transactionsArray.splice(id, 1)
    }else {
        res.json({error: "invalid index please enter a valid index"})
    }
    res.json(transactionsArray)
})

module.exports = transactions