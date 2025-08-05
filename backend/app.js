const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 4000;
const userRouter = require("./routes/userRoutes");
const courseRouter = require("./routes/courseRoutes")
const userCourseRouter = require('./routes/userProgressRoutes')
const reviewRoutes = require('./routes/reviewRoutes')
const connection = require("./config/connection");
const cookieParser = require('cookie-parser');

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(express.json());
connection();
app.use(cookieParser());
app.use(userRouter);
app.use(courseRouter);
app.use(userCourseRouter)
app.use(reviewRoutes)

app.listen(port, async()=>{
    console.log(`Server running on port ${port}`);
})