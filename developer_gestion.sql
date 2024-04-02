-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 02-04-2024 a las 04:02:18
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
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `control_reservas`
--

INSERT INTO `control_reservas` (`id`, `nombre_reserva`, `nombre_docente`, `estudiantes`, `equipo_simulador`, `fecha_reserva`, `hora_reserva`, `usuario`, `estado`) VALUES
(14, 'zvcxcx', 'adssd', 4, 2, '2024-03-31', '17:40:00', 2, 1),
(13, 'PROBANDO', 'PROBANDO', 7, 1, '2024-03-30', '15:30:00', 3, 1),
(12, 'sssss', 'sssss', 1, 1, '2024-03-30', '19:00:00', 2, 1),
(11, 'aa', 'aaaa', 2, 2, '2024-03-29', '18:59:00', 2, 0),
(15, 'prueba', 'sadas', 2, 2, '2023-06-30', '19:00:00', 2, 1),
(16, 'probando3', 'probando3', 6, 5, '2024-03-30', '11:42:00', 3, 1),
(17, 'probando4', 'probando4', 8, 4, '2024-03-31', '21:40:00', 3, 1),
(18, 'aa', 'sss', 3, 4, '2024-04-01', '14:13:00', 2, 0),
(19, 'PROBANDO', 'PROBA', 7, 2, '2024-04-10', '14:53:00', 2, 1);

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
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `control_reservas_equipos`
--

INSERT INTO `control_reservas_equipos` (`id`, `nombre_equipo`, `estado`) VALUES
(1, 'CAE APOLLO', 1),
(2, 'SIMULADOR DE PARTO', 1),
(3, 'SIMULADOR MASCARILLA', 1),
(4, 'RED NEURONAL', 1),
(5, 'SIMULADOR DE CORAZON', 1);

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
