import { TestBed } from '@angular/core/testing';

import { OrderService } from './orderstatus.service';

describe('OrderstatusService', () => {
  let service: OrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
