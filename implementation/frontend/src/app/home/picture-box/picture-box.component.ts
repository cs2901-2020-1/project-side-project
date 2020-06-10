import { Component, OnInit, Input } from '@angular/core';
import { ImageService } from 'src/app/shared/services';

@Component({
  selector: 'app-picture-box',
  templateUrl: './picture-box.component.html',
  styleUrls: ['./picture-box.component.css']
})
export class PictureBoxComponent implements OnInit {

  @Input() item: any;
  
  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
  }

  setImage(path: string): string {
    return this.imageService.getImage(path)
  }

}
