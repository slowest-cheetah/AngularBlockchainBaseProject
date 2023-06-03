import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyDocumentComponent } from './verify-document.component';

describe('VerifyDocumentComponent', () => {
  let component: VerifyDocumentComponent;
  let fixture: ComponentFixture<VerifyDocumentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifyDocumentComponent]
    });
    fixture = TestBed.createComponent(VerifyDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
