import Checkbox from "./components/Checkbox";

import {useState} from "react";


function App() {
  const todolist = [
    { text: "coding react", isChecked: false },
    { text: "doing documentation react", isChecked: true },
    { text: "testing react", isChecked: false },
  ];

 // State to manage the count of button clicks
  const [count, setCount] = useState(0);

  // Function to handle button click
  function buttonClick() {
    setCount(count + 1);
    console.log("Button clicked", count);
  }

  return (

    <div>
      <div>
        <h1>To-Do List</h1>
        <button onClick={buttonClick}>Click me {count}</button> 
      </div>
      {todolist.map((todo, index) => {
        return (
          <Checkbox key={index} text={todo.text} isChecked={todo.isChecked} />
        );
      })}
    </div>

  );
}

export default App;
