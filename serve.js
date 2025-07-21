import path from "path";

import express from "express";

const app = express();
const PORT = process.env.PORT || 8080;

// Serve static files from the 'dist' directory (Vite build output)
app.use(express.static(path.join(__dirname, "dist")));

// SPA fallback: serve index.html for all other routes
app.get("/{*splat}", (req, res) => {
  console.log(
    `${req.method} ${req.path} | ${new Date(Date.now()).toLocaleTimeString("it-IT")}`,
  );
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
