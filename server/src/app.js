import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";

const app = express();



app.use(cors({
  origin: "https://invoice-generator-black.vercel.app",
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); 
app.use(express.static("public")); 

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);

export { app };
