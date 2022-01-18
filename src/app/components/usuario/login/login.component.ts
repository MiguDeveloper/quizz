import { Router } from '@angular/router';
import { ErrorService } from './../../../services/error.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private fbAuth: AngularFireAuth,
    private errorService: ErrorService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.loginForm = fb.group({
      usuario: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    const { usuario, password } = this.loginForm.value;

    this.fbAuth
      .signInWithEmailAndPassword(usuario, password)
      .then((rpta) => {
        if (rpta.user?.emailVerified === false) {
          this.router.navigate(['/usuario/verificarcorreo']);
        } else {
          this.loading = false;
          this.setLocalStorage(rpta.user);
          this.toastr.success('Acceso correcto', 'Login Success');
          this.router.navigate(['/dashboard']);
        }
      })
      .catch((err) => {
        this.loading = false;
        this.toastr.error(
          this.errorService.error(err.code),
          'Ocurrio un error'
        );
        this.loginForm.reset();
      });
  }

  setLocalStorage({ uid, email }: any) {
    const usuario: User = {
      uid,
      email,
    };
    localStorage.setItem('user', JSON.stringify(usuario));
  }
}
