import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrocComponent } from './groc.component';

describe('GrocComponent', () => {
  let component: GrocComponent;
  let fixture: ComponentFixture<GrocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
