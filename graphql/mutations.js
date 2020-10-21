import { gql } from '@apollo/client';

const CREAR_ANUNCIO = gql`
    mutation crearAnuncio($descripcion: String!,$fecha_publicacion: String!, $archivo: String, $id_curso: Int!){
        crearAnuncio(anuncio:{
          descripcion: $descripcion,
          fecha_publicacion: $fecha_publicacion,
          archivo: $archivo,
          id_curso: $id_curso
        }){
          id
          descripcion
          fecha_publicacion
          archivo
          curso{
            id
            nombre
            descripcion
          }
        }
    }
`;