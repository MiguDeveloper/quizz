import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { RespuestaUsuarioComponent } from './respuesta-usuario/respuesta-usuario.component';

@NgModule({
  declarations: [SpinnerComponent, RespuestaUsuarioComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [FormsModule, ReactiveFormsModule, SpinnerComponent],
})
export class SharedModule {}
