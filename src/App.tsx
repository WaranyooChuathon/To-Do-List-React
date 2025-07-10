import Checkbox from "./components/Checkbox";

function App() {
  const todolist = [
    { text: "coding react", isChecked: false },
    { text: "doing documentation react", isChecked: true },
    { text: "testing react", isChecked: false },
  ];

  return (
    <div>
      {todolist.map((todo, index) => {
        return (
          <Checkbox key={index} text={todo.text} isChecked={todo.isChecked} />
        );
      })}
    </div>
  );
}

export default App;
