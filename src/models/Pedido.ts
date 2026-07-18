import { EstadoPedido } from "./EstadoPedido";

export interface Pedido {
    id: number;
    idUsuario: number;
    idProducto: number;
    cantidad: number;
    total: number;
    estado: EstadoPedido;
}