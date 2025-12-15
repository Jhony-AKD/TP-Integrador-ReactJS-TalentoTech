# TP Integrador React JS – Talento Tech

Aplicación web desarrollada en **React JS** como Trabajo Práctico Integrador para el programa **Talento Tech**.

El proyecto consiste en un **e-commerce** con autenticación de usuarios, carrito de compras, panel de administración y consumo de una API simulada mediante **MockAPI**, cumpliendo con todos los requerimientos solicitados.

---

## 🚀 Tecnologías Utilizadas

* **React JS**
* **React Router DOM**
* **Context API** (Auth y Cart)
* **MockAPI** (CRUD de productos)
* **Bootstrap** (diseño responsivo)
* **CSS personalizado**
* **React Icons**
* **React Toastify**
* **React Helmet Async** (SEO)
* **LocalStorage**
* **Vite**

---

## 🎯 Funcionalidades Principales

### 🔐 Autenticación de Usuarios

* Login simulado con persistencia en **localStorage**
* Manejo de estado global mediante **AuthContext**
* Rutas protegidas para usuarios autenticados
* Rutas exclusivas para usuarios administradores

### 🛒 Carrito de Compras

* Gestión global con **CartContext**
* Agregar productos al carrito
* Modificar cantidades
* Eliminar productos individuales
* Vaciar carrito completo
* Persistencia en **localStorage**
* Contador dinámico en el Navbar
* Notificaciones visuales con **Toast**

### 📦 Catálogo de Productos

* Consumo de productos desde **MockAPI**
* Listado dinámico de productos
* Detalle individual de producto
* Búsqueda por nombre en tiempo real
* Paginación del listado

### 🛠️ Panel de Administración

* Acceso restringido solo a administradores
* CRUD completo de productos:

  * Crear productos
  * Editar productos
  * Eliminar productos
* Formulario controlado con validaciones:

  * Nombre obligatorio
  * Precio mayor a 0
  * Descripción mínima de 10 caracteres

---

## 📱 Diseño Responsivo

* Enfoque **Mobile First**
* Adaptación a celulares, tablets y escritorio
* Sistema de grillas con **Bootstrap**
* Estilos modulares y personalizados

---

## ♿ Accesibilidad y SEO

* Uso de **React Helmet** para:

  * Modificar dinámicamente el `<title>`
  * Definir meta etiquetas
* Elementos interactivos accesibles
* Navegación clara y estructurada

---

## 🌐 Deploy

Proyecto desplegado en **Vercel**:

👉 [https://tp-integrador-react-js-talento-tech.vercel.app/](https://tp-integrador-react-js-talento-tech.vercel.app/)

---

## 👤 Usuarios de Prueba

### Administrador

* Usuario: `admin`
* Contraseña: `admin`
* Rol: `admin`

### Usuario estándar

* Usuario: `user`
* Contraseña: `123456`
* Rol: `user`

---

## 📌 Observaciones Finales

Este proyecto fue desarrollado aplicando buenas prácticas de React, separación de responsabilidades, manejo de estado global y diseño responsivo, cumpliendo con todos los requerimientos solicitados en el Trabajo Práctico Integrador.

---

## ✍️ Autor

**Jonatan Esquivel**

Trabajo Práctico – Talento Tech
