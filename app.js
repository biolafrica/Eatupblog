require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const adminRouter = require("./routes/adminRoute");
const userRouter = require("./routes/userRoute");
const cookieParser = require('cookie-parser');
const {checkAdmin} = require("./Middleware/auth");

//setup express app
const app = express();

//Middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(cookieParser());

// connect to database
const URI = process.env.MongoDB_URI;
mongoose.connect(URI,)
.then(result => console.log("connected to the database"))
.catch(error => console.log(error));

// Start server
const PORT = process.env.PORT || 3002
app.listen(PORT, ()=>{
  console.log(`connected to the server on port ${PORT}`)
})

//setup view engine
app.set("view engine", "ejs");

// middleware to check authentication
app.use(checkAdmin);

//Routes
app.use("/admin", adminRouter);
app.use(userRouter);

//Error Handling
app.use((req, res)=>{
  const locals ={
    title : "Error Page",
    description : "Eatup Food Services Limited Official Blog"
  };
  res.status(404).render("error", {locals});

})