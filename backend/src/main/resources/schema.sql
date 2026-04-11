-- TABLA USUARIO
CREATE TABLE usuario (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    gmail VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

-- TABLA CATEGORIA
CREATE TABLE categoria (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255),
    tipo VARCHAR(20) NOT NULL, -- INGRESO o GASTO
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

-- TABLA TRANSACCION
CREATE TABLE transaccion (
    id BIGSERIAL PRIMARY KEY,
    descripcion VARCHAR(255),
    monto DECIMAL(10,2) NOT NULL,
    fecha DATE NOT NULL,
    tipo VARCHAR(20) NOT NULL, -- INGRESO o GASTO

    usuario_id BIGINT,
    categoria_id BIGINT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuario(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_categoria
        FOREIGN KEY (categoria_id)
        REFERENCES categoria(id)
);