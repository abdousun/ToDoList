import React, { useState, useContext, useEffect,useMemo } from 'react';
import ToDo from './ToDo';
import { ToDoContext } from '../Contexts/ToDoContext';
import { v4 as uuidv4 } from 'uuid';

export default function ToDoList() {
  console.log("re-render");
  
  const { todos, setTodos } = useContext(ToDoContext);
  const [inputTitle, setinputTitle] = useState("");
  const [displayTodosType, setdisplayTodosType] = useState("all");

  const completedTodos = useMemo(()=> {
    return todos.filter((t) => {
      console.log("calling completed");
      return t.isCompleted;
    });
    
  },[todos])

  const notCompletedTodos = useMemo(()=>
 { return todos.filter((t) => {
    console.log("calling notCompleted");
    return !t.isCompleted;
  })},[todos])

  let todosToBeRendred = todos;
  if (displayTodosType === "completed") {
    todosToBeRendred = completedTodos;
  } else if (displayTodosType === "non-completed") {
    todosToBeRendred = notCompletedTodos;
  }

  // عرض المهام باستخدام مكون ToDo
  const todosJsx = todosToBeRendred.map((t) => {
    return <ToDo key={t.id} todo={t} />;
  });

  useEffect(() => {
    // الحصول على المهام من Local Storage عند تحميل المكون
    const storageTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storageTodos);
  }, [setTodos]);

  // وظيفة لتغيير نوع العرض
  function changeDisplayType(type) {
    setdisplayTodosType(type);
  }

  // وظيفة لإضافة مهمة جديدة
  function handleAddClick() {
    if (inputTitle.trim() === "") {
      return; // لا تقم بإضافة مهمة فارغة
    }

    const newTodo = {
      id: uuidv4(),
      title: inputTitle,
      details: "",
      isCompleted: false,
    };

    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setinputTitle("");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div
        className="flex flex-col justify-start items-center border-2 border-white bg-white p-6 rounded-lg shadow-lg"
        style={{ width: '600px', height: 'auto', maxHeight:"80vh",overflow:"scroll" }}
      >
        <h1 className="font-serif text-6xl font-bold mt-2 tracking-wider text-black">مهامي</h1>
        <div className="flex w-max gap-4 mt-8">
          <button 
            onClick={() => changeDisplayType("all")} 
            className="bg-white hover:bg-blue-500 text-black font-semibold hover:text-black py-2 px-4 border border-black hover:border-transparent rounded"
          >
            الكل
          </button>
          <button 
            onClick={() => changeDisplayType("completed")} 
            className="bg-white hover:bg-blue-500 text-black font-semibold hover:text-black py-2 px-4 border border-black hover:border-transparent rounded"
          >
            المنجز
          </button>
          <button 
            onClick={() => changeDisplayType("non-completed")} 
            className="bg-white hover:bg-blue-500 text-black font-semibold hover:text-black py-2 px-4 border border-black hover:border-transparent rounded"
          >
            الغير منجز
          </button>
        </div>
        {todosJsx}
        <div className="mt-4 flex items-center w-[85%]">
          <button
            onClick={handleAddClick}
            className="bg-blue-700 text-white p-2 rounded w-1/4"
          >
            إضافة
          </button>
          <input
            type="text"
            placeholder="أضف مهمة جديدة"
            className="w-3/4 ml-[10px] p-2 border border-gray-300"
            value={inputTitle}
            onChange={(e) => setinputTitle(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
