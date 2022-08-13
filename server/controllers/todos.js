let toDoList = [
  {
    id: 1,
    task: "Grocery Shopping",
  },
  {
    id: 2,
    task: "Get JACKED",
  },
  {
    id: 3,
    task: "Devotionals",
  },
  {
    id: 4,
    task: "Breakfast",
  },
];

getToDoList = (req, res) => {
  res.status(200).json(toDoList);
};

addToDo = (req, res) => {
  toDoList.push(req.body);
  res.json(toDoList);
};

deleteToDo = (req, res) => {
  const { id } = req.params;
  let index = toDoList.findIndex((task) => task.id == id);
  toDoList.splice(index, 1);

  res.status(200).send(toDoList);
};

editToDo = (req, res) => {
  const { task } = req.body;
  const { id } = req.params;

  let index = toDoList.findIndex((task) => task.id == id);
  toDoList[index].task = task;

  res.status(200).send(toDoList);
};

module.exports = {
  getToDoList,
  addToDo,
  deleteToDo,
  editToDo,
};
