import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsigPage } from './asig.page';

describe('AsigPage', () => {
  let component: AsigPage;
  let fixture: ComponentFixture<AsigPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AsigPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
