import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IngresarAsistenciaPage } from './ingresar-asistencia.page';

describe('IngresarAsistenciaPage', () => {
  let component: IngresarAsistenciaPage;
  let fixture: ComponentFixture<IngresarAsistenciaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(IngresarAsistenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
