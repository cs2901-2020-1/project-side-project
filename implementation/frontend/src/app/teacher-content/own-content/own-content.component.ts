import { Component, OnInit } from '@angular/core';
import { LessonService, AuthService } from '../../shared/services';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-own-content',
  templateUrl: './own-content.component.html',
  styleUrls: ['./own-content.component.css']
})
export class OwnContentComponent implements OnInit {

  userId : number;

  lessons : any;

  constructor(
      public snackBar: MatSnackBar,
      private authService: AuthService,
      private lessonService: LessonService) {
  }

  ngOnInit(): void {
      this.userId = this.authService.currentUserId();
      this.getLessons(this.userId);
  }

  getLessons(userId: number) : void {
    this.lessonService.getTeacherLessons(userId).pipe()
      .subscribe(
        data => {
          console.log(data)
          this.lessons = data;
        },
        err => {
          this.openSnackBar('Ha ocurrido un error :c', 'Cerrar');
        }
      )
  }

  formatTitle(title : string) : string {
    return title.charAt(0).toUpperCase() + title.slice(1);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

}
