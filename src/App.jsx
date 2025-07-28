import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [isEditMode, setEditMode] = useState(false);
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const toggleFinished = () => {
    setShowFinished(!showFinished)
  }
  
  const addTodo = () => {
    if(isEditMode){
      setEditMode(!isEditMode);
    }
    setTodos([...todos, { todo, id: uuidv4(), isCompleted: false }]);
  };

  const editTodo = (id) => {
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let value = todos[index].todo;
    setTodo(value);
    setEditMode(true);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
  };

  const deleteTodo = (id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckBox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  return (
    <>
      <NavBar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh]">
        <div className="addTodo">
          <h2 className="text-3xl font-bold">Add a Todo</h2>
          <input
            onChange={handleChange}
            onKeyDown={(e)=>{
              if(e.key === 'Enter' && todo.length > 3){
                addTodo();
              }
            }}
            type="text"
            className="bg-white w-1/2 h-8 pl-2"
            value={todo}
            placeholder="enter 3 minimum characters"
          />
          <button
          disabled={todo.length < 3}
            onClick={addTodo}
            className="h-8 w-[6rem] bg-indigo-600 text-white px-5 rounded mx-4 hover:bg-indigo-900 cursor-pointer disabled:bg-indigo-400">
            {isEditMode ? "Update" : "Add"}
          </button>
        </div>
        <input type="checkbox" checked={showFinished} onChange={toggleFinished}/> Show Finished
        <h2 className="text-2xl font-bold my-1.5">Your Todos</h2>
        {todos.length === 0 && <div className="mx-4">No Todos to Display</div>}
        <div className="todos">
          {todos.map((item) => {
            return ( (showFinished || !item.isCompleted) && 
              <div
                key={item.id}
                className="todo flex justify-between bg-indigo-200 p-1.5 rounded my-1.5">
                <div
                  className={`text flex items-center gap-1.5 ${
                    item.isCompleted ? "line-through" : ""
                  }`}>
                  <input
                    type="checkbox"
                    name={item.id}
                    onChange={handleCheckBox}
                    checked={item.isCompleted}
                  />
                  <h3>{item.todo}</h3>
                </div>
                <div className="buttons">
                  <button
                    onClick={() => {
                      editTodo(item.id);
                    }}
                    className="h-8 w-[6rem] bg-indigo-600 text-white px-5 rounded mx-2 hover:bg-indigo-900 cursor-pointer">
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      deleteTodo(item.id);
                    }}
                    className="h-8 w-[6rem] bg-indigo-600 text-white px-5 rounded mx-2 hover:bg-indigo-900 cursor-pointer">
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
