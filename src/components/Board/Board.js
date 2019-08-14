import React, { Component } from 'react';
import tasks from './../../tasks';
import './style.css';
import Task from './../Task/Task';
import AddTaskDialog from '../AddTask/AddTask';

class Board extends Component {

  state = {
    tasks: tasks,
    isDialogOpen: false,
  };

  deleteTask = taskId => {
    this.setState({
      tasks: this.state.tasks.filter(task => task.id !== taskId),
    });
  };

  toggleDialog = () => {
    this.setState({
      isDialogOpen: !this.state.isDialogOpen
    })
  }

  addTask = (event, taskData) => {
    this.setState({
      tasks: [...this.state.tasks, taskData]
    })
  }

  render() {
    console.log('Tasks list:', this.state.tasks);

    return (
      <div>
        <div className="board-wrapper">
          <h1 className="board-title">Kanban Board</h1>
          <div className="board-container">
            <div className="column">
              <h3 className="column-title">Do it</h3>

              <div className="column-tasks">
                {this.state.tasks.map((task, i) => {
                  return (
                    task.status === 'doIt' && (
                      <Task deleteTask={this.deleteTask} key={task.id} taskData={task} />
                    )
                  );
                })}
              </div>
            </div>

            <div className="column">
              <h3 className="column-title">In Progress</h3>

              <div className="column-tasks">
                {this.state.tasks.map((task, i) => {
                  return (
                    task.status === 'inProgress' && (
                      <Task deleteTask={this.deleteTask} key={task.id} taskData={task} />
                    )
                  );
                })}
              </div>
            </div>

            <div className="column">
              <h3 className="column-title">Done</h3>

              <div className="column-tasks">
                {this.state.tasks.map((task, i) => {
                  return (
                    task.status === 'done' && (
                      <Task deleteTask={this.deleteTask} key={task.id} taskData={task} />
                    )
                  );
                })}
              </div>
            </div>

            <div className="column">
              <h3 className="column-title">Aborted</h3>

              <div className="column-tasks">
                {this.state.tasks.map((task, i) => {
                  return (
                    task.status === 'aborted' && (
                      <Task deleteTask={this.deleteTask} key={task.id} taskData={task} />
                    )
                  );
                })}
              </div>
            </div>
          </div>

          <button onClick={this.toggleDialog} className="add-task">
            Add Task
          </button>
        </div>

        {this.state.isDialogOpen && <AddTaskDialog addTask={this.addTask} toggleDialog={this.toggleDialog}/>}
      </div>
    );
  }
}

export default Board;
