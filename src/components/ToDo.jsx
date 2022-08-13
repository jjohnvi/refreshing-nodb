import React, { Component } from "react";
import axios from "axios";

class ToDo extends Component {
  constructor() {
    super();
    this.state = {
      editMode: false,
      newTask: "",
    };
  }

  editTask = async (id, task) => {
    const response = await axios.put(`/api/todos/${id}`, { task });

    this.props.refreshToDos(response);
    this.setState({ editMode: false });
  };

  changeViewOnEdit = (task) => {
    this.setState({ editMode: !this.state.editMode, newTask: task });
  };

  onChangeHandler = (e) => {
    this.setState({ newTask: e.target.value });
  };

  render() {
    const { deleteTask, todo } = this.props;
    return (
      <div className="display-div" key={todo.id}>
        <div className="todo-task">{todo.task}</div>
        <button onClick={() => this.changeViewOnEdit(todo.task)}>Edit</button>
        {this.state.editMode ? (
          <>
            <input value={this.state.newTask} onChange={this.onChangeHandler} />
            <button onClick={() => this.editTask(todo.id, this.state.newTask)}>
              Edit
            </button>
          </>
        ) : null}
        <button onClick={() => deleteTask(todo.id)}>Delete</button>
      </div>
    );
  }
}

export default ToDo;
