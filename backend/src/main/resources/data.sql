-- Usuarios del Equipo Desarrollador
INSERT INTO usuario (nombre, gmail, password, genero) VALUES
('Alisson Patricia Barillas Castillo', 'BC24013@ues.edu.sv', 'K7mN9pQr', 'female'),
('Oscar Miguel Herrera Valladares', 'HV22011@ues.edu.sv', 'w2xY5zAb', 'male'),
('Franklin Esteban Perez Fuentes', 'PF24001@ues.edu.sv', 'cD4eF6gH', 'male'),
('Héctor Danilo Benítez Ortéz', 'BO16004@ues.edu.sv', 'iJ8kL0mN', 'male'),
('Jonás Eduardo Villalobos Morán', 'VM24042@ues.edu.sv', 'oP3qR5sT', 'male')
ON CONFLICT (gmail) DO NOTHING;

-- Categorías
INSERT INTO categoria (nombre, descripcion, tipo)
SELECT 'Salario', 'Ingreso mensual del trabajo', 'INGRESO'
WHERE NOT EXISTS (SELECT 1 FROM categoria WHERE nombre = 'Salario');

INSERT INTO categoria (nombre, descripcion, tipo)
SELECT 'Freelance', 'Ingresos por trabajos independientes', 'INGRESO'
WHERE NOT EXISTS (SELECT 1 FROM categoria WHERE nombre = 'Freelance');

INSERT INTO categoria (nombre, descripcion, tipo)
SELECT 'Comida', 'Gastos de alimentación y restaurantes', 'GASTO'
WHERE NOT EXISTS (SELECT 1 FROM categoria WHERE nombre = 'Comida');

INSERT INTO categoria (nombre, descripcion, tipo)
SELECT 'Transporte', 'Gastos de movilidad y combustible', 'GASTO'
WHERE NOT EXISTS (SELECT 1 FROM categoria WHERE nombre = 'Transporte');

INSERT INTO categoria (nombre, descripcion, tipo)
SELECT 'Servicios', 'Pagos de servicios (internet, teléfono)', 'GASTO'
WHERE NOT EXISTS (SELECT 1 FROM categoria WHERE nombre = 'Servicios');

INSERT INTO categoria (nombre, descripcion, tipo)
SELECT 'Entretenimiento', 'Suscripciones, películas y ocio', 'GASTO'
WHERE NOT EXISTS (SELECT 1 FROM categoria WHERE nombre = 'Entretenimiento');

INSERT INTO categoria (nombre, descripcion, tipo)
SELECT 'Tecnología', 'Compras de dispositivos y equipos', 'GASTO'
WHERE NOT EXISTS (SELECT 1 FROM categoria WHERE nombre = 'Tecnología');

INSERT INTO categoria (nombre, descripcion, tipo)
SELECT 'Ahorro', 'Aportaciones a metas de ahorro', 'GASTO'
WHERE NOT EXISTS (SELECT 1 FROM categoria WHERE nombre = 'Ahorro');

-- Relación N:M usuario_categoria (asignar categorías a todos los usuarios)
INSERT INTO usuario_categoria (usuario_id, categoria_id)
SELECT u.id, c.id FROM usuario u, categoria c
WHERE NOT EXISTS (
    SELECT 1 FROM usuario_categoria uc WHERE uc.usuario_id = u.id AND uc.categoria_id = c.id
);

-- Metas de ahorro para Alisson
INSERT INTO meta (nombre, monto_objetivo, monto_actual, fecha_limite, usuario_id)
SELECT 'Fondo de Emergencia', 5000.00, 4200.00, '2026-12-31', u.id
FROM usuario u WHERE u.gmail = 'BC24013@ues.edu.sv'
AND NOT EXISTS (SELECT 1 FROM meta m WHERE m.nombre = 'Fondo de Emergencia' AND m.usuario_id = u.id);

INSERT INTO meta (nombre, monto_objetivo, monto_actual, fecha_limite, usuario_id)
SELECT 'Viaje a Cancún', 3000.00, 1850.00, '2026-12-15', u.id
FROM usuario u WHERE u.gmail = 'BC24013@ues.edu.sv'
AND NOT EXISTS (SELECT 1 FROM meta m WHERE m.nombre = 'Viaje a Cancún' AND m.usuario_id = u.id);

-- Metas de ahorro para Oscar
INSERT INTO meta (nombre, monto_objetivo, monto_actual, fecha_limite, usuario_id)
SELECT 'Fondo de Emergencia', 5000.00, 3500.00, '2026-12-31', u.id
FROM usuario u WHERE u.gmail = 'HV22011@ues.edu.sv'
AND NOT EXISTS (SELECT 1 FROM meta m WHERE m.nombre = 'Fondo de Emergencia' AND m.usuario_id = u.id);

INSERT INTO meta (nombre, monto_objetivo, monto_actual, fecha_limite, usuario_id)
SELECT 'Carro Usado', 8000.00, 4200.00, '2027-06-30', u.id
FROM usuario u WHERE u.gmail = 'HV22011@ues.edu.sv'
AND NOT EXISTS (SELECT 1 FROM meta m WHERE m.nombre = 'Carro Usado' AND m.usuario_id = u.id);

-- Metas de ahorro para Franklin
INSERT INTO meta (nombre, monto_objetivo, monto_actual, fecha_limite, usuario_id)
SELECT 'Fondo de Emergencia', 5000.00, 2800.00, '2026-12-31', u.id
FROM usuario u WHERE u.gmail = 'PF24001@ues.edu.sv'
AND NOT EXISTS (SELECT 1 FROM meta m WHERE m.nombre = 'Fondo de Emergencia' AND m.usuario_id = u.id);

INSERT INTO meta (nombre, monto_objetivo, monto_actual, fecha_limite, usuario_id)
SELECT 'Monitor 4K', 1500.00, 400.00, '2026-09-15', u.id
FROM usuario u WHERE u.gmail = 'PF24001@ues.edu.sv'
AND NOT EXISTS (SELECT 1 FROM meta m WHERE m.nombre = 'Monitor 4K' AND m.usuario_id = u.id);

-- Metas de ahorro para Héctor
INSERT INTO meta (nombre, monto_objetivo, monto_actual, fecha_limite, usuario_id)
SELECT 'Fondo de Emergencia', 5000.00, 1900.00, '2026-12-31', u.id
FROM usuario u WHERE u.gmail = 'BO16004@ues.edu.sv'
AND NOT EXISTS (SELECT 1 FROM meta m WHERE m.nombre = 'Fondo de Emergencia' AND m.usuario_id = u.id);

INSERT INTO meta (nombre, monto_objetivo, monto_actual, fecha_limite, usuario_id)
SELECT 'Teclado Mecánico', 800.00, 250.00, '2026-08-30', u.id
FROM usuario u WHERE u.gmail = 'BO16004@ues.edu.sv'
AND NOT EXISTS (SELECT 1 FROM meta m WHERE m.nombre = 'Teclado Mecánico' AND m.usuario_id = u.id);

-- Metas de ahorro para Jonás
INSERT INTO meta (nombre, monto_objetivo, monto_actual, fecha_limite, usuario_id)
SELECT 'Fondo de Emergencia', 5000.00, 3200.00, '2026-12-31', u.id
FROM usuario u WHERE u.gmail = 'VM24042@ues.edu.sv'
AND NOT EXISTS (SELECT 1 FROM meta m WHERE m.nombre = 'Fondo de Emergencia' AND m.usuario_id = u.id);

INSERT INTO meta (nombre, monto_objetivo, monto_actual, fecha_limite, usuario_id)
SELECT 'Headphones Inalámbricos', 600.00, 180.00, '2026-09-01', u.id
FROM usuario u WHERE u.gmail = 'VM24042@ues.edu.sv'
AND NOT EXISTS (SELECT 1 FROM meta m WHERE m.nombre = 'Headphones Inalámbricos' AND m.usuario_id = u.id);

-- Transacciones para Alisson Patricia
INSERT INTO transaccion (descripcion, monto, fecha, tipo, estado, usuario_id, categoria_id)
SELECT 'Salario Mensual', 3500.00, '2026-06-01', 'INGRESO', 'Completado', u.id, c.id
FROM usuario u, categoria c WHERE u.gmail = 'BC24013@ues.edu.sv' AND c.nombre = 'Salario'
AND NOT EXISTS (SELECT 1 FROM transaccion WHERE descripcion = 'Salario Mensual' AND usuario_id = u.id);

INSERT INTO transaccion (descripcion, monto, fecha, tipo, estado, usuario_id, categoria_id)
SELECT 'Almuerzo en Restaurante', 45.00, '2026-06-02', 'GASTO', 'Completado', u.id, c.id
FROM usuario u, categoria c WHERE u.gmail = 'BC24013@ues.edu.sv' AND c.nombre = 'Comida'
AND NOT EXISTS (SELECT 1 FROM transaccion WHERE descripcion = 'Almuerzo en Restaurante' AND usuario_id = u.id);

INSERT INTO transaccion (descripcion, monto, fecha, tipo, estado, usuario_id, categoria_id)
SELECT 'Netflix + Disney+', 22.99, '2026-06-01', 'GASTO', 'Completado', u.id, c.id
FROM usuario u, categoria c WHERE u.gmail = 'BC24013@ues.edu.sv' AND c.nombre = 'Entretenimiento'
AND NOT EXISTS (SELECT 1 FROM transaccion WHERE descripcion = 'Netflix + Disney+' AND usuario_id = u.id);

INSERT INTO transaccion (descripcion, monto, fecha, tipo, estado, usuario_id, categoria_id)
SELECT 'Abono a Fondo de Emergencia', 300.00, '2026-06-10', 'GASTO', 'Completado', u.id, c.id
FROM usuario u, categoria c WHERE u.gmail = 'BC24013@ues.edu.sv' AND c.nombre = 'Ahorro'
AND NOT EXISTS (SELECT 1 FROM transaccion WHERE descripcion = 'Abono a Fondo de Emergencia' AND usuario_id = u.id);

-- Transacciones para Oscar Miguel
INSERT INTO transaccion (descripcion, monto, fecha, tipo, estado, usuario_id, categoria_id)
SELECT 'Salario Mensual', 3800.00, '2026-06-01', 'INGRESO', 'Completado', u.id, c.id
FROM usuario u, categoria c WHERE u.gmail = 'HV22011@ues.edu.sv' AND c.nombre = 'Salario'
AND NOT EXISTS (SELECT 1 FROM transaccion WHERE descripcion = 'Salario Mensual' AND usuario_id = u.id);

INSERT INTO transaccion (descripcion, monto, fecha, tipo, estado, usuario_id, categoria_id)
SELECT 'Cena con Amigos', 60.00, '2026-06-06', 'GASTO', 'Completado', u.id, c.id
FROM usuario u, categoria c WHERE u.gmail = 'HV22011@ues.edu.sv' AND c.nombre = 'Comida'
AND NOT EXISTS (SELECT 1 FROM transaccion WHERE descripcion = 'Cena con Amigos' AND usuario_id = u.id);

INSERT INTO transaccion (descripcion, monto, fecha, tipo, estado, usuario_id, categoria_id)
SELECT 'Spotify Premium', 10.99, '2026-06-01', 'GASTO', 'Completado', u.id, c.id
FROM usuario u, categoria c WHERE u.gmail = 'HV22011@ues.edu.sv' AND c.nombre = 'Entretenimiento'
AND NOT EXISTS (SELECT 1 FROM transaccion WHERE descripcion = 'Spotify Premium' AND usuario_id = u.id);

INSERT INTO transaccion (descripcion, monto, fecha, tipo, estado, usuario_id, categoria_id)
SELECT 'Abono a Meta Carro', 400.00, '2026-06-12', 'GASTO', 'Completado', u.id, c.id
FROM usuario u, categoria c WHERE u.gmail = 'HV22011@ues.edu.sv' AND c.nombre = 'Ahorro'
AND NOT EXISTS (SELECT 1 FROM transaccion WHERE descripcion = 'Abono a Meta Carro' AND usuario_id = u.id);

-- Transacciones para Franklin Esteban
INSERT INTO transaccion (descripcion, monto, fecha, tipo, estado, usuario_id, categoria_id)
SELECT 'Salario Mensual', 3200.00, '2026-06-01', 'INGRESO', 'Completado', u.id, c.id
FROM usuario u, categoria c WHERE u.gmail = 'PF24001@ues.edu.sv' AND c.nombre = 'Salario'
AND NOT EXISTS (SELECT 1 FROM transaccion WHERE descripcion = 'Salario Mensual' AND usuario_id = u.id);

INSERT INTO transaccion (descripcion, monto, fecha, tipo, estado, usuario_id, categoria_id)
SELECT 'Desayuno Cafetería', 15.00, '2026-06-02', 'GASTO', 'Completado', u.id, c.id
FROM usuario u, categoria c WHERE u.gmail = 'PF24001@ues.edu.sv' AND c.nombre = 'Comida'
AND NOT EXISTS (SELECT 1 FROM transaccion WHERE descripcion = 'Desayuno Cafetería' AND usuario_id = u.id);

INSERT INTO transaccion (descripcion, monto, fecha, tipo, estado, usuario_id, categoria_id)
SELECT 'Xbox Game Pass', 16.99, '2026-06-01', 'GASTO', 'Completado', u.id, c.id
FROM usuario u, categoria c WHERE u.gmail = 'PF24001@ues.edu.sv' AND c.nombre = 'Entretenimiento'
AND NOT EXISTS (SELECT 1 FROM transaccion WHERE descripcion = 'Xbox Game Pass' AND usuario_id = u.id);

INSERT INTO transaccion (descripcion, monto, fecha, tipo, estado, usuario_id, categoria_id)
SELECT 'Ahorro Monitor 4K', 150.00, '2026-06-11', 'GASTO', 'Completado', u.id, c.id
FROM usuario u, categoria c WHERE u.gmail = 'PF24001@ues.edu.sv' AND c.nombre = 'Ahorro'
AND NOT EXISTS (SELECT 1 FROM transaccion WHERE descripcion = 'Ahorro Monitor 4K' AND usuario_id = u.id);

-- Transacciones para Héctor Danilo
INSERT INTO transaccion (descripcion, monto, fecha, tipo, estado, usuario_id, categoria_id)
SELECT 'Salario Mensual', 3100.00, '2026-06-01', 'INGRESO', 'Completado', u.id, c.id
FROM usuario u, categoria c WHERE u.gmail = 'BO16004@ues.edu.sv' AND c.nombre = 'Salario'
AND NOT EXISTS (SELECT 1 FROM transaccion WHERE descripcion = 'Salario Mensual' AND usuario_id = u.id);

INSERT INTO transaccion (descripcion, monto, fecha, tipo, estado, usuario_id, categoria_id)
SELECT 'Almuerzo', 30.00, '2026-06-02', 'GASTO', 'Completado', u.id, c.id
FROM usuario u, categoria c WHERE u.gmail = 'BO16004@ues.edu.sv' AND c.nombre = 'Comida'
AND NOT EXISTS (SELECT 1 FROM transaccion WHERE descripcion = 'Almuerzo' AND usuario_id = u.id);

INSERT INTO transaccion (descripcion, monto, fecha, tipo, estado, usuario_id, categoria_id)
SELECT 'Amazon Prime', 14.99, '2026-06-01', 'GASTO', 'Completado', u.id, c.id
FROM usuario u, categoria c WHERE u.gmail = 'BO16004@ues.edu.sv' AND c.nombre = 'Entretenimiento'
AND NOT EXISTS (SELECT 1 FROM transaccion WHERE descripcion = 'Amazon Prime' AND usuario_id = u.id);

INSERT INTO transaccion (descripcion, monto, fecha, tipo, estado, usuario_id, categoria_id)
SELECT 'Abono Teclado Mecánico', 120.00, '2026-06-13', 'GASTO', 'Completado', u.id, c.id
FROM usuario u, categoria c WHERE u.gmail = 'BO16004@ues.edu.sv' AND c.nombre = 'Ahorro'
AND NOT EXISTS (SELECT 1 FROM transaccion WHERE descripcion = 'Abono Teclado Mecánico' AND usuario_id = u.id);

-- Transacciones para Jonás Eduardo
INSERT INTO transaccion (descripcion, monto, fecha, tipo, estado, usuario_id, categoria_id)
SELECT 'Salario Mensual', 3400.00, '2026-06-01', 'INGRESO', 'Completado', u.id, c.id
FROM usuario u, categoria c WHERE u.gmail = 'VM24042@ues.edu.sv' AND c.nombre = 'Salario'
AND NOT EXISTS (SELECT 1 FROM transaccion WHERE descripcion = 'Salario Mensual' AND usuario_id = u.id);

INSERT INTO transaccion (descripcion, monto, fecha, tipo, estado, usuario_id, categoria_id)
SELECT 'Desayuno', 12.00, '2026-06-03', 'GASTO', 'Completado', u.id, c.id
FROM usuario u, categoria c WHERE u.gmail = 'VM24042@ues.edu.sv' AND c.nombre = 'Comida'
AND NOT EXISTS (SELECT 1 FROM transaccion WHERE descripcion = 'Desayuno' AND usuario_id = u.id);

INSERT INTO transaccion (descripcion, monto, fecha, tipo, estado, usuario_id, categoria_id)
SELECT 'YouTube Premium', 13.99, '2026-06-01', 'GASTO', 'Completado', u.id, c.id
FROM usuario u, categoria c WHERE u.gmail = 'VM24042@ues.edu.sv' AND c.nombre = 'Entretenimiento'
AND NOT EXISTS (SELECT 1 FROM transaccion WHERE descripcion = 'YouTube Premium' AND usuario_id = u.id);

INSERT INTO transaccion (descripcion, monto, fecha, tipo, estado, usuario_id, categoria_id)
SELECT 'Ahorro Headphones', 100.00, '2026-06-14', 'GASTO', 'Completado', u.id, c.id
FROM usuario u, categoria c WHERE u.gmail = 'VM24042@ues.edu.sv' AND c.nombre = 'Ahorro'
AND NOT EXISTS (SELECT 1 FROM transaccion WHERE descripcion = 'Ahorro Headphones' AND usuario_id = u.id);