import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TopicService } from '../../shared/services';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-temas',
  templateUrl: './temas.component.html',
  styleUrls: ['./temas.component.css']
})
export class TemasComponent implements OnInit {

  topic: any;

  lessons : any;

  contentLoaded : boolean = false;

  constructor(
      private route: ActivatedRoute,
      public snackBar: MatSnackBar,
      private topicService: TopicService) {
    this.getRouteParams();
  }

  ngOnInit(): void {
  }

  getRouteParams() {
    const id = this.route.snapshot.paramMap.get('id');

    this.topicService.getById(id)
      .pipe()
      .subscribe(
        data => {
          this.topic = data;
          this.lessons = data.lessons;
          this.lessons.sort((a, b)=> b.model.numLikes - a.model.numLikes)
          this.contentLoaded = true;
          console.log(this.lessons);
        },
        err => {
          this.openSnackBar('Ha ocurrido un error :c', 'Cerrar');
        }
      )
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
