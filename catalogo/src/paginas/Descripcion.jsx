import React from 'react';
import datos from '../data/data';
import './estilos/Descripcion.css';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Descripcion = () => {
    const { id } = useParams();
    const info = datos.find(item => item.id === parseInt(id));

    if (!info) {
        return <div>No hay información disponible para esta imagen.</div>;
    }

    return (
        <div className="descripcion-container">
                <div className="imagen-container">
                    <h1 className="titulo">Imagen del simulador</h1>
                    <div className="imagen-wrapper">
                        <img src={info.img} alt={info.titulo} className="imagen" />
                    </div>
                </div>
            <div className="info-container">
                <h1 className='titulo'>Detalles del simulador</h1>
                <p>El simulador seleccionado es el: <b>{info.titulo}</b></p>
                <ul>
                    {info.descripcion.map((item, index) => (
                    <li key={index}>{item}</li>
                    ))}
                </ul>
                <Link to="/" className="volver-button">Regresar Al Catalogo</Link>
            </div>
        </div>
    );
};

export default Descripcion;