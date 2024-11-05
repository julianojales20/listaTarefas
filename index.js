const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use("/public", express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "/views"));

let tarefas = ["Arrumar o quarto", "Comprar no Supermercado"];

app.post("/", (req, res) => {
  if (req.body.tarefa) {
    tarefas.push(req.body.tarefa);
  }
  res.redirect("/");
});

app.get("/", (req, res) => {
  res.render("index", { tarefasList: tarefas });
});

app.get("/deletar/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!isNaN(id) && id >= 0 && id < tarefas.length) {
    tarefas = tarefas.filter((val, index) => index !== id);
  }
  res.redirect("/");
});

app.listen(5000, () => {
  console.log("Server rodando!");
});
