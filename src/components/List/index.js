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

  onDeleteIcon = (id) => {
    this.props.onDeleteTask(id);
  };

  onEditIcon = (id) => {
    this.props.onEditTask(id);
  };

  onEdit = (event) => {
    this.props.onEditInput(event);
  };

  onEnterBtn = (event, id) => {
    this.props.onEnter(event, id);
  };

  render() {
    const { todoList, tabId, editText } = this.props;
    const resultList = this.getList(todoList, tabId);
    const heading =
      tabId === 2
        ? "My Tasks"
        : tabId === 3
        ? "Finished Tasks"
        : "Pending Tasks";
    return (
      <div className="list-container">
        <h3 className="right-head">{heading}</h3>
        {resultList.length === 0 && (
          <div className="no-task">
            <h3>No Tasks</h3>
          </div>
        )}
        {resultList.length !== 0 &&
          resultList.map((eachTask) => (
            <div className="task-item-container" key={eachTask.id}>
              <input
                className="checkbox"
                type="checkbox"
                checked={eachTask.completed}
              />
              <div className="title-container">
                {eachTask.isEdit === true && (
                  <input
                    type="text"
                    className="title"
                    value={editText}
                    onChange={this.onEdit}
                    onKeyDown={(event) => this.onEnterBtn(event, eachTask.id)}
                  />
                )}
                {eachTask.isEdit === false && (
                  <p className="title">{eachTask.title}</p>
                )}
                <div className="icons-container">
                  <MdOutlineEdit
                    className="left-icon"
                    onClick={() => this.onEditIcon(eachTask.id)}
                  />
                  <MdOutlineDeleteOutline
                    className="left-icon"
                    onClick={() => this.onDeleteIcon(eachTask.id)}
                  />
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
