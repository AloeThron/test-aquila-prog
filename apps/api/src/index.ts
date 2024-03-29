import express, { Request, Response } from "express";
import cors from "cors";

import { sequelize, Game24 } from "./database";
import solve24 from "./game24";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["*", "http://localhost:3200/", "https://localhost:3200/"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    optionsSuccessStatus: 200,
  }),
);

app.get("/chest24", async (req: Request, res: Response) => {
  try {
    const num = req.query as unknown as { [x: string]: unknown };
    const numbers = String(num.number);

    if (
      typeof numbers === "string" &&
      !numbers.includes("0") &&
      numbers.length === 4 &&
      /^\d+$/.test(numbers)
    ) {
      const existingGame = await Game24.findOne({
        where: { numbers: numbers },
      });

      if (existingGame) {
        return res.json(existingGame?.dataValues["solutions"]);
      } else {
        const solutions = solve24(numbers);

        if (solutions.length === 0) {
          res.json({ success: true, message: "It's not imposible." });
        } else {
          await Game24.create({ numbers, solutions });

          res.json(solutions);
        }
      }
    } else {
      res
        .status(400)
        .json({ success: false, message: "Invalid number format" });
    }
  } catch (error) {
    res.json(error);
  }
});

app.listen(3500, async () => {
  await sequelize.sync();
  console.log("Server is running on port 3500");
});
