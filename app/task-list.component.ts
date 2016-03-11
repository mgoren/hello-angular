import { Component, EventEmitter } from 'angular2/core';
import { TaskComponent } from './task.component';
import { EditTaskDetailsComponent } from './edit-task-details.component';
import { Task } from './task.model';

@Component({
  selector: 'task-list',
  inputs: ['taskList'],
  outputs: ['onTaskSelect'],
  directives: [TaskComponent, EditTaskDetailsComponent],
  template: `
  <task-display *ngFor="#task of taskList" 
    (click)="taskClicked(task)" 
    [class.selected]="task === selectedTask"
    [task]="task">
  </task-display>
  <edit-task-details *ngIf="selectedTask" [task]="selectedTask">
  </edit-task-details>
  `
})

export class TaskListComponent {
  public taskList: Task[];
  public onTaskSelect: EventEmitter<Task>;
  public selectedTask: Task;
  constructor() {
    this.onTaskSelect = new EventEmitter();
  }
  taskClicked(clickedTask: Task): void {
    console.log("TaskListComponent:", clickedTask);
    this.selectedTask = clickedTask;
    this.onTaskSelect.emit(clickedTask);
  }
}