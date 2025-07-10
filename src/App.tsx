import "./App.css";

import Header from "./components/Header";
import { IconExample } from "./components/Icon";
import Image from "./components/Image";


function App() {
  return (
    <>
    <Header />
      <div>hello world</div>
    <IconExample />
    <Image 
    imageUrl="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/133.png" />
    </>
  );
}

export default App;
