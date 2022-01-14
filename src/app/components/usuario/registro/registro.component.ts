import { ErrorService } from './../../../services/error.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  registroForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private fbAuth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService,
    private errorService: ErrorService
  ) {
    this.registroForm = fb.group(
      {
        usuario: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        repeatPassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      { validator: this.checkPassword }
    );
  }

  ngOnInit(): void {}

  registrar() {
    if (this.registroForm.invalid) {
      return;
    }

    this.loading = true;

    const { usuario, password } = this.registroForm.value;
    this.fbAuth
      .createUserWithEmailAndPassword(usuario, password)
      .then((rpta) => {
        rpta.user?.sendEmailVerification();
        this.toastr.success(
          'Enviamos un correo de verificación de su cuenta',
          'Correo enviado!'
        );
        this.router.navigate(['/usuario']);
      })
      .catch((err) => {
        this.registroForm.reset();
        this.loading = false;
        this.toastr.error(
          this.errorService.error(err.code),
          'Ocurrio un error!'
        );
      });
  }

  checkPassword(frmGroup: FormGroup) {
    const password = frmGroup.controls['password'].value;
    const repeatPassword = frmGroup.controls['repeatPassword'].value;
    return password === repeatPassword ? null : { notSame: true };
  }
}
