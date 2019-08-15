import React, { Component } from 'react';
import tasks from './../../tasks';
import './style.css';
import Task from './../Task/Task';
import AddTask from '../AddTask/AddTask';
import EditTask from '../EditTask/EditTask';

class Board extends Component {
  state = {
    tasks: tasks,
    isAddTaskOpen: false,
    editTaskState: {
      isOpen: false,
      taskStatus: null,
      taskId: null,
      taskPriority: null,
    },
  };

  deleteTask = taskId => {
    this.setState({
      tasks: this.state.tasks.filter(task => task.id !== taskId),
    });
  };

  toggleAddTask = () => {
    this.setState({
      isAddTaskOpen: !this.state.isAddTaskOpen,
    });
  };

  addTask = (event, taskData) => {
    this.setState({
      tasks: [...this.state.tasks, taskData],
    });
  };

  toggleEditTask = ({ id, description, status, priority } = {}) => {
    this.setState({
      editTaskState: {
        isOpen: !this.state.editTaskState.isOpen,
        taskStatus: status,
        taskId: id,
        taskPriority: priority,
        taskDescription: description,
      },
    });
  };

  editTask = (newDescription, newPriority, taskId) => {
    this.state.tasks.forEach(elem => {
      if (elem.id === taskId) {
        elem.description = newDescription;
        elem.priority = newPriority;
      }
    });
  };

  renderTasks = status => {
    // отбираем по статусу - рендерим в колонку
    let filteredTasks = [...this.state.tasks].filter(task => task.status === status);
    filteredTasks = filteredTasks.sort((taskA, taskB) => {
      return Number(taskB.createDate) - Number(taskA.createDate)
    })
    return filteredTasks.map(task => {
      return (
        <Task
          toggleEditTask={this.toggleEditTask}
          editTask={this.editTask}
          deleteTask={this.deleteTask}
          key={task.id}
          taskData={task}
        />
      );
    });
  };

  render() {
    console.log('Tasks list:', this.state.tasks);

    return (
      <div>
        <div className="board-wrapper">
          <h1 className="board-title">Kanban Board</h1>
          <div className="board-container">
            <div className="column">
              <h3 className="column-title">Do it</h3>

              <div className="column-tasks">{this.renderTasks('doIt')}</div>
            </div>

            <div className="column">
              <h3 className="column-title">In Progress</h3>

              <div className="column-tasks">{this.renderTasks('inProgress')}</div>
            </div>

            <div className="column">
              <h3 className="column-title">Done</h3>

              <div className="column-tasks">{this.renderTasks('done')}</div>
            </div>

            <div className="column">
              <h3 className="column-title">Aborted</h3>

              <div className="column-tasks">{this.renderTasks('aborted')}</div>
            </div>
          </div>

          <button onClick={this.toggleAddTask} className="add-task">
            Add Task
          </button>
        </div>

        {this.state.isAddTaskOpen && (
          <AddTask addTask={this.addTask} toggleAddTask={this.toggleAddTask} />
        )}
        {this.state.editTaskState.isOpen && (
          <EditTask
            taskState={this.state.editTaskState}
            editTask={this.editTask}
            toggleEditTask={this.toggleEditTask}
          />
        )}
      </div>
    );
  }
}

export default Board;
