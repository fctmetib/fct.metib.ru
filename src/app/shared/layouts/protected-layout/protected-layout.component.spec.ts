import { RouterTestingModule } from '@angular/router/testing';
import { ProtectedLayoutComponent } from './protected-layout.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ProtectedLayoutComponent', () => {
  let component: ProtectedLayoutComponent;
  let fixture: ComponentFixture<ProtectedLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtectedLayoutComponent ],
      imports: [
        RouterTestingModule
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtectedLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
