import React from "react";
import './estilos/inicio.css';
import { Link } from 'react-router-dom';

const Inicio = ({id, titulo, ver, detalles, imagen}) => {
    return (
        <>
            <section className="catalogo">
            <h3>{titulo}</h3>
            <Link to={{ pathname: `/descripcion/${id}`, state: { detalles } }}>
                    <img src={imagen} alt={titulo}/>
                    <p>{ver}</p>
            </Link>
                <p><b>{detalles}</b></p>
            </section>
        </>
    )
  }
  
export default Inicio;