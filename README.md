# 💰 FinanceFlux 
## *Gestión Inteligente de Finanzas Personales*

<div align="center">

> ✨ **Una aplicación moderna, intuitiva y poderosa para tomar control total de tus finanzas**

### 🛠️ Tech Stack

[![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3+-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![MySQL](https://img.shields.io/badge/MySQL-8+-00758F?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com)
[![Vite](https://img.shields.io/badge/Vite-5+-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3+-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

[![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge)](https://github.com)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
[![Contributors](https://img.shields.io/badge/Contributors-5-blueviolet?style=for-the-badge)](#-equipo-desarrollador)

</div>

<img width="1920" height="1105" alt="img - 5" src="https://github.com/user-attachments/assets/64b822e2-1633-4304-9dbb-609f0a584a0c" />


---

## 🎯 Objetivo Estratégico

Empoderar a los usuarios con una herramienta inteligente que transforme sus datos financieros en **insight accionables**, permitiendo:

- 📊 Visualizar y entender su situación económica en tiempo real
- 💡 Tomar decisiones financieras informadas y estratégicas  
- 🎯 Alcanzar metas de ahorro de forma estructurada
- 📈 Identificar patrones de gasto y oportunidades de optimización

---

## ✨ Características Principales

| Funcionalidad | Descripción |
|---------------|------------|
| 📊 **Dashboard Inteligente** | Vista general de balance, ingresos y gastos en tiempo real |
| 💳 **Gestión de Transacciones** | Registro detallado de ingresos y gastos con categorización automática |
| 🎯 **Metas Financieras** | Crea y monitorea metas de ahorro con seguimiento visual del progreso |
| 📈 **Reportes Dinámicos** | Análisis visual de gastos semanales y mensuales |
| 📱 **Diseño Responsivo** | Experiencia óptima en dispositivos móviles y desktop |
| 🎨 **Interfaz Moderna** | Diseño limpio y minimalista con tema oscuro |

---

## 📁 Estructura del Proyecto

```
Gestor_finanzas/
├── 📱 frontend/
│   ├── src/
│   │   ├── app/           → Componentes principales y estado
│   │   ├── imports/       → Vistas móvil y desktop
│   │   └── styles/        → Estilos globales
│   ├── vite.config.ts     → Configuración de Vite
│   └── package.json
│
├── 🖥️  backend/
│   ├── src/main/java/     → Lógica del servidor
│   ├── src/main/resources/ → Configuración y datos iniciales
│   ├── pom.xml            → Dependencias Maven
│   └── mvnw               → Maven wrapper
│
└── 🗄️  database/
    └── Scripts SQL iniciales
```

---

## 🚀 Cómo Ejecutar el Proyecto

### 📋 Requisitos Previos

Asegúrate de tener instalado:

- **Node.js** 18+ y **npm/pnpm** → [Descargar](https://nodejs.org)
- **Java 17+** y **Maven** → [Descargar](https://www.java.com)
- **MySQL 8.0+** → [Descargar](https://www.mysql.com)

---

### 🔧 Configuración Paso a Paso

#### 1️⃣ **Configurar Base de Datos**

Abre MySQL y ejecuta:

```sql
-- Crear base de datos
CREATE DATABASE finanzas_bd;

-- Crear usuario con permisos
CREATE USER 'finanzas_user'@'localhost' IDENTIFIED BY 'proyectodaw';
GRANT ALL PRIVILEGES ON finanzas_bd.* TO 'finanzas_user'@'localhost';
FLUSH PRIVILEGES;
```

---

#### 2️⃣ **Iniciar Backend**

```bash
# Navegar al directorio backend
cd backend

# Ejecutar con Maven
./mvnw spring-boot:run

# ✅ El servidor estará disponible en http://localhost:8080
```

---

#### 3️⃣ **Iniciar Frontend**

```bash
# Navegar al directorio frontend
cd frontend

# Instalar dependencias
npm install
# o con pnpm (más rápido)
pnpm install

# Ejecutar en modo desarrollo
npm run dev
# o con pnpm
pnpm dev

# ✅ Acceder a http://localhost:5173
```

---

### ⚙️ Configuración de Conexión

El backend se conecta a MySQL usando las credenciales definidas en:

```
backend/src/main/resources/application.properties
```

Asegúrate de que coincidan con las credenciales que creaste:
- **URL**: `jdbc:mysql://localhost:3306/finanzas_bd`
- **Usuario**: `finanzas_user`
- **Contraseña**: `proyectodaw`

---

## 🛠️ Stack Tecnológico

### Frontend
- **React 18+** - Framework de interfaz de usuario
- **TypeScript** - Tipado estático para JavaScript
- **Vite** - Bundler moderno y rápido
- **Tailwind CSS** - Framework de estilos utilitarios
- **Lucide React** - Librería de iconos
- **Shadcn/ui** - Componentes reutilizables

### Backend
- **Spring Boot 3** - Framework Java
- **Spring Data JPA** - ORM para base de datos
- **Maven** - Gestión de dependencias
- **MySQL** - Base de datos relacional

---

## 📊 Operaciones CRUD

La aplicación implementa completamente todas las operaciones:

```
GET    ✅ Listar transacciones y metas
POST   ✅ Crear nuevas transacciones y metas
PUT    ✅ Editar transacciones existentes
DELETE ✅ Eliminar transacciones y metas
```

---

## 👥 Equipo Desarrollador

<table>
<tr>
<td align="center">
<strong>👨‍💼 Líder</strong><br/>
Alisson Patricia Barillas Castillo<br/>
<code>BC24013</code>
</td>
<td align="center">
<strong>👨‍💻 Desarrollador</strong><br/>
Oscar Miguel Herrera Valladares<br/>
<code>HV22011</code>
</td>
<td align="center">
<strong>👨‍💻 Desarrollador</strong><br/>
Franklin Esteban Perez Fuentes<br/>
<code>PF24001</code>
</td>
</tr>
<tr>
<td align="center">
<strong>👨‍💻 Desarrollador</strong><br/>
Héctor Danilo Benítez Ortéz<br/>
<code>BO16004</code>
</td>
<td align="center">
<strong>👨‍💻 Desarrollador</strong><br/>
Jonás Eduardo Villalobos Morán<br/>
<code>VM24042</code>
</td>
<td align="center">
</td>
</tr>
</table>

---

## 📄 Licencia

<div align="center">

Proyecto académico para la materia: **Desarrollo de Aplicaciones Web (DAW)**

Uso educativo - 2026

</div>
