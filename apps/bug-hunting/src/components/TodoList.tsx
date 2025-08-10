export type Todo = {
  id: string
  text: string
  completed: boolean
}

type TodoListProps = {
  todos: Todo[]
  onToggle: (id: string) => void  
  onDelete: (id: string) => void
}

export const TodoList = ({ todos, onToggle, onDelete }: TodoListProps) => {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li className={`todo-item ${todo.completed ? 'completed' : ''}`} key={todo.id}>
          <input 
            type="checkbox" 
            checked={todo.completed} 
            onChange={() => onToggle(todo.id)}
          />
          <span>{todo.text}</span>
          <button 
            className="delete-btn"
            onClick={() => onDelete(todo.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  )
}
