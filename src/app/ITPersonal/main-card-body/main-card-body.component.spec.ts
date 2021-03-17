import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCardBodyComponent } from './main-card-body.component';

describe('MainCardBodyComponent', () => {
  let component: MainCardBodyComponent;
  let fixture: ComponentFixture<MainCardBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainCardBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainCardBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
