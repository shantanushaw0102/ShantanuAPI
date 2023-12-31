require ("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({
  origin:"http://localhost:3000",
}))

const connectDB = require("./db/connect")


const PORT = process.env.PORT || 5000;
const products_routes = require("./routes/products");

app.get("/", (req,res) => {
  res.send("Hi I'm live");
});

app.use("/api/products",products_routes);

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () => {
      console.log(`${PORT} yes connected`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();