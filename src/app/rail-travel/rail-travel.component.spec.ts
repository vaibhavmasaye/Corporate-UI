import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RailTravelComponent } from './rail-travel.component';

describe('RailTravelComponent', () => {
  let component: RailTravelComponent;
  let fixture: ComponentFixture<RailTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RailTravelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RailTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
