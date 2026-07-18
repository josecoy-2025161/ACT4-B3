import { Estado } from "./EstadoUsuario";
import { Rol } from "./RolUsuario";

export interface Usuario {
    id: number;
    nombre: string;
    apellido: string;
    edad: number;
    correo: string;
    contrasena: string;
    rol: Rol;
    estado: Estado;
}