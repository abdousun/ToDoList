import React from 'react';
import './index.css';
import ToDoList from './Component/ToDoList';
import { ToDoContext } from './Contexts/ToDoContext';
import { useState } from 'react';



const initialTodos = [
 
];


function App() {
  const [todos, setTodos] = useState(initialTodos);

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
   <ToDoContext.Provider value={{todos, setTodos}}>
    <ToDoList />
   </ToDoContext.Provider>  
    </div>
  );
}

export default App;
