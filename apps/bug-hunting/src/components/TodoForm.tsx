import { useState } from 'react'

// Intentional bug: Missing prop type for onAdd
const TodoForm = ({ onAdd }) => {
  // Intentional bug: Input state should probably be string not number
  const [input, setInput] = useState(0)

  // Intentional bug: Not preventing default form submission
  const handleSubmit = (e) => {
    // Should call onAdd with input value and reset input
    onAdd(input)
    // Intentional bug: Not resetting input after submission
  }

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        // Intentional bug: Value should be input.toString() since input is a number
        value={input}
        // Intentional bug: Incorrect event handling
        onChange={setInput(e.target.value)}
        placeholder="Add a new todo"
        // Intentional bug: Missing required attribute
      />
      <button type="submit">Add Todo</button>
    </form>
  )
}

export default TodoForm 