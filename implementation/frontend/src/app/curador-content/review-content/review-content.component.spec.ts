import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewContentComponent } from './review-content.component';

describe('ReviewContentComponent', () => {
  let component: ReviewContentComponent;
  let fixture: ComponentFixture<ReviewContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
