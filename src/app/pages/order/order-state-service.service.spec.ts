import { TestBed } from '@angular/core/testing';

import { OrderStateService } from './order-state-service.service';

describe('OrderStateServiceService', () => {
  let service: OrderStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
