import {TestBed} from '@angular/core/testing';
import {BaseModule} from './base.module';

describe('BaseModule', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseModule],
    }).compileComponents();
  });
});
