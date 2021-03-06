import { gql } from '@apollo/client';

export const LOGIN = gql`
    mutation ($username: String!, $password: String!){
      login(input: {
        username: $username 
        password: $password
      }){
        access
      }
    }
`;

export const CREATE_USER = gql`
    mutation ($usuario: RegisterInput){
        crearUsuario(usuario: $usuario) {
            id
            username
            password
            first_name
last_name 
            email
            rol
        }
    }
`;

export const CREAR_ANUNCIO = gql`
    mutation crearAnuncio($descripcion: String!,$fecha_publicacion: DateTime!, $archivo: String, $id_curso: Int!){
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
          username
          first_name
last_name 
          email
        }
    }
  }
`;

export const EDIT_USER = gql`
  mutation ($id: Int!, $usuario: RegisterInput){
    actualizarUsuario(id: $id, usuario: $usuario){
      id
      username
      password
      first_name
last_name 
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

export const ADD_MENSAJE = gql`
  mutation crearMensaje($chat: String!, $contenido: String!,  $destacado: Boolean!, $fijado:Boolean!, $userId: Int! ) {
    crearMensaje(mensaje:{
      chat: $chat
      contenido: $contenido
      destacado: $destacado
      fijado:$fijado
      userId: $userId
    }){
      _id
      fecha
      contenido
      destacado
      fijado
      usuario{
        id
        username
        first_name
last_name 
      }
    }
  }
`;

export const CREAR_CHAT = gql`
  mutation crearChat($nombre: String!, $participantes: [Int]!) {
    crearChat(chat: {
      nombre: $nombre, 
      participantes: $participantes
    }){
      _id
      nombre
      participantes{
      id
      username
      }
    }
  }
`;