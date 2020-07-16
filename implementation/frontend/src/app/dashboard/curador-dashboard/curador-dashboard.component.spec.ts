import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuradorDashboardComponent } from './curador-dashboard.component';

describe('CuradorDashboardComponent', () => {
  let component: CuradorDashboardComponent;
  let fixture: ComponentFixture<CuradorDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuradorDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuradorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
