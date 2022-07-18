const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const cors = require('cors');

const app = express();
dotenv.config();
connectDB();
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("API is running");
});

app.use(cors())
app.use('/api/users', userRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT,console.log(`Server started on port ${PORT}`));