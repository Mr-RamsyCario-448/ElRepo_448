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
            console.log(data);
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

    //debido a que es la ventana principal, solamente cambia el
    //boton de Iniciar o Cerrar Sesion.

    //log out
    const logOut = () => {
        alert("Sesion cerrada.")
        window.location.href = '/';
        //esto destruye el token
        localStorage.removeItem('token')
    };

    var botonSesion = "Cerrar";
    //preguntamos si tiene el token de inicio de sesion.
    if(!isAuthenticated)
        //console.log('token given!')
        window.location.href = '/login';
    
    //debido a que es la ventana principal, solamente cambia el
    //boton de Iniciar o Cerrar Sesion.

    //vamos a pre mapear los valores del pedido

    //creamos una variable que contendra cuantos tacos de que
    var pedidoTexto = '';

        //logica para agregar elementos para el pedido
    const [selects_cuantos, setSelects_cuantos] = useState([0]);
    const [selects_tipo, setSelects_tipo] = useState([0]);

    /*var pedidoTexto = '';

        for(var i = 0; i<pedido.selects_cuantos.length; i++){
            pedidoTexto = pedidoTexto +
            selects_cuantos[i] + ' ' +selects_tipo[i] + '\n';
        }*/
    //console.log(pedidoTexto);

    var numPedido = 0;

    return(
        <>
        <nav class="barraNavegacion">
            <a href="/">Inicio</a>
            <a href="/pedidos">Pedidos</a>
            <a href="#" onClick={logOut}>{botonSesion} Sesión</a>
        </nav>

        <div class="contenedorIndex">
        <h1>Pagina de Pedidos</h1>
        <p>Esta es la pagina de Pedidos</p>
        </div>

        <div class="pedidosFondo">
        <table class="tablaUsuarios">
                    <thead>       
                        <tr>
                           {/* <th>ID Pedido</th>*/}
                            <th>Nombre de Cliente</th>
                            <th>Articulos</th>
                            <th>Notas</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidosData.map((pedido) => (
                            <>
                            {/*Previo al mappeo de los datos vamos a modificar los valores de articulos*/}
                            


                            <tr class="filaUsers" key={pedido.nombre_cliente}>
                                {/*<td>{pedido.id}</td>*/}
                                {/*por cada pasada que da el script se suma +1 */}

                                <td>{pedido.datosUsuario.nombre_cliente}</td>
                                <td>{[pedido.selects_cuantos[0] + ' ' + pedido.selects_tipo [0] + '\n' ,

                            ]}</td>
                                
                                <td>{pedido.datosUsuario.notas}</td>
                                <td class="optionButtons">
                                    <button class="botonModificar" > <span>Modificar</span> </button>
                                    <button class="botonEliminar" > <span>Eliminar</span> </button>
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