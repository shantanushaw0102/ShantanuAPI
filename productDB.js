require ("dotenv").config();

const connectDB = require("./db/connect");
const Product = require("./models/product");



const ProductJson = require("./products.json")

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    await Product.deleteMany(); // for deleting the old record so that it doesn't overwrite. 
    await Product.create(ProductJson);
    console.log('success');
  } catch (error) {
    console.log(error);
  }
};

start();


// for any change in json file :

// when any changes are made we need to again change in mongodb for that run this in terminal . 
// node products.js
// if success comes then all good , refresh the mongodb server