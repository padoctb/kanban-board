import React, { Component } from 'react';
import './style.css';
import PropTypes from 'prop-types';

class Task extends Component {
  render() {
    const { priority, description, createDate, id, status } = this.props.taskData;
    const deleteTask = this.props.deleteTask;

    return (
      <div className={`task-container ${priority}`}>
        {(status === 'done' || status === 'aborted') && <button onClick={() => deleteTask(id)} className="task-delete-btn">
          X
        </button>}

        <div className="task-description">{description}</div>
        <div className="task-date">Created: {createDate.toLocaleDateString('ru-RU', {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric'
        })}</div>
      </div>
    );
  }
}

Task.propTypes = {
  taskData: PropTypes.shape({
    priority: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    createDate: PropTypes.instanceOf(Date),
    id: PropTypes.number.isRequired
  })
}

export default Task;
