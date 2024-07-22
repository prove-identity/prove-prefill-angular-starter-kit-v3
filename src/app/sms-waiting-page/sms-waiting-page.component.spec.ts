import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SMSWaitingComponent } from './sms-waiting-page.component';

describe('VerifySuccessComponent', () => {
  let component: SMSWaitingComponent;
  let fixture: ComponentFixture<SMSWaitingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SMSWaitingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SMSWaitingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
