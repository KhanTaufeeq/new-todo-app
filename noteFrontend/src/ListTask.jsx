import React from 'react';

function ListTask(props) {
    return (
        <div className="task-div">
              <div className="each-task">
                <h2>{props.title}</h2>
                <p>{props.body}</p>
              </div>
              <div className="task-btn">
                <button type="button" onClick={() => props.deleteTask(props.id)}>Delete</button>
                <button type="button" onClick={() => props.clickEdit(props.id)}>Edit</button>
              </div>
        </div>
    )
}

export default ListTask;
