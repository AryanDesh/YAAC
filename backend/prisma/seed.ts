// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import fetch from "node-fetch";
import { Product } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Fetch data from the Fake Store API
  const response = await fetch("https://fakestoreapi.com/products");
  const products = await response.json();

  // Loop through the products and add them to the database
  for (const product of products) {
    await prisma.product.create({
      data: {
        title: product.title,
        description: product.description,
        price: product.price,
        image: product.image,
        category: product.category
      },
    });
  }

  console.log("Database seeded with products from Fake Store API.");
}

main()
  .catch((error) => {
    console.error("Error seeding database:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
