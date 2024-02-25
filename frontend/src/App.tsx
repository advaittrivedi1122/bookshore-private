import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [value, setValue]  = useState("")

  useEffect(()=>{
    const getResponse = async ()=>{
      console.log("function called")
      let response: Response | string = await fetch("http://localhost:8080")
      response = await response.text()
      console.log("🚀 ~ getResponse ~ response:", response)
      setValue(response)
    }
    if(!value){
      getResponse()
    }
  }, [value])

  return (
    <>
      <h1>{value ? value : "Hello"}</h1>
    </>
  )
}

export default App
