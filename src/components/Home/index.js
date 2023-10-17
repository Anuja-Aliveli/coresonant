import { Component } from "react";
import {
  BsPersonBoundingBox,
  BsFillClipboard2CheckFill,
  BsFillPatchCheckFill,
} from "react-icons/bs";
import {
  AiFillPlusSquare,
  AiFillCloseSquare,
  AiFillHeart,
} from "react-icons/ai";
import { FaThList } from "react-icons/fa";
import List from "../List";
import "./index.css";

class Home extends Component {
  state = {
    todoList: [],
    currentTab: "tab1",
    newTask: "",
    showTick: false,
    editText: "",
  };

  componentDidMount = async () => {
    const url = "https://jsonplaceholder.typicode.com/users/1/todos";
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok === true) {
      const todoListWithEditFlag = data.map((eachTask) => ({
        ...eachTask,
        isEdit: false,
      }));
      this.setState({ todoList: todoListWithEditFlag });
    }
  };

  onTab = (id) => {
    this.setState({ currentTab: id });
  };

  onInput = (event) => {
    this.setState({ newTask: event.target.value });
  };

  onAddBtn = () => {
    const { newTask, todoList } = this.state;
    if (newTask.length === 0) {
      alert("Please Add Task");
    } else {
      const newTodoItem = {
        userId: 1,
        id: todoList.length + 1,
        title: newTask,
        completed: false,
        isEdit: false,
      };
      this.setState((prevState) => ({
        todoList: [...prevState.todoList, newTodoItem],
        newTask: "",
        showTick: true,
      }));
      setTimeout(() => {
        this.setState({ showTick: false });
      }, 1000);
    }
  };

  onDeleteTask = (id) => {
    this.setState((prevState) => ({
      todoList: prevState.todoList.filter((eachItem) => eachItem.id !== id),
    }));
  };

  onEditTask = (id) => {
    this.setState((prevState) => ({
      todoList: prevState.todoList.map((eachItem) => {
        if (eachItem.id === id) {
          return { ...eachItem, isEdit: true };
        }
        return eachItem;
      }),
      editText: prevState.todoList.find((eachItem) => eachItem.id === id).title,
    }));
  };

  onEditInput = (event) => {
    this.setState({ editText: event.target.value });
  };

  onEnter = (event, id) => {
    const { editText } = this.state;
    if (event.key === "Enter") {
      this.setState((prevState) => ({
        todoList: prevState.todoList.map((eachItem) => {
          if (eachItem.id === id) {
            return { ...eachItem, title: editText, isEdit: false };
          }
          return eachItem;
        }),
        editText: "",
      }));
    }
  };

  renderAddTask = () => {
    const { newTask, showTick } = this.state;
    return (
      <div className="input-container">
        <h3 className="right-head">Create Task</h3>
        <input
          type="text"
          placeholder="Ex: React Coding"
          onChange={this.onInput}
          value={newTask}
        />
        <div className="tick-container">
          <button type="button" className="add-btn" onClick={this.onAddBtn}>
            Add Task
          </button>
          {showTick && <BsFillPatchCheckFill className="icon-tick" />}
        </div>
      </div>
    );
  };

  renderTodoList = () => {
    const { todoList, editText } = this.state;
    return (
      <List
        todoList={todoList}
        tabId={2}
        onDeleteTask={this.onDeleteTask}
        editText={editText}
        onEditTask={this.onEditTask}
        onEditInput={this.onEditInput}
        onEnter={this.onEnter}
      />
    );
  };

  renderCompleted = () => {
    const { todoList } = this.state;
    return (
      <List todoList={todoList} tabId={3} onDeleteTask={this.onDeleteTask} />
    );
  };

  renderIncomplete = () => {
    const { todoList } = this.state;
    return (
      <List todoList={todoList} tabId={4} onDeleteTask={this.onDeleteTask} />
    );
  };

  renderRight = () => {
    const { currentTab } = this.state;
    switch (currentTab) {
      case "tab1":
        return this.renderAddTask();
      case "tab2":
        return this.renderTodoList();
      case "tab3":
        return this.renderCompleted();
      case "tab4":
        return this.renderIncomplete();
      default:
        return null;
    }
  };

  render() {
    const { todoList, currentTab } = this.state;
    return (
      <div className="home-page">
        <h1 className="todohead">Todo List</h1>
        <div className="main-container">
          <div className="left-container">
            <div className="profile-container">
              <BsPersonBoundingBox className="icon" />
              <h2>User1</h2>
            </div>
            <div className="menu-container">
              <button
                type="button"
                className={`menu-item-container${
                  currentTab === "tab1" ? " active" : ""
                }`}
                onClick={() => this.onTab("tab1")}
              >
                <AiFillPlusSquare className="left-icon" />
                <h3>Add Task</h3>
              </button>
              <button
                type="button"
                className={`menu-item-container${
                  currentTab === "tab2" ? " active" : ""
                }`}
                onClick={() => this.onTab("tab2")}
              >
                <FaThList className="left-icon" />
                <h3>Todo List</h3>
              </button>
              <button
                type="button"
                className={`menu-item-container${
                  currentTab === "tab3" ? " active" : ""
                }`}
                onClick={() => this.onTab("tab3")}
              >
                <BsFillClipboard2CheckFill className="left-icon" />
                <h3>Completed Tasks</h3>
              </button>
              <button
                type="button"
                className={`menu-item-container${
                  currentTab === "tab4" ? " active" : ""
                }`}
                onClick={() => this.onTab("tab4")}
              >
                <AiFillCloseSquare className="left-icon" />
                <h3>Incomplete Tasks</h3>
              </button>
              <button
                type="button"
                className={`menu-item-container${
                  currentTab === "tab5" ? " active" : ""
                }`}
                onClick={() => this.onTab("tab5")}
              >
                <AiFillHeart className="left-icon" />
                <h3>Favorite Tasks</h3>
              </button>
            </div>
          </div>
          <div className="right-container">{this.renderRight()}</div>
        </div>
      </div>
    );
  }
}
export default Home;
