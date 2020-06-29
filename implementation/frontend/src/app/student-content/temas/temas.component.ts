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
          this.topic = data
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
