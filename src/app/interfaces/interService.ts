export interface interResponse {
    mensaje: string
    empty: boolean
    error: boolean
    datos: any
}

export interface interCliente {
    id: number
    name: string
    user: string
}

export interface interCategoria {
    id: number
    nombre: string
}

export interface interPlato {
    id: number
    nombre: string
    descripcion: string
    valor: number
    idCategoria: number
    seleted?: boolean
}