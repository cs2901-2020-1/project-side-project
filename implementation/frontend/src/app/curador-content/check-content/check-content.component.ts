import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LessonService, AppLessonService } from 'src/app/shared/services';
import { environment } from 'src/environments/environment';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-check-content',
  templateUrl: './check-content.component.html',
  styleUrls: ['./check-content.component.css']
})
export class CheckContentComponent implements OnInit {

  lesson : any;

  applessonId : number;

  loaded : boolean = false;

  curate : boolean = false;

  constructor(
    private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private lessonService: LessonService,
    private applessonService: AppLessonService) {
      this.getRouteParams();
    }

  ngOnInit(): void {
  }

  getRouteParams() {
    const lessonId = this.route.snapshot.paramMap.get('id');

    this.lessonService.getTeacherLesson(lessonId)
      .pipe()
      .subscribe(
        data => {
          this.lesson = data;
          this.lesson.videoPath = environment.APIEndpoint + '/files/' + data.videoPath;
          this.lesson.documentPath = environment.APIEndpoint + '/files/' + data.documentPath;
          this.applessonId = data.applessonId
          this.loaded = true;
          /* this.curate = data.approved == null; */
          this.curate = true;
          console.log(this.lesson);
        },
        err => {
          this.openSnackBar('Ha ocurrido un error :c', 'Cerrar');
        }
      )
  }

  curateContent(aprroval : boolean) : void {
    this.applessonService.curateContent(this.applessonId, aprroval)
      .pipe()
      .subscribe(
        data => {
          this.curate = false;
          this.openSnackBar('Se curó contenido con éxito 👍', 'Cerrar');
        },
        err => {
          this.openSnackBar('Ha ocurrido un error :c', 'Cerrar');
        }
      )
  }

  download() {
    console.log("This video file:")
    console.log(this.lesson.documentPath)
    this.lessonService.downloadContent(this.lesson.documentPath).subscribe(response => {
			fileSaver.saveAs(response, this.lesson.title);
		}), (_error: any) => console.log('Error downloading the file'),
                 () => console.info('File downloaded successfully');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

}
