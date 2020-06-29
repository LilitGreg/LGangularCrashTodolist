import { Injectable } from '@angular/core';
import  {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, tap } from 'rxjs/operators';

import { Todo } from '../modules/Todo';
import { OldTodo } from '../modules/oldTodo';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todosUrl: string = 'https://jsonplaceholder.typicode.com/todos';
  todosLimit = '?_limit=5';

  constructor(private http: HttpClient) { }

  //get Todos
  getTodos():Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.todosUrl}${this.todosLimit}`);
  }

   getOldTodoById(id: number): Observable<OldTodo> {
    return this.http.get<Todo>(`https://jsonplaceholder.typicode.com/todos/${id}`)
       .pipe(
        map(b => <OldTodo> {
          id: b.id,
          title: b.title,
        }),
        tap(classicTodo =>  console.log(classicTodo))
       );

    //return this.http.get<Todo[]>(`${this.todosUrl}${this.todosLimit}`);
  }


  //Toggle Completed
  toggleCompleted(todo: Todo):Observable<any> {

    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.put(url,todo,httpOptions);

  }

  // delete Todo

  deleteTodo(todo: Todo):Observable<Todo> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.delete<Todo>(url, httpOptions);
  }

  //add Todo

  addTodo(todo: Todo):Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todo, httpOptions);
  }

}
