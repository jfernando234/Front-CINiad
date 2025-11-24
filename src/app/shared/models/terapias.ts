export interface ListTerapia {
  terapiaId: number;
  nombre: string;
  descripcion: string;
  imgen: Blob;
  detalle: IDetalle[];
}
export interface ITerapia {
  nombre: string;
  descripcion: string;
  imagen: Blob;
  detalle: IDetalle[];
}
export interface IDetalle {
  detalleId: number;
  nombre: string;
  descripcion: string;
  imgen: Blob;
}
