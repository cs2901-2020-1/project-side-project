import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  returnUrl: string;
  hide = true;
  
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private titleService: Title,
    private router: Router
  ) {
    this.titleService.setTitle("Login")
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
      ]],
      password: ['', Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onLogin() {
    let control = this.loginForm.controls
    let email = control.email.value
    let password = control.password.value

    this.authService.login(email, password)
      .pipe()
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        err => {
          if (err.status == 401) {
            this.openSnackBar('Correo o contraseña inválido', 'Cerrar');
          } else {
            this.openSnackBar('Ha ocurrido un error :c', 'Cerrar');
          }
        }
      )
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  get email(){
    return this.loginForm.get('email')
  }
  
  get password(){
    return this.loginForm.get('password')
  }
}
