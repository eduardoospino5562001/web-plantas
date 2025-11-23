import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Configuración de la conexión
export const client = createClient({
  projectId: 'h6bevkjr', // <--- ¡PEGA TU CÓDIGO AQUÍ!
  dataset: 'production',
  useCdn: true, // true hace que cargue más rápido (caché)
  apiVersion: '2023-05-03',
});

// Herramienta para generar las URLs de las imágenes
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}