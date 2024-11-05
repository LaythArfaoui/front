import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderadminsComponent } from './orderadmins.component';

describe('OrderadminsComponent', () => {
  let component: OrderadminsComponent;
  let fixture: ComponentFixture<OrderadminsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderadminsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderadminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
