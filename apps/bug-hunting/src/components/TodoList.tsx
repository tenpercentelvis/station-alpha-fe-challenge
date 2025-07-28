// Intentional bug: No React import
// Intentional bug: No type definitions for props
const TodoList = ({ todos, onToggle, onDelete }) => {
  // Intentional bug: Not checking if todos exists before mapping
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        // Intentional bug: No key prop
        <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
          <input 
            type="checkbox" 
            // Intentional bug: Checked prop should be directly linked to todo.completed
            checked={todo.complete} 
            // Intentional bug: Not correctly passing todo.id to onToggle
            onChange={() => onToggle(todo)}
          />
          <span>{todo.text}</span>
          <button 
            className="delete-btn"
            // Intentional bug: Using arrow function incorrectly 
            onClick={onDelete(todo.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  )
}

export default TodoList 