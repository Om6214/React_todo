import React, { useEffect, useState } from 'react';
import list from '../images/list';
import '../App.css';
import { IoAdd } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const Todo = () => {
  const getarray = () => {
    const list = localStorage.getItem('tasklist');
    return list ? JSON.parse(list) : [];
  };

  const [task, setTask] = useState("");
  const [taskarray, setTaskArray] = useState(getarray());
  const [toggleButton, settoggleButton] = useState(true);
  const [editTaskId, setEditTaskId] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    if (task.trim() !== "") {
      if (editTaskId) {
        const updatedTasks = taskarray.map(item => 
          item.id === editTaskId ? { ...item, name: task } : item
        );
        setTaskArray(updatedTasks);
        setEditTaskId(null);
        settoggleButton(true);
      } else {
        const newTask = { id: new Date().getTime().toString(), name: task };
        setTaskArray([...taskarray, newTask]);
      }
      setTask("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      submit(e);
    }
  };

  const deletetask = (id) => {
    const newArray = taskarray.filter((elem) => elem.id !== id);
    setTaskArray(newArray);
  };

  const edittask = (id) => {
    const selectedTask = taskarray.find((ele) => ele.id === id);
    setTask(selectedTask.name);
    settoggleButton(false);
    setEditTaskId(id);
  };

  useEffect(() => {
    localStorage.setItem('tasklist', JSON.stringify(taskarray));
  }, [taskarray]);

  const clear = () => {
    setTaskArray([]);
  };

  return (
    <div className="main-cont">
      <div className="container">
        <img src={list} alt="task list" />
        <h3>Enter your tasks</h3>
        <div className="inputs">
          <label htmlFor="tasks"></label>
          <div className="input">
            <input
              type="text"
              name="tasks"
              id="tasks"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            {toggleButton ? (
              <IoAdd className='icon' onClick={submit} />
            ) : (
              <FaEdit className='icon' onClick={submit} />
            )}
          </div>
          <ul>
            {taskarray.map((curEle) => (
              <ul key={curEle.id}>
                {curEle.name}
                <FaEdit className='delicon' onClick={() => edittask(curEle.id)} />
                <MdDelete className='delicon' onClick={() => deletetask(curEle.id)} />
              </ul>
            ))}
          </ul>
          <button onClick={clear}>Clear All</button>
        </div>
      </div>
    </div>
  );
};

export default Todo;
