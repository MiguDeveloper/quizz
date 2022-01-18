import { Cuestionario } from './../../../models/cuestionario';
import { QuizzService } from './../../../services/quizz.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ver-cuestionario',
  templateUrl: './ver-cuestionario.component.html',
  styleUrls: ['./ver-cuestionario.component.css'],
})
export class VerCuestionarioComponent implements OnInit {
  loading = false;
  cuestionario: Cuestionario | undefined;

  constructor(
    private _aRoute: ActivatedRoute,
    private quizzService: QuizzService
  ) {
    _aRoute.params.subscribe(({ id }) => this.obtenerQuizz(id));
  }

  ngOnInit(): void {}

  obtenerQuizz(id: string) {
    this.loading = true;
    this.quizzService.getCuestinarioById(id).subscribe(
      (doc) => {
        this.loading = false;
        this.cuestionario = doc.data();
        console.log(this.cuestionario);
      },
      (error) => {
        this.loading = false;
        console.log(error);
      }
    );
  }
}
