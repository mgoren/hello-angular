import { Component } from 'angular2/core';

// task-list component

@Component({
  selector: 'task-list',
  inputs: ['tasks'],
  template: `
    <h3 *ngFor="#task of tasks" (click)="taskClicked(task)">
      {{task.description}}
    </h3>
  `
})

export class TaskListComponent {
  public tasks: Task[];
  taskClicked(task: Task): void {
    console.log(task);
  }
}


// my-app component

@Component({
  selector: 'my-app',
  directives: [TaskListComponent],
  template: `
    <div class = "container">
      <h1>Todo List</h1>
      <h3 (click)="showMessage">
        <task-list [tasks]="tasks"></task-list>
      </h3>
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
  showMessage() {
    console.log("click received by my-app component");
  }
}



// model definition

export class Task {
  public done: boolean = false;
  constructor(public description: string, public id: number) {}
}
