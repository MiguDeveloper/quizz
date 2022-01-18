import { Router } from '@angular/router';
import { Respuesta } from './../../../models/respuesta';
import { Cuestionario } from './../../../models/cuestionario';
import { RespuestaQuizzService } from './../../../services/respuesta-quizz.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-realizar-quizz',
  templateUrl: './realizar-quizz.component.html',
  styleUrls: ['./realizar-quizz.component.css'],
})
export class RealizarQuizzComponent implements OnInit, OnDestroy {
  cuestionario!: Cuestionario;
  nombreParticipante = '';
  respuestas: Respuesta[] = [];
  indexPregunta = 0;
  segundos = 0;
  setInter: any = null;
  opcionSeleccionada: any = null;
  indexSeleccionado: any;
  cantidadCorrectas = 0;
  cantidadIncorrectas = 0;
  puntosTotales = 0;
  listRespuestasUsuario: any[] = [];
  loading = false;

  constructor(
    private _respuestaQuizz: RespuestaQuizzService,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    if (this.setInter) {
      clearInterval(this.setInter);
    }
  }

  ngOnInit(): void {
    this.cuestionario = this._respuestaQuizz.cuestionario;
    this.nombreParticipante = this._respuestaQuizz.nombreParticipante;
    this.respuestas = this.getRespuetas;
    this.iniciarContador();
  }

  get getsegundos(): number {
    return this.cuestionario.listPreguntas[this.indexPregunta].segundos;
  }

  get titulo(): string {
    return this.cuestionario.listPreguntas[this.indexPregunta].titulo;
  }

  get getRespuetas(): Respuesta[] {
    return this.cuestionario.listPreguntas[this.indexPregunta].listRespuestas;
  }

  get sizePreguntas() {
    return this.cuestionario.listPreguntas.length;
  }

  iniciarContador() {
    this.segundos = this.getsegundos;
    this.respuestas = this.getRespuetas;
    this.setInter = setInterval(() => {
      this.segundos -= 1;
      if (this.segundos === 0) {
        this.agregarRespuesta();
      }
    }, 1000);
  }

  respuestaSeleccionada(rpta: Respuesta, idx: number) {
    this.opcionSeleccionada = rpta;
    this.indexSeleccionado = idx;
    console.log({
      opcion: this.opcionSeleccionada,
      index: this.indexSeleccionado,
    });
  }

  addClassOption(rpta: Respuesta): boolean {
    return rpta === this.opcionSeleccionada ? true : false;
  }

  siguiente() {
    this.agregarRespuesta();
  }

  agregarRespuesta() {
    this.contadorCorrectaIncorrecta();

    const respuestaUsuario = {
      titulo: this.cuestionario.listPreguntas[this.indexPregunta].titulo,
      puntosObtenidos: this.obtenerPuntosPregunta(),
      segundos: this.obtenerSegundos(),
      indexRespuestaSeleccionada: this.obtenerIdxSeleccionado(),
      listRespuestas: this.getRespuetas,
    };

    this.opcionSeleccionada = undefined;
    this.indexSeleccionado = undefined;

    this.listRespuestasUsuario.push(respuestaUsuario);

    const idxTemp = this.indexPregunta + 1;
    if (idxTemp + 1 <= this.sizePreguntas) {
      ++this.indexPregunta;
      clearInterval(this.setInter);
      this.iniciarContador();
    } else {
      clearInterval(this.setInter);
      this.guardarRespuestaCuestionario();
    }
  }

  obtenerPuntosPregunta(): number {
    if (!this.opcionSeleccionada) {
      return 0;
    }
    if (this.opcionSeleccionada.esCorrecta) {
      const puntos = this.cuestionario.listPreguntas[this.indexPregunta].puntos;
      this.puntosTotales += puntos;
      return puntos;
    } else {
      return 0;
    }
  }

  obtenerSegundos(): string | number {
    if (!this.opcionSeleccionada) {
      return 'no respondio';
    } else {
      console.log(this.segundos);
      const segundos = this.getsegundos - this.segundos;
      return segundos;
    }
  }

  obtenerIdxSeleccionado() {
    if (!this.opcionSeleccionada) {
      return '';
    } else {
      return this.indexSeleccionado;
    }
  }

  contadorCorrectaIncorrecta() {
    if (!this.opcionSeleccionada) {
      ++this.cantidadIncorrectas;
      return;
    }
    if (!this.opcionSeleccionada.esCorrecta) {
      ++this.cantidadIncorrectas;
    } else {
      ++this.cantidadCorrectas;
    }
  }

  guardarRespuestaCuestionario() {
    const respuestaCuestionario = {
      idCuestionario: this.cuestionario.id,
      nombreParticipante: this.nombreParticipante,
      fecha: new Date().toISOString(),
      cantidadPreguntas: this.cuestionario.cantPreguntas,
      cantidadCorrectas: this.cantidadCorrectas,
      cantidadIncorrectas: this.cantidadIncorrectas,
      puntosTotales: this.puntosTotales,
      listRespuestasUsuario: this.listRespuestasUsuario,
    };

    this.loading = true;
    this._respuestaQuizz.setRespuestaUsuario(respuestaCuestionario).then(
      (data) => {
        console.log(data);
        this.loading = false;
        this.router.navigate(['/jugar/respuestaUsuario', data.id]);
      },
      (error) => {
        this.loading = false;
      }
    );
  }
}
