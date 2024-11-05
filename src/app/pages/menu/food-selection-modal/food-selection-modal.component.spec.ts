import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodSelectionModalComponent } from './food-selection-modal.component';

describe('FoodSelectionModalComponent', () => {
  let component: FoodSelectionModalComponent;
  let fixture: ComponentFixture<FoodSelectionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodSelectionModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FoodSelectionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
