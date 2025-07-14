import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

// Define the Todo type
type Todo = {
  id: string;
  name: string;
  status: string;
};

const API_URL = `${import.meta.env.VITE_BASE_API_URL}`;
const statuses = ["all", "done", "pending"]; // จำลองค่าจาก store

function App() {
  // State to hold the list of todos
  const [todocs, setTodoList] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newTodoName, setNewTodoName] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");


  // Function to fetch todos from the API
  async function fetchTodos() {
    try {
      const response = await axios.get(`${API_URL}`);
      setTodoList(response.data);
      setLoading(false);
      console.log("Todos fetched successfully:", response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  }

  async function deleteTodo(id: string) {
    try {
      setLoading(true);
      console.log("Deleting todo with id:", id);
      await axios.delete(`${API_URL}/${id}`);
      fetchTodos(); // Refresh the todo list after deletion
      setLoading(false);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }

  async function addTodo(name: string) {
    try {
      setLoading(true);
      const newTodo = { name, status: "pending" };
      const response = await axios.post(API_URL, newTodo);
      console.log("Todo added successfully:", response.data);
      fetchTodos(); // Refresh the todo list after adding
      setLoading(false);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  }

  async function updateTodoStatus(id: string, status: string) {
    try {
      setLoading(true);
      console.log("Updating todo with id:", id, "to status:", status);
      await axios.put(`${API_URL}/${id}`, { status });
      fetchTodos(); // Refresh the todo list after updating
      setLoading(false);
    } catch (error) {
      console.error("Error updating todo status:", error);
    }
  }

  



  useEffect(() => {
    fetchTodos();
  }, []);


  return (
    <>
      <div className="flex">
        <input
          className="input input-bordered input-info w-full"
          type="text"
          placeholder="Add your item"
          value={newTodoName}
          onChange={(e) => setNewTodoName(e.target.value)}
        />

        <button
          className="btn btn-success ml-4"
          onClick={async () => {
            if (newTodoName.trim() === "") return; // ถ้า input ว่างไม่เพิ่ม
            await addTodo(newTodoName.trim());
            setNewTodoName(""); // เคลียร์ input
          }}
        >
          Add
        </button>
      </div>
      <div>
        {loading && <div className="py-8">Loading...</div>}
        {!loading && <div  className="py-8">Todos loaded successfully</div>}
        <div className="">
          <div className="">
            <div>
              {todocs.map((todo, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 mb-2 bg-zinc-600 rounded-md p-4"
                >
                  {/* ข้อความซ้าย */}
                  <div>
                    {todo.id} {todo.name} {todo.status}
                  </div>

                  {/* ปุ่ม Edit + Delete ขวา */}
                  <div className="flex space-x-2 ">
                    <Link to={`/todo/${todo.id}`}>
                      <button className="btn btn-warning px-3">
                        Edit
                      </button>
                    </Link>
                    <button
                      className="btn btn-secondary px-3"
                      onClick={async () => {
                        await deleteTodo(todo.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
