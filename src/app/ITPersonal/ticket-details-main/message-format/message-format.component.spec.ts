import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageFormatComponent } from './message-format.component';

describe('MessageFormatComponent', () => {
  let component: MessageFormatComponent;
  let fixture: ComponentFixture<MessageFormatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageFormatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
