import express, { Request, Response } from "express";
import cors from "cors";

import solve24 from "./game24";
import { db } from "./client";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["*"],
    methods: ["GET"],
    allowedHeaders: ["Content-Type"],
  }),
);

try {
  app.get("/chest24", async (req: Request, res: Response) => {
    const num = req.query as unknown as { [x: string]: unknown };
    const numbers = String(num.number);

    if (
      typeof numbers === "string" &&
      numbers.length === 4 &&
      /^\d+$/.test(numbers)
    ) {
      const existingGame = await db.game24.findFirst({
        where: { numbers: numbers },
      });

      if (existingGame) {
        return res.json(existingGame.solutions);
      }

      const solutions = solve24(numbers);

      console.log(typeof solutions);

      await db.game24.create({
        data: { numbers, solutions },
      });

      res.json(solutions);
    } else {
      res
        .status(400)
        .json({ success: false, message: "Invalid number format" });
    }
  });
} catch (error) {
  console.log(error);
}

app.listen(3200, () => {
  console.log("Server is running on port 3200");
});
