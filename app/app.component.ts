import { Component, EventEmitter } from 'angular2/core';

// task-list component

@Component({
  selector: 'task-list',
  inputs: ['taskList'],
  outputs: ['onTaskSelect'],
  template: `
    <h3 *ngFor="#task of taskList" (click)="taskClicked(task)">
      {{task.description}}
    </h3>
  `
})

export class TaskListComponent {
  public taskList: Task[];
  public onTaskSelect: EventEmitter<Task>;
  constructor() {
    this.onTaskSelect = new EventEmitter();
  }
  taskClicked(clickedTask: Task): void {
    console.log("child:");
    console.log(clickedTask);
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
    console.log("parent:");
    console.log(clickedTask);
  }
}



// model definition

export class Task {
  public done: boolean = false;
  constructor(public description: string, public id: number) {}
}
