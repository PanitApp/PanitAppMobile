import { gql } from '@apollo/client';

export const CREATE_USER = gql`
    mutation ($usuario: RegisterInput){
        crearUsuario(usuario: $usuario) {
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

export const EDIT_USER = gql`
  mutation ($id: Int!, $usuario: RegisterInput){
    actualizarUsuario(id: $id, usuario: $usuario){
      id
      nombre_usuario
      contrasena
      nombres
      email
      rol
    }
  }
`;

export const ADD_ESTUDIANTE = gql`
  mutation crearEstudianteCurso($id_estudiante: ID!, $id_curso: ID!) {
      crearEstudianteCurso(id_estudiante: $id_estudiante, id_curso: $id_curso)
  }
`;
