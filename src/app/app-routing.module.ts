import { AuthGuard } from './services/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: InicioComponent },
  {
    path: 'usuario',
    loadChildren: () =>
      import('./components/usuario/usuario.module').then(
        (m) => m.UsuarioModule
      ),
  },
  {
    path: 'jugar',
    loadChildren: () =>
      import('./components/jugar/jugar.module').then((m) => m.JugarModule),
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    loadChildren: () =>
      import('./components/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
