import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faCheck } from '@fortawesome/free-solid-svg-icons';
import { ToDoContext } from '../Contexts/ToDoContext';

function ToDo({ todo }) {
  const { todos, setTodos } = useContext(ToDoContext);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDetails, setEditedDetails] = useState(todo.details);

  // Toggle completion
  function handleCheckClick() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  // Handle delete modal
  function handleDeleteClick() {
    setIsDeleteModalOpen(true);


  }

  function confirmDelete() {
    const updatedTodos = todos.filter((t) => t.id !== todo.id);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
    setIsDeleteModalOpen(false); // Close delete modal after deletion
  }

  function cancelDelete() {
    setIsDeleteModalOpen(false); // Close delete modal without deleting
  }

  // Handle edit modal
  function handleEditClick() {
    setIsEditModalOpen(true);
  }

  function saveEdit() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        t.title = editedTitle;
        t.details = editedDetails;
      }
      return t;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setIsEditModalOpen(false); // Close edit modal after saving
  }

  function cancelEdit() {
    setIsEditModalOpen(false); // Close edit modal without saving
  }

  return (
    <div>
      <div className="max-w-full p-6 bg-blue-500 border border-gray-200 rounded-lg shadow hover:bg-blue-600 dark:bg-blue-800 dark:border-blue-700 dark:hover:bg-blue-700 grid grid-cols-2 mt-8 transform transition-transform duration-300 hover:scale-105">
        <div className="flex justify-start space-x-4">
          <button
            onClick={handleDeleteClick}
            aria-label="Supprimer"
            className="w-10 h-10 flex items-center justify-center bg-white border-2 border-red-500 rounded-full mt-3.5 hover:bg-gray-300"
          >
            <FontAwesomeIcon icon={faTrash} className="text-red-500" />
          </button>
          <button
            onClick={handleEditClick}
            aria-label="Éditer"
            className="w-10 h-10 flex items-center justify-center bg-white border-2 border-yellow-500 rounded-full mt-3.5 hover:bg-gray-300"
          >
            <FontAwesomeIcon icon={faEdit} className="text-yellow-500" />
          </button>
          <button
            onClick={handleCheckClick}
            aria-label="Confirmer"
            className={`w-10 h-10 flex items-center justify-center border-2 bg-green-500 rounded-full mt-3.5 hover:bg-gray-300 ${
              todo.isCompleted ? 'bg-green-500': 'bg-white'
            }`}
          >
            <FontAwesomeIcon icon={faCheck} className={todo.isCompleted ? 'text-white' : 'text-green-500' } />
          </button>
        </div>
        <div dir="rtl">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">{todo.title}</h5>
          <p className="font-normal text-white">{todo.details}</p>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div
          id="delete-modal"
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
          tabIndex="-1"
          style={{ direction: 'rtl' }}
        >
          <div className="relative p-4 w-full max-w-md">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                onClick={cancelDelete}
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1l6 6m0 0l6 6M7 7L13 1M7 7L1 13"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  هل انت متاكد من حدف المحتوى؟
                </h3>
                <button
                  onClick={confirmDelete}
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  نعم, متاكد
                </button>
                <button
                  onClick={cancelDelete}
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  لا
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div
          id="edit-modal"
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
          tabIndex="-1"
          style={{ direction: 'rtl' }}
        >
          <div className="relative p-4 w-full max-w-md">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                onClick={cancelEdit}
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1l6 6m0 0l6 6M7 7L13 1M7 7L1 13"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">تعديل المهمة</h3>
                <input
                  type="text"
                  className="mb-2 w-full p-2 rounded border border-gray-300 focus:outline-none"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  placeholder="عنوان المهمة"
                />
                <textarea
                  className="w-full p-2 rounded border border-gray-300 focus:outline-none"
                  value={editedDetails}
                  onChange={(e) => setEditedDetails(e.target.value)}
                  placeholder="تفاصيل المهمة"
                />
                <div className="mt-4">
                  <button
                    onClick={saveEdit}
                    className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                  >
                    حفظ التعديلات
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    إلغاء
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ToDo;
