import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo, updateTodo } from '../utils/todoSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toastify styles
import './to-do-list-page.css';

const TodoListPage = () => {
  const [task, setTask] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();

  // Add a new task ------
  const handleAdd = () => {
    if (task.trim()) {
      dispatch(addTodo(task));
      setTask('');
      toast.success('Task added successfully!');
    } else {
      toast.error('Task cannot be empty!'); // Show error toast
    }
  };

  // Update an existing task ---------
  const handleUpdate = () => {
    if (!editingText.trim()) {
        toast.error('Updated task cannot be empty!'); // Show error toast
        return;
      }
      // Find the original task text ----
      const originalTask = todos.find((todo) => todo.id === editingId)?.text;
      // Check if the text has changed
      if (editingText.trim() === originalTask) {
        toast.error('No changes detected! Please modify the text before updating.');
        return;
      }
      // Dispatch update if text is changed ----
      dispatch(updateTodo({ id: editingId, text: editingText.trim() }));
      setEditingId(null);
      setEditingText('');
      toast.success('Task updated successfully!');
  };

  return (
    <div className="app">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1>To-Do List</h1>
      {/* Add New Task */}
      <div className="input-container">
        <textarea
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task"
        />
        <button onClick={handleAdd}>Add Task</button>
      </div>

      {/* Edit Task */}
      {editingId && (
        <div className="edit-container">
          <textarea
            type="text"
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
            placeholder="Edit your task"
          />
          <button onClick={handleUpdate}>Update Task</button>
          <button onClick={() => setEditingId(null)}>Cancel</button>
        </div>
      )}

      {/* Task List */}
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <span onClick={() => dispatch(toggleTodo(todo.id))}>{todo.text}</span>
            <div>
              <button
                onClick={() => {
                  setEditingId(todo.id);
                  setEditingText(todo.text);
                }}
              >
                Edit
              </button>
              <button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>

              <button onClick={() => dispatch(toggleTodo(todo.id))}>
                {todo.completed ? 'Undo' : 'Mark as Done'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoListPage;
