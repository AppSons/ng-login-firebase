import { Injectable } from '@angular/core';
import { FirebaseCodeerrorEnum } from '../utils/firebase-code-error';

@Injectable({
  providedIn: 'root'
})
export class FirebaseCodeErrorService {

  constructor() { }

  codeError(code: string) {

    switch (code) {
      // Correo existente
      case FirebaseCodeerrorEnum.EmailAlreadyInUse:
        return 'El usuario ya existe'
      // Correo inválido
      case FirebaseCodeerrorEnum.InvalidEmail:
        return 'El email no es válido'
      // Contraseña débil
      case FirebaseCodeerrorEnum.WeakPassword:
        return 'La contraseña debe contener al menos 6 caracteres'
      // Contraseña incorrecta
      case FirebaseCodeerrorEnum.WrongPassword:
        return 'La contraseña es incorrecta'
      // Usuario no encontrado
      case FirebaseCodeerrorEnum.UserNotFound:
        return 'El usuario no existe'
      default:
        return 'Error desconocido'
      }
  }
}


