import { useEffect, useState } from "react"
import "./styles.css"

export default function App(){
  const [newItem,setnewItem] = useState("")
  const [todos, setTodos] = useState(() => {
    const localValue=localStorage.getItem("ITEMS")
    if (localValue==null)
      return []
    return JSON.parse(localValue)
  })

  useEffect(() => {localStorage.setItem("ITEMS",JSON.stringify(todos)),[todos]})

  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
      if(todo.id === id){
          return{...todo, completed}
        }
      return todo
      })
    })

  }

  function handleSubmit(e) {
    e.preventDefault()
    if (newItem==="") return(alert("Please enter the name of the task"))
    setTodos(currentTodos => {
      return [...currentTodos,{ id: crypto.randomUUID(), title: newItem, completed: false },]
    })
    setnewItem("")
  }

  function deleteTodo(id){
    setTodos(currentTodos=>{
      return currentTodos.filter(todo => todo.id !=id)
    })
  }

  console.log(todos)
    return <>
  <form onSubmit={handleSubmit} className="taskbox">
    <div className="taskbody">
      <label htmlFor="textName" className="sectext">Name of the task:</label>
      <input value={newItem} onChange={e => setnewItem(e.target.value)} type="text" id="textName"/>
      <br></br>
      <button className="btn">Add Task</button>
    </div>
  </form>
  <p className="sectext">Tasks remaining:</p>
  <ul className="list">
    {todos.length===0 && "No todos"}
    {todos.map(todo => {
      return <li key={todo.id}>
      <label>
          <input type="checkbox" checked={todo.completed} onChange={e => toggleTodo(todo.id,e.target.checked)}/>
          {todo.title}
      </label>
      <button onClick={e=> deleteTodo(todo.id)} className="btn btn-danger">Delete</button>
    </li>
    })}      
  </ul>
  </>
}