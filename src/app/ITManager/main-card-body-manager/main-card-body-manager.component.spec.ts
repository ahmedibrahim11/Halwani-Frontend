import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCardBodyManagerComponent } from './main-card-body-manager.component';

describe('MainCardBodyManagerComponent', () => {
  let component: MainCardBodyManagerComponent;
  let fixture: ComponentFixture<MainCardBodyManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainCardBodyManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainCardBodyManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
