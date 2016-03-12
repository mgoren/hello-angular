import { Component, EventEmitter } from 'angular2/core';
import { TaskComponent } from './task.component';
import { EditTaskDetailsComponent } from './edit-task-details.component';
import { NewTaskComponent } from './new-task.component';
import { Task } from './task.model';

@Component({
  selector: 'task-list',
  inputs: ['taskList'],
  outputs: ['onTaskSelect'],
  directives: [TaskComponent, NewTaskComponent, EditTaskDetailsComponent],
  template: `
  <select>
    <option value="all">Show All</option>
    <option value="done">Show Done</option>
    <option value="notDone" selected="selected">Show Not Done</option>
   </select>
  <task-display *ngFor="#task of taskList" 
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
}