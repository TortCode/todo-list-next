"use client";
import {useState} from "react";
import {Todo} from '@prisma/client'

export type TodoItemProps = {
  todo: Todo;
  handleUpdate: (value: { name: string, description: string, status: string }) => void;
  handleDelete: () => void;
}

export default function TodoItem({todo, handleUpdate, handleDelete}: TodoItemProps) {
  const [name, setName] = useState(todo.name);
  const [description, setDescription] = useState(todo.description);
  const [status, setStatus] = useState(todo.status);

  const handleSaveClick = () => {
    handleUpdate({
      name,
      description,
      status,
    });
  }

  const handleResetClick = () => {
    setName(todo.name);
    setDescription(todo.description);
    setStatus(todo.status);
  }

  const isEditing =
    (name !== todo.name) ||
    (description !== todo.description) ||
    (status !== todo.status);

  return (
    <div className="flex flex-col items-start mb-4">
      <div className="mb-4">
        <input
          className="text-2xl border-gray-200 border-b-1 p-1"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="ml-4"
          type="checkbox"
          checked={status === 'Done'}
          onChange={() => setStatus((status === 'Done') ? 'Pending' : 'Done')}
        />
      </div>
      <input
        className="border-gray-200 border-1 rounded-md p-1"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="flex gap-2">
        <input
          className={"p-1 hover:scale-110 " + (isEditing ? "" : "hidden")}
          type="button"
          onClick={handleSaveClick}
          value="Save"
        />
        <input
          className={"p-1 hover:scale-110 " + (isEditing ? "" : "hidden")}
          type="button"
          onClick={handleResetClick}
          value="Reset"
        />
        <input
          className={"p-1 hover:scale-110 "}
          type="button"
          onClick={handleDelete}
          value="Delete"
        />
      </div>
    </div>
  )
}