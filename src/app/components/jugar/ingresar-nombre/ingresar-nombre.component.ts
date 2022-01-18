import { Router } from '@angular/router';
import { RespuestaQuizzService } from './../../../services/respuesta-quizz.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ingresar-nombre',
  templateUrl: './ingresar-nombre.component.html',
  styleUrls: ['./ingresar-nombre.component.css'],
})
export class IngresarNombreComponent implements OnInit {
  nombre = '';
  error = false;
  errorText = '';

  constructor(
    private respuestaQuizzService: RespuestaQuizzService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  ingresarNombre() {
    if (!this.nombre) {
      this.errorMensaje('Debe ingresar su nombre');
      return;
    }
    this.respuestaQuizzService.nombreParticipante = this.nombre;
    this.router.navigate(['/jugar/iniciarContador']);
  }

  errorMensaje(text: string) {
    this.errorText = text;
    this.error = true;

    setTimeout(() => {
      this.error = false;
    }, 4000);
  }
}
