import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  isAuth() {
    return this.afAuth.authState.pipe(map((fuser) => fuser != null));
  }
}
