const app = require("./app");
const dotenv = require("dotenv")
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database");

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

// // Config
dotenv.config({ path: "./config/config.env" })
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "./config/config.env" });
}

// Connecting to database
connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// const server = app.listen(process.env.PORT, () => {
//   console.log(`Server is working on http://localhost:${process.env.PORT}`);
// });
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  console.log(`Server is working on http://localhost:${PORT}`);
});
// app.listen(process.env.PORT, () => {
//   console.log(`Server is working on http://localhost:${process.env.PORT}`);
// });

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});

// ✅ Vercel export
module.exports = app