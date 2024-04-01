import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom'
import Login from './paginas/Login'
import Admin from './paginas/Admin'
import Formulario from './paginas/Formulario'
import './App.css'

function App() {
  const [islogeado, setlogeado] = useState(false); // Estado de autenticación

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login logeado={() => setlogeado(true)} />} />
        <Route path="/Admin" element={islogeado ? <Admin /> : <Navigate  to="/" />} />
        <Route path="/Formulario" element={islogeado ? <Formulario /> : <Navigate  to="/" />} />
      </Routes>
    </Router>
  );
}
{/* <Router>
<Routes>
  <Route path="/" element={<Login logeado={setlogeado}/>} />
  <Route path="/Admin" element={<Admin islogeado={islogeado}/>}/>
  <Route path="/Formulario" element={<Formulario islogeado={islogeado}/>}/>
</Routes>
</Router> */}

export default App
