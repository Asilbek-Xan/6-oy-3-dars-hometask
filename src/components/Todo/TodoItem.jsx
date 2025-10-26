import { useState } from "react";
import styles from "./TodoItem.module.css";

function TodoItem({ todo, deleteTodo, editTodo, toggleComplete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleEdit = () => {
    if (isEditing && newText.trim()) {
      editTodo(todo.id, newText);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className={styles.item}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
      />

      {isEditing ? (
        <input
          className={styles.editInput}
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />
      ) : (
        <span className={todo.completed ? styles.done : ""}>{todo.text}</span>
      )}

      <div className={styles.buttons}>
        <button onClick={handleEdit}>
          {isEditing ? "Save" : "Edit"}
        </button>
        <button onClick={() => deleteTodo(todo.id)} className={styles.delete}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
