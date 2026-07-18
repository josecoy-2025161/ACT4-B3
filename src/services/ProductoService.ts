import { ProductoRepository } from "../data/ProductoRepository";
import { Producto } from "../models/Producto";

export class ProductoService {
    repository = new ProductoRepository();

    listar = async (): Promise<Producto[]> => {
        return await this.repository.obtenerProductos();
    };

    agregar = async (producto: Producto): Promise<void> => {
        try {
            const productos = await this.repository.obtenerProductos();

            const existeId = productos.some(p => p.id === producto.id);
            if (existeId) {
                console.log("YA EXISTE UN PRODUCTO CON ESE ID");
                return;
            }

            productos.push(producto);
            await this.repository.guardarProductos(productos);

            console.log("PRODUCTO AGREGADO CORRECTAMENTE");
        } catch (error) {
            console.log("ERROR AL GUARDAR UN PRODUCTO");
            throw error;
        }
    };

    buscar = async (id: number): Promise<Producto | undefined> => {
        const productos = await this.repository.obtenerProductos();
        return productos.find(p => p.id === id);
    };

    actualizar = async (producto: Producto): Promise<void> => {
        try {
            const productos = await this.repository.obtenerProductos();
            const indice = productos.findIndex(p => p.id === producto.id);

            if (indice === -1) {
                console.log("PRODUCTO NO EXISTE");
                return;
            }

            productos[indice] = producto;
            await this.repository.guardarProductos(productos);

            console.log("PRODUCTO ACTUALIZADO CORRECTAMENTE");
        } catch (error) {
            console.log("ERROR AL ACTUALIZAR UN PRODUCTO");
            throw error;
        }
    };

    eliminar = async (id: number): Promise<void> => {
        try {
            const productos = await this.repository.obtenerProductos();
            const nuevos = productos.filter(p => p.id !== id);

            if (nuevos.length === productos.length) {
                console.log("EL PRODUCTO NO EXISTE");
                return;
            }

            await this.repository.guardarProductos(nuevos);
            console.log("PRODUCTO ELIMINADO CORRECTAMENTE");
        } catch (error) {
            console.log("ERROR AL ELIMINAR UN PRODUCTO");
        }
    };
}