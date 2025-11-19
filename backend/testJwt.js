import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Load .env variables

const secret = process.env.JWT_SECRET || "fallback_secret";

const token = jwt.sign({ id: 123, username: "test" }, secret, { expiresIn: "1h" });
console.log("JWT Token:", token);

const decoded = jwt.verify(token, secret);
console.log("Decoded:", decoded);
