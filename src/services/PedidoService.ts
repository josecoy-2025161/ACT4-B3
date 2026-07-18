import { PedidoRepository } from "../data/PedidoRepository";
import { Pedido } from "../models/Pedido";

export class PedidoService {
    repository = new PedidoRepository();

    listar = async (): Promise<Pedido[]> => {
        return await this.repository.obtenerPedidos();
    };

    agregar = async (pedido: Pedido): Promise<void> => {
        try {
            const pedidos = await this.repository.obtenerPedidos();

            const existeId = pedidos.some(p => p.id === pedido.id);
            if (existeId) {
                console.log("YA EXISTE UN PEDIDO CON ESE ID");
                return;
            }

            pedidos.push(pedido);
            await this.repository.guardarPedidos(pedidos);

            console.log("PEDIDO AGREGADO CORRECTAMENTE");
        } catch (error) {
            console.log("ERROR AL GUARDAR UN PEDIDO");
            throw error;
        }
    };

    buscar = async (id: number): Promise<Pedido | undefined> => {
        const pedidos = await this.repository.obtenerPedidos();
        return pedidos.find(p => p.id === id);
    };

    actualizar = async (pedido: Pedido): Promise<void> => {
        try {
            const pedidos = await this.repository.obtenerPedidos();
            const indice = pedidos.findIndex(p => p.id === pedido.id);

            if (indice === -1) {
                console.log("PEDIDO NO EXISTE");
                return;
            }

            pedidos[indice] = pedido;
            await this.repository.guardarPedidos(pedidos);

            console.log("PEDIDO ACTUALIZADO CORRECTAMENTE");
        } catch (error) {
            console.log("ERROR AL ACTUALIZAR UN PEDIDO");
            throw error;
        }
    };

    eliminar = async (id: number): Promise<void> => {
        try {
            const pedidos = await this.repository.obtenerPedidos();
            const nuevos = pedidos.filter(p => p.id !== id);

            if (nuevos.length === pedidos.length) {
                console.log("EL PEDIDO NO EXISTE");
                return;
            }

            await this.repository.guardarPedidos(nuevos);
            console.log("PEDIDO ELIMINADO CORRECTAMENTE");
        } catch (error) {
            console.log("ERROR AL ELIMINAR UN PEDIDO");
        }
    };
}