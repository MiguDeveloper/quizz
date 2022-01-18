import { ActivatedRoute, Router } from '@angular/router';
import { RespuestaQuizzService } from './../../../services/respuesta-quizz.service';
import { Component, OnInit } from '@angular/core';
import { Resumen } from '../../interfaces/resumen-cuestionario';

@Component({
  selector: 'app-respuesta-usuario',
  templateUrl: './respuesta-usuario.component.html',
  styleUrls: ['./respuesta-usuario.component.css'],
})
export class RespuestaUsuarioComponent implements OnInit {
  id: string = '';
  loading = false;
  resumen!: Resumen;

  constructor(
    private _respuestaQuizzService: RespuestaQuizzService,
    private aroute: ActivatedRoute,
    private router: Router
  ) {
    aroute.params.subscribe(({ id }) => (this.id = id));
  }

  ngOnInit(): void {
    this.obtenerRespuestaUsuario();
  }

  obtenerRespuestaUsuario() {
    this.loading = true;
    this._respuestaQuizzService.getRespuestaUsuario(this.id).subscribe(
      (doc) => {
        if (!doc.exists) {
          this.router.navigate(['/']);
          return;
        }
        this.loading = false;
        this.resumen = doc.data();
        console.log(this.resumen);
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  volver() {
    if (this.aroute.snapshot.url[0].path === 'respuestaUsuarioAdmin') {
      this.router.navigate([
        '/dashboard/estadisticas',
        this.resumen.idCuestionario,
      ]);
    } else {
      this.router.navigate(['/']);
    }
  }
}
