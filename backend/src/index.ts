import express, { Request, Response } from "express";
import productRoutes from "./routes/productRoutes";
import cartRoutes from "./routes/cartRoutes";
import cors from 'cors'
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/products", productRoutes);
app.use("/cart", cartRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


