import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatMessageComponent } from './format-message.component';

describe('FormatMessageComponent', () => {
  let component: FormatMessageComponent;
  let fixture: ComponentFixture<FormatMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormatMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
