import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";

const app = express();

// Configure CORS middleware
const allowedOrigins = ['https://invoice-generator-black.vercel.app', 'http://localhost:3000', 'https://invoice-generator-kanailalmanna.vercel.app/', 'https://invoice-generator-git-main-kanailalmanna.vercel.app/', 'https://vercel.com/kanailalmanna/invoice-generator/1b2ABVf92jCCFZW7jKiD91uFtoPB']; // Add your Vercel app URL here
const corsOptions = {
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow credentials (cookies)
};

// Apply CORS middleware to all routes
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); 
app.use(express.static("public")); 

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);

export { app };
