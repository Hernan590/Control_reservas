import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileSignature, faWrench, faClock, faCalendarDays, faHashtag, faChalkboardUser } from '@fortawesome/free-solid-svg-icons';
import Boton from '../componentes/Boton';
import moment from 'moment';

const Formulario = () => {
    const user = localStorage.getItem('user');

    const [tiposSimuladores, setTiposSimuladores] = useState([]);
    const [nombreReserva, setNombreReserva] = useState('');
    const [nombreDocente, setNombreDocente] = useState('');
    const [cantidadEstudiantes, setCantidadEstudiantes] = useState('');
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [simuladorSeleccionado, setSimuladorSeleccionado] = useState('');
  
    useEffect(() => {
      fetch('http://localhost:3000/equipos/tipoEquipos')
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

        // Formatear la fecha y la hora utilizando Moment.js
        const fechaFormateada = moment(fecha).format('YYYY-MM-DD');
        const horaFormateada = moment(hora, 'HH:mm').format('HH:mm');

        const formData = {
            nombreReserva,
            nombreDocente,
            cantidadEstudiantes,
            fecha: fechaFormateada,
            hora: horaFormateada,
            simuladorSeleccionado,
            user
        };

        fetch('http://localhost:3000/equipos/crearReserva', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.ok) {

                console.log('Reserva guardada exitosamente');
            } else {

                console.error('Error al guardar reserva');
            }
        })
        .catch(error => console.error('Error al enviar solicitud POST:', error));
    };

    return (
        <>
            <div className="container">
                <form className="row g-3">
                    <div className="col-md-6">
                        <label htmlFor="nombre_reserva" className="form-label"><b>Nombre de la reserva</b></label>
                        <div className='input-group'>
                            <span className='input-group-text'><FontAwesomeIcon icon={faFileSignature} /></span>
                            <input value={nombreReserva} onChange={(e) => setNombreReserva(e.target.value)} type="text" className="form-control" id="nombre_reserva" placeholder='Nombre de la reserva'/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="nombre_docente" className="form-label"><b>Nombre del docente</b></label>
                        <div className='input-group'>
                            <span className='input-group-text'><FontAwesomeIcon icon={faChalkboardUser} /></span>
                            <input value={nombreDocente} onChange={(e) => setNombreDocente(e.target.value)} type="text" className="form-control" id="nombre_docente" placeholder='Nombre del docente'/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="cantidad_estudiantes" className="form-label"><b>Estudiantes a ingresar</b></label>
                        <div className='input-group'>
                            <span className='input-group-text'><FontAwesomeIcon icon={faHashtag} /></span>
                            <input value={cantidadEstudiantes} onChange={(e) => setCantidadEstudiantes(e.target.value)} type="number" className="form-control" id="cantidad_estudiantes" placeholder="Escribe la cantidad de estudiatnes..."/>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="fecha" className="form-label"><b>Fecha de reserva</b></label>
                        <div className='input-group'>
                            <span className='input-group-text'><FontAwesomeIcon icon={faCalendarDays} /></span>
                            <input value={fecha} onChange={(e) => setFecha(e.target.value)} type="date" className="form-control" id="fecha"/>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="hora" className="form-label"><b>Hora de reserva</b></label>
                        <div className='input-group'>
                            <span className='input-group-text'><FontAwesomeIcon icon={faClock} /></span>
                            <input value={hora} onChange={(e) => setHora(e.target.value)} type="time" className="form-control" id="hora"/>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="simulador" className="form-label"><b>Seleccione un simulador</b></label>
                        <div className='input-group'>
                            <span className='input-group-text'><FontAwesomeIcon icon={faWrench} /></span>
                            <select id="simulador" className="form-select" value={simuladorSeleccionado} onChange={(e) => selectChange(e)}>
                                {tiposSimuladores.map(tipo => (
                                <option key={tipo.id} value={tipo.id}>{tipo.nombre_equipo}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <Boton Nombre="Enviar" onClick={enviarReserva}/>
                    </div>
                </form>
            </div> 
        </>
    );
};


export default Formulario;