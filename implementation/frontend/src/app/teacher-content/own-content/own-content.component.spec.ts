import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnContentComponent } from './own-content.component';

describe('OwnContentComponent', () => {
  let component: OwnContentComponent;
  let fixture: ComponentFixture<OwnContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
