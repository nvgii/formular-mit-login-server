import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Todo() {
  const { id } = useParams();
  const [todo, setTodo] = useState({
    id: "",
    name: "",
    description: "",
  });

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:3001/todo/" + id);
      setTodo(await response.json());
    })();
    return () => {
      // this now gets called when the component unmounts
    };
  }, [id]);

  return <div>description: {todo.description}</div>;
}

export default Todo;
