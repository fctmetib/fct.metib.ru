import { FreeDutyRoutingModule } from '../../free-duty-routing.module';
import { FreedutyPageComponent } from './freeduty-page.component';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { BackendErrorMessagesModule } from 'src/app/shared/modules/backendErrorMessages/backendErrorMessages.module';
import { SuccessMessagesModule } from 'src/app/shared/modules/successMessages/successMessages.module';
import { DutyService } from 'src/app/shared/services/share/duty.service';

describe('FreedutyPageComponent', () => {
  let component: FreedutyPageComponent;
  let fixture: ComponentFixture<FreedutyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FreedutyPageComponent],
      imports: [
        CommonModule,
        FreeDutyRoutingModule,
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
      providers: [FormBuilder, DutyService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreedutyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
