import { useState, useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import axios from "axios";
import Todo from "./Todo";
import Button from "./Button";

function App() {
  const [todos, setTodos] = useState([]);
  const [currentTodoId,setCurrentTodoId] = useState(1);

  const handleTodo = (id) => {
    setCurrentTodoId(id);
  }

  useEffect(() => {
    axios.get("https://sum-server.100xdevs.com/todos").then((response) => {
      console.log(response.data.todos);
      setTodos(response.data.todos);
    });
  }, []);

  useEffect(() => {
    axios.get("")
  })

  return (
    <>
      <div className="container p-5">
        <div className="row justify-content-center">
          <div className="col-6">
            {todos.sort((a,b) => a.id - b.id).map((todo) => (
             <button key={todo.id} className="btn btn-primary mx-2" onClick={() => handleTodo(todo.id)} >{todo.id}</button>
            ))}
          </div>
        </div>
        <div className="row-justify-content-center">
          <div className="col-6">
            <Todo key={currentTodoId} id={currentTodoId}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
