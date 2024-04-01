import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faFloppyDisk, faFileSignature, faWrench, faClock, faCalendarDays, faHashtag, faChalkboardUser } from '@fortawesome/free-solid-svg-icons';
import Boton from '../componentes/Boton';
import moment from 'moment';

function Formulario() {
    const user = localStorage.getItem('user');
    const navigate = useNavigate();
    // useEffect(() => {
    //     // Verificar si el usuario tiene permiso para acceder a esta vista
    //     if (islogeado !== 2) {
    //       // Redirigir al usuario a la página de inicio de sesión (ruta index)
    //       navigate('/');
    //     }
    //   }, [islogeado, navigate]);
    
    //   if (islogeado !== 2) {
    //     // Evitar que se renderice el contenido de VistaAdmin si se redirige
    //     return null;
    //   }
    const [tiposSimuladores, setTiposSimuladores] = useState([]);
    const [nombreReserva, setNombreReserva] = useState('');
    const [nombreDocente, setNombreDocente] = useState('');
    const [cantidadEstudiantes, setCantidadEstudiantes] = useState('');
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [simuladorSeleccionado, setSimuladorSeleccionado] = useState('');
  
    useEffect(() => {
      fetch('http://localhost:3005/equipos/tipoEquipos')
        .then(response => response.json())
        .then(data => setTiposSimuladores(data))
        .catch(error => console.error('Error al obtener tipos de simuladores:', error));
    }, []);

    const selectChange = (e) => {
        setSimuladorSeleccionado(e.target.value);
    };

    const enviarReserva = (e) => {
        e.preventDefault();

        if (!nombreReserva || !nombreDocente || !cantidadEstudiantes || !fecha || !hora || !simuladorSeleccionado) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor completa todos los campos',
        });
        return; 
        }

        Swal.fire({
        icon: 'question',
        title: '¿Estás seguro de enviar la reserva?',
        text: 'Revisa bien la informacion de la reserva.',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Sí, enviar',
        }).then((result) => {
        if (result.isConfirmed) {

            const fechaFormateada = moment(fecha).format('YYYY-MM-DD');
            const horaFormateada = moment(hora, 'HH:mm').format('HH:mm');

            const formData = {
            nombreReserva,
            nombreDocente,
            cantidadEstudiantes,
            fecha: fechaFormateada,
            hora: horaFormateada,
            simuladorSeleccionado,
            user: user
            };

            fetch('http://localhost:3005/equipos/crearReserva', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
            })
            .then(response => {
            if (response.ok) {
                const hora2 = moment(formData.hora, 'HH:mm').format('hh:mm A');
                Swal.fire({
                icon: 'success',
                title: '¡Reserva Exitosa!',
                html: 'Se ha reservado para la fecha: <b>' + fecha + '</b>' + ' Con hora: <b>' + hora2 + '</b>'
                });
                setNombreReserva('');
                setNombreDocente('');
                setCantidadEstudiantes('');
                setFecha('');
                setHora('');
                setSimuladorSeleccionado('');
                console.log('Reserva guardada exitosamente');
            } else {    
                Swal.fire({
                icon: 'error',
                title: '¡Error!',
                html: 'Ocurrió un error al enviar la reserva'
                });
                console.error('Error al guardar reserva');
            }
            })
            .catch(error => console.error('Error al enviar solicitud POST:', error));
        }
        });
    };
    
    const numeros = (e) => {
        const key = e.keyCode || e.which;
        const tecla = String.fromCharCode(key).toLowerCase();
        const letras = "0123456789";
        const especiales = [8, 37, 39, 46];
        let tecla_especial = false;

        for (let i = 0; i < especiales.length; i++) {
            if (key === especiales[i]) {
                tecla_especial = true;
                break;
            }
        }

        if (letras.indexOf(tecla) === -1 && !tecla_especial) {
            e.preventDefault();
        }
    }

    const cerrarSesion = () => {
        Swal.fire({
          title: '¿Estás seguro?',
          text: 'Si sales, se perdera la informacion no guardada.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Sí, salir',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/');
            Swal.fire('¡Sesión cerrada!', 'Se ha cerrado sesion con exito!', 'success');
          }
        });
      };

    return (
        <>
            <div className="container">
                <div className='row justify-content-center mt-5'>
                    <div className="col-md-12">
                        <div className="card">
                            <div className='card-body'>
                                <h2 className="card-title">Formulario Reservar Simulador</h2>
                                <form>
                                    <div className='row'>
                                        <div className="col-md-6">
                                            <label htmlFor="nombre_reserva" className="form-label"><b>Nombre de la reserva</b></label>
                                            <div className='input-group'>
                                                <span className='input-group-text'><FontAwesomeIcon icon={faFileSignature} /></span>
                                                <input value={nombreReserva} onChange={(e) => setNombreReserva(e.target.value)} type="text" className="form-control" id="nombre_reserva" placeholder='Nombre de la reserva'/>
                                            </div>
                                            <br></br>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="nombre_docente" className="form-label"><b>Nombre del docente</b></label>
                                            <div className='input-group'>
                                                <span className='input-group-text'><FontAwesomeIcon icon={faChalkboardUser} /></span>
                                                <input value={nombreDocente} onChange={(e) => setNombreDocente(e.target.value)} type="text" className="form-control" id="nombre_docente" placeholder='Nombre del docente'/>
                                            </div>
                                            <br></br>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="cantidad_estudiantes" className="form-label"><b>Estudiantes a ingresar</b></label>
                                            <div className='input-group'>
                                                <span className='input-group-text'><FontAwesomeIcon icon={faHashtag} /></span>
                                                <input onKeyDown={numeros} value={cantidadEstudiantes} onChange={(e) => setCantidadEstudiantes(e.target.value)} type="text" className="form-control" id="cantidad_estudiantes" placeholder="Escribe la cantidad de estudiatnes..."/>
                                            </div>
                                            <br></br>
                                        </div>
                                        <div className="col-md-3">
                                            <label htmlFor="fecha" className="form-label"><b>Fecha de reserva</b></label>
                                            <div className='input-group'>
                                                <span className='input-group-text'><FontAwesomeIcon icon={faCalendarDays} /></span>
                                                <input value={fecha} onChange={(e) => setFecha(e.target.value)} type="date" className="form-control" id="fecha"/>
                                            </div>
                                            <br></br>
                                        </div>
                                        <div className="col-md-3">
                                            <label htmlFor="hora" className="form-label"><b>Hora de reserva</b></label>
                                            <div className='input-group'>
                                                <span className='input-group-text'><FontAwesomeIcon icon={faClock} /></span>
                                                <input value={hora} onChange={(e) => setHora(e.target.value)} type="time" className="form-control" id="hora"/>
                                            </div>
                                            <br></br>
                                        </div>
                                        <div className="col-md-12">
                                            <label htmlFor="simulador" className="form-label"><b>Seleccione un simulador</b></label>
                                            <div className='input-group'>
                                                <span className='input-group-text'><FontAwesomeIcon icon={faWrench} /></span>
                                                <select id="simulador" className="form-select" value={simuladorSeleccionado} onChange={(e) => selectChange(e)}>
                                                    <option value="" disabled>Seleccione un simulador</option>
                                                    {tiposSimuladores.map(tipo => (
                                                    <option key={tipo.id} value={tipo.id}>{tipo.nombre_equipo}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <br></br>   
                                        </div>
                                        <div className="col-md-12 card-footer">
                                            <Boton estilo={{marginLeft: '0px'}} Nombre="Salir" icon={faArrowLeft} onClick={cerrarSesion} clase={"btn btn-danger"}/>
                                            <Boton estilo={{marginLeft: '10px'}} Nombre="Guardar" icon={faFloppyDisk} onClick={enviarReserva} clase={"btn btn-success"}/>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </>
    );
};


export default Formulario;