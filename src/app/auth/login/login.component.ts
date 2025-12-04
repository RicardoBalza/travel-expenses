import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { UserResponse } from "../../Shared/Models/Login/loginDTO";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  
  userData: UserResponse = new UserResponse();

  ngOnInit(): void {}

  get form() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.login();

  }

  setDataShare() {
    this.userService.setDataBridge(this.userData);
  }

  login() {
    this.loading = true;
    this.error = '';

    const email = this.form['email'].value;
    const password = this.form['password'].value;

    this.userService.login(email, password).subscribe({
      next: (response: UserResponse) => {
        if (response.user && response.user.isActive) {
          // Guardar el token en el almacenamiento local
          if (response.token) {
            localStorage.setItem('authToken', response.token);
            localStorage.setItem('authUser', JSON.stringify(response.user));
          }
          this.router.navigate(['/dashboard']);
        } else {
          this.error = 'Usuario inactivo o no autorizado';
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error en el inicio de sesión:', error);
        this.error = 'Credenciales incorrectas o error en el servidor';
        this.loading = false;
      }
    });
  }
}
