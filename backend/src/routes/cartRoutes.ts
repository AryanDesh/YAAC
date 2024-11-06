import { Router, Request, Response } from "express";
import prisma from "../prisma/client";
import { CartItem } from "@prisma/client";
const router = Router();

router.get("/", async(req: any, res: any) => {
  try {
    const cart = await prisma.cart.findUnique({
      where: { id: 1 }
    });
    if (!cart) return res.status(404).json({ error: "Cart not found" });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cart" });
  }
});

router.post("/add", async (req: Request, res: Response) => {
  const { id, quantity } = req.body;
  // res.json(id)
  try {
    const cartItem = await prisma.cartItem.upsert({
      where: { productId: id },
      update: { quantity: { increment: quantity || 1 } },
      create: { cartId: 1, productId: id, quantity: quantity || 1 },
    });
    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to add item to cart" });
  }
});


router.delete("/remove", async (req: Request, res: Response) => {
  // const id = parseInt(req.params.id, 10);
  const { id } = req.body;
  try {
    const inCart = await prisma.cartItem.findUnique({
      where: { productId:  id  },
    });
    if(!inCart?.quantity) res.json({ message: "Item not in cart"})
    else if(inCart.quantity  > 1) {
      await prisma.cartItem.update({
        where: { productId:  id  },
        data: {quantity : inCart.quantity - 1}
      });
    res.json({ message: "Item removed from cart" });
  }
  else{
    await prisma.cartItem.delete({
      where: { productId:  id  }
        });
  res.json({ message: "Item removed from cart" });
  }
  } catch (error) {
    res.status(500).json({ error: "Failed to remove item from cart" });
  }
});
router.get('/payment', (req, res) => {
  const success = Math.random() < 0.5; 
  if (success) {
      res.json({ message: 'Payment Successful' });
  } else {
      res.status(400).json({ message: 'Payment Failed' });
  }
});

export default router;
