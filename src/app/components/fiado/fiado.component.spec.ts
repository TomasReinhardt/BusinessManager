import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiadoComponent } from './fiado.component';

describe('FiadoComponent', () => {
  let component: FiadoComponent;
  let fixture: ComponentFixture<FiadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
