import React, { useEffect, useState, Component } from "react";
import axios from "axios";
import ToDo from "./ToDo";
import "./Home.css";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      toDoList: [],
      task: "",
    };
  }

  handleAdd = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = async (e) => {
    e.preventDefault();
    await axios.post("/api/todos", {
      task: this.state.task,
    });
    this.resetState();
  };

  resetState = () => {
    this.setState({ task: "" });
  };

  deleteTask = async (id) => {
    const response = await axios.delete(`/api/todos/${id}`);
    this.setState({ toDoList: response.data });
  };

  refreshToDos = (response) => {
    this.setState({ toDoList: response.data });
  };

  async componentDidMount() {
    const response = await axios.get("/api/todos");
    this.setState({ toDoList: response.data });
  }

  render() {
    let toDoListDisplay = this.state.toDoList.map((todo) => {
      return (
        <ToDo
          key={todo.id}
          editMode={this.state.editMode}
          deleteTask={this.deleteTask}
          editTask={this.editTask}
          changeViewOnEdit={this.changeViewOnEdit}
          todo={todo}
          refreshToDos={this.refreshToDos}
        />
        // <div className="display-div" key={todo.id}>
        //   <div className="todo-task">{todo.task}</div>
        //   <button onClick={() => this.changeViewOnEdit(todo.task)}>Edit</button>
        //   {this.state.editMode ? (
        //     <>
        //       <input value={this.state.newTask} />
        //       <button
        //         onClick={() => this.editTask(todo.id, this.state.newTask)}
        //       >
        //         Edit
        //       </button>
        //     </>
        //   ) : null}
        //   <button onClick={() => this.deleteTask(todo.id)}>Delete</button>
        // </div>
      );
    });
    return (
      <div>
        <input
          name="task"
          onChange={this.handleAdd}
          placeholder="What's next?"
          value={this.state.task}
        />
        <button className="submit" onClick={this.submitHandler} />
        {/* <ToDo
          editMode={this.state.editMode}
          deleteTask={this.deleteTask}
          editTask={this.editTask}
          changeViewOnEdit={this.changeViewOnEdit}
          toDoList={this.state.toDoList}
        /> */}
        {toDoListDisplay}
      </div>
    );
  }
}

// const Home = () => {

//   const [toDo, setToDo] = useState("");
//   const [error, setError] =useState("");

//   const [groupName, setGroupName] = useState("");

//   useEffect(() => {
//     axios.get('/api/todos').then((response) => {
//       setToDo(response.data);
//     })
//     .catch((error) => setError(error.message))

//   }, []);

// const toDoDisplay = toDo.map(todo => {
//   return (
//     <>
//     <div>{todo.task}</div>
//     </>
//   )
// })

// return (
//   <div>
//     <input placeholder="What's next?"></input>
//     <div>{toDoDisplay}</div>
//   </div>
// )

// }

export default Home;
