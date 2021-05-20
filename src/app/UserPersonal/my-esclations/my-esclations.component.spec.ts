import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyEsclationsComponent } from './my-esclations.component';

describe('MyEsclationsComponent', () => {
  let component: MyEsclationsComponent;
  let fixture: ComponentFixture<MyEsclationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyEsclationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyEsclationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
