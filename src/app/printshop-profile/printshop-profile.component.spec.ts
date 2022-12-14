import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintshopProfileComponent } from './printshop-profile.component';

describe('PrintshopProfileComponent', () => {
  let component: PrintshopProfileComponent;
  let fixture: ComponentFixture<PrintshopProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintshopProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintshopProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
