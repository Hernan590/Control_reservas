import React from 'react';
import './estilos/Home.css';
import Inicio from '../componentes/inicio';
import productos from '../data/productos';

const Home = ({ }) => {

    const [searchTerm, setSearchTerm] = React.useState('');

    return (
        <>
            <div className="container">
                <h1 className='titulo'>Catálogo de Simuladores Equipos de Salud</h1>
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Buscar por titulo"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="input"
                    />
                </div>
                <br></br>
                <main className="main-content">
                    {productos
                        .filter((producto) =>
                            producto.titulo.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((producto) => (
                            <Inicio
                                key={producto.id}
                                id={producto.id} // Asegúrate de incluir el id aquí
                                titulo={producto.titulo}
                                descripcion={producto.descripcion}
                                ver="Ver mas"
                                detalles={producto.detalles}
                                imagen={producto.imagen}
                            />
                        ))}
                </main>
            </div>
        </>
    );
};

export default Home;

{/* <main className="main-content">
<Inicio titulo="EJEMPLO_1" descripcion="Se utiliza para..." detalles="Se utiliza...." />
<Inicio titulo="EJEMPLO_2" descripcion="Se utiliza para..." detalles="Se utiliza...." />
<Inicio titulo="EJEMPLO_3" descripcion="Se utiliza para..." detalles="Se utiliza...." />
<Inicio titulo="EJEMPLO_4" descripcion="Se utiliza para..." detalles="Se utiliza...." />
<Inicio titulo="EJEMPLO_5" descripcion="Se utiliza para..." detalles="Se utiliza...." />
<Inicio titulo="EJEMPLO_6" descripcion="Se utiliza para..." detalles="Se utiliza...." />
<Inicio titulo="EJEMPLO_7" descripcion="Se utiliza para..." detalles="Se utiliza...." />
<Inicio titulo="EJEMPLO_8" descripcion="Se utiliza para..." detalles="Se utiliza...." />
<Inicio titulo="EJEMPLO_9" descripcion="Se utiliza para..." detalles="Se utiliza...." />
</main> */}