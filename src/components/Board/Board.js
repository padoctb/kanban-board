import React, { Component } from 'react';
import tasks from './../../tasks';
import './style.css';
import Task from './../Task/Task';
import AddTaskDialog from './../AddTaskDialog/AddTaskDialog';

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

  render() {
    console.log(this.state.tasks);

    return (
      <div>
        <div className="board-wrapper">
          Kanban board
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
          <button onClick={() => this.setState({})} className="add-task">
            Add Task
          </button>
        </div>
        {this.state.isDialogOpen && <AddTaskDialog />}
      </div>
    );
  }
}

export default Board;
