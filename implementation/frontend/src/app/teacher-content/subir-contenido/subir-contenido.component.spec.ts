import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirContenidoComponent } from './subir-contenido.component';

describe('SubirContenidoComponent', () => {
  let component: SubirContenidoComponent;
  let fixture: ComponentFixture<SubirContenidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubirContenidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubirContenidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
