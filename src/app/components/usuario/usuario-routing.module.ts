import { VerificarCorreoComponent } from './verificar-correo/verificar-correo.component';
import { RegistroComponent } from './registro/registro.component';
import { RecuperarPasswordComponent } from './recuperar-password/recuperar-password.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'recuperarPassword', component: RecuperarPasswordComponent },
  { path: 'register', component: RegistroComponent },
  { path: 'verificarcorreo', component: VerificarCorreoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioRoutingModule {}
