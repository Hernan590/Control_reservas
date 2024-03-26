import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './paginas/Home'
import Descripcion from './paginas/Descripcion'; // Página de descripción

function App() {
  // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/descripcion/:id" element={<Descripcion/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
