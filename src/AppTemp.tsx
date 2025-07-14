import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router";

type Todo = {
  id: string;
  name: string;
  status: string;
};

const API_URL = `${import.meta.env.VITE_BASE_API_URL}`;
const STATUSES = ["Pending", "Doing", "Done"];

function TodoApp() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [todoText, setTodoText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Pending");
  const [loading, setLoading] = useState(false);

  async function fetchTodos() {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setTodoList(res.data);
    } catch (err) {
      console.error("Error loading todos", err);
    } finally {
      setLoading(false);
    }
  }

  async function addTodo(name: string) {
    try {
      setLoading(true);
      const newTodo = { name, status: "Pending" };
      await axios.post(API_URL, newTodo);
      await fetchTodos();
      setTodoText("");
    } catch (err) {
      console.error("Error adding todo", err);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(todoId: string, newStatus: string) {
    try {
      setLoading(true);
      await axios.put(`${API_URL}/${todoId}`, { status: newStatus });
      await fetchTodos();
    } catch (err) {
      console.error("Error updating status", err);
    } finally {
      setLoading(false);
    }
  }

  async function removeTodo(todoId: string) {
    try {
      setLoading(true);
      await axios.delete(`${API_URL}/${todoId}`);
      await fetchTodos();
    } catch (err) {
      console.error("Error deleting todo", err);
    } finally {
      setLoading(false);
    }
  }

  function handleChangeDone(
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) {
    if (e.target.checked) {
      updateStatus(id, "Done");
    }
  }

  function handleChangeDoing(
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) {
    if (e.target.checked) {
      updateStatus(id, "Doing");
    }
  }





  useEffect(() => {
    fetchTodos();
  }, []);

  const filteredTodos = todoList.filter(
    (todo) => todo.status === selectedStatus
  );

  return (
    <>
      <div className="flex mb-4">
        <input
          className="input input-bordered input-info w-full"
          type="text"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          placeholder="Add your item"
        />
        <button className="btn ml-4" onClick={() => addTodo(todoText)}>
          Add
        </button>
      </div>

      {loading && <div>Loading...</div>}

      <div className="tabs tabs-boxed my-2">
        {STATUSES.map((status) => (
          <a
            key={status}
            className={`tab ${status === selectedStatus ? "tab-active" : ""}`}
            onClick={() => setSelectedStatus(status)}
          >
            {status}
          </a>
        ))}
      </div>

      {filteredTodos.map((todo) => (
        <div
          key={todo.id}
          className="flex items-center justify-between bg-gray-700 p-2 rounded-lg shadow mb-2"
        >
          <input
            type="checkbox"
            className="checkbox"
            checked={todo.status === "Done"}
            onChange={(e) => handleChangeDone(e, todo.id)}
          />
          <div className={todo.status === "Done" ? "line-through" : ""}>
            Item {todo.name}
          </div>
          <div className="flex">
          <input
            type="checkbox"
            className="checkbox mr-2 ml-2"
            checked={todo.status === "Doing"}
            onChange={(e) => handleChangeDoing(e, todo.id)}
          />
            <Link to={`/todo/${todo.id}`}>
              <button className="btn btn-square btn-outline">✏️</button>
            </Link>
            <button
              className="btn btn-square btn-outline ml-2"
              onClick={() => removeTodo(todo.id)}
            >
              🗑️
            </button>
          </div>
        </div>
      ))}
      <div>
        <Link to="/">
          <button className="btn btn-info">Back to Home</button>
        </Link>
      </div>
    </>
  );
}

export default TodoApp;
