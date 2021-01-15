import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/model/todo.model';
import { TodoService } from '../shared/services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  // alle vars mooi netjes oplijsten
  addTodo:string;
  notification:string;
  todos:Todo[];

  constructor(private todoService:TodoService) {
    // hier doen de initialisatie om deze dan te kunnen opvullen
   
   }

  ngOnInit(): void {
    this.todos = this.todoService.getTodos();
  }

  addNewTodo(){
    // console.log(this.addTodo);
   this.todoService.addTodo(this.addTodo);
   this.addTodo="";
  }

  deleteTodo(i:number){
    // ik begin op positie i, en daar neem ik 1 record weg!
    this.todos.splice(i,1);
  }

}
