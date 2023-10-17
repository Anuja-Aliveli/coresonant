import { Component } from "react";
import {
  BsPersonBoundingBox,
  BsListTask,
  BsFillClipboard2CheckFill,
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
  };

  componentDidMount = async () => {
    const url = "https://jsonplaceholder.typicode.com/users/1/todos";
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok === true) {
      this.setState({ todoList: data });
    }
  };

  onTab = (id) => {
    this.setState({ currentTab: id });
  };

  renderAddTask = () => (
    <div className="input-container">
      <h3 className="right-head">Create Task</h3>
      <input type="text" placeholder="Ex: React Coding" />
      <button type="button" className="add-btn">
        Add Task
      </button>
    </div>
  );

  renderTodoList = () => {
    const { todoList } = this.state;
    return <List todoList={todoList} tabId={2} />;
  };

  renderCompleted = () => {
    const { todoList } = this.state;
    return <List todoList={todoList} tabId={3} />;
  };

  renderIncomplete = () => {
    const { todoList } = this.state;
    return <List todoList={todoList} tabId={4} />;
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
