// Intentional bug: No import for React

// Intentional bug: Missing type definitions for props
const TodoFilter = ({ filter, onFilter, onClearCompleted }) => {
  // Intentional bug: filter is expected to be a string, but no type checking
  
  // Intentional bug: No handling if onFilter is undefined
  const handleFilterChange = (newFilter) => {
    onFilter(newFilter)
  }
  
  return (
    <div className="todo-filter">
      <div className="filter-buttons">
        {/* Intentional bug: Not checking if filter equals "all" */}
        <button 
          className={filter === "all" && "active"} 
          onClick={() => handleFilterChange("all")}
        >
          All
        </button>
        {/* Intentional bug: Using template literal incorrectly */}
        <button 
          className={`${filter === active ? "active" : ""}`} 
          onClick={() => handleFilterChange("active")}
        >
          Active
        </button>
        {/* Intentional bug: Condition in className should use triple equal */}
        <button 
          className={filter == "completed" ? "active" : ""} 
          onClick={() => handleFilterChange("completed")}
        >
          Completed
        </button>
      </div>
      
      {/* Intentional bug: onClick calls function directly instead of using callback */}
      <button 
        className="clear-completed"
        onClick={onClearCompleted()}
      >
        Clear completed
      </button>
    </div>
  )
}

// Fix the missing export
export default TodoFilter 