-- Usuario
INSERT INTO usuario (nombre, gmail, password) VALUES
('Alisson', 'alix@gmail.com', 'abcaass'),
('Hector', 'hecben@gmail.com', 'benihect24')

-- Categorías
INSERT INTO categoria (nombre, descripcion, tipo) VALUES
('Comida', 'Gastos de alimentación', 'GASTO'),
('Transporte', 'Movilidad diaria', 'GASTO'),
('Salario', 'Ingreso mensual', 'INGRESO');

-- Transacciones
INSERT INTO transaccion (descripcion, monto, fecha, tipo, usuario_id, categoria_id) VALUES
('Almuerzo', 5.50, '2026-04-09', 'GASTO', 1, 1),
('Bus', 0.35, '2026-04-09', 'GASTO', 1, 2),
('Pago mensual', 500.00, '2026-04-01', 'INGRESO', 1, 3);