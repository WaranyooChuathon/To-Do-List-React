import Checkbox from "./components/Checkbox";

import {useState} from "react";
import VideoPlayer from "./components/Video";


function App2() {
  const todolist = [
    { text: "coding react", isChecked: false },
    { text: "doing documentation react", isChecked: true },
    { text: "testing react", isChecked: false },
  ];

 // State to manage the count of button clicks
  const [count, setCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Function to handle button click
  function buttonClick() {
    setCount(count + 1);
    console.log("Button clicked", count);
  }

  function triggerVideoPlayPause() {
    setIsPlaying(!isPlaying);
    console.log("Video play/pause toggled", isPlaying);
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

      <VideoPlayer 
      isPlaying={isPlaying}
      src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4">
  
      </VideoPlayer>
      <button onClick={triggerVideoPlayPause}>
        {isPlaying ? "Pause Video" : "Play Video"}
      </button>
    </div>

  );
}

export default App2;
