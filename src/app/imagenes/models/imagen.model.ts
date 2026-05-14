export interface Imagen {
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface Favorito {
  id: number;
  image_id: string;
  image: Imagen;
}
