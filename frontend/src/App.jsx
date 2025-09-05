import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Form from "./components/Form/Form"

function App() {
  

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
