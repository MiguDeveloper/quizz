import { RespuestaUsuarioComponent } from './../shared/respuesta-usuario/respuesta-usuario.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { VerCuestionarioComponent } from './ver-cuestionario/ver-cuestionario.component';
import { CrearPreguntasComponent } from './crear-preguntas/crear-preguntas.component';
import { CrearQuizzComponent } from './crear-quizz/crear-quizz.component';
import { ListCuestionariosComponent } from './list-cuestionarios/list-cuestionarios.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ListCuestionariosComponent },
  { path: 'crearQuizz', component: CrearQuizzComponent },
  { path: 'crearPreguntas', component: CrearPreguntasComponent },
  { path: 'verCuestionario/:id', component: VerCuestionarioComponent },
  { path: 'estadisticas/:id', component: EstadisticasComponent },
  { path: 'respuestaUsuarioAdmin/:id', component: RespuestaUsuarioComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
