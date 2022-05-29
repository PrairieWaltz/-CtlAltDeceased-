const express = require("express");
const path = require("path");
const ejsMate = require("ejs-mate");

const port = 3000;

const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/blog", (req, res) => {
  res.render("blog");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

// WEB SOCKET

app.rawListeners("echo", (ws, req) => {
  ws.on("message", (msg) => {
    ws.send(msg);
  });
});


app.listen(port, () => {
  console.log(`Loud and Clear on Port ${port}`);
});
