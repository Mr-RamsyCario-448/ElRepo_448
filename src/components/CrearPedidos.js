// Login.js
import React, { useState, useEffect } from 'react';
//helmet permite ejecutar scripts en Return
import { Helmet } from 'react-helmet';

function CrearPedidos() {

    //logica para agregar elementos para el pedido
    const [selects_cuantos, setSelects_cuantos] = useState([0]);
    const [selects_tipo, setSelects_tipo] = useState([0]);

    const addSelect = () => {
        setSelects_cuantos([...selects_cuantos, selects_cuantos.length]);
        setSelects_tipo([...selects_tipo, selects_tipo.length]);
    };
    
    /*const handleSelectCuantosChange = (index_cuantos, e) => {
        //esto va por index y el numero
        console.log('Index cuantos:' + index_cuantos + ' Son ' + e.target.value);
        //handleAddCuantos(e.target.value);
    }

    const handleSelectTiposChange = (index_tipos, e) => {
        //esto va por index y el numero
        console.log('Index tipo:' + index_tipos + ' De ' + e.target.value);
        //handleAddTipo(e.target.value);
    }*/
   
    const [datosUsuario, setFormData] = useState({
        nombre_cliente: 'Invitado',//Valor: 'Invitado' por defecto
        notas: ''
    });



    const handleChange = (e, type, index) => {
        if (type === 'cuantos') {
            const newSelectsCuantos = [...selects_cuantos];
            newSelectsCuantos[index] = e.target.value;
            setSelects_cuantos(newSelectsCuantos);

        } else if (type === 'tipos') {
            const newSelectsTipos = [...selects_tipo];
            newSelectsTipos[index] = e.target.value;
            setSelects_tipo(newSelectsTipos);

        } else {
            setFormData({
                ...datosUsuario,
                ['nombre_cliente'] : nombreUsuario,
                [e.target.name]: e.target.value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission, e.g., send data to MongoDB Atlas

        //console.log(datosUsuario);
        //console.log(selects_cuantos);
        //console.log(selects_tipo);

        //preguntamos al usuario invitado su nombre
        var nombreUsuarioInv = null; 
        //console.log(nombreUsuario);
        if (nombreUsuario === 'Invitado'){

            nombreUsuarioInv = window.prompt('Cual es su nombre?');
            //Si el usuario presiona cancelar, oh bien, no escribe nada, mandar advertencia.

            if (nombreUsuarioInv === null){
                return window.alert('Pedido Cancelado.');
            }
            else if(nombreUsuarioInv === ''){
                return window.alert('Por favor, diga un nombre.');
            }
            //se cambia el nombre unicamente cuando se proporciona un nombre.
            else {
                datosUsuario.nombre_cliente = nombreUsuarioInv;
            }
        }

        //creamos una variable que contendra cuantos tacos de que
        var pedidoTexto = '';
        for(var i = 0; i<selects_cuantos.length; i++){
            pedidoTexto = pedidoTexto +
            selects_cuantos[i] + ' ' +selects_tipo[i] + '\n';
        }


        var confirmarPedido = window.confirm('El pedido es:\n'+
        'Nombre de Cliente: ' + datosUsuario.nombre_cliente + '\n' +
        'Son: ' + pedidoTexto + '\n' +
        'Notas: ' + datosUsuario.notas + '\n' + 'Confirmar?'
        )

        if (confirmarPedido === false){
            return window.alert('Pedido cancelado.');
        }

        //insercion de los datos
        try {
            const combinedData = {
                selects_cuantos,
                selects_tipo,
                datosUsuario
            };
            
            const response = await fetch('http://localhost:3001/insertPedido', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(combinedData)
            });

            if (response.ok) {
                if(response.status === 201){
                    alert('Usuario ya existente.')
                }
                else{
                    alert('Datos de pedido insertados correctamente!.');
                }
            } else {
                alert('Error inserting data');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error inserting data');
        }


        // Reset form after submission if needed
        setFormData({
            notas: ''
        });
    };

    //verificar si hay sesion
    //logica de token
    const isAuthenticated = localStorage.getItem('token');
    //Buscamos el nombre de Usuario en memoria local del sistema
    var nombreUsuario = localStorage.getItem('userName');
    

    //si no existe o es nulo, se escribe invitado, en otro caso el nombreUsuario ya se escribe en la barra de navegacion
    
    var botonSesion = "Iniciar";
    //preguntamos si tiene el token de inicio de sesion.
    if(isAuthenticated){
        //console.log('token given!')
        var botonSesion = "Cerrar";
        datosUsuario.nombre_cliente = nombreUsuario;
        }
        else
            nombreUsuario = 'Invitado';


    
    const sesion = () => {
            if (botonSesion === "Cerrar"){
                //window.alert("Sesion cerrada.");
                window.location.href = '/';
                //esto destruye el token
                localStorage.removeItem('token');
                localStorage.removeItem('userRole');
                localStorage.removeItem('userName');
            }
            else{
                window.location.href = '/login';
            }
        };    
    
        //previene un refresh de la pagina, una forma de evitar que se pierdan los datos de pedido
    useEffect(() => {
            const handleBeforeUnload = (event) => {
              event.preventDefault();
              // Custom logic to handle the refresh
              // Display a confirmation message or perform necessary actions
            };
            window.addEventListener('beforeunload', handleBeforeUnload);
            return () => {
              window.removeEventListener('beforeunload', handleBeforeUnload);
            };
          }, []);


    return (
        <>
        <Helmet>

        <script>
            /*
            console.log('bruh');

            //guardamos en memoria local el contenido de que tacos pidio
            var contenidoTablaRespaldo;

            contenidoTablaRespaldo = document.getElementById("selector-tacos").innerHTML;

            localStorage.setItem("pedidosContent",contenidoTablaRespaldo);

            //si existe una tabla en memoria, usarla
            var contenidoTabla = localStorage.getItem('pedidosContent');

            document.getElementById('selector-tacos').innerHTML = contenidoTabla;

            localStorage.setItem("sus",'por que me tocas el chilito');
            */

        </script>

        </Helmet>

        <div class="contenedor-pedidos-clientes">
            {/*Barra de navegacion*/}
            <nav class="barraNavegacion">
            <a id="nav-inicio" href="/">Inicio</a>
            {/*<a id="nav-pedidos" href="/pedidos">Pedidos</a>*/}
            <a id="nav-sesion"  onClick={sesion} href="#">{botonSesion} Sesión</a>

            <a class="contPerfilUsuario"> <img></img> <span>Hola, {nombreUsuario}!</span> </a>

            </nav>



            <h1>Pagina de Crear un pedido</h1>
            <form onSubmit={handleSubmit}>
                {/*Si se quiere agregar otro pedido aqui esta la madre esta*/}
                {/*Cuantos tacos*/}
                <section class="selector-tacos">
                    <div className='select-cuantos-tacos' id=''>
                    {selects_cuantos.map((selects_cuantos, index_cuantos) => (
                        <div key={index_cuantos} className="select-container">
                            {/*<label htmlFor={`select${index + 1}`}>Que taco? {index + 1}:</label>*/}
                            <select name={`select_cuantos${index_cuantos + 1}`} id={`select_cuantos${index_cuantos + 1}`} onChange={(e) => handleChange(e, 'cuantos', index_cuantos)}>
                                
                                <option value="none">Cuantos?</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>

                            </select>
                        </div>
                    ))}
                    </div>
                    {/*De que los tacos?*/}
                    <div className='select-tipo-tacos'>
                    {selects_tipo.map((selects_tipo, index_tipo) => (
                        <div key={index_tipo} className="select-container">
                            {/*<label htmlFor={`select${index + 1}`}>Que taco? {index + 1}:</label>*/}
                            <select name={`select_tipo${index_tipo + 1}`} id={`select_tipo${index_tipo + 1}`} onChange={(e) => handleChange(e, 'tipos', index_tipo)}>
                                
                                <option value="none">De cuales?</option>
                                <option value="taco-birria">Taco de Birria</option>
                                <option value="taco-bistek">Taco de Bistek</option>
                                <option value="taco-chorizo">Taco de Chorizo</option>
                                <option value="taco-cabeza">Taco de Cabeza</option>

                            </select>
                        </div>
                    ))}
                    </div>
                </section>

                <button type="button" onClick={addSelect}>Agregar</button>

                <br></br>
                <label htmlFor="notas">Notas:</label><br />
                <textarea id="notas" name="notas" value={datosUsuario.notas} onChange={handleChange}></textarea><br />

                <input type="submit" value="Submit" />
            </form>




        </div>
        
        </>
        
    );
}

export default CrearPedidos;
