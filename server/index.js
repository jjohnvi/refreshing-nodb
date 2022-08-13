const express = require("express");
const {
  getToDoList,
  addToDo,
  deleteToDo,
  editToDo,
} = require("./controllers/todos");
const app = express();

const bodyParser = require("body-Parser");

app.use(express.json());
app.use(bodyParser());
app.use(express.static(__dirname + "/../public/build"));

//Endpoints

app.get("/api/todos", getToDoList);
app.post("/api/todos", addToDo);
app.delete("/api/todos/:id", deleteToDo);
app.put("/api/todos/:id", editToDo);

const PORT = 9000;
app.listen(PORT, () => {
  console.log(`It's over ${PORT}!!!`);
});
