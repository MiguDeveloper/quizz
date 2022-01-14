import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from './../../../services/error.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css'],
})
export class RecuperarPasswordComponent implements OnInit {
  recuperarForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private fbAuth: AngularFireAuth,
    private errorService: ErrorService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.recuperarForm = fb.group({
      usuario: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {}

  recuperarPwd() {
    if (this.recuperarForm.invalid) {
      return;
    }
    this.loading = true;
    const { usuario } = this.recuperarForm.value;
    this.fbAuth
      .sendPasswordResetEmail(usuario)
      .then((rpta) => {
        this.loading = false;
        this.toastr.info(
          'Se envio correo para recuperar contraseña',
          'Restablecer password'
        );
        this.router.navigate(['/usuario']);
      })
      .catch((err) => {
        this.loading = false;
        this.toastr.error(this.errorService.error(err.code), 'Error');
        this.recuperarForm.reset();
      });
  }
}
