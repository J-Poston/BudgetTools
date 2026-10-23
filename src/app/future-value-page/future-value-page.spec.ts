import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureValuePage } from './future-value-page';

describe('FutureValuePage', () => {
  let component: FutureValuePage;
  let fixture: ComponentFixture<FutureValuePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FutureValuePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FutureValuePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
