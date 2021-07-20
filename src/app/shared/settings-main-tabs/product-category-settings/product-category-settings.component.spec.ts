import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategorySettingsComponent } from './product-category-settings.component';

describe('ProductCategorySettingsComponent', () => {
  let component: ProductCategorySettingsComponent;
  let fixture: ComponentFixture<ProductCategorySettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCategorySettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCategorySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
