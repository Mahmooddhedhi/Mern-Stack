import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingTodoValue, setEditingTodoValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setShowAlert(false);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    } else {
      setShowAlert(true);
    }
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggleTodo = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      })
    );
  };

  const handleEditTodo = (id, text) => {
    setEditingTodoId(id);
    setEditingTodoValue(text);
  };

  const handleSaveTodo = (id) => {
    if (editingTodoValue.trim() !== '') {
      setTodos(
        todos.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              text: editingTodoValue,
            };
          }
          return todo;
        })
      );
      setEditingTodoId(null);
      setEditingTodoValue('');
    }
  };

  const handleCancelEdit = () => {
    setEditingTodoId(null);
    setEditingTodoValue('');
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Todo App</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter a new todo"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button className="btn btn-primary" onClick={handleAddTodo}>
          Add
        </button>
      </div>
      {showAlert && (
        <div className="alert alert-danger" role="alert">
          Please type something!
        </div>
      )}
      <ul className="list-group">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`list-group-item ${
              todo.completed ? 'list-group-item-success' : ''
            }`}
          >
            {editingTodoId === todo.id ? (
              <>
                <input
                  type="text"
                  className="form-control"
                  value={editingTodoValue}
                  onChange={(e) => setEditingTodoValue(e.target.value)}
                />
                <div className="mt-2">
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => handleSaveTodo(todo.id)}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div>{todo.text}</div>
                <div className="mt-2">
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => handleEditTodo(todo.id, todo.text)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;

