//import React from "react";
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

function Pedidos_DashBoard(){

    const [pedidosData, setPedidosData] = useState([]);
    
    //Obtener datos
    const fetchData = async () => {
        try {
            // Perform API call to fetch data from MongoDB Atlas
            const response = await fetch("http://localhost:3001/pedidos");
            const data = await response.json();
            // Update state with fetched data
            setPedidosData(data);
            //console.log(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    //obtener datos de la coleccion de mongoatlas
    useEffect(() => {
        // Fetch data from MongoDB Atlas collection
        fetchData();
    }, []);

    //logica de token
    const isAuthenticated = localStorage.getItem('token');

    const userName = localStorage.getItem('userName');

    const userRole = localStorage.getItem('userRole');

    //debido a que es la ventana principal, solamente cambia el
    //boton de Iniciar o Cerrar Sesion.

    //log out
    const logOut = () => {
        alert("Sesion cerrada.")
        window.location.href = '/';
        //esto destruye el token
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('userRole');
    };

    var botonSesion = "Cerrar";
    //preguntamos si tiene el token de inicio de sesion.
    if(!isAuthenticated)
        //console.log('token given!')
        window.location.href = '/login';

    if(!userRole === 'Admin'){
        window.location.href = '/login';
    }
    
    //dar formato a lo de pedidos

    //cuantos tacos
    //const cuantostacos = pedidosData;

    //de que son
    //const tipostacos = pedidosData.select_tipos;
    
    //console.log(cuantostacos);

    const deletePedido = async (id_pedido) => {

        if (window.confirm('Eliminar el pedido '+id_pedido+'?')) {
            try {
                // Perform API call to delete user
                await fetch(`http://localhost:3001/deluser/${id_pedido}`, {
                    method: "DELETE",
                });
                // Refetch data after deletion
                fetchData();
            } catch (error) {
                console.error("Error deleting user:", error);
            }
          }
          else {
                console.log('canceled')
          }
    };

    var numPedido = 0;

    return(
        <>
        <nav className="barraNavegacion">
            <a href="/">Inicio</a>
            <a href="/dashboard">Usuarios</a>
            <a href="#" onClick={logOut}>{botonSesion} Sesión</a>
            
            <a className="contPerfilUsuario"> <img></img> <span>Hola, {userName}!</span></a>
        </nav>

        <div className="contenedorIndex">
        <h1>Pagina de Pedidos</h1>
        <p>Esta es la pagina de Pedidos</p>
        </div>

        <div className="pedidosFondo">
        <table className="tablaUsuarios">
                    <thead>       
                        <tr>
                           {/* <th>ID Pedido</th>*/}
                            <th>ID Pedido</th>
                            <th>Nombre de Cliente</th>
                            <th>Pedido</th>
                            <th>Notas</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidosData.map((pedido) => (
                            <>
                            {/*Previo al mappeo de los datos vamos a modificar los valores de articulos*/}

                            <tr className="filaUsers" key={pedido.nombre_cliente}>
                                {/*<td>{pedido.id}</td>*/}
                                {/*por cada pasada que da el script se suma +1 */}
                                <td>mamadas</td>
                                <td>{pedido.datosUsuario.nombre_cliente}</td>
                                {/*Esto mappea automaticamente los datos.*/}
                                <td className="tacos">
                                    {
                                    pedido.selects_cuantos.map((cuantos, index) => (
                                        <div key={index}>
                                            {cuantos} {pedido.selects_tipo[index]}
                                        </div>
                                    ))}
                                </td>
                                
                                <td>{pedido.datosUsuario.notas}</td>
                                <td className="optionButtons">
                                    <button className="botonModificar" > <span>Modificar</span> </button>
                                    <button className="botonEliminar" /*onClick={() => deletePedido(user.user)}*/ > <span>Eliminar</span> </button>
                                </td>
                            </tr>
                            
                            </>
                        ))
                        }
                    </tbody>
            </table>
            </div>

        </>
    );
}

export default Pedidos_DashBoard;