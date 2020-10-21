import { gql } from '@apollo/client';

export const CREAR_ANUNCIO = gql`
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
export const CREATE_CURSO = gql`
  mutation create_curso($nombre: String!, $descripcion: String!, $profesor: Int!) {
    crearCurso(curso: {
        nombre: $nombre,
        descripcion: $descripcion,
        profesor: $profesor
    }){
        id
        nombre
        descripcion
        profesor {
          id
          nombre_usuario
          nombres
          email
        }
    }
  }
`;
