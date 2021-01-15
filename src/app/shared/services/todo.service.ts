import { Injectable } from '@angular/core';
import { Todo } from '../model/todo.model';
@Injectable()
export class TodoService {
    private todos = [
        new Todo (1,'item1', true),
        new Todo (2,'item2',true)
    ];

    // in mijn services ga ik intensief gebruik maken jargon benamingen.
    // nl.. getters en setters

    // wil een methode om alle todo's op te vragen
    getTodos():Todo[]{
        return this.todos;
    }

    // een methode om details van 1 todo op te vragen...
    getTodo(id:number):Todo{
        return this.todos.find(t => t.id === id);
    }

    addTodo (todoName:string) {
        let newTodo = new Todo(
            this.todos.length+1,
            todoName,
            true
        );
        this.todos.push(newTodo);
    }
    
}