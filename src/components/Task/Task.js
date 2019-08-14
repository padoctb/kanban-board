import React, { Component } from 'react';
import './style.css';

class Task extends Component {
  render() {
    const { priority, description, createDate, id } = this.props.taskData;
    const deleteTask = this.props.deleteTask;

    return (
      <div className={`task-container ${priority}`}>
        <button onClick={() => deleteTask(id)} className="task-delete-btn">
          X
        </button>

        <div className="task-description">{description}</div>
        <div className="task-date">Created: {createDate.toLocaleDateString()}</div>
      </div>
    );
  }
}

export default Task;
