const express = require("express")
const app = express()
const cors = require("cors")
const transactions = require("./controllers/transactionsController")
const users = require("./controllers/usersController")

app.use(express.json()) 
app.use(cors())
app.use("/transactions", transactions)
app.use("/users", users)

app.get("/", (req, res) => {
    res.send("Welcome to the budgeting app")
})

module.exports = app