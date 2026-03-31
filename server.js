const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/todos", require("./routes/todoRoutes"));

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/home",(req,res)=>{
  res.send("hello from home page");
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);