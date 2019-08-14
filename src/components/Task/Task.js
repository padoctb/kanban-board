import React, { Component } from 'react';
import './style.css';
import PropTypes from 'prop-types';

class Task extends Component {
  render() {
    const { priority, description, createDate, id, status } = this.props.taskData;
    const deleteTask = this.props.deleteTask;

    return (
      <div className={`task-container ${priority}`}>
        <div className='task-buttons'>
          {(status === 'done' || status === 'aborted') && (
            <button onClick={() => deleteTask(id)} className="task-btn task-delete-btn" />
          )}
                    {(status === 'doIt' || status === 'inProgress') && (
            <button onClick={() => deleteTask(id)} className="task-btn task-edit-btn" />
          )}
        </div>

        <div className="task-description">{description}</div>
        <div className="task-date">
          Created:{' '}
          {createDate.toLocaleDateString('ru-RU', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
          })}
        </div>
      </div>
    );
  }
}

Task.propTypes = {
  taskData: PropTypes.shape({
    // данные необходимые для рендера инфы в таске
    priority: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    createDate: PropTypes.instanceOf(Date),
    id: PropTypes.number.isRequired,
  }),
  deleteTask: PropTypes.func.isRequired, // Board function
};

export default Task;
