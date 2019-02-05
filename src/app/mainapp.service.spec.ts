import { TestBed } from '@angular/core/testing';

import { MainappService } from './mainapp.service';

describe('MainappService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MainappService = TestBed.get(MainappService);
    expect(service).toBeTruthy();
  });
});
