import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NomoreTicketsComponent } from './nomore-tickets.component';

describe('NomoreTicketsComponent', () => {
  let component: NomoreTicketsComponent;
  let fixture: ComponentFixture<NomoreTicketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NomoreTicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NomoreTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
