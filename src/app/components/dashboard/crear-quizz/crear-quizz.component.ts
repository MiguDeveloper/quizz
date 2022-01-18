import { QuizzService } from './../../../services/quizz.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-quizz',
  templateUrl: './crear-quizz.component.html',
  styleUrls: ['./crear-quizz.component.css'],
})
export class CrearQuizzComponent implements OnInit {
  cuestionarioForm: FormGroup;
  mostrarError = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private quizzService: QuizzService
  ) {
    this.cuestionarioForm = fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  siguiente() {
    if (this.cuestionarioForm.invalid) {
      this.mostrarError = true;
      setTimeout(() => {
        this.mostrarError = false;
      }, 2000);
      return;
    }

    this.quizzService.setCuestionario(this.cuestionarioForm.value);

    this.router.navigate(['/dashboard/crearPreguntas']);
  }
}
