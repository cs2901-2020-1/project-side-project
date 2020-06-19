import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../shared/services';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  isCollapsed = true;

  images: any[];

  waiting: boolean = false;

  document: any;

  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
  }

  scrollToDownload(element: any) {
    element.scrollIntoView({ behavior: "smooth" });
  }

  redirect(fragment: string): void {
    document.querySelector('#' + fragment).scrollIntoView({behavior: "smooth"});
  }
}
