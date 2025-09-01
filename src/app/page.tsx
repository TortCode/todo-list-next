"use client";

import {useEffect, useState} from "react";
import {Todo} from "@prisma/client";
import TodoItem, from "@/components/TodoItem";
import NewTodoForm from "@/components/NewTodoForm";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const run = async () => {
      try {
        const response = await fetch('/api/todos');
        if (!response.ok) {
          console.error(await response.json());
          return;
        }
        const todos = await response.json();
        setTodos(todos);
      } catch (e) {
        console.error(e);
      }
    }
    run();
  }, []);

  const handleAdd = async (value: any) => {
    try {
      const response = await fetch('/api/todos', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(value),
      });
      if (!response.ok) {
        console.error(await response.json());
        return;
      }
      const addedTodo = await response.json();
      setTodos(todos.concat(addedTodo));
    } catch (e) {
      console.error(e);
    }
  }

  const handleUpdate = async (id: string, value: any) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(value),
      });
      if (!response.ok) {
        console.error(await response.json());
        return;
      }
      const updatedTodo = await response.json();
      setTodos(todos.map((todo) => {
        if (todo.id === id) {
          return updatedTodo;
        }
        return todo;
      }))
    } catch (e) {
      console.error(e);
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE"
      });
      if (!response.ok) {
        console.error(await response.json());
        return;
      }
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="font-sans min-h-screen p-8 pb-20 sm:p-20">
      <h1 className="text-3xl mb-4">Todo List</h1>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleUpdate={(value) => handleUpdate(todo.id, value)}
          handleDelete={() => handleDelete(todo.id)}
        />
      ))}
      <NewTodoForm handleAdd={handleAdd}/>
    </div>
  );
}
