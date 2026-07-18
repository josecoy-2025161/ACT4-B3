import { UsuarioRepository } from "../data/UsuarioRepository";
import { Usuario } from "../models/Usuario";

export class UsuarioService {
    repository = new UsuarioRepository();

    // Metodo para obtener usuarios
    listar = async (): Promise<Usuario[]> => {
        return await this.repository.obtenerUsuarios();
    };

    // Metodo para agregarUsuarios | actualizar | eliminar
    agregar = async (usuario: Usuario): Promise<void> => {
        try {
            const usuarios = await this.repository.obtenerUsuarios();

            const existeId = usuarios.some(u => u.id === usuario.id);
            if (existeId) {
                console.log("YA EXISTE UN USUARIO CON ESE ID");
                return;
            }

            // Validacion de negocio: Correo unico
            const existeCorreo = usuarios.some(u => u.correo === usuario.correo);
            if (existeCorreo) {
                console.log("YA EXISTE UN USUARIO REGISTRADO CON ESE CORREO");
                return;
            }

            usuarios.push(usuario);
            await this.repository.guardarUsuarios(usuarios);

            console.log("USUARIO AGREGADO CORRECTAMENTE");
        } catch (error) {
            console.log("ERROR AL GUARDAR UN USUARIO");
            throw error;
        }
    };

    // Metodo para buscar por ID
    buscar = async (id: number): Promise<Usuario | undefined> => {
        const usuarios = await this.repository.obtenerUsuarios();
        return usuarios.find(u => u.id === id);
    };

    // Metodo para buscar por correo
    buscarPorCorreo = async (correo: string): Promise<Usuario | undefined> => {
        const usuarios = await this.repository.obtenerUsuarios();
        return usuarios.find(u => u.correo === correo);
    };
    
    // Metodo para actualizar
    actualizar = async (usuario: Usuario): Promise<void> => {
        try {
            const usuarios = await this.repository.obtenerUsuarios();
            const indice = usuarios.findIndex(u => u.id === usuario.id);

            if (indice === -1) {
                console.log("USUARIO NO EXISTE");
                return;
            }

            // Validar que el nuevo correo no le pertenezca a otro usuario diferente
            const existeCorreo = usuarios.some(u => u.correo === usuario.correo && u.id !== usuario.id);
            if (existeCorreo) {
                console.log("EL NUEVO CORREO YA ESTA EN USO POR OTRO USUARIO");
                return;
            }

            usuarios[indice] = usuario;
            await this.repository.guardarUsuarios(usuarios);

            console.log("USUARIO ACTUALIZADO CORRECTAMENTE");
        } catch (error) {
            console.log("ERROR AL ACTUALIZAR UN USUARIO");
            throw error;
        }
    };

    // Metodo para eliminar
    eliminar = async (id: number): Promise<void> => {
        try {
            const usuarios = await this.repository.obtenerUsuarios();
            const nuevos = usuarios.filter(u => u.id !== id);

            if (nuevos.length === usuarios.length) {
                console.log("EL USUARIO NO EXISTE");
                return;
            }

            await this.repository.guardarUsuarios(nuevos);
            console.log("USUARIO ELIMINADO CORRECTAMENTE");
        } catch (error) {
            console.log("ERROR AL ELIMINAR UN USUARIO");
        }
    };
}