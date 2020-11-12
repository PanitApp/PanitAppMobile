import { gql } from '@apollo/client';

export const HI = gql`
  query hi {
    Hi
  }
`;

export const GET_USER = gql`
  query get_user($username: String!) {
    getUsuarioByUsername(username:$username){
      id
      username
      first_name
      last_name 
      email
      rol
    }
  }
`;

export const GET_ESTUDIANTE = gql`
  query get_estudiante($username: String!) {
    getUsuarioByUsername(username:$username){
      id
      username
      first_name
last_name 
      email    
      rol
    }
  }
`;

export const GET_ESTUDIANTES_BY_CURSO = gql`
  query getEstudiantesByCurso($id_curso: ID!) {
    getEstudiantesByCurso(id_curso: $id_curso){
      id
      username
      first_name
      last_name 
      email    
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
          username
          first_name
          last_name 
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
        username
        first_name
        last_name 
        email
      }
    }
  }
`;

export const GET_CURSOS_BY_PROFESOR = gql`
  query getCursosByProfesor($id_profesor: ID!) {
    getCursosByProfesor(id_profesor:$id_profesor){
      id
      nombre
      descripcion
    }
  }
`;

export const GET_CHATS = gql`
  query getChatByUser($userId: Int!) {
    getChatByUser(userId:$userId){
      _id
      nombre
      participantes{
        id
        username
        first_name
        last_name 
        rol
      }
    }
  }
`;

export const GET_MENSAJES_BY_CHAT = gql`
  query getMensajesChat($chatId: String!) {
    getMensajesChat(chatId:$chatId){
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

export const GET_ANUNCIOS_BY_CURSO_ID = gql`
  query getAnunciosByCursoId($id_curso: ID!){
    getAnunciosByCurso(id_curso:$id_curso){
      id
      descripcion
      fecha_publicacion
      archivo

    }
  }
`;

export const GET_USUARIOS = gql`
  query getUsuarios{
    getUsuarios{
      id
      username
      first_name
      last_name 
      email
      rol
    }
  }
`;

export const GET_ESTUDIANTES = gql`
  query getUsuariosByRol($rol: Rol!){
    getUsuariosByRol(rol:$rol){
      id
      username
      first_name
      last_name 
      email
      rol
    }
  }
`;