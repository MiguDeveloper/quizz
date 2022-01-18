import { Cuestionario } from './../models/cuestionario';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Resumen } from '../components/interfaces/resumen-cuestionario';

@Injectable({
  providedIn: 'root',
})
export class RespuestaQuizzService {
  cuestionario!: Cuestionario;
  nombreParticipante = '';

  constructor(private _firestore: AngularFirestore) {}

  searchByCode(code: string): Observable<any> {
    return this._firestore
      .collection('cuestionarios', (ref) => ref.where('codigo', '==', code))
      .get();
  }

  setRespuestaUsuario(respuestaUsuario: any): Promise<any> {
    return this._firestore.collection('respuestas').add(respuestaUsuario);
  }

  getRespuestaUsuario(id: string): Observable<any> {
    return this._firestore.collection<Resumen>('respuestas').doc(id).get();
  }

  getRespuestasByIdCuestionario(id: string): Observable<any> {
    return this._firestore
      .collection('respuestas', (ref) => ref.where('idCuestionario', '==', id))
      .snapshotChanges();
  }

  deleteRespuestaUsuario(id: string): Promise<any> {
    return this._firestore.collection('respuestas').doc(id).delete();
  }
}
