import { Component, EventEmitter } from 'angular2/core';
import { TaskComponent } from './task.component';
import { EditTaskDetailsComponent } from './edit-task-details.component';
import { NewTaskComponent } from './new-task.component';
import { Task } from './task.model';
import {DonePipe} from './done.pipe';

@Component({
  selector: 'task-list',
  inputs: ['taskList'],
  outputs: ['onTaskSelect'],
  directives: [TaskComponent, NewTaskComponent, EditTaskDetailsComponent],
  pipes: [DonePipe],
  template: `
  <select (change)="onChange($event.target.value)" class="filter">
    <option value="all">Show All</option>
    <option value="done">Show Done</option>
    <option value="notDone" selected="selected">Show Not Done</option>
   </select>
  <task-display *ngFor="#task of taskList | done:filterDone" 
    (click)="taskClicked(task)" 
    [class.selected]="task === selectedTask"
    [task]="task">
  </task-display>
  <edit-task-details *ngIf="selectedTask" [task]="selectedTask">
  </edit-task-details>
  <new-task (onSubmitNewTask)="createTask($event)">
  </new-task>
  `
})

export class TaskListComponent {
  public taskList: Task[];
  public onTaskSelect: EventEmitter<Task>;
  public selectedTask: Task;
  public filterDone: string = "notDone";
  constructor() {
    this.onTaskSelect = new EventEmitter();
  }
  taskClicked(clickedTask: Task): void {
    console.log("TaskListComponent:", clickedTask);
    this.selectedTask = clickedTask;
    this.onTaskSelect.emit(clickedTask);
  }
  createTask(description: string): void {
    console.log("new task created with description:", description, this.taskList.length);
    this.taskList.push(new Task(description, this.taskList.length));
  }
  onChange(filterOption) {
    this.filterDone = filterOption;
    console.log(this.filterDone);
  }
}