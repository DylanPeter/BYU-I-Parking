import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pkg from "pg";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { Pool } = pkg;

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
const jwtSecret = process.env.JWT_SECRET || "super-secret-byui-parking";

app.use(cors({ origin: true }));
app.use(express.json());

async function createTables() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('Student', 'Faculty')),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `);
}

app.post("/api/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: "Missing registration fields." });
  }
  if (!/@byui\.edu$/i.test(email.trim())) {
    return res.status(400).json({ error: "Must register with a @byui.edu email." });
  }
  if (!["Student", "Faculty"].includes(role)) {
    return res.status(400).json({ error: "Role must be Student or Faculty." });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query(
      `INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role`,
      [name.trim(), email.trim().toLowerCase(), passwordHash, role]
    );

    const user = result.rows[0];
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, jwtSecret, {
      expiresIn: "7d",
    });

    return res.status(201).json({ user, token });
  } catch (err) {
    if (err?.code === "23505") {
      return res.status(409).json({ error: "User already exists." });
    }
    console.error(err);
    return res.status(500).json({ error: "Registration failed." });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const result = await pool.query(
      `SELECT id, name, email, password_hash, role FROM users WHERE email = $1`,
      [email.trim().toLowerCase()]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, jwtSecret, {
      expiresIn: "7d",
    });

    return res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Login failed." });
  }
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Serve the built React frontend (Vite outputs to /dist)
const distPath = path.join(__dirname, "dist");

// Serve static assets first, with correct MIME types
app.use(express.static(distPath));

// SPA fallback: only for non-API, non-file routes (no dot/extension in the path)
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) return next();
  if (req.path.includes(".")) return next(); // let static 404 real missing files
  res.sendFile(path.join(distPath, "index.html"));
});

createTables()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Unable to initialize database:", err);
    process.exit(1);
  });
