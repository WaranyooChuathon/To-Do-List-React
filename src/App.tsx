import { useEffect,useState } from "react";
import axios from "axios";
import { Link } from "react-router";

// Define the Todo type
type Todo = {
  id: string;
  name: string;
  status: string;
};



const API_URL = "https://6870d4e57ca4d06b34b83d5a.mockapi.io/todocs";

function App() {
  // State to hold the list of todos
  const [todocs, setTodoList] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Function to fetch todos from the API
  async function fetchTodos()  {
    try {
      const response = await axios.get(`${API_URL}`);
      setTodoList(response.data);
      setLoading(false);
      console.log("Todos fetched successfully:", response.data);

    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

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

  useEffect(() => {
    fetchTodos();
  }, []); 



  return (
    <>
    <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
    {loading && <div>Loading...</div>}
    {!loading && <div>Todos loaded successfully</div>}
      <div>
          {todocs.map((todo, index) => (
            <div key={index}>
              {todo.id} {todo.name} {todo.status}
              <Link to ={`/todo/${todo.id}`}>
              <button>Edit</button>
              </Link>

              <button onClick = {async () => {
                await deleteTodo(todo.id)
              }}>Delete</button>
            </div>
          ))}
      </div>
    </>
  );
}

export default App;
