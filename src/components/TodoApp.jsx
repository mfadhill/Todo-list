import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const [newColor, setNewColor] = useState("#ffffff");
  const [showColorPicker, setShowColorPicker] = useState(null);

  const navigate = useNavigate();

  const predefinedColors = [
    "#ffcccb",
    "#ffeb3b",
    "#8bc34a",
    "#03a9f4",
    "#e91e63",
    "#9c27b0",
  ];

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([
        { title: newTitle, text: newTodo, completed: false, color: newColor },
        ...todos,
      ]);
      setNewTodo("");
      setNewTitle("");
      setNewColor("#ffffff");
      setIsTitleVisible(false);
    }
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const toggleCompleted = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const changeColor = (index, color) => {
    const newTodos = [...todos];
    newTodos[index].color = color;
    setTodos(newTodos);
    setShowColorPicker(null);
  };

  const logout = () => {
    alert("Logged out!");
    navigate("/");
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col items-center py-10">
      <button
        onClick={logout}
        className="absolute top-6 right-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        Logout
      </button>

      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <div className="mb-4">
          {isTitleVisible && (
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Judul"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
          )}
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Buat catatan..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onFocus={() => setIsTitleVisible(true)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="colorPicker" className="block text-sm text-gray-600">
            Pilih warna:
          </label>
          <div className="flex space-x-2 mt-2">
            {predefinedColors.map((color) => (
              <button
                key={color}
                onClick={() => setNewColor(color)}
                className="w-8 h-8 rounded-full"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <button
          onClick={addTodo}
          className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Tambah
        </button>
      </div>

      <div className="flex flex-row-reverse flex-wrap justify-start mt-6 gap-6">
        {todos.length === 0 ? (
          <p className="text-center text-gray-500 w-full">Tidak ada catatan!</p>
        ) : (
          todos.map((todo, index) => (
            <div
              key={index}
              className="w-80 p-4 bg-white border rounded-lg shadow-md"
              style={{ backgroundColor: todo.color }}
            >
              <div className="flex flex-col">
                <h3
                  className={`text-xl font-semibold mb-2 ${
                    todo.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {todo.title}
                </h3>
                <p className="mb-4">{todo.text}</p>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => toggleCompleted(index)}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    {todo.completed ? "Belum selesai" : "Selesai"}
                  </button>
                  <button
                    onClick={() => deleteTodo(index)}
                    className="text-red-500 hover:text-red-600"
                  >
                    Hapus
                  </button>
                  <button
                    onClick={() => setShowColorPicker(index)}
                    className="text-yellow-500 hover:text-yellow-600"
                  >
                    Ganti Warna
                  </button>
                  {showColorPicker === index && (
                    <div className="flex space-x-2 mt-2">
                      {predefinedColors.map((color) => (
                        <button
                          key={color}
                          onClick={() => changeColor(index, color)}
                          className="w-8 h-8 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodoApp;
