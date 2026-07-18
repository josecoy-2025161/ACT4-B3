# Sistema de Gestión CRUD (Consola)

Un sistema de gestión interactivo por línea de comandos (CLI) construido con Node.js y TypeScript. Permite administrar Usuarios, Productos y Pedidos con persistencia de datos local en archivos JSON y validaciones estrictas de entrada.

## Características Principales

*   **Autenticación Básica:** Sistema de Login y Registro de usuarios.
*   **Gestión de Entidades (CRUD):** 
    *   👤 **Usuarios:** Administra cuentas con roles y estados.
    *   🛍️ **Productos:** Controla el inventario, precios y estados del producto.
    *   📦 **Pedidos:** Gestiona órdenes de compra relacionando usuarios y productos.
*   **Validaciones Estrictas:** Previene errores de ejecución asegurando que los datos ingresados correspondan a valores permitidos (Enums, formatos de correo específicos y números válidos).
*   **Persistencia de Datos:** Toda la información se guarda automáticamente en archivos `.json`, manteniendo el estado de la aplicación entre cada ejecución.

## Tecnologías y Herramientas

*   **Entorno:** Node.js
*   **Lenguaje:** TypeScript
*   **Gestor de Paquetes:** pnpm
*   **Módulos Clave:** `fs/promises` (lectura/escritura de archivos) y `readline/promises` (interfaz interactiva).

## Estructura del Proyecto

El código fuente sigue un patrón de separación de responsabilidades:

```text
📁 src/
 ├── 📁 data/       # Archivos JSON para persistencia de datos
 ├── 📁 menu/       # Lógica de interfaz y menús interactivos (Login, CRUDs)
 ├── 📁 models/     # Tipos, Enums e Interfaces (sin constructores)
 ├── 📁 services/   # Lógica de negocio y repositorios de acceso a datos
 ├── 📁 utils/      # Funciones auxiliares para la validación estricta de entradas
 └── 📄 index.ts    # Punto de entrada de la aplicación