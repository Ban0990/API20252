-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-10-2025 a las 07:23:36
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `baseapp2025`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `cli_id` int(11) NOT NULL,
  `cli_identificacion` varchar(50) DEFAULT NULL,
  `cli_nombre` varchar(255) DEFAULT NULL,
  `cli_telefono` varchar(50) DEFAULT NULL,
  `cli_correo` varchar(255) DEFAULT NULL,
  `cli_direccion` varchar(255) DEFAULT NULL,
  `cli_pais` varchar(50) DEFAULT NULL,
  `cli_ciudad` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`cli_id`, `cli_identificacion`, `cli_nombre`, `cli_telefono`, `cli_correo`, `cli_direccion`, `cli_pais`, `cli_ciudad`) VALUES
(1, '099027', 'JHALMAR', '0990276743', 'jhalmar0990276743@gmail.com', 'Nuevo Balzar', 'Ecuador', 'Balzar'),
(2, '8888888', 'Mario Molina', '5555433', 'micorreo@dominio.com', 'Calle 4 # 5 - 6', 'Eccuador', 'lA LIBERTAD'),
(3, '77766663', 'Comercial las plazas', '888377377', 'comercial@plazas.com', 'Av XXXX 123', 'Ecuador', 'Santa Elena'),
(4, '247859', 'PABLO', '4584', 'japlo@upse.edu.ec', 'Salinas', 'Ecuador', 'Salinas'),
(5, '241562', 'JAIME', '8956', 'JJ', 'la libertad', 'Ecuador', 'Salinas'),
(7, '0603208117', 'Jaime Orozco', '124', 'jorozco@upse.edu.ec', 'salinas', 'Ecuador', 'Salinas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `ped_id` int(11) NOT NULL,
  `cli_id` int(11) DEFAULT NULL,
  `ped_fecha` timestamp NULL DEFAULT NULL,
  `usr_id` int(11) DEFAULT NULL,
  `ped_estado` int(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`ped_id`, `cli_id`, `ped_fecha`, `usr_id`, `ped_estado`) VALUES
(1, 2, '2023-07-23 10:00:00', 1, 1),
(2, 3, '2023-07-10 18:24:37', 1, 0),
(3, 1, '2023-07-18 00:40:00', 1, 1),
(4, 1, '2025-10-17 20:59:27', 3, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos_detalle`
--

CREATE TABLE `pedidos_detalle` (
  `det_id` int(11) NOT NULL,
  `prod_id` int(11) DEFAULT NULL,
  `ped_id` int(11) DEFAULT NULL,
  `det_cantidad` int(11) DEFAULT 0,
  `det_precio` decimal(18,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedidos_detalle`
--

INSERT INTO `pedidos_detalle` (`det_id`, `prod_id`, `ped_id`, `det_cantidad`, `det_precio`) VALUES
(1, 1, 1, 2, 1200.00),
(3, 8, 2, 3, 300.00),
(4, 1, 2, 4, 1200.00),
(6, 7, 1, 5, 53.00),
(7, 10, 4, 2, 500.00),
(8, 11, 4, 1, 56.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `prod_id` int(11) NOT NULL,
  `prod_codigo` varchar(20) DEFAULT NULL,
  `prod_nombre` varchar(255) DEFAULT NULL,
  `prod_stock` int(11) DEFAULT 100,
  `prod_precio` decimal(18,2) DEFAULT 0.00,
  `prod_activo` int(1) DEFAULT 1,
  `prod_imagen` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`prod_id`, `prod_codigo`, `prod_nombre`, `prod_stock`, `prod_precio`, `prod_activo`, `prod_imagen`) VALUES
(1, '0001', 'Producto 0001', 100, 1200.00, 0, '/uploads/1730316531512-pastor-belga-malinois-848x477x80xX.jpg'),
(7, '0003', 'Teléfono inalambrico', 30, 400.00, 0, NULL),
(8, '0004', 'Teléfono móvil', 100, 300.00, 1, NULL),
(9, '0006', 'Teléfono Satelital', 5, 350.00, 1, NULL),
(10, '0007', 'Televisor 65\"', 90, 500.00, 1, NULL),
(11, '0008', 'Carro de control', 10, 56.00, 1, NULL),
(20, '50', 'Product dfgfdg c14', 100, 1200.00, 0, '/uploads/1730316531512-pastor-belga-malinois-848x477x80xX.jpg'),
(27, '457', 'zapato negro', 3, 50.00, 1, '/uploads/1730063340760-21.jpg'),
(28, '7845', 'zapato negro', 3, 50.00, 1, '/uploads/1730063957968-21.jpg'),
(29, '85', 'zapato negro', 3, 50.00, 1, '/uploads/1730065279526-descarga.jpg'),
(30, '854543', 'zapato negro', 3, 50.00, 1, '/uploads/1730065442632-perro.jpg'),
(31, '555', 'Producto 0001', 100, 1200.00, 0, '1730065442632-perro.jpg'),
(33, '1485696', 'zapato negro', 3, 50.00, 1, '/uploads/1730315119476-20.jpg'),
(34, '343525', 'nombre', 32, 23.00, 1, '/uploads/1730315773709-dalmata_-_razas_de_perro.jpg'),
(36, '858744', 'nombre', 32, 23.00, 1, '/uploads/1730316448054-pastor-belga-malinois-848x477x80xX.jpg'),
(37, '85874', 'nombre', 32, 23.00, 1, '/uploads/1730316531512-pastor-belga-malinois-848x477x80xX.jpg'),
(38, '78', 'Zapato Casual', 32, 42.00, 1, '/uploads/1730731062714-21.jpg'),
(39, '783', 'Licuadora', 32, 42.00, 1, '/uploads/1731272683777-licuadora.png'),
(40, '432', 'licuadora2', 324, 324.00, 0, NULL),
(41, '784', 'Licuadora', 32, 42.00, 1, '/uploads/1731273944741-licuadora.png'),
(42, '234', '44', 4, 4.00, 0, NULL),
(43, 'ert', 'ert', 4, 4.00, 0, NULL),
(44, 'wr', 'ewr', 5, 5.00, 0, NULL),
(45, '88', 'Licuadora', 32, 42.00, 1, '/uploads/licuadora.png'),
(46, '89', 'Licuadora', 32, 42.00, 1, '/uploads/1731275568706-licuadora.png'),
(47, '7667', '8', 8, 8.00, 0, '/uploads/1731276350481-captura.jpg'),
(48, '333', 'milicuadora', 33, 100.00, 0, '/uploads/1731276442818-captura.jpg'),
(49, '24', 'televosor samsung', 3, 4.00, 0, NULL),
(50, '4534', 'roo554', 3, 3.00, 0, NULL),
(51, '345', 'datos', 4, 5.00, 0, '/uploads/1731278368346-captura.jpg'),
(52, '324', '4', 8, 8.00, 0, '/uploads/1731278652983-captura.jpg'),
(53, '789', NULL, 100, 0.00, 1, NULL),
(54, '789', 'refri', 155, 350.00, 0, '/uploads/1760650477309-refrigerador-puerta-francesa-acero-inoxidable-elegante_632498-25861.jpg'),
(55, '789', NULL, 100, 0.00, 1, NULL),
(56, '789', 'refris', 155, 350.00, 0, '/uploads/1760650654341-refrigerador-puerta-francesa-acero-inoxidable-elegante_632498-25861.jpg'),
(57, '7890', NULL, 100, 0.00, 1, NULL),
(58, '7890', 'compus', 100, 800.00, 1, '/uploads/1760650864049-computadoras.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `usr_id` int(11) NOT NULL,
  `usr_usuario` varchar(50) DEFAULT NULL,
  `usr_clave` text DEFAULT NULL,
  `usr_nombre` varchar(150) DEFAULT NULL,
  `usr_telefono` varchar(50) DEFAULT NULL,
  `usr_correo` varchar(255) DEFAULT NULL,
  `usr_activo` int(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`usr_id`, `usr_usuario`, `usr_clave`, `usr_nombre`, `usr_telefono`, `usr_correo`, `usr_activo`) VALUES
(1, 'usuario1', '14e1b600b1fd579f47433b88e8d85291', 'Jimmy Castellanos', '444444', 'micorreo@dominio.com', 1),
(3, 'Jhalmar', '$2b$10$u7b1o9F4gZCaAN6hAFJxfOlnLUozJTUmQs5e7qE9XryL9K1nzVAk.', 'Jhalmar', '0990276743', 'jhalmar0990276743@gmail.com', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`cli_id`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`ped_id`),
  ADD KEY `FK_pedidos_clientes` (`cli_id`),
  ADD KEY `FK_pedidos_usuarios` (`usr_id`);

--
-- Indices de la tabla `pedidos_detalle`
--
ALTER TABLE `pedidos_detalle`
  ADD PRIMARY KEY (`det_id`),
  ADD KEY `FK_pedidos_detalle_productos` (`prod_id`),
  ADD KEY `FK_pedidos_detalle_pedidos` (`ped_id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`prod_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`usr_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `cli_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `ped_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `pedidos_detalle`
--
ALTER TABLE `pedidos_detalle`
  MODIFY `det_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `prod_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `usr_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `FK_pedidos_clientes` FOREIGN KEY (`cli_id`) REFERENCES `clientes` (`cli_id`),
  ADD CONSTRAINT `FK_pedidos_usuarios` FOREIGN KEY (`usr_id`) REFERENCES `usuarios` (`usr_id`);

--
-- Filtros para la tabla `pedidos_detalle`
--
ALTER TABLE `pedidos_detalle`
  ADD CONSTRAINT `FK_pedidos_detalle_pedidos` FOREIGN KEY (`ped_id`) REFERENCES `pedidos` (`ped_id`),
  ADD CONSTRAINT `FK_pedidos_detalle_productos` FOREIGN KEY (`prod_id`) REFERENCES `productos` (`prod_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
