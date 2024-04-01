import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Boton = ({ estilo, Nombre, icon, onClick, clase }) => {
    return (
      <button type="button" style={estilo} onClick={onClick} className={clase}>
        <FontAwesomeIcon icon={icon} /> {Nombre}
      </button>
    );
  };
  
  export default Boton;