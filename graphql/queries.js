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

export const GET_PUBLICACIONES_BY_USER = gql`
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