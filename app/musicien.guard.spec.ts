import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { musicienGuard } from './musicien.guard';

describe('musicienGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => musicienGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
