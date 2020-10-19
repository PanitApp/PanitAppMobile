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