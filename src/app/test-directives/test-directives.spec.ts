import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDirectives } from './test-directives';

describe('TestDirectives', () => {
  let component: TestDirectives;
  let fixture: ComponentFixture<TestDirectives>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestDirectives]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestDirectives);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
