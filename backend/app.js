import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import categoryRoutes from "./routes/category.route.js";
import variantRoutes from "./routes/variant.route.js";
import foodRoutes from "./routes/food.route.js";
import roleRoutes from "./routes/role.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, "https://food-app-frontend-chi.vercel.app"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser()); // Parse cookies

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/variants", variantRoutes);
app.use("/api/foods", foodRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
