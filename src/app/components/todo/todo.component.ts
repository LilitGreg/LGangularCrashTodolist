import { Component, OnInit } from '@angular/core';
import {Todo} from '../../modules/Todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: Todo[];

  constructor(private todoService: TodoService) { }

  ngOnInit() {

    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });

  }

  deleteTodo(todo: Todo) {
   // console.log("delete me");
   // Remove from UI
   this.todos = this.todos.filter( t => t.id !== todo.id );

   //Remove from server
   this.todoService.deleteTodo(todo).subscribe();
  }

  addTodo(todo: Todo) {
    this.todoService.addTodo(todo).subscribe(todo => {
      this.todos.push(todo);
    });
  }

}
