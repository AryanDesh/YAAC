"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = __importDefault(require("../prisma/client"));
const router = (0, express_1.Router)();
router.get("/", async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const cart = await client_1.default.cart.findUnique({
            where: { id },
            include: {
                items: { include: { product: true } },
            },
        });
        if (!cart)
            return res.status(404).json({ error: "Cart not found" });
        res.json(cart);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch cart" });
    }
});
router.post("/add", async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        if (!productId)
            return;
        const cartItem = await client_1.default.cartItem.upsert({
            where: { productId: productId },
            update: { quantity: { increment: quantity || 1 } },
            create: { cartId: 1, productId, quantity: quantity || 1 },
        });
        res.json(cartItem);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to add item to cart" });
    }
});
router.delete("/remove", async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { productId } = req.body;
    try {
        await client_1.default.cartItem.delete({
            where: { productId: productId },
        });
        res.json({ message: "Item removed from cart" });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to remove item from cart" });
    }
});
router.get('/payment', (req, res) => {
    const success = Math.random() < 0.5;
    if (success) {
        res.json({ message: 'Payment Successful' });
    }
    else {
        res.status(400).json({ message: 'Payment Failed' });
    }
});
exports.default = router;
