import { TestBed } from '@angular/core/testing';

import { NoAutorizadoGuard } from './no-autorizado.guard';

describe('NoAutorizadoGuard', () => {
  let guard: NoAutorizadoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NoAutorizadoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
