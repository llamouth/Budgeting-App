const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const users = express()
const usersArray = require("../models/users")
const transactions = require("../models/transactions")

const JWT_SECRET = process.env.JWT_SECRET;

users.get("/", (req, res) => {
    res.json(usersArray)
})

users.post("/register", async (req, res) => {
    const { username, password } = req.body;

    const existingUser = usersArray.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, password: hashedPassword };
    usersArray.push(newUser);

    res.status(201).json({ message: 'User registered successfully' });
})

users.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    const user = usersArray.find(user => user.username === username);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
  
    const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });
  
    res.json({ token });
});
  
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      return res.sendStatus(401);
    }
  
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
};
  
users.get('/transactions', authenticateToken, (req, res) => {
    res.json(transactions); 
});

module.exports = users;