import React from "react";
import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router";

const Popup = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const addTask = () => {
    axios
      .post("http://127.0.0.1:8000/notes/add/", { 'title': title, 'body': body })
      .then((res) => {
        alert('task added successfully');
        console.log(res);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="add-task-div">
        <div className="popup">
          <div className="title-popup">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" onChange={event => setTitle(event.target.value)} placeholder="Write title here..." />
          </div>
          <div className="body-popup">
            <label htmlFor="body">Description</label>
            <input type="text" name="body" id="body" onChange={event => setBody(event.target.value)} placeholder="Write description here..."/>
          </div>
        </div>
        <button type="button" onClick={addTask}>Submit</button>
      </div>
    </>
  );
};

export default Popup;
