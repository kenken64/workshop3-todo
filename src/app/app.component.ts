import { Component } from '@angular/core';
import { FormGroup, 
          FormBuilder, 
          FormControl, 
          Validators } from '@angular/forms';

import { Todo } from './todo';
import { v4 as uuidv4 } from 'uuid'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-todo';
  form: FormGroup;
  tomorrow = new Date();
  todosValues : Todo[] = [];
  priorities = ["low", "Medium", "High", "Damn Urgent!"];
  
  taskFormControl = new FormControl('', [Validators.required]);
  priorityFormControl = new FormControl('', [Validators.required]);
  dueDateFormControl = new FormControl('', [Validators.required]);

  constructor(private fb: FormBuilder){
    this.tomorrow.setDate(this.tomorrow.getDate()+1);
    this.form = this.fb.group({
      task: this.taskFormControl,
      priority: this.priorityFormControl,
      dueDate: this.dueDateFormControl
    })
  }

  addTodo(){
    console.log("Add todo");
    let taskId  = uuidv4();
    console.log(this.form.value.dueDate._d);
    let singleTodo = new Todo(
      this.form.value.task,
      this.form.value.priority,
      this.form.value.dueDate._d,
      taskId
    )
    console.log(JSON.stringify(singleTodo))
    this.todosValues.push(singleTodo);
    this.taskFormControl.reset();
    this.priorityFormControl.reset();
    this.dueDateFormControl.reset();
    localStorage.setItem(taskId, JSON.stringify(singleTodo));
  }
}
