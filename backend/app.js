const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 4000;
const router = require("./routes/userRoutes");
const userModel = require("./models/user")
const connection = require("./config/connection");
const cookieParser = require('cookie-parser');

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(express.json());
connection();
app.use(cookieParser());
app.use(router);

app.use('/', (req, res)=>{
    res.send("Hello World");
})

app.listen(port, async()=>{
    console.log(`Server running on port ${port}`);
})