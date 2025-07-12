import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://6870d4e57ca4d06b34b83d5a.mockapi.io/todocs";

type Todo = {
  id: string;
  name: string;
  status: string;
};

function Edit() {
  const { id } = useParams<{ id: string }>();
  const [todo, setTodo] = useState<Todo | null>(null); // ✅ กำหนดชนิดให้ถูกต้อง

  async function fetchTodo(todoId: string) {
    try {
      const response = await axios.get<Todo>(`${API_URL}/${todoId}`);
      setTodo(response.data);
      console.log("Todo fetched successfully:", response.data);
    } catch (error) {
      console.error("Error fetching todo:", error);
    }
  }

  async function updateName() {
    if (!todo) return;
    try {
      console.log("Updating todo with id:", id);
      await axios.put(`${API_URL}/${id}`, {
        name: todo.name,
      });
      alert("Todo updated successfully");
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  }

  useEffect(() => {
    if (id) {
      fetchTodo(id);
    }
  }, [id]);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTodo((prevTodo) =>
      prevTodo
        ? {
            ...prevTodo,
            name: event.target.value,
          }
        : null
    );
  }

  return (
    <>
      <h2>Hello Edit Page {id}</h2>
      {todo ? (
        <div>
          <input type="text" value={todo.name} onChange={handleInputChange} />
          <p>Status: {todo.status}</p>
          <button onClick={updateName}>Edit</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default Edit;
