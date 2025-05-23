import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";


function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)
  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  
  const saveToLS = (params) =>{
    localStorage.setting("todos", JSON.stringify(todos))
  }
  const toggleFinished = (params) => {
    setshowFinished(!showFinished)
  }
  
  const handleEdit = (e, id)=>{
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS()
  }
  const handleDelete = (e, id)=>{
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos = todos.filter(item=>{
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS()
  }
  const handleAdd = ()=>{
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
    setTodo("")
    saveToLS()
  }
  const handleChange = (e)=>{
    setTodo(e.target.value)
  }
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
  }
  
  return (
    <>
    <Navbar/>
      <div className="md:container mx-3 md:mx-auto my-5 p-5 rounded-xl bg-green-100 min-h-[80vh] md:w-1/2">
      <h1 className='font-bold text-center text-2xl'>TickTask - Manage your todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <div className="flex">
          <input onChange={handleChange} value={todo} type="text" className="w-full border-2 border-green-200 bg-white rounded-lg px-5 py-1"/>
          <button onClick={handleAdd} disabled={todo.length <= 3} className="p-4 py-2 text-white font-bold text-sm mx-2 rounded-md bg-green-300 hover:bg-green-400 disabled:bg-green-200">Save</button>
          </div>
          </div>
          <input className="my-4" id='show' onChange={toggleFinished} type="checkbox" checked={showFinished}/>
          <label className="mx-2" htmlFor="show">Show Finished</label>
          <hr className="opacity-15 my-2 mx-auto" />
          <h2 className="text-lg font-bold">My Todos</h2>
          <div className="todos">
            {todos.length === 0 && <div className="m-5">No Todos to display</div>}
            {todos.map(item=>{
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex my-3 justify-between">
              <div className="flex gap-5">
              <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
              <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e)=>{handleEdit(e, item.id)}} className="p-2 py-1 text-white font-bold text-sm mx-1 rounded-md bg-green-300 hover:bg-green-400"><FaEdit /></button>
                <button onClick={(e)=>{handleDelete(e, item.id)}} className="p-2 py-1 text-white font-bold text-sm mx-1 rounded-md bg-green-300 hover:bg-green-400"><AiFillDelete /></button>
              </div>       
            </div>
            })}
          </div>
        </div>
     
    </>
  )
}

export default App
