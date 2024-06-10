import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import React from "react";
import "./App.css";
import { Link } from "react-router-dom";
import search from './assets/search.svg';
import ListTask from "./ListTask";
import { useNavigate } from "react-router-dom";

const FilterTaskContext = createContext();

function Task({ children }) {

  const [tasks, setTasks] = useState([])
  const [selectedTask, setSelectedTask] = useState(null)
  const [editTask, setEditTask] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [subString, setSubString] = useState('');
  const [filteredTask, setFilteredTask] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/notes/')
      .then(res => {
        console.log(res.data);
        setTasks(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  function clickEdit(id) {
    setSelectedTask(tasks.filter(t => t.id === id));
  }

  function handleUpdateTask() {

    const updatedTask = {
      body: editDescription,
      id: selectedTask[0].id,
      title: editTask,
    }

    axios.put(`http://127.0.0.1:8000/notes/update/${selectedTask[0].id}/`,
      updatedTask
    ).then(res => {
      setTasks(
        tasks.map((task) => task.id === selectedTask[0].id ? res.data : task)
      );
      console.log(res.data);
    })
      .catch(err => {
        console.log(err);
      })
    setSelectedTask(null);
  }

  function deleteTask(id) {
    axios.delete(`http://127.0.0.1:8000/notes/delete/${id}`)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      })
    setTasks(
      tasks.filter(task => task.id !== id)
    )
  }

  function fetchSubStringTask(substr) {
    console.log('fetch task with this sub string', substr);
    axios.get(`http://127.0.0.1:8000/notes/search/?title=${substr}`)
      .then(res => {
        console.log('fetching substring after clicking the image', res.data);
        setFilteredTask(res.data);
        console.log(filteredTask);
        navigate('/filter');
      })
      
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <>
      <FilterTaskContext.Provider value = {filteredTask}>
      <div className="input-div">
        <div className="search-div">
          <input type="text" name="task" id="task-input" onChange={(event) => setSubString(event.target.value)} placeholder="search your task here..." />
          <img src={search} alt="search" onClick={() => { fetchSubStringTask(subString)}} />
        </div>
        <Link to='/popup'>Add task</Link>
      </div>
      {
        tasks.length > 0 ? (<div className="all-todo-div">
          {tasks.map((t, index) => {
            return <ListTask
              id={t.id}
              key={index}
              title={t.title}
              body={t.body}
              deleteTask={deleteTask}
              clickEdit={clickEdit} />
          }
          )}
        </div>) : (<h1>No task yet... </h1>)
      }
      {
        selectedTask && (
          <>
            <div className="background-div"></div>
            <div className="update-pop">
              <input type="text" name="edit-title" id="edit-title" defaultValue={selectedTask[0].title}
                onChange={event => setEditTask(event.target.value)} />
              <br />
              <br />
              <input type="text" name="edit-description" id="edit-description"
                onChange={event => setEditDescription(event.target.value)} defaultValue={selectedTask[0].body} />
              <br />
              <br />
              <button type="button" onClick={handleUpdateTask}>Update</button>
              <button type="button" onClick={() => setSelectedTask(null)}>Cancel</button>
            </div>
          </>
        )
        }
        {children}
        </FilterTaskContext.Provider>
    </>
  );
}

export { Task, FilterTaskContext };


// componentDidMount() {
//   initialized
// }

// componentDidUpdate() {
//   state updated
// }

// componentWillUnmount(){
//   destroyed
// }
