import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/shared/services';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  returnUrl: string;
  hide = true;
  selection: string = 'student'

  minDate: Date;
  maxDate: Date;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private titleService: Title,
    private router: Router
  ) {
    this.titleService.setTitle("Signup")
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 70, 0, 1);
    this.maxDate = new Date(currentYear - 5, 11, 31);
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
      ]],
      password: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      school: ['', Validators.required],
      schoolYear: ['', Validators.required],
      birthdate: ['', Validators.required],
      specialism:  ['']
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSignup() {

    if (this.selection === 'student') {  
      let request = {
        'email': this.email.value,
        'password': this.password.value,
        'name': this.name.value,
        'lastName': this.lastName.value,
        'school': this.school.value,
        'schoolYear': this.schoolYear.value,
        'birthdate': this.birthdate.value
      }
      
      this.authService.studentSignup(request)
        .pipe()
        .subscribe(
          data => {
            if (this.returnUrl == '/'){
              this.router.navigate(['/dashboard']);
            }else {
              this.router.navigate([this.returnUrl]);
            }
          },
          err => {
            if (err.status == 409) {
              this.openSnackBar('Este correo ya se encuentra registrado', 'Cerrar');
            } else {
              this.openSnackBar('Ha ocurrido un error :c', 'Cerrar');
            }
          }
        )
    }

    if (this.selection === 'teacher') {  
      let request = {
        'email': this.email.value,
        'password': this.password.value,
        'name': this.name.value,
        'lastName': this.lastName.value,
        'specialism': this.specialism.value,
        'birthdate': this.birthdate.value
      }
  
      this.authService.teacherSignup(request)
        .pipe()
        .subscribe(
          data => {
            this.router.navigate([this.returnUrl]);
          },
          err => {
            if (err.status == 409) {
              this.openSnackBar('Este correo ya se encuentra registrado', 'Cerrar');
            } else {
              this.openSnackBar('Ha ocurrido un error :c', 'Cerrar');
            }
          }
        )
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  select(option: string) {
    this.selection = option

    this.signupForm.reset()

    const schoolYearControl = this.signupForm.get('schoolYear');
    const specialismControl = this.signupForm.get('specialism');
    
    if (option === 'student') {
      schoolYearControl.setValidators([Validators.required]);
      specialismControl.setValidators(null);
    }

    if (option === 'teacher') {
      schoolYearControl.setValidators(null);
      specialismControl.setValidators([Validators.required]);
    }

    schoolYearControl.updateValueAndValidity();
    specialismControl.updateValueAndValidity();
  }

  get email(){
    return this.signupForm.get('email')
  }
  
  get password(){
    return this.signupForm.get('password')
  }

  get name(){
    return this.signupForm.get('name')
  }

  get lastName(){
    return this.signupForm.get('lastName')
  }

  get school(){
    return this.signupForm.get('school')
  }

  get schoolYear(){
    return this.signupForm.get('schoolYear')
  }

  get birthdate(){
    return this.signupForm.get('birthdate')
  }

  get specialism(){
    return this.signupForm.get('specialism')
  }
}
