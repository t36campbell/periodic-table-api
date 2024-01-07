import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodicTableSvgComponent } from './periodic-table-svg.component';

describe('PeriodicTableSvgComponent', () => {
  let component: PeriodicTableSvgComponent;
  let fixture: ComponentFixture<PeriodicTableSvgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PeriodicTableSvgComponent]
    });
    fixture = TestBed.createComponent(PeriodicTableSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
