const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  // tackling the request if user searches by company
  // if one condition is true then also it will show the data
  const { company, name, featured, sort, select } = req.query;
  const queryObject = {};

  if (company) {
    queryObject.company = company;
  }

  if (featured) {
    queryObject.featured = featured;
  }
  // if user search by name
  // if there are multiple data with same name but little changes then also it should data
  //for that we can use mongoDB features $regex:key name ,$options:"i"
  // option means case sensitive  or case insensitive . i means insensitive.

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  let apiData = Product.find(queryObject);

  if (sort) {
    let sortFix = sort.split(",").join(" ");
    apiData = apiData.sort(sortFix);
  }

  if (select) {
    let selectFix = select.split(",").join(" ");
    apiData = apiData.select(selectFix);
  }

  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 10;
  let skip = (page - 1) * limit;

  apiData = apiData.skip(skip).limit(limit);

  const Products = await apiData;
  res.status(200).json({ Products, nbHits: Products.length });
};

const getAllProductsTesting = async (req, res) => {
  //req.query is used to get the data as per the name,company etc , just like filtering //
  const myData = await Product.find(req.query);
  res.status(200).json({ myData });
};

module.exports = {
  getAllProducts,
  getAllProductsTesting,
};
