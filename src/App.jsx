// Importing necessary hooks and components
import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import "./App.css";

// Importing UUID for unique ID generation and icons for edit/delete
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  // State to hold current input todo
  const [todo, setTodo] = useState("");

  // Load todos from localStorage or initialize empty array
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  // State to determine if user is editing an existing todo
  const [isEditMode, setEditMode] = useState(false);

  // State to toggle showing completed tasks
  const [showFinished, setShowFinished] = useState(true);

  // Save todos to localStorage every time it changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Toggle whether to display finished tasks or not
  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  // Add a new todo (or finish edit mode)
  const addTodo = () => {
    if (isEditMode) {
      setEditMode(false); // Exit edit mode
    }
    // Append new todo object to existing todos
    setTodos([...todos, { todo, id: uuidv4(), isCompleted: false }]);
    setTodo(''); // Clear input
  };

  // Start editing a todo: populate input with todo text and remove from list temporarily
  const editTodo = (id) => {
    let index = todos.findIndex((item) => item.id === id);
    let value = todos[index].todo;
    setTodo(value);
    setEditMode(true);
    let newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
  };

  // Delete a todo by filtering it out
  const deleteTodo = (id) => {
    let newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
  };

  // Handle changes in input field
  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  // Toggle the completion status of a todo item
  const handleCheckBox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => item.id === id);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  return (
    <>
      {/* Navigation Bar Component */}
      <NavBar />

      {/* Main Todo Container */}
      <div className="container mx-auto lg:my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] max-w-[1000px]">

        <h1 className="text-center font-bold text-[30px]">
          TickIt - Manage your todos at one place
        </h1>

        {/* Add Todo Section */}
        <div className="addTodo">
          <h2 className="text-3xl font-bold">Add a Todo</h2>

          {/* Input for adding or editing todo */}
          <input
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && todo.length > 3) {
                addTodo();
              }
            }}
            type="text"
            className="bg-white w-full h-9 pl-2 my-2.5 focus:border-blue-600 border-[1px] outline-none rounded-4xl"
            value={todo}
            placeholder="enter 3 minimum characters"
          />

          {/* Add or Update button */}
          <button
            disabled={todo.length < 3}
            onClick={addTodo}
            className="h-8 w-full bg-indigo-600 text-white px-5 mx-auto hover:bg-indigo-900 cursor-pointer disabled:bg-indigo-400 rounded-4xl">
            {isEditMode ? "Update" : "Add"}
          </button>
        </div>

        {/* Checkbox to show/hide finished todos */}
        <input
          type="checkbox"
          checked={showFinished}
          onChange={toggleFinished}
          className="my-4"
        /> Show Finished

        <hr className="opacity-40 w-3/4 mx-auto my-2" />

        {/* Todos List Header */}
        <h2 className="text-2xl font-bold my-1.5">Your Todos</h2>

        {/* If no todos to show */}
        {todos.length === 0 && <div className="mx-4">No Todos to Display</div>}

        {/* Todos List Display */}
        <div className="todos h-[54vh] overflow-y-scroll cursor-pointer pr-2">
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="todo flex justify-between bg-indigo-200 p-1.5 rounded my-1.5"
                >
                  {/* Todo Text + Checkbox */}
                  <div
                    className={`text flex items-center gap-3 ${item.isCompleted ? "line-through" : ""}`}
                  >
                    <input
                      type="checkbox"
                      name={item.id}
                      onChange={handleCheckBox}
                      checked={item.isCompleted}
                    />
                    <h3>{item.todo}</h3>
                  </div>

                  {/* Edit and Delete Buttons */}
                  <div className="buttons flex items-center flex-wrap gap-1">
                    <button
                      onClick={() => editTodo(item.id)}
                      className="h-8 bg-indigo-600 text-white px-5 rounded mx-2 hover:bg-indigo-900 cursor-pointer"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deleteTodo(item.id)}
                      className="h-8 bg-indigo-600 text-white px-5 rounded mx-2 hover:bg-indigo-900 cursor-pointer"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
