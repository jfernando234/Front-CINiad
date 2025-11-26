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
  contenido?:string
  media_card_url?: string;
  altText?: string;
  id:number;
}
export interface IDetalle {
  detalleId: number;
  nombre: string;
  descripcion: string;
  imgen: Blob;
  contenido?:string
}
