import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE_URL || "postgresql://localhost/postgres",
  {
    dialect: "postgres",
    logging: console.log,
    dialectOptions: {
      connectTimeout: 10000,
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

console.log("Testing database connection...");
console.log("URL:", process.env.DATABASE_URL ? process.env.DATABASE_URL.replace(/:[^@]+@/, ":***@") : "Not set");
console.log("");

sequelize.authenticate()
  .then(() => {
    console.log("✓ Database connection successful!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("✗ Database connection failed:");
    console.error("Error code:", error.code || error.name);
    console.error("Error message:", error.message);
    process.exit(1);
  });
