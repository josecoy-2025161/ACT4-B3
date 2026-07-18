import { Estado } from "../models/EstadoUsuario";
import { Rol } from "../models/RolUsuario";
import { UsuarioService } from "../services/UsuarioService";
import { ProductoService } from "../services/ProductoService";
import { PedidoService } from "../services/PedidoService";
import { EstadoProducto } from "../models/EstadoProducto";
import { EstadoPedido } from "../models/EstadoPedido";
import { rl, leerEntero, leerTexto, leerCorreo, leerCadena, leerNumeroPositivo, leerOpciones } from "../utils/ReadLine";

const usuarioService = new UsuarioService();
const productoService = new ProductoService();
const pedidoService = new PedidoService();

// PUNTO DE ENTRADA: LOGIN Y REGISTRO
export const iniciarApp = async () => {
    let opcion = 0;
    let logueado = false;

    do {
        console.log("\n========================================");
        console.log("           SISTEMA DE GESTION           ");
        console.log("========================================\n");
        console.log("  1. INICIAR SESION");
        console.log("  2. REGISTRARSE");
        console.log("  3. SALIR\n");
        console.log("----------------------------------------");

        opcion = await leerEntero("  SELECCIONE UNA OPCION: ");

        switch (opcion) {
            case 1:
                logueado = await login();
                if (logueado) {
                    await menuEntidades();
                    logueado = false;
                }
                break;
            case 2:
                await registrar();
                break;
            case 3:
                console.log("\n========================================");
                console.log("        SALIENDO DEL SISTEMA...         ");
                console.log("========================================\n");
                break;
            default:
                console.log("\n  [!] OPCION NO VALIDA. INTENTE DE NUEVO.");
        }
    } while (opcion !== 3);

    rl.close();
};

const login = async (): Promise<boolean> => {
    console.log("\n----------------------------------------");
    console.log("            INICIO DE SESION            ");
    console.log("----------------------------------------\n");

    const correo = await leerCorreo("  CORREO: ");
    const contrasena = await leerCadena("  CONTRASENA: ");

    const usuarios = await usuarioService.listar();
    const usuarioValido = usuarios.find(u => u.correo === correo && u.contrasena === contrasena);

    console.log("\n----------------------------------------");
    if (usuarioValido) {
        console.log(`  BIENVENIDO: ${usuarioValido.nombre.toUpperCase()} ${usuarioValido.apellido.toUpperCase()}`);
        console.log("----------------------------------------");
        return true;
    } else {
        console.log("  [!] CORREO O CONTRASENA INCORRECTOS");
        console.log("----------------------------------------");
        return false;
    }
};

const registrar = async () => {
    console.log("\n========================================");
    console.log("          REGISTRO DE USUARIO           ");
    console.log("========================================\n");

    const id = await leerEntero("  ID: ");
    const nombre = await leerTexto("  NOMBRE: ");
    const apellido = await leerTexto("  APELLIDO: ");
    const edad = await leerEntero("  EDAD: ");
    const correo = await leerCorreo("  CORREO: ");
    const contrasena = await leerCadena("  CONTRASENA: ");

    console.log("\n  -- DATOS DEL SISTEMA --");
    const rolTexto = await leerOpciones("  ROL (ADMIN/USUARIO): ", ["ADMIN", "USUARIO"]);
    const estadoTexto = await leerOpciones("  ESTADO (ACTIVO/INACTIVO/SUSPENDIDO): ", ["ACTIVO", "INACTIVO", "SUSPENDIDO"]);

    await usuarioService.agregar({
        id,
        nombre,
        apellido,
        edad,
        correo,
        contrasena,
        rol: rolTexto as Rol,
        estado: estadoTexto as Estado
    });

    console.log("\n----------------------------------------");
};

const menuEntidades = async () => {
    let opcion = 0;

    do {
        console.log("\n========================================");
        console.log("           MENU DE ENTIDADES            ");
        console.log("========================================\n");
        console.log("  1. CRUD USUARIOS");
        console.log("  2. CRUD PRODUCTOS");
        console.log("  3. CRUD PEDIDOS");
        console.log("  4. CERRAR SESION\n");
        console.log("----------------------------------------");

        opcion = await leerEntero("  SELECCIONE UNA OPCION: ");

        switch (opcion) {
            case 1:
                await menuUsuarios();
                break;
            case 2:
                await menuProductos();
                break;
            case 3:
                await menuPedidos();
                break;
            case 4:
                console.log("\n========================================");
                console.log("           CERRANDO SESION...           ");
                console.log("========================================\n");
                break;
            default:
                console.log("\n  [!] OPCION NO VALIDA.");
        }
    } while (opcion !== 4);
};

// ==========================================
//              CRUD USUARIOS
// ==========================================
const menuUsuarios = async () => {
    let opcion = 0;

    do {
        console.log("\n========================================");
        console.log("             MENU USUARIOS              ");
        console.log("========================================\n");
        console.log("  1. AGREGAR");
        console.log("  2. LISTAR");
        console.log("  3. BUSCAR");
        console.log("  4. ACTUALIZAR");
        console.log("  5. ELIMINAR");
        console.log("  6. REGRESAR\n");
        console.log("----------------------------------------");

        opcion = await leerEntero("  SELECCIONE UNA OPCION: ");

        switch (opcion) {
            case 1:
                await registrar();
                break;
            case 2:
                console.log("\n--- LISTADO DE USUARIOS ---");
                console.table(await usuarioService.listar());
                console.log("---------------------------\n");
                break;
            case 3:
                console.log("\n--- BUSCAR USUARIO ---");
                const idBuscar = await leerEntero("  INGRESE ID A BUSCAR: ");
                const usuario = await usuarioService.buscar(idBuscar);
                if (usuario) {
                    console.table([usuario]);
                } else {
                    console.log("\n  [!] USUARIO NO ENCONTRADO.");
                }
                break;
            case 4:
                console.log("\n========================================");
                console.log("           ACTUALIZAR USUARIO           ");
                console.log("========================================\n");

                const idActualizar = await leerEntero("  ID DEL USUARIO A ACTUALIZAR: ");
                const existe = await usuarioService.buscar(idActualizar);

                if (!existe) {
                    console.log("\n  [!] EL USUARIO NO EXISTE.");
                    break;
                }

                console.log("\n  -- INGRESE LOS NUEVOS DATOS --\n");
                const nuevoNombre = await leerTexto("  NUEVO NOMBRE: ");
                const nuevoApellido = await leerTexto("  NUEVO APELLIDO: ");
                const nuevaEdad = await leerEntero("  NUEVA EDAD: ");
                const nuevoCorreo = await leerCorreo("  NUEVO CORREO: ");
                const nuevaContrasena = await leerCadena("  NUEVA CONTRASENA: ");

                console.log("\n  -- DATOS DEL SISTEMA --");
                const nuevoRol = await leerOpciones("  NUEVO ROL (ADMIN/USUARIO): ", ["ADMIN", "USUARIO"]);
                const nuevoEstado = await leerOpciones("  NUEVO ESTADO (ACTIVO/INACTIVO/SUSPENDIDO): ", ["ACTIVO", "INACTIVO", "SUSPENDIDO"]);

                await usuarioService.actualizar({
                    id: idActualizar,
                    nombre: nuevoNombre,
                    apellido: nuevoApellido,
                    edad: nuevaEdad,
                    correo: nuevoCorreo,
                    contrasena: nuevaContrasena,
                    rol: nuevoRol as Rol,
                    estado: nuevoEstado as Estado
                });
                break;
            case 5:
                console.log("\n--- ELIMINAR USUARIO ---");
                const idEliminar = await leerEntero("  ID A ELIMINAR: ");
                await usuarioService.eliminar(idEliminar);
                break;
            case 6:
                console.log("\n  [ REGRESANDO AL MENU PRINCIPAL... ]");
                break;
            default:
                console.log("\n  [!] OPCION NO VALIDA.");
        }

    } while (opcion !== 6);
};

// ==========================================
//              CRUD PRODUCTOS
// ==========================================
const menuProductos = async () => {
    let opcion = 0;

    do {
        console.log("\n========================================");
        console.log("             MENU PRODUCTOS             ");
        console.log("========================================\n");
        console.log("  1. AGREGAR");
        console.log("  2. LISTAR");
        console.log("  3. BUSCAR");
        console.log("  4. ACTUALIZAR");
        console.log("  5. ELIMINAR");
        console.log("  6. REGRESAR\n");
        console.log("----------------------------------------");

        opcion = await leerEntero("  SELECCIONE UNA OPCION: ");

        switch (opcion) {
            case 1:
                console.log("\n========================================");
                console.log("          REGISTRO DE PRODUCTO          ");
                console.log("========================================\n");

                const id = await leerEntero("  ID PRODUCTO: ");
                const nombre = await leerCadena("  NOMBRE DEL PRODUCTO: ");
                const precio = await leerNumeroPositivo("  PRECIO: ");
                const stock = await leerEntero("  CANTIDAD EN STOCK: ");
                // VALIDACIONES IMPLEMENTADAS AQUÍ
                const estadoTexto = await leerOpciones("  ESTADO (DISPONIBLE/AGOTADO/DESCONTINUADO): ", ["DISPONIBLE", "AGOTADO", "DESCONTINUADO"]);

                await productoService.agregar({
                    id,
                    nombre,
                    precio,
                    stock,
                    estado: estadoTexto as EstadoProducto
                });
                break;
            case 2:
                console.log("\n--- LISTADO DE PRODUCTOS ---");
                console.table(await productoService.listar());
                console.log("----------------------------\n");
                break;
            case 3:
                console.log("\n--- BUSCAR PRODUCTO ---");
                const idBuscar = await leerEntero("  INGRESE ID A BUSCAR: ");
                const producto = await productoService.buscar(idBuscar);
                if (producto) {
                    console.table([producto]);
                } else {
                    console.log("\n  [!] PRODUCTO NO ENCONTRADO.");
                }
                break;
            case 4:
                console.log("\n========================================");
                console.log("          ACTUALIZAR PRODUCTO           ");
                console.log("========================================\n");

                const idActualizar = await leerEntero("  ID DEL PRODUCTO A ACTUALIZAR: ");
                const existe = await productoService.buscar(idActualizar);

                if (!existe) {
                    console.log("\n  [!] EL PRODUCTO NO EXISTE.");
                    break;
                }

                console.log("\n  -- INGRESE LOS NUEVOS DATOS --\n");
                const nuevoNombre = await leerCadena("  NUEVO NOMBRE: ");
                const nuevoPrecio = await leerNumeroPositivo("  NUEVO PRECIO: ");
                const nuevoStock = await leerEntero("  NUEVO STOCK: ");
                // VALIDACIONES IMPLEMENTADAS AQUÍ
                const nuevoEstado = await leerOpciones("  NUEVO ESTADO (DISPONIBLE/AGOTADO/DESCONTINUADO): ", ["DISPONIBLE", "AGOTADO", "DESCONTINUADO"]);

                await productoService.actualizar({
                    id: idActualizar,
                    nombre: nuevoNombre,
                    precio: nuevoPrecio,
                    stock: nuevoStock,
                    estado: nuevoEstado as EstadoProducto
                });
                break;
            case 5:
                console.log("\n--- ELIMINAR PRODUCTO ---");
                const idEliminar = await leerEntero("  ID A ELIMINAR: ");
                await productoService.eliminar(idEliminar);
                break;
            case 6:
                console.log("\n  [ REGRESANDO AL MENU PRINCIPAL... ]");
                break;
            default:
                console.log("\n  [!] OPCION NO VALIDA.");
        }

    } while (opcion !== 6);
};

// ==========================================
//              CRUD PEDIDOS
// ==========================================
const menuPedidos = async () => {
    let opcion = 0;

    do {
        console.log("\n========================================");
        console.log("              MENU PEDIDOS              ");
        console.log("========================================\n");
        console.log("  1. AGREGAR");
        console.log("  2. LISTAR");
        console.log("  3. BUSCAR");
        console.log("  4. ACTUALIZAR");
        console.log("  5. ELIMINAR");
        console.log("  6. REGRESAR\n");
        console.log("----------------------------------------");

        opcion = await leerEntero("  SELECCIONE UNA OPCION: ");

        switch (opcion) {
            case 1:
                console.log("\n========================================");
                console.log("           REGISTRO DE PEDIDO           ");
                console.log("========================================\n");

                const id = await leerEntero("  ID PEDIDO: ");
                const idUsuario = await leerEntero("  ID DEL USUARIO: ");
                const idProducto = await leerEntero("  ID DEL PRODUCTO: ");
                const cantidad = await leerEntero("  CANTIDAD: ");
                const total = await leerNumeroPositivo("  TOTAL A PAGAR: ");
                // VALIDACIONES IMPLEMENTADAS AQUÍ
                const estadoTexto = await leerOpciones("  ESTADO (PENDIENTE/PAGADO/CANCELADO): ", ["PENDIENTE", "PAGADO", "CANCELADO"]);

                await pedidoService.agregar({
                    id,
                    idUsuario,
                    idProducto,
                    cantidad,
                    total,
                    estado: estadoTexto as EstadoPedido
                });
                break;
            case 2:
                console.log("\n--- LISTADO DE PEDIDOS ---");
                console.table(await pedidoService.listar());
                console.log("--------------------------\n");
                break;
            case 3:
                console.log("\n--- BUSCAR PEDIDO ---");
                const idBuscar = await leerEntero("  INGRESE ID A BUSCAR: ");
                const pedido = await pedidoService.buscar(idBuscar);
                if (pedido) {
                    console.table([pedido]);
                } else {
                    console.log("\n  [!] PEDIDO NO ENCONTRADO.");
                }
                break;
            case 4:
                console.log("\n========================================");
                console.log("           ACTUALIZAR PEDIDO            ");
                console.log("========================================\n");

                const idActualizar = await leerEntero("  ID DEL PEDIDO A ACTUALIZAR: ");
                const existe = await pedidoService.buscar(idActualizar);

                if (!existe) {
                    console.log("\n  [!] EL PEDIDO NO EXISTE.");
                    break;
                }

                console.log("\n  -- INGRESE LOS NUEVOS DATOS --\n");
                const nuevoIdUsuario = await leerEntero("  NUEVO ID USUARIO: ");
                const nuevoIdProducto = await leerEntero("  NUEVO ID PRODUCTO: ");
                const nuevaCantidad = await leerEntero("  NUEVA CANTIDAD: ");
                const nuevoTotal = await leerNumeroPositivo("  NUEVO TOTAL: ");
                const nuevoEstado = await leerOpciones("  NUEVO ESTADO (PENDIENTE/PAGADO/CANCELADO): ", ["PENDIENTE", "PAGADO", "CANCELADO"]);

                await pedidoService.actualizar({
                    id: idActualizar,
                    idUsuario: nuevoIdUsuario,
                    idProducto: nuevoIdProducto,
                    cantidad: nuevaCantidad,
                    total: nuevoTotal,
                    estado: nuevoEstado as EstadoPedido
                });
                break;
            case 5:
                console.log("\n--- ELIMINAR PEDIDO ---");
                const idEliminar = await leerEntero("  ID A ELIMINAR: ");
                await pedidoService.eliminar(idEliminar);
                break;
            case 6:
                console.log("\n  [ REGRESANDO AL MENU PRINCIPAL... ]");
                break;
            default:
                console.log("\n  [!] OPCION NO VALIDA.");
        }

    } while (opcion !== 6);
};