import { Injectable } from '@angular/core';
import { Todo } from '../model/todo.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class TodoService {
constructor(private http: HttpClient){}
url:string = "https://massimo-dn-cors.herokuapp.com/https://syntra.terugsamen.be/swisskebabs/public/api/todos";

    getTodos(): Observable<Todo[]> {
        return this.http
            .get<Todo[]>(this.url)
            .pipe(
                tap (result => console.log('Via onze eigen API:', result))
            )
    }
    getTodo(id:number) {
        console.log(id);
        return this.http
        .get<Todo>(this.url+'/'+id)
        .pipe()
    }

    addTodo(newTodo:Todo): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post(this.url,newTodo,{headers:headers});
    }

    updateTodo(newTodo:Todo): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.put(this.url+'/'+newTodo.id,newTodo, {headers:headers});
    }


    deleteTodo(id: number){
        return this.http.delete(this.url+'/'+id);
    }
    
}