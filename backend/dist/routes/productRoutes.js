"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = __importDefault(require("../prisma/client"));
const router = (0, express_1.Router)();
router.get("/", async (req, res) => {
    try {
        const products = await client_1.default.product.findMany();
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch products" });
    }
});
router.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const product = await client_1.default.product.findUnique({ where: { id } });
        if (!product)
            return res.status(404).json({ error: "Product not found" });
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch product" });
    }
});
router.get('/products/categories', async (req, res) => {
    // try {
    const categories = await client_1.default.product.findMany({
        distinct: ["category"],
    });
    console.log(categories);
    const categoryList = categories.map((item) => item.category);
    return res.json(categoryList);
    // } catch (error) {
    //   console.log("Failed to fetch categories:", error);
    //   return res.status(500).json({ error: "Failed to fetch categories" });
    // }
});
router.post("/", async (req, res) => {
    const { title, description, price, image, category } = req.body;
    try {
        const newProduct = await client_1.default.product.create({
            data: { title, description, price, image, category },
        });
        res.status(201).json(newProduct);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create product" });
    }
});
router.get('/products/category/:category', async (req, res) => {
    const { category } = req.params;
    try {
        const filter = await client_1.default.product.findMany({
            where: {
                category: category
            }
        });
        res.status(201).json(filter);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create product" });
    }
});
exports.default = router;
