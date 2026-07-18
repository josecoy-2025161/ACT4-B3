import { EstadoProducto } from "./EstadoProducto";

export interface Producto {
    id: number;
    nombre: string;
    precio: number;
    stock: number;
    estado: EstadoProducto;
}