import { Component, EventEmitter } from 'angular2/core';

// task component

@Component({
  selector: 'task-display',
  inputs: [`task`],
  output: [],
  template: `
  <h3 (click)="taskClicked()">{{task.description}}</h3>
  `
})

export class TaskComponent {
  public task: Task;
  // public onTaskClick: EventEmitter<Task>;
  constructor() {
    // this.onTaskClick = new EventEmitter();
  }
  taskClicked(): void {
    console.log("TaskComponent:", this.task);
    // this.onTaskClick.emit(clickedTask);
  }
}



// task-list component

@Component({
  selector: 'task-list',
  inputs: ['taskList'],
  outputs: ['onTaskSelect'],
  directives: [TaskComponent],
  template: `
  <task-display *ngFor="#task of taskList" 
    (click)="taskClicked(task)" 
    [class.selected]="task === selectedTask"
    [task]="task">
  </task-display>
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


// my-app component

@Component({
  selector: 'my-app',
  directives: [TaskListComponent],
  template: `
  <div class = "container">
    <h1>Todo List</h1>
    <task-list [taskList]="tasks" (onTaskSelect)="taskWasSelected($event)"></task-list>
  </div>
  `
})

export class AppComponent {
  public tasks: Array<Task>;
  constructor() {
    this.tasks = [
      new Task("Create To-Do List app.", 0),
      new Task("Learn Kung Fu.", 1),
      new Task("Rewatch all the Lord of the Rings movies.", 2),
      new Task("Do the laundry.", 3)
    ];
  }
  taskWasSelected(clickedTask: Task): void {
    console.log("AppComponent:", clickedTask);
  }
}



// model definition

export class Task {
  public done: boolean = false;
  constructor(public description: string, public id: number) {}
}
