import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { LessonService} from '../../shared/services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-lesson-content',
  templateUrl: './lesson-content.component.html',
  styleUrls: ['./lesson-content.component.css']
})
export class LessonContentComponent implements OnInit {

  lesson : any;

  loaded : boolean = false;

  constructor(
    private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private lessonService: LessonService) {
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
          this.loaded = true;
          console.log(this.lesson);
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
