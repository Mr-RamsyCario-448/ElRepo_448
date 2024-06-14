import React, { useState, useEffect } from "react";

function IndexPage(){
    //ocultar pedidos cuando sea un usuario cliente o nuevo
    
    //logica de token
    const isAuthenticated = localStorage.getItem('token');

    const userName = localStorage.getItem('userName');
    
    var botonSesion = "Iniciar";
    //preguntamos si tiene el token de inicio de sesion.
    if(isAuthenticated){
        //console.log('token given!')
        var botonSesion = "Cerrar";
        }

    //debido a que es la ventana principal, solamente cambia el
    //boton de Iniciar o Cerrar Sesion.

    const sesion = () => {
        if (botonSesion === "Cerrar"){
            //window.alert("Sesion cerrada.");
            window.location.href = '/';
            //esto destruye el token
            localStorage.removeItem('token');
            localStorage.removeItem('userName');
            localStorage.removeItem('userRole');
        }
        else{
            window.location.href = '/login';
        }
    };

    const realizarPedido = () => {

        //obtener nombre del usuario si existe la sesion, si no existe, entonces dar la opcion en otra ventana de agregar el nombre
        //proximamente: agregar un icono con foto de perfil y nombre del usuario.
        window.location.href = '/crear_pedido';
    }

    return(
        <>
        <nav class="barraNavegacion">
            <a id="nav-inicio" href="/">Inicio</a>
            {/*<a id="nav-pedidos" href="/pedidos">Pedidos</a>*/}
            <a id="nav-sesion"  onClick={sesion} href="#">{botonSesion} Sesión</a>

            <a class="contPerfilUsuario"> <img></img> <span>Hola, Invitado!</span> </a>

        </nav>

        <div class="contenedorIndex">
        <h1>Pagina de Inicio</h1>
        <p>Esta es la pagina de Inicio</p>
        
        <button class="commonButton" onClick={realizarPedido}>Realizar Pedido</button>
        </div>
        <div class="textoInferior">
            <section class="productoTaco" >
            <div id="taco-birria"></div>
            <p>Tacos de Birria</p>
            </section>

            <section class="productoTaco" >
            <div id="taco-bistek"></div>
            <p>Tacos de Bistek</p>
            </section>
            
            <section class="productoTaco" >
            <div id="taco-chorizo"></div>
            <p>Tacos de Chorizo</p>
            </section>

            
            <section class="productoTaco" >
            <div id="taco-cabeza"></div>
            <p>Tacos de Cabeza</p>
            </section>


        </div>  

        </>

    );
}

export default IndexPage;
