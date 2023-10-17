import { MdOutlineEdit, MdOutlineDeleteOutline } from "react-icons/md";
import "./index.css";

const List = (props) => {
  const {
    todoList,
    onDeleteTask,
    editText,
    onEditTask,
    onEditInput,
    onEnter,
    onCheckbox,
    tabId,
  } = props;
  const getList = (todoList, tabId) => {
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

  const onDeleteIcon = (id) => {
    onDeleteTask(id);
  };

  const onEditIcon = (id) => {
    onEditTask(id);
  };

  const onEdit = (event) => {
    onEditInput(event);
  };

  const onEnterBtn = (event, id) => {
    onEnter(event, id);
  };

  const onCheckIcon = (id) => {
    onCheckbox(id);
  };

  const resultList = getList(todoList, tabId);
  const heading =
    tabId === 2 ? "My Tasks" : tabId === 3 ? "Finished Tasks" : "Pending Tasks";
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
              onChange={() => onCheckIcon(eachTask.id)}
            />
            <div className="title-container">
              {eachTask.isEdit === true && (
                <input
                  type="text"
                  className="title"
                  value={editText}
                  onChange={onEdit}
                  onKeyDown={(event) => onEnterBtn(event, eachTask.id)}
                />
              )}
              {eachTask.isEdit === false && (
                <p className="title">{eachTask.title}</p>
              )}
              <div className="icons-container">
                <MdOutlineEdit
                  className="left-icon"
                  onClick={() => onEditIcon(eachTask.id)}
                />
                <MdOutlineDeleteOutline
                  className="left-icon"
                  onClick={() => onDeleteIcon(eachTask.id)}
                />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default List;
