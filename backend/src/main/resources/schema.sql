-- TABLA USUARIO
CREATE TABLE IF NOT EXISTS usuario (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    gmail VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    genero VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TABLA CATEGORIA
CREATE TABLE IF NOT EXISTS categoria (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255),
    tipo VARCHAR(20) NOT NULL, -- INGRESO o GASTO
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TABLA TRANSACCION (relación 1:N con Usuario y Categoria)
CREATE TABLE IF NOT EXISTS transaccion (
    id BIGSERIAL PRIMARY KEY,
    descripcion VARCHAR(255),
    monto DECIMAL(10,2) NOT NULL,
    fecha DATE NOT NULL,
    tipo VARCHAR(20) NOT NULL, -- INGRESO o GASTO
    estado VARCHAR(20) DEFAULT 'Completado',

    usuario_id BIGINT,
    categoria_id BIGINT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_transaccion_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuario(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_transaccion_categoria
        FOREIGN KEY (categoria_id)
        REFERENCES categoria(id)
);

-- TABLA META (relación 1:N con Usuario)
CREATE TABLE IF NOT EXISTS meta (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    monto_objetivo DECIMAL(10,2) NOT NULL,
    monto_actual DECIMAL(10,2) NOT NULL DEFAULT 0,
    fecha_limite DATE,

    usuario_id BIGINT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_meta_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuario(id)
        ON DELETE CASCADE
);

-- TABLA PIVOTE USUARIO_CATEGORIA (relación N:M)
CREATE TABLE IF NOT EXISTS usuario_categoria (
    usuario_id BIGINT NOT NULL,
    categoria_id BIGINT NOT NULL,

    PRIMARY KEY (usuario_id, categoria_id),

    CONSTRAINT fk_uc_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuario(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_uc_categoria
        FOREIGN KEY (categoria_id)
        REFERENCES categoria(id)
        ON DELETE CASCADE
);