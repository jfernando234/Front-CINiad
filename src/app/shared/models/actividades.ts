export interface IActividad{
  actividadId?: number;
  nombre: string;
  descripcion: string;
  imgen: Blob;
  media_url: string;
  contenido?:string
  media_card_url?: string;
  altText?: string;
  id:number;
}
