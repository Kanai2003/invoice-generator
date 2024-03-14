import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";

const app = express();



const allowedOrigins = ['http://localhost:5173', 'https://invoice-generator-black.vercel.app', "*"];
app.use(cors({
  origin: allowedOrigins,
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
