import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ITPersinalLayoutComponent } from './itpersinal-layout.component';

describe('ITPersinalLayoutComponent', () => {
  let component: ITPersinalLayoutComponent;
  let fixture: ComponentFixture<ITPersinalLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ITPersinalLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ITPersinalLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
