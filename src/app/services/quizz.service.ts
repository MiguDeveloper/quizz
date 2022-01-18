import { Cuestionario } from './../models/cuestionario';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Pregunta } from '../models/pregunta';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class QuizzService {
  private tituloCuestionario = '';
  private descripcionCuestionario = '';
  private pregunta$ = new Subject<Pregunta>();

  constructor(private firestore: AngularFirestore) {}

  setCuestionario({ titulo, descripcion }: any) {
    this.tituloCuestionario = titulo;
    this.descripcionCuestionario = descripcion;
  }

  getCuestionario() {
    return {
      titulo: this.tituloCuestionario,
      descripcion: this.descripcionCuestionario,
    };
  }

  agregarPregunta(pregunta: Pregunta) {
    this.pregunta$.next(pregunta);
  }

  getPreguntas(): Observable<Pregunta> {
    return this.pregunta$.asObservable();
  }

  crearCuestionario(cuestionario: Cuestionario): Promise<any> {
    return this.firestore.collection(`cuestionarios`).add(cuestionario);
  }

  getCuestionarioByIdUser(uid: string): Observable<any> {
    return this.firestore
      .collection('cuestionarios', (ref) => ref.where('uid', '==', uid))
      .snapshotChanges();
  }

  eliminarCuestionario(idCuestionario: string): Promise<any> {
    return this.firestore
      .collection('cuestionarios')
      .doc(idCuestionario)
      .delete();
  }

  getCuestinarioById(id: string): Observable<any> {
    return this.firestore.collection('cuestionarios').doc(id).get();
  }
}
