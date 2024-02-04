import express, { Request, Response } from "express";
import cors from "cors";

import mysql from "mysql2/promise";
import { Sequelize, DataTypes } from "sequelize";

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let conn: mysql.Connection | null = null;

const initMySQL = async () => {
  conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "tutorial",
  });
};

const sequelize = new Sequelize("tutorial", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

const Game24 = sequelize.define(
  "game24",
  {
    numbers: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    solutions: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {},
);

app.get("/chest24", async (req: Request, res: Response) => {
  try {
    const num = req.query as unknown as { [x: string]: unknown };
    const numbers = String(num.number);

    if (
      typeof numbers === "string" &&
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

        await Game24.create({ numbers, solutions });

        if (solutions.length === 0) {
          res.json({ success: true, message: "It's not imposible." });
        }

        res.json(solutions);
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

app.listen(3200, async () => {
  await initMySQL();
  await sequelize.sync();
  console.log("Server is running on port 3200");
});
