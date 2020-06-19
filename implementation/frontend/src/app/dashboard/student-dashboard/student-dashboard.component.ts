import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/shared/services';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

  courses: any;

  constructor(
      private courseService: CourseService,
      public snackBar: MatSnackBar) {
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