import { ToastrService } from 'ngx-toastr';
import { Cuestionario } from './../../../models/cuestionario';
import { Pregunta } from './../../../models/pregunta';
import { QuizzService } from './../../../services/quizz.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { nanoid } from 'nanoid';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-preguntas',
  templateUrl: './list-preguntas.component.html',
  styleUrls: ['./list-preguntas.component.css'],
})
export class ListPreguntasComponent implements OnInit, OnDestroy {
  listPreguntas: Pregunta[] = [];
  tituloCuestionario = '';
  descripcionCuestionario = '';
  loading = false;
  subsPreguntas: Subscription = new Subscription();

  constructor(
    private quizzService: QuizzService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnDestroy(): void {
    if (this.subsPreguntas) {
      this.subsPreguntas.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.subsPreguntas = this.quizzService.getPreguntas().subscribe((data) => {
      this.listPreguntas.push(data);
      console.log(this.listPreguntas);
    });
    const { titulo, descripcion } = this.quizzService.getCuestionario();
    this.tituloCuestionario = titulo;
    this.descripcionCuestionario = descripcion;
  }

  eliminarPregunta(idx: number) {
    this.listPreguntas.splice(idx, 1);
  }

  finalizarCuestionario() {
    this.loading = true;
    const { uid } = JSON.parse(
      localStorage.getItem('user') || '{"uid": "vacio"}'
    );

    const cuestionario: Cuestionario = {
      uid,
      titulo: this.tituloCuestionario,
      descripcion: this.descripcionCuestionario,
      codigo: this.generarCodigo(),
      cantPreguntas: this.listPreguntas.length,
      fechaCreacion: new Date().toISOString(),
      listPreguntas: this.listPreguntas,
    };
    this.quizzService
      .crearCuestionario(cuestionario)
      .then((data) => {
        this.toastr.success(
          'El cuestionario fue registrado con éxito',
          'Cuestionario registrado'
        );
        this.router.navigate(['/dashboard']);
      })
      .catch((err) => {
        console.log(err);
        this.loading = false;
      });
  }

  generarCodigo() {
    return nanoid(6).toUpperCase();
  }
}
