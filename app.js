const express = require("express")
const app = express()
const cors = require("cors")
const transactions = require("./controllers/transactionsController")

app.use(express.json())
app.use(cors())
app.use("/transactions", transactions)

app.get("/", (req, res) => {
    res.send("Welcome to the budgeting app")
})

module.exports = app