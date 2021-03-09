import { RouterTestingModule } from '@angular/router/testing';
import { NotVerifyClientLayoutComponent } from './not-verify-client-layout.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('NotVerifyClientLayoutComponent', () => {
  let component: NotVerifyClientLayoutComponent;
  let fixture: ComponentFixture<NotVerifyClientLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotVerifyClientLayoutComponent ],
      imports: [
        RouterTestingModule
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotVerifyClientLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
