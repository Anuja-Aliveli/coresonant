import { Component } from "react";
import { MdOutlineEdit, MdOutlineDeleteOutline } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
import "./index.css";

class List extends Component {
  getList = (todoList, tabId) => {
    switch (tabId) {
      case 2:
        return todoList;
      case 3:
        const tempList1 = todoList.filter(
          (eachItem) => eachItem.completed === true
        );
        return tempList1;
      case 4:
        const tempList2 = todoList.filter(
          (eachItem) => eachItem.completed === false
        );
        return tempList2;
      default:
        return null;
    }
  };

  render() {
    const { todoList, tabId } = this.props;
    const resultList = this.getList(todoList, tabId);
    const heading = tabId === 2 ? 'My Tasks' : tabId === 3 ? 'Finished Tasks' : 'Pending Tasks'
    return (
      <div className="list-container">
        <h3 className="right-head">{heading}</h3>
        {resultList.map((eachTask) => (
          <div className="task-item-container">
            <input
              className="checkbox"
              type="checkbox"
              checked={eachTask.completed}
            />
            <div className="title-container">
              <p className="title">{eachTask.title}</p>
              <div className="icons-container">
                <MdOutlineEdit className="left-icon" />
                <MdOutlineDeleteOutline className="left-icon" />
                <AiOutlineHeart className="left-icon" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default List;
