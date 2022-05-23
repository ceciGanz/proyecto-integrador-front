import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconEditDeleteComponent } from './icon-edit-delete.component';

describe('IconEditDeleteComponent', () => {
  let component: IconEditDeleteComponent;
  let fixture: ComponentFixture<IconEditDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconEditDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconEditDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
