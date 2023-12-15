import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselDishesComponent } from './carousel-dishes.component';

describe('CarouselDishesComponent', () => {
  let component: CarouselDishesComponent;
  let fixture: ComponentFixture<CarouselDishesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarouselDishesComponent]
    });
    fixture = TestBed.createComponent(CarouselDishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
