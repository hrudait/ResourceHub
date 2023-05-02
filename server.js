import express from "express";
import cors from "cors";
import restaurants from "./api/restaurants.route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1/restaurants", restaurants);
app.get("/", (req, res) => {
  res.sendfile("basecode.html");
});
app.get("/add", (req, res) => {
  res.sendfile("additem.html");
});
app.get("/code.js", (req, res) => {
  res.sendfile("code.js");
});
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

export default app;
