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
                <h3>Add Input</h3>
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
          <div className="right-container">
            <h1>Hello</h1>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
