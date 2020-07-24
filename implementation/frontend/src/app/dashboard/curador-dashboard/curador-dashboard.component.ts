import { Component, OnInit } from '@angular/core';
import { CourseService, AuthService } from 'src/app/shared/services';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-curador-dashboard',
  templateUrl: './curador-dashboard.component.html',
  styleUrls: ['./curador-dashboard.component.css']
})
export class CuradorDashboardComponent implements OnInit {

  courses: any;
  name: string;

  constructor(
    private courseService: CourseService,
    public snackBar: MatSnackBar,
    private authService: AuthService
  ) { 
    this.name = authService.currentUserName();
    this.courseService.getAll()
      .pipe()
      .subscribe(
        data => {
          this.courses = data;
          console.log(data)
        },
        err => {
          this.openSnackBar('Ha ocurrido un error :c', 'Cerrar');
        }
      )
  }

  ngOnInit(): void {
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

}
