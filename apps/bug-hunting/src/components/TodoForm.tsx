import { useState } from 'react'

type TodoFormProps = {
  onAdd: (input: string) => void
}

export const TodoForm = ({ onAdd }: TodoFormProps) => {
  const [input, setInput] = useState<string>('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    onAdd(input)
    setInput('')
  }

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder="Add a new todo"
      />
      <button type="submit">Add Todo</button>
    </form>
  )
}