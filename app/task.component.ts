import { Component } from 'angular2/core';
import { Task } from './task.model';

@Component({
  selector: 'task-display',
  inputs: [`task`],
  template: `
  <h3 (click)="taskClicked()">{{task.description}}</h3>
  `
})

export class TaskComponent {
  public task: Task;
  taskClicked(): void {
    console.log("TaskComponent:", this.task);
  }
}