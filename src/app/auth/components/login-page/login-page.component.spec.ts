import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ResetPasswordEffect } from './../../store/effects/resetPassword.effect';
import { RegisterEffect } from './../../store/effects/register.effect';
import { GetCurrentUserEffect } from './../../store/effects/getCurrentUser.effect';
import { LoginEffect } from './../../store/effects/login.effect';
import { EffectsFeatureModule, EffectsModule, EffectSources, EffectsRootModule } from '@ngrx/effects';
import { SuccessMessagesModule } from './../../../shared/modules/successMessages/successMessages.module';
import { BackendErrorMessagesModule } from './../../../shared/modules/backendErrorMessages/backendErrorMessages.module';
import { AuthRoutingModule } from './../../auth-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { AuthService } from './../../services/auth.service';
import { CommonService } from './../../../shared/services/common.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './login-page.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { reducers } from '../../store/reducers';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      imports: [
        CommonModule,
        EffectsModule.forRoot([]),
        AuthRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        BackendErrorMessagesModule,
        StoreRouterConnectingModule.forRoot(),
        SuccessMessagesModule,
        StoreModule.forRoot({}),
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
      providers: [FormBuilder, CommonService, AuthService, EffectSources],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
