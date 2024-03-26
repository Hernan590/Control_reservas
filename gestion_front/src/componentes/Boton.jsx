import React from 'react';

const Boton = ({ Nombre, onClick }) => {
    return (
      <button type='submit' onClick={onClick} className="btn btn-primary">
        {Nombre}
      </button>
    );
  };
  
  export default Boton;