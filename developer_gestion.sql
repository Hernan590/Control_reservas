-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 26-03-2024 a las 05:56:14
-- Versión del servidor: 8.0.31
-- Versión de PHP: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `developer_gestion`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `control_reservas`
--

DROP TABLE IF EXISTS `control_reservas`;
CREATE TABLE IF NOT EXISTS `control_reservas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre_reserva` varchar(200) NOT NULL,
  `nombre_docente` varchar(200) NOT NULL,
  `estudiantes` int NOT NULL,
  `equipo_simulador` int NOT NULL,
  `fecha_reserva` date NOT NULL,
  `hora_reserva` time NOT NULL,
  `usuario` int NOT NULL,
  `estado` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `control_reservas`
--

INSERT INTO `control_reservas` (`id`, `nombre_reserva`, `nombre_docente`, `estudiantes`, `equipo_simulador`, `fecha_reserva`, `hora_reserva`, `usuario`, `estado`) VALUES
(2, 'SSS', 'SSSS', 3, 2, '2024-03-30', '16:25:00', 1, 1),
(3, 'prueba', 'prueba', 4, 2, '2024-03-31', '17:50:00', 2, 1),
(4, 'prueba', 'prueba', 7, 2, '2024-03-28', '14:49:00', 3, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `control_reservas_equipos`
--

DROP TABLE IF EXISTS `control_reservas_equipos`;
CREATE TABLE IF NOT EXISTS `control_reservas_equipos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre_equipo` varchar(200) NOT NULL,
  `estado` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `control_reservas_equipos`
--

INSERT INTO `control_reservas_equipos` (`id`, `nombre_equipo`, `estado`) VALUES
(1, 'CAE APOLLO', 1),
(2, 'SIMULADOR DE PARTO', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre_usuario` varchar(200) NOT NULL,
  `password` varchar(100) NOT NULL,
  `rol` int NOT NULL COMMENT 'Administrador = 1\r\nReservista = 2',
  `estado` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre_usuario`, `password`, `rol`, `estado`) VALUES
(1, 'Hernan', '123', 1, 1),
(2, 'Hector', '123', 2, 1),
(3, 'Luis', '123', 2, 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
