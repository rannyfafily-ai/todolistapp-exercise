import { Routes, Route } from "react-router-dom";
import Home from "./pages/home"; 
import Todo from "./pages/todos";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/todos" element={<Todo />} />
      <Route path="*" element={<div className="text-white p-10">404 - Not Found</div>} />
    </Routes>
  );
}

export default App;