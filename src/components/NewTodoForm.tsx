"use client";

import {useState} from "react";

export type NewTodoFormProps = {
  handleAdd: (value: { name: string, description: string, status: string }) => void;
}

export default function NewTodoForm({handleAdd}: NewTodoFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const clearForm = () => {
    setName('');
    setDescription('');
  }

  const handleAddClick = () => {
    handleAdd({
      name,
      description,
      status: 'Pending',
    });
    clearForm();
  }

  return (
    <div className="flex flex-col items-start mb-2">
      <h2 className="text-3xl">New Item</h2>
      <div className="mb-4">
        <input
          className="text-2xl border-gray-200 border-b-1 p-1"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <input
        className="border-gray-200 border-1 rounded-md p-1"
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="flex gap-2">
        <input
          className={"p-1 hover:scale-110 "}
          type="button"
          onClick={handleAddClick}
          value="Add"
        />
        <input
          className={"p-1 hover:scale-110 "}
          type="button"
          onClick={clearForm}
          value="Clear"
        />
      </div>
    </div>
  )
}