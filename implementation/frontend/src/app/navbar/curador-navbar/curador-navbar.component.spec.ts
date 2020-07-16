import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuradorNavbarComponent } from './curador-navbar.component';

describe('CuradorNavbarComponent', () => {
  let component: CuradorNavbarComponent;
  let fixture: ComponentFixture<CuradorNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuradorNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuradorNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
