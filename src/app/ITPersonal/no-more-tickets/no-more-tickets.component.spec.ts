import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoMoreTicketsComponent } from './no-more-tickets.component';

describe('NoMoreTicketsComponent', () => {
  let component: NoMoreTicketsComponent;
  let fixture: ComponentFixture<NoMoreTicketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoMoreTicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoMoreTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
