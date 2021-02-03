import { RequestsService } from './../../services/requests.service';
import { SuccessMessagesModule } from './../../../../shared/modules/successMessages/successMessages.module';
import { BackendErrorMessagesModule } from './../../../../shared/modules/backendErrorMessages/backendErrorMessages.module';
import { RequestsRoutingModule } from './../../requests-routing.module';
import { RequestsPageComponent } from './requests-page.component';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { EffectsFeatureModule, EffectsModule, EffectSources, EffectsRootModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { reducers } from '../../store/reducers';

describe('RequestsPageComponent', () => {
  let component: RequestsPageComponent;
  let fixture: ComponentFixture<RequestsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestsPageComponent],
      imports: [
        CommonModule,
        EffectsModule.forRoot([]),
        RequestsRoutingModule,
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
      providers: [FormBuilder, RequestsService, EffectSources],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
