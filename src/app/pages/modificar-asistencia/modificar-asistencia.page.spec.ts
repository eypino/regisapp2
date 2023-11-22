import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarAsistenciaPage } from './modificar-asistencia.page';

describe('ModificarAsistenciaPage', () => {
  let component: ModificarAsistenciaPage;
  let fixture: ComponentFixture<ModificarAsistenciaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModificarAsistenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
