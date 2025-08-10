import { useMemo, useState } from 'react'
import './App.css'
import { Filter, TodoFilter } from './components/TodoFilter'
import { TodoForm } from './components/TodoForm'
import { TodoList, type Todo } from './components/TodoList'

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState(Filter.All)
  
  const addTodo = (text: string) => { 
    const newTodo = { text, completed: false, id: Date.now().toString() }

    setTodos([...todos, newTodo])
  }
  
  const toggleTodo = (id: string) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        const newTodo = { ...todo, completed: !todo.completed }
        return newTodo
      }
      return todo;
    })

    setTodos(updatedTodos)
  }
  
  const deleteTodo = (id: string) => {
    const remainingTodos = todos.filter(todo => {
      return todo.id !== id
    })

    setTodos(remainingTodos)
  }
  
  const clearCompleted = () => {
    const activeTodos = todos.filter(todo => !todo.completed)

    setTodos(activeTodos)
  }

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active': return todos.filter(todo => !todo.completed)
      case 'completed': return todos.filter(todo => todo.completed)

      default: return todos
    }
  }, [todos, filter])
  
  return (
    <div className="app">
      <h1>Todo App</h1>
      
      <TodoForm onAdd={addTodo} />
      
      <TodoList 
        todos={filteredTodos} 
        onToggle={toggleTodo} 
        onDelete={deleteTodo} 
      />
      
      <TodoFilter filter={filter} onClearCompleted={clearCompleted} onFilter={setFilter} />
    </div>
  ) 
}

export default App;
