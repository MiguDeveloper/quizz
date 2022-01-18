import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cuestionario } from './../../models/cuestionario';
import { RespuestaQuizzService } from './../../services/respuesta-quizz.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit, OnDestroy {
  error = false;
  pin = '';
  errorText = '';
  loading = false;
  subsCode = new Subscription();

  constructor(
    private respuestaQuizzService: RespuestaQuizzService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.subsCode.unsubscribe();
  }

  ngOnInit(): void {}

  ingresar() {
    if (!this.pin) {
      this.errorMensaje('Por favor ingrese PIN valido');
      return;
    }

    this.loading = true;

    this.subsCode = this.respuestaQuizzService.searchByCode(this.pin).subscribe(
      (data) => {
        this.loading = false;
        if (data.empty) {
          this.errorMensaje('Tiene que ingresar un PIN valido');
        } else {
          data.forEach((item: any) => {
            const cuestionario: Cuestionario = {
              id: item.id,
              ...item.data(),
            };
            console.log(cuestionario);
            this.respuestaQuizzService.cuestionario = cuestionario;
            this.router.navigate(['/jugar']);
          });
        }
      },
      (error) => {
        this.loading = false;
        console.log(error);
      }
    );
  }

  errorMensaje(text: string) {
    this.errorText = text;
    this.error = true;
    this.pin = '';
    setTimeout(() => {
      this.error = false;
    }, 4000);
  }
}
