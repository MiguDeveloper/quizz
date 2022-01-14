import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor() {}

  error(code: string) {
    let mensaje = '';
    switch (code) {
      case 'auth/email-already-in-use':
        mensaje = 'El correo ya esta registrado';
        break;
      case 'auth/invalid-email':
        mensaje = 'El correo es invalido';
        break;
      case 'auth/weak-password':
        mensaje = 'el correo debe tener al menos 6 digitos';
        break;
      case 'auth/user-not-fount':
        mensaje = 'Usuario invalido';
        break;
      case 'auth/wrong-password':
        mensaje = 'La contraseñe es invalida';
        break;
      default:
        break;
    }
    return mensaje;
  }
}
