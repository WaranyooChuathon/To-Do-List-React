import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router";

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
      <div className="flex items-center justify-between mb-4">
        {/* ปุ่ม Back */}
        <Link to="/">
          <button className="btn btn-info">← Back</button>
        </Link>
        {/* หัวข้อ อยู่ตรงกลาง */}
        <div className="flex-1 text-center text-2xl font-bold">
          <h2>Hello Edit Page {id}</h2>
        </div>
        {/* ตัวหลอกซ้ายให้เท่ากับปุ่ม Back เพื่อดันตรงกลางจริง */}
        <div className="w-[90px]" /> {/* ทำขนาดให้เท่ากับปุ่ม Back */}
      </div>
      {todo ? (
        <div className="space-y-2">
          {/* บรรทัดที่ 1: input + button */}
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Warning"
              className="input input-warning w-full"
              value={todo.name}
              onChange={handleInputChange}
            />
            <button className="btn btn-warning" onClick={updateName}>
              Edit
            </button>
          </div>
          {/* บรรทัดที่ 2: status */}
          <p>Status: {todo.status}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default Edit;
