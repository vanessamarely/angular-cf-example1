import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabindingTest } from './databinding-test';

describe('DatabindingTest', () => {
  let component: DatabindingTest;
  let fixture: ComponentFixture<DatabindingTest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatabindingTest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatabindingTest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
