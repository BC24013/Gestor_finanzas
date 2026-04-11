-- TABLA USUARIO
CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    gmail VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- TABLA CATEGORIA
CREATE TABLE categoria (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255),
    tipo VARCHAR(20) NOT NULL -- INGRESO o GASTO
);

-- TABLA TRANSACCION
CREATE TABLE transaccion (
    id SERIAL PRIMARY KEY,
    descripcion VARCHAR(255),
    monto DECIMAL(10,2) NOT NULL,
    fecha DATE NOT NULL,
    tipo VARCHAR(20) NOT NULL, -- INGRESO o GASTO

    usuario_id INT,
    categoria_id INT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuario(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_categoria
        FOREIGN KEY (categoria_id)
        REFERENCES categoria(id)
);