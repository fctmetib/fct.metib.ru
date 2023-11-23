import { RegisterPageComponent } from './register-page.component';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { SuccessMessagesModule } from '../../../shared/modules/successMessages/successMessages.module';
import { BackendErrorMessagesModule } from '../../../shared/modules/backendErrorMessages/backendErrorMessages.module';
import { AuthRoutingModule } from '../../auth-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { CommonService } from '../../../shared/services/common/common.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

describe('LoginPageComponent', () => {
  let component: RegisterPageComponent;
  let fixture: ComponentFixture<RegisterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterPageComponent],
      imports: [
        CommonModule,
        AuthRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        BackendErrorMessagesModule,
        SuccessMessagesModule,
        InputTextModule,
        DropdownModule,
        CardModule,
        MessageModule,
        MessagesModule,
        ButtonModule,
        InputMaskModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule,
      ],
      providers: [FormBuilder, CommonService, AuthService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
