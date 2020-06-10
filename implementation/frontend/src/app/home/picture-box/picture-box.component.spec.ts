import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureBoxComponent } from './picture-box.component';

describe('PictureBoxComponent', () => {
  let component: PictureBoxComponent;
  let fixture: ComponentFixture<PictureBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PictureBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
