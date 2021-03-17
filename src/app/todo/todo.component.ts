import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../shared/model/todo.model';
import { TodoService } from '../shared/services/todo.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  // alle vars mooi netjes oplijsten, en de addTodo komt van mijn ngModel
  addTodo:string;
  statusTodo:boolean = false;
  notification:string;
  // ASYNC CONCEPT GEBRUIKEN: Converteren van todos naar een observable (vergeet de import niet boven)
  todos$:Observable<Todo[]>;
  todo$:Observable<Todo>;

  constructor(
    private todoService:TodoService,
    private toastr: ToastrService
    ) {
    // hier doen de initialisatie om deze dan te kunnen opvullen
  //  this.todos = [
  //    new Todo (1, 'belgium', true)
  //  ];
   }

  ngOnInit(): void {
   // de observable gaan opvullen met de methode uit de service...

   this.todos$ = this.todoService.getTodos();
  }

  getTodo(id: number){
    this.todo$ = this.todoService.getTodo(id)
  }

  addNewTodo(){
    console.log(this.addTodo);
    const newTodo = new Todo(null, this.addTodo, this.statusTodo);
    this.todoService.addTodo(newTodo)
    .subscribe(data => console.log(data));
    // nieuwe toto's terug auto ophalen na post
    this.todos$ = this.todoService.getTodos();
  }

  updateTodo(id: number, name: string) {
   // console.log(id,name);
   // het grote verschil met de addNew, is dat we hier ook de id kennen en meegeven in ons object...
   const newTodo = new Todo(id, name, true);
   this.todoService.updateTodo(newTodo).subscribe(data => console.log(data));
   this.todos$ = this.todoService.getTodos();
  }

  deleteTodo(id: number){
     this.todoService.deleteTodo(id).subscribe(data => console.log(data));
     this.toastr.success('Great', 'Another item done!');
  }

}
