import { gql } from '@apollo/client';

export const HI = gql`
  query hi {
    Hi
  }
`;

export const GET_USER = gql`
  query get_user($nombre_usuario: String!) {
    getUsuarioByUsername(nombre_usuario:$nombre_usuario){
      id
      nombre_usuario
      contrasena
      nombres
      email
      rol{
          id
          nombre
      }
    }
  }
`;

export const GET_CURSOS = gql`
  query getCursos {
    getCursos{
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

export const GET_CURSOS_BY_ESTUDIANTE = gql`
  query getCursosByEstudiante($id_estudiante: ID!) {
    getCursosByEstudiante(id_estudiante:$id_estudiante){
      id
      nombre
      descripcion
      profesor{
        id
        nombre_usuario
        nombres
        email
      }
    }
  }
`;