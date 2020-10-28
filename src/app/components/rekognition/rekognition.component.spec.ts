import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RekognitionComponent } from './rekognition.component';

describe('RekognitionComponent', () => {
  let component: RekognitionComponent;
  let fixture: ComponentFixture<RekognitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RekognitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RekognitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
