import {BrowserRouter} from "react-router-dom";
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import './App.css';
import View from './views/index.js';

library.add(fas);

function App() {
  return (
    <div className="container mt-4  bg-light rounded border">
      <View/>
    </div>
  );
}

export default App;
