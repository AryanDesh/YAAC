import { Router, Request, Response } from "express";
import prisma from "../prisma/client";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

router.get("/:id", async (req: any, res: any) => {
  const id = parseInt(req.params.id, 10);
  try {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

router.get('/filter/categories', async (req: any, res: any) => {
  try {
    const categories = await prisma.product.findMany({
      distinct: ["category"],
      select: {
        category: true,
      },
    });
    const categoryList = categories.map((item) => item.category);
    return res.json(categoryList);
  } catch (error) {
    console.log("Failed to fetch categories:", error);
    return res.status(500).json({ error: "Failed to fetch categories" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  const { title, description, price, image, category } = req.body;
  try {
    const newProduct = await prisma.product.create({
      data: { title, description, price, image , category},
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to create product" });
  }
});

router.get('/filter/category/:category', async (req, res) => {
  const { category } = req.params;
  try {
    const filter = await prisma.product.findMany({
      where : {
        category: category
      }
    });
    res.status(201).json(filter);
  } catch (error) {
    res.status(500).json({ error: "Failed to create product" });
  }
});

export default router;
