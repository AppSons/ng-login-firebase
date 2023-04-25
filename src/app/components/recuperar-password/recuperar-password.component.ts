import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { ToastrService } from 'ngx-toastr';
import { FirebaseCodeErrorService } from 'src/app/services/firebase-code-error.service';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent implements OnInit {

  recuperarUsuario: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder, private router: Router, private firebaseError: FirebaseCodeErrorService,
    private afAuth: AngularFireAuth, private toastr: ToastrService) {
      this.recuperarUsuario = this.fb.group({
        email: ['', Validators.required],
      })
    }

  ngOnInit(): void {
  }
  recuperar() {
    const email = this.recuperarUsuario.value.email;
    this.loading = true;
    this.afAuth.sendPasswordResetEmail(email)
    .then(() => {
      this.toastr.success('Enviado', 'Recuperación de Password en su correo');
      this.router.navigate(['/login']);
    }).catch((error) => {
      this.loading = false;
      this.toastr.error(this.firebaseError.codeError(error.code), 'Error', {timeOut: 1000,});
    })
  }

}
