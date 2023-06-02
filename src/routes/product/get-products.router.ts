import express, { NextFunction, Request, Response } from "express";
import { Product } from "../../models/Product";

const router = express.Router();

router.get(
  "/api/products",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await Product.find({});
      console.log(products.length);
      res.status(200).send(products);
    } catch (error) {
      next(error);
    }
  }
);

export { router as getProductsRouter };