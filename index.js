const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const taskslist = [
  {
    id: 1,
    task: "code",
  },
  {
    id: 2,
    task: "eat",
  },
  {
    id: 3,
    task: "sleep",
  },
];

app.get("/", (req, res) => {
  return res.render("ToDoList", {
    data: taskslist,
  });
});

app.post("/", (req, res) => {
  const inputTodoId = Math.floor(Math.random() * 1000);
  const inputTodoTask = req.body.task;

  taskslist.push({
    id: inputTodoId,
    task: inputTodoTask,
  });

  res.render("ToDoList", {
    data: taskslist,
  });
});

app.post("/delete/:id", (req, res) => {
  const { id } = req.params;
  const index = taskslist.findIndex((post) => post.id == id);
  taskslist.splice(index, 1);
  return res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server run on port ${port}`);
});
