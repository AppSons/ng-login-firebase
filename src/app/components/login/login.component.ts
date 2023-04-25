import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUsuario: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder, private router: Router,
    private afAuth: AngularFireAuth, private toastr: ToastrService) {
      this.loginUsuario = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
      })
    }

  ngOnInit(): void {
  }

  login() {
    const email = this.loginUsuario.value.email;
    const password = this.loginUsuario.value.password;
    this.loading = true;
    this.afAuth.signInWithEmailAndPassword(email, password)
    .then((user) => {

      this.router.navigate(['/dashboard']);
    }).catch((error) => {
      this.loading = false;
      this.toastr.error(error.message);
      console.log(error);
    });
  }

}
