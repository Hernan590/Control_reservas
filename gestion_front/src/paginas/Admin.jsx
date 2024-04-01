import React from 'react';
import moment from 'moment';
import './Admin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine  } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

function Admin(){

    const [reservas, setReservas] = useState([]);
    const [tiposSimuladores, setTiposSimuladores] = useState([]);
    const [buscar, setbuscar] = useState('');
    const [simuladorSelect, setSimuladorSelect] = useState('0');
    const [simuladorSelect2, setSimuladorSelect2] = useState('0');
    const fecha_actual = new Date();
    const year_actual = fecha_actual.getFullYear();
    const mes_actual = fecha_actual.getMonth() + 1; 
    const dia_actual = fecha_actual.getDate();
    const [yearSeleccionado, setYearSeleccionado] = useState(year_actual.toString());
    const [yearSeleccionado2, setYearSeleccionado2] = useState(year_actual.toString());
    const [mesSeleccionado, setMesSeleccionado] = useState(mes_actual.toString());
    const [mesSeleccionado2, setMesSeleccionado2] = useState(mes_actual.toString());
    const [diaSeleccionado, setDiaSeleccionado] = useState(dia_actual.toString());
    const diasDelMes = Array.from({ length: 31 }, (_, index) => index + 1);
    const years = Array.from({ length: 3 }, (_, index) => year_actual - index);
    const [stats1, setStats1] = useState([]); // Para results1
    const [stats2, setStats2] = useState([]); // Para results2 

    const diaSelect = (e) => {
        const selectDia = e.target.value;
        console.log("Dia seleccionado:", selectDia)
        setDiaSeleccionado(e.target.value);
    }

    const mesSelect = (e) => {
        const selectedMes = e.target.value;
        console.log("Mes seleccionado:", selectedMes);
        setMesSeleccionado(selectedMes);
    };

    const yearSelect = (e) => {
        const selectedYear = e.target.value;
        console.log("Año seleccionado:", selectedYear);
        setYearSeleccionado(selectedYear);
    };

    const meses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    
    const optionsMeses = meses.map((mes, index) => (
        <option key={index + 1} value={index + 1}>{mes}</option>
    ));
    
    const simuladorInforme = (e) => {
        const selectedSimulador = e.target.value;
        setSimuladorSelect2(selectedSimulador);
        console.log("Simulador seleccionado (Informe):", selectedSimulador); 
        obtenerEstadisticas(selectedSimulador, yearSeleccionado2, mesSeleccionado2);
    }
    
    const yearInforme = (e) => {
        const selectedYear = e.target.value;
        setYearSeleccionado2(selectedYear);
        console.log("Año seleccionado (Informe): ", selectedYear);
        obtenerEstadisticas(simuladorSelect2, selectedYear, mesSeleccionado2);
    }

    const mesInforme = (e) => {
        const selectedMes2 = e.target.value;
        setMesSeleccionado2(selectedMes2);
        console.log("Mes seleccionado (Informe): ", selectedMes2);
        obtenerEstadisticas(simuladorSelect2, yearSeleccionado2, selectedMes2);
    };

    const tipoSimulador = (e) => {
        setSimuladorSelect(e.target.value);
        console.log("Simulador seleccionado:", simuladorSelect);  
    };

    useEffect(() => {
        fetch(`http://localhost:3005/reservas/verReservas?simulador=${simuladorSelect}&mes=${mesSeleccionado}&year=${yearSeleccionado}&dia=${diaSeleccionado}`)
        .then(response => response.json())
            .then(data => {
                setReservas(data); 
            })
            .catch(error => console.error('Error al obtener reservas:', error));
    }, [simuladorSelect, mesSeleccionado, yearSeleccionado, diaSeleccionado]);

    useEffect(() => {
        fetch('http://localhost:3005/equipos/tipoEquipos')
          .then(response => response.json())
          .then(data => setTiposSimuladores(data))
          .catch(error => console.error('Error al obtener tipos de simuladores:', error));
      }, []);   

    const filteredReservas = reservas.filter((reserva) => {
        return (
            reserva.nombre_docente.toLowerCase().includes(buscar.toLowerCase()) ||
            reserva.nombre_usuario.toLowerCase().includes(buscar.toLowerCase()) ||
            reserva.nombre_reserva.toLowerCase().includes(buscar.toLowerCase()) 
        );
    });

    const obtenerEstadisticas = (simulador, year_informe, mes_informe) => {
        const simuladorId = typeof simulador === 'object' ? '0' : simulador;
        let yearInforme = year_informe;
        let mesInforme = mes_informe;

        if (yearInforme === undefined) {
            const now = new Date();
            yearInforme = now.getFullYear();
        }

        if (mesInforme === undefined) {
            const now = new Date();
            mesInforme = now.getMonth() + 1;
        }
    
        fetch(`http://localhost:3005/reservas/verInforme?simulador=${simuladorId}&year_informe=${yearInforme}&mes_informe=${mesInforme}`)
            .then(response => response.json())
            .then(data => {
                // Dividir los datos en resultados 1 y 2
                const { results1, results2 } = data;
                setStats1(results1);
                setStats2(results2);
            })
            .catch(error => console.error('Error al obtener estadísticas:', error));
    };

    const totalRegistros = stats2.length > 0 ? stats2[0].total_registros : 0;

    return (
        <>
            <div className="position-fixed" style={{ bottom: 0, right: 0, zIndex: 999 }}>
            <button onClick={obtenerEstadisticas} data-bs-toggle="modal" data-bs-target="#modalInforme" className='btn btn-success toggle m-4'><FontAwesomeIcon icon={faChartLine}/></button>
            </div>

            <div className='container-fluid'>
                <div className="row">
                    <div className="container text-center"><h1><b>Control Reservas</b></h1></div>
                </div>
                <br></br>

                <div className='row'>
                    <div className="col-0 col-sm-1 col-md-1" ></div>
                    <div className='col-12 col-sm-12 col-md-2'>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><b>Buscar</b></span>
                            </div>
                            <input value={buscar} onChange={(e) => setbuscar(e.target.value)} type="text" className="form-control" placeholder="Buscar reserva..."/>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-md-2">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <label className="input-group-text"><b>Simulador</b></label>
                            </div>
                            <select onChange={tipoSimulador} className="form-control" name="simulador" id="simulador">
                                <option value="0">Todos los Simuladores</option>
                                {tiposSimuladores.map(tipo => (
                                <option key={tipo.id} value={tipo.id}>{tipo.nombre_equipo}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-md-2">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <label className="input-group-text"><b>Año</b></label>
                            </div>
                            <select className="form-control" name="año" id="año" value={yearSeleccionado} onChange={yearSelect}>
                                <option value="0">Todos los años</option>
                                {years.map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-md-2">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <label className="input-group-text"><b>Mes</b></label>
                            </div>
                            <select className="form-control" name="mes" id="mes" value={mesSeleccionado} onChange={mesSelect}>
                                <option value="0">Todos los meses</option>
                                {optionsMeses}
                            </select>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-md-2">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <label className="input-group-text"><b>Dia</b></label>
                            </div>
                            <select className="form-control" name='dia' id="dia" value={diaSeleccionado} onChange={diaSelect}>
                                <option value="0">Todos los dias</option>
                                {diasDelMes.map((dia) => (
                                    <option key={dia} value={dia}>{dia}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    
                    <div className="col-0 col-sm-1 col-md-1" ></div>
                </div>

                <div className='row'>
                    <div className="col-0 col-sm-1 col-md-1"></div>
                    <div className='col-12 col-sm-10 col-md-10'>
                        <div className='contenedor-altura-fija'>
                            <table className='table table-bordered border-secondary'>
                                <thead className='table-dark'>
                                    <tr className='text-center'>
                                        <th>#</th>
                                        <th>Nombre Reserva</th>
                                        <th>Nombre Docente</th>
                                        <th>Estudiantes</th>
                                        <th>Simulador</th>
                                        <th>Fecha Reserva</th>
                                        <th>Hora Reserva</th>
                                        <th>Usuario</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {filteredReservas.map((reserva, index) => (
                                        <tr key={index} className="text-center">
                                            <td><small>{index + 1}</small></td>
                                            <td><small>{reserva.nombre_reserva}</small></td>
                                            <td><small>{reserva.nombre_docente}</small></td>
                                            <td><small>{reserva.estudiantes}</small></td>
                                            <td><small>{reserva.nombre_equipo}</small></td>
                                            <td><small>{reserva.fecha_reserva}</small></td>
                                            <td><small>{moment(reserva.hora_reserva, 'HH:mm:ss').format('hh:mm A')}</small></td>
                                            <td><small>{reserva.nombre_usuario}</small></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-0 col-sm-1 col-md-1"></div>
                </div>
            </div>

            <div className='modal fade' id='modalInforme' tabIndex="-1" aria-labelledby="modalInformeLabel" aria-hidden="true">
                <div className='modal-dialog modal-xl'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title' id='configModalLabel'>Informe Simuladores</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className='modal-body'>
                            <div className='row'>
                                <div className="col-4 col-sm-4 col-md-4">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <label className="input-group-text"><b>Año</b></label>
                                        </div>
                                        <select className="form-control" name="año" id="año" onChange={yearInforme} value={yearSeleccionado2}>
                                            <option value="0">Todos los años</option>
                                            {years.map(year => (
                                                <option key={year} value={year}>{year}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-4 col-sm-4 col-md-4">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <label className="input-group-text"><b>Mes</b></label>
                                        </div>
                                        <select className="form-control" name="mes" id="mes" onChange={mesInforme} value={mesSeleccionado2}>
                                            <option value="0">Todos los meses</option>
                                            {optionsMeses}
                                        </select>
                                    </div>
                                </div> 
                                <div className="col-4 col-sm-4 col-md-4">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <label className="input-group-text"><b>Simulador</b></label>
                                        </div>
                                        <select onChange={simuladorInforme} className="form-control" name="simulador_info" id="simulador_info">
                                            <option value="0">Todos los Simuladores</option>
                                            {tiposSimuladores.map(tipo => (
                                            <option key={tipo.id} value={tipo.id}>{tipo.nombre_equipo}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <table className='table table-bordered border-secondary'>
                                <thead className='table-dark'>
                                    <tr className='text-center'>
                                        <th>Simulador</th>
                                        <th>Cantidad de usos</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stats1.map((stat, index) => (
                                        <tr key={index} className='text-center'>
                                            <td><small>{stat.nombre_equipo}</small></td>
                                            <td><small>{stat.cantidad_usos}</small></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <p>Cantidad total de registros: <b>{totalRegistros}</b></p>
                        </div>
                        <div className='modal-footer'>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};


export default Admin;