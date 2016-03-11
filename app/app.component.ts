import { Component } from 'angular2/core';

@Component({
  selector: 'my-app',
  template: `
    <div class = "container">
      <h1>Todo List</h1>
      <h3>{{ task.description }}</h3>
    </div>
  `
})

export class AppComponent {
  public task: Task;
  constructor() {
    this.task = new Task("Go to happy hour!", 0);
  }
}

export class Task {
  public done: boolean = false;
  constructor(public description: string, public id: number) {
  }
}
