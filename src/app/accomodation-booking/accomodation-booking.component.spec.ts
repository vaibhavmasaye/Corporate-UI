import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccomodationBookingComponent } from './accomodation-booking.component';

describe('AccomodationBookingComponent', () => {
  let component: AccomodationBookingComponent;
  let fixture: ComponentFixture<AccomodationBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccomodationBookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccomodationBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
