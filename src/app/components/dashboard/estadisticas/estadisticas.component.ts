import { ToastrService } from 'ngx-toastr';
import { RespuestaQuizzService } from './../../../services/respuesta-quizz.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css'],
})
export class EstadisticasComponent implements OnInit, OnDestroy {
  private _id = '';
  loading = false;
  listRespuestaUsuario: any[] = [];
  subsRespuestaQuizz = new Subscription();

  constructor(
    private aRoute: ActivatedRoute,
    private respuestaQuizzService: RespuestaQuizzService,
    private toastr: ToastrService
  ) {
    aRoute.params.subscribe(({ id }) => (this._id = id));
  }
  ngOnDestroy(): void {
    if (this.subsRespuestaQuizz) {
      this.subsRespuestaQuizz.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.getRespuestasByIdCuestionario();
  }

  getRespuestasByIdCuestionario() {
    this.loading = true;
    this.subsRespuestaQuizz = this.respuestaQuizzService
      .getRespuestasByIdCuestionario(this._id)
      .subscribe(
        (data) => {
          this.loading = false;
          this.listRespuestaUsuario = [];
          data.forEach((item: any) => {
            this.listRespuestaUsuario.push({
              id: item.payload.doc.id,
              ...item.payload.doc.data(),
            });
          });
          console.log(this.listRespuestaUsuario);
        },
        (error) => {
          this.loading = false;
          console.log(error);
        }
      );
  }

  deleteRespuestaUsuario(id: string) {
    this.loading = true;
    this.respuestaQuizzService.deleteRespuestaUsuario(id).then(
      (data) => {
        this.loading = false;
        this.toastr.success(
          'La respuesta fue eliminada',
          'Respuesta eliminada'
        );
      },
      (error) => {
        this.toastr.error('Upss ocurrio un error', 'Error');
      }
    );
  }
}
