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
    this.imageService.getAllImages().subscribe(
      (data) => {this.images = data
      console.log(data)}
    );

  }

  scrollToDownload(element: any) {
    element.scrollIntoView({ behavior: "smooth" });
  }

  redirect(fragment: string): void {
    document.querySelector('#' + fragment).scrollIntoView({behavior: "smooth"});
  }

  onFileChange(event) {
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.waiting = true;
      this.imageService.uploadImage(file).subscribe(
        (data) => {
          this.images = [data].concat(this.images)
          this.waiting = false;
          this.redirect("gallery");
        }
      );
    }
  }
}
