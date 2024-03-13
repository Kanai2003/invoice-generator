// import { asyncHandler } from "../utils/asyncHandler.js";
// import { ApiError } from "../utils/ApiError.js";
// import { User } from "../models/user.model.js";


// // add product
// export const addProduct = asyncHandler(async (req, res) => {
//   const { name, price, quantity } = req.body;
//   const userId = req.user._id;

//   if (!(name, price, quantity)) {
//     throw new ApiError(400, "All fields are required")
//   }

//   const user = await User.findById(userId)
//   if (!user) {
//     throw new ApiError(404, "Invalid userId, login first")
//   }

//   const newProduct = {
//     name: name,
//     price: price,
//     quantity: quantity
//   }

//   user.products.push(newProduct);
//   await user.save();

//   return res.status(200).json({
//     "message": "Product added successfully",
//   });

// })

// // add bulk products
// export const addBulkProducts = asyncHandler(async (req, res) => {
//   const products = req.body.products;
//   const userId = req.user._id;

//   if (!products || !Array.isArray(products) || products.length === 0) {
//     throw new ApiError(400, "Products array is required");
//   }

//   const user = await User.findById(userId);
//   if (!user) {
//     throw new ApiError(404, "Invalid userId, login first");
//   }

//   user.products.push(...products);

//   await user.save();

//   return res.status(200).json({
//     message: "All Products added successfully",
//   });
// });



// // get all products
// export const getAllProducts = asyncHandler(async (req, res) => {
//   const userId = req.user._id;

//   const user = await User.findById(userId)

//   if (!user) {
//     throw new ApiError(404, "Invalid userId, login first")
//   }

//   return res.status(200).json({
//     "message": "All products",
//     "products": user.products
//   })
// })






