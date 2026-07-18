import readline from "readline/promises";
import { stdin as input, stdout as output } from "node:process";

export const rl = readline.createInterface({ input, output });

// Validar que el campo no esté vacío 
export const leerCadena = async (mensaje: string): Promise<string> => {
    while (true) {
        const respuesta = (await rl.question(mensaje)).trim();
        if (respuesta === "") {
            console.log("Error: El campo no puede estar vacío.");
        } else {
            return respuesta;
        }
    }
};

// Validar que solo contenga texto 
export const leerTexto = async (mensaje: string): Promise<string> => {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    while (true) {
        const respuesta = (await rl.question(mensaje)).trim();
        if (respuesta === "") {
            console.log("Error: El campo no puede estar vacío.");
        } else if (!regex.test(respuesta)) {
            console.log("Error: Solo se aceptan letras y espacios.");
        } else {
            return respuesta;
        }
    }
};

// Validar correos específicos (GMAIL, OUTLOOK, HOTMAIL)
export const leerCorreo = async (mensaje: string): Promise<string> => {
    const dominiosValidos = ["@gmail.com", "@outlook.com", "@hotmail.com"];
    while (true) {
        const respuesta = (await rl.question(mensaje)).trim().toLowerCase();
        if (respuesta === "") {
            console.log("Error: El correo no puede estar vacío.");
            continue;
        }
        
        const esValido = dominiosValidos.some(dominio => respuesta.endsWith(dominio));
        if (!esValido) {
            console.log(`Error: Solo se aceptan correos que terminen en: ${dominiosValidos.join(", ")}`);
        } else {
            return respuesta;
        }
    }
};

// Validar números enteros y no negativos 
export const leerEntero = async (mensaje: string): Promise<number> => {
    while (true) {
        const respuesta = (await rl.question(mensaje)).trim();
        if (respuesta === "") {
            console.log("Error: El campo no puede estar vacío.");
            continue;
        }
        
        const numero = Number(respuesta);
        if (isNaN(numero) || !Number.isInteger(numero) || numero < 0) {
            console.log("Error: Debes ingresar un número entero válido y que no sea negativo.");
        } else {
            return numero;
        }
    }
};

// Validar números decimales o enteros no negativos 
export const leerNumeroPositivo = async (mensaje: string): Promise<number> => {
    while (true) {
        const respuesta = (await rl.question(mensaje)).trim();
        if (respuesta === "") {
            console.log("Error: El campo no puede estar vacío.");
            continue;
        }
        
        const numero = Number(respuesta);
        if (isNaN(numero) || numero < 0) {
            console.log("Error: Debes ingresar un número válido (puede llevar decimales) y no negativo.");
        } else {
            return numero;
        }
    }
};

// Validar ENUMS y Types correctos
export const leerOpciones = async (mensaje: string, opcionesValidas: string[]): Promise<string> => {
    let entrada = "";
    // Convertimos las opciones válidas a mayúsculas para comparar fácilmente
    const opcionesMayusculas = opcionesValidas.map(op => op.toUpperCase());
    
    while (true) {
        entrada = await leerCadena(mensaje);
        entrada = entrada.toUpperCase();
        
        if (opcionesMayusculas.includes(entrada)) {
            return entrada;
        }
        
        console.log(`  [!] VALOR INVALIDO. DEBE SER UNA DE LAS SIGUIENTES OPCIONES: ${opcionesValidas.join(", ")}`);
    }
};