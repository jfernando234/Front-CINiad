export interface ListTerapia {
  terapiaId: number;
  nombre: string;
  descripcion: string;
  imgen: Blob;
  detalle: IDetalle[];
}
export interface ITerapia {
  terapiaId?: number;
  nombre: string;
  descripcion: string;
  imagen: Blob;
  media_url?: string;
  detalle: IDetalle[];
}
export interface IDetalle {
  detalleId: number;
  nombre: string;
  descripcion: string;
  imgen: Blob;
}
