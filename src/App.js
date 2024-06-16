// App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './components/Login';
import Dashboard from './components/Dashboard';
import InsertUser from './components/insertUser';
import UpdateUser from './components/updateUser';
import RegisterUser from './components/registerUser';
import IndexPage from './IndexPage';
import Pedidos_DashBoard from './components/Pedidos_DashBoard';
import CrearPedidos from './components/CrearPedidos';
import Pedidos_DashBoardEntregados from './components/Pedidos_DashBoardEntregados';


function App() {

  return (
  <>
  <Router>
      <Routes>
        
        <Route path="/" exact element={<IndexPage />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/crear_pedido" element={<CrearPedidos />}/>
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/pedidos" element={<Pedidos_DashBoard/>}/>
        <Route path="/insertUser" element={<InsertUser/>} />
        <Route path="/updateUser" element={<UpdateUser/>} />  
        <Route path="/register" element={<RegisterUser/>} />
        <Route path="/pedidos_entregados" element={<Pedidos_DashBoardEntregados/>} />

      </Routes>
    </Router>
    </>
  );
}

export default App;