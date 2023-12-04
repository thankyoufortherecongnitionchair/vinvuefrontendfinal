import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionsFormComponent } from './subscriptions-form.component';

describe('SubscriptionsFormComponent', () => {
  let component: SubscriptionsFormComponent;
  let fixture: ComponentFixture<SubscriptionsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubscriptionsFormComponent]
    });
    fixture = TestBed.createComponent(SubscriptionsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
