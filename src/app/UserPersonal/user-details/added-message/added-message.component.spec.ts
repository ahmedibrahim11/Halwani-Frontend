import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedMessageComponent } from './added-message.component';

describe('AddedMessageComponent', () => {
  let component: AddedMessageComponent;
  let fixture: ComponentFixture<AddedMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddedMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddedMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
