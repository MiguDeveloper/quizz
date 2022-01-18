import { Pregunta } from './../../../models/pregunta';
import { Respuesta } from './../../../models/respuesta';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { QuizzService } from './../../../services/quizz.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-preguntas',
  templateUrl: './crear-preguntas.component.html',
  styleUrls: ['./crear-preguntas.component.css'],
})
export class CrearPreguntasComponent implements OnInit {
  addPreguntasForm: FormGroup;
  mostrarError = false;
  arrRptas = ['respuesta1', 'respuesta2', 'respuesta3', 'respuesta4'];

  constructor(private fb: FormBuilder, private quizzService: QuizzService) {
    this.addPreguntasForm = fb.group({
      titulo: ['', Validators.required],
      segundos: [10, Validators.required],
      puntos: [1000, Validators.required],
      respuesta1: fb.group({
        titulo: ['', Validators.required],
        esCorrecta: [false, Validators.required],
      }),
      respuesta2: fb.group({
        titulo: ['', Validators.required],
        esCorrecta: [false, Validators.required],
      }),
      respuesta3: fb.group({
        titulo: '',
        esCorrecta: false,
      }),
      respuesta4: fb.group({
        titulo: '',
        esCorrecta: false,
      }),
    });
  }

  get seg() {
    return this.addPreguntasForm.get('segundos')?.value;
  }

  get puntos() {
    return this.addPreguntasForm.get('puntos')?.value;
  }

  ngOnInit(): void {
    console.log(this.quizzService.getCuestionario());
  }

  agregarPregunta() {
    if (this.addPreguntasForm.invalid || this.todasIncorrectas()) {
      this.error();
      return;
    }

    let listRespuestas: Respuesta[] = [];
    const objForm = { ...this.addPreguntasForm.value };
    this.arrRptas.forEach((rpta) => {
      const respuesta: Respuesta = {
        descripcion: objForm[rpta].titulo,
        esCorrecta: objForm[rpta].esCorrecta,
      };
      if (objForm[rpta].titulo) {
        listRespuestas.push(respuesta);
      }
    });

    const { titulo, puntos, segundos } = objForm;

    const pregunta: Pregunta = {
      titulo,
      puntos,
      segundos,
      listRespuestas,
    };

    this.quizzService.agregarPregunta(pregunta);

    this.reset();
  }

  reset() {
    this.addPreguntasForm.patchValue({
      titulo: '',
      segundos: 10,
      puntos: 1000,
      respuesta1: {
        titulo: '',
        esCorrecta: false,
      },
      respuesta2: {
        titulo: '',
        esCorrecta: false,
      },
      respuesta3: {
        titulo: '',
        esCorrecta: false,
      },
      respuesta4: {
        titulo: '',
        esCorrecta: false,
      },
    });
  }

  todasIncorrectas() {
    let todas = true;
    this.arrRptas.forEach((rpta) => {
      if (this.addPreguntasForm.get(rpta)?.get('esCorrecta')?.value) {
        todas = false;
      }
    });

    return todas;
  }

  error() {
    this.mostrarError = true;
    setTimeout(() => {
      this.mostrarError = false;
    }, 2000);
  }

  sumarRestarSeg(num: number) {
    let seg = this.seg;
    if (seg + num <= 0) {
      return;
    }
    this.addPreguntasForm.patchValue({ segundos: seg + num });
  }

  esCorrecta(item: string) {
    const estadoRpta = this.obtenerEstadoRespuesta(item);
    this.setFalseRpta(item);
    this.addPreguntasForm
      .get(`respuesta${item}`)
      ?.patchValue({ esCorrecta: !estadoRpta });
  }

  obtenerEstadoRespuesta(item: string) {
    return this.addPreguntasForm.get(`respuesta${item}`)?.get('esCorrecta')
      ?.value;
  }

  setFalseRpta(item: string) {
    const rptaString = `respuesta${item}`;
    this.arrRptas.forEach((rpta) => {
      if (rpta !== rptaString) {
        this.addPreguntasForm.get(rpta)?.patchValue({ esCorrecta: false });
      }
    });
  }
}
