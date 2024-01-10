import axios from "axios";
import { useEffect, useState } from "react";

function Todo(props){
    const [todo,setTodo] = useState({})

    useEffect(() => {
        axios.get(`https://sum-server.100xdevs.com/todo?id=${props.id}`).then(response => setTodo(response.data.todo));
    },[props.id])

    return ( 
        <>
            <div className="todo">
            <h1>{todo.title}</h1>
            <p>{todo.description}</p>
            </div>
        </>
    )
}

export default Todo;