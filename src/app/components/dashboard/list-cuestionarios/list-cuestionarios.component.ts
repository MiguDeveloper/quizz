import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Cuestionario } from './../../../models/cuestionario';
import { QuizzService } from './../../../services/quizz.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-list-cuestionarios',
  templateUrl: './list-cuestionarios.component.html',
  styleUrls: ['./list-cuestionarios.component.css'],
})
export class ListCuestionariosComponent implements OnInit, OnDestroy {
  cuestionarios: Cuestionario[] = [];
  subsUser = new Subscription();
  subsArray: Subscription[] = [];
  subsCuestionarios = new Subscription();
  loading = false;

  constructor(
    private afAuth: AngularFireAuth,
    private quizzService: QuizzService,
    private toastr: ToastrService
  ) {}

  ngOnDestroy(): void {
    if (this.subsArray.length) {
      this.subsArray.forEach((sub) => {
        if (sub) {
          sub.unsubscribe();
        }
      });
    }
  }

  ngOnInit(): void {
    this.loading = true;
    this.subsUser = this.afAuth.user.subscribe((user: any) => {
      this.getCuestionarios(user?.uid);
    });
    this.subsArray.push(this.subsUser);
  }

  getCuestionarios(uid: string) {
    this.subsCuestionarios = this.quizzService
      .getCuestionarioByIdUser(uid)
      .subscribe(
        (data) => {
          this.loading = false;
          this.cuestionarios = [];
          data.forEach((item: any) => {
            this.cuestionarios.push({
              id: item.payload.doc.id,
              ...item.payload.doc.data(),
            });
          });
        },
        (error) => {
          this.loading = false;
        }
      );

    this.subsArray.push(this.subsCuestionarios);
  }

  eliminarCuestionario(id: string) {
    this.loading = true;
    this.quizzService
      .eliminarCuestionario(id)
      .then((data) => {
        this.loading = false;
        this.toastr.success(
          'El cuestionario fue eliminado con éxito',
          'Registro eliminado'
        );
      })
      .catch(() => {
        this.loading = false;
        this.toastr.error('Upss ocurrio un error', 'Error');
      });
  }
}
