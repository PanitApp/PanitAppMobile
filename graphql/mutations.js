import { gql } from '@apollo/client';

export const CREATE_USER = gql`
    mutation create_user($usuario: Usuario!){
        crearUsuario($usuario:{
            #Estos nombres los definí en registro.js
            nombre_usuario: $usuario.nombre_usuario,
            contrasena: $usuario.password,
            nombres: $usuario.nombres,
            email: $usuario.email,
            rol: $usuario.rol
        }) {
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