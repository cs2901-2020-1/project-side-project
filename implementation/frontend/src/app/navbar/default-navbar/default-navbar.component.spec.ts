import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultNavbarComponent } from './default-navbar.component';

describe('DefaultNavbarComponent', () => {
  let component: DefaultNavbarComponent;
  let fixture: ComponentFixture<DefaultNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
