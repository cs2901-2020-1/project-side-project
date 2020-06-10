import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageService } from './services/image.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ImageService
      ]

    }
  }
}
