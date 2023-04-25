import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FirebaseCodeErrorService } from 'src/app/services/firebase-code-error.service';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {
 registrarUsuario: FormGroup;
 loading: boolean = false;

  constructor(
    private fb: FormBuilder, private router: Router, private firebaseError: FirebaseCodeErrorService,
    private afAuth: AngularFireAuth, private toastr: ToastrService) {
    this.registrarUsuario = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      repetirPassword: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  registrar() {
    const email = this.registrarUsuario.value.email;
    const password = this.registrarUsuario.value.password;
    const repetirPassword = this.registrarUsuario.value.repetirPassword;

    if (password !== repetirPassword) {
      this.toastr.error('Las contraseñas ingresadas deben coincidir', 'Error de Registro');
      return;
    }

    this.loading = true;
    this.afAuth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      this.loading = false;
      this.toastr.success('Usuario creado con éxito', 'Registro');
      this.router.navigate(['/login']);
    }).catch((error) => {
      this.loading = false;
      this.toastr.error(this.firebaseError.codeError(error.code), 'Upsss!!', {timeOut: 1000,})
    })
  }


}
