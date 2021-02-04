import { DemandService } from './../../services/demand.service';
import { DemandRoutingModule } from './../../demand-routing.module';
import { DemandPageComponent } from './demand-page.component';
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

describe('DemandPageComponent', () => {
  let component: DemandPageComponent;
  let fixture: ComponentFixture<DemandPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DemandPageComponent],
      imports: [
        CommonModule,
        DemandRoutingModule,
        FormsModule,
        ReactiveFormsModule,
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
      providers: [FormBuilder, DemandService, EffectSources],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
