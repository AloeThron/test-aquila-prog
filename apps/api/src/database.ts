import dotenv from "dotenv";
import { Sequelize, DataTypes } from "sequelize";

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL as string;

export const sequelize = new Sequelize(DATABASE_URL as string, {
  dialect: "postgres",
});

export const Game24 = sequelize.define(
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
