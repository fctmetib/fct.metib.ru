import {BehaviorSubject, catchError, finalize, of, tap} from 'rxjs';
import {Component} from '@angular/core';
import {Validators, FormGroup, FormControl, FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ResetPasswordCompleteReq} from '../../types/reset-password/resetPasswordCompleteReq';
import {AuthService} from '../../services/auth.service';
import {AutoUnsubscribeService} from '../../../shared/services/auto-unsubscribe.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-confirm-password-page',
  templateUrl: './confirm-password-page.component.html',
  styleUrls: ['./confirm-password-page.component.scss'],
  providers: [AutoUnsubscribeService]
})
export class ConfirmPasswordPageComponent {
  form: FormGroup;

  isSubmitting$ = new BehaviorSubject<boolean>(false);
  backendErrors$ = new BehaviorSubject<string>(null);

  constructor(
    private authService: AuthService,
    private au: AutoUnsubscribeService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
  }

  get completionCode() {
    return this.form.get('CompletionCode') as FormControl
  }

  get password() {
    return this.form.get('Password') as FormControl
  }


  public ngOnInit(): void {
    this.initForm();

    this.route.params.pipe(
      tap(({id}) => this.completionCode.setValue(id)),
      takeUntil(this.au.destroyer)
    ).subscribe();
  }

  public initForm(): void {
    this.form = this.fb.group({
      CompletionCode: [null, [Validators.required]],
      Password: [null, [Validators.required]]
    })
  }

  public onSubmit(): void {
    this.isSubmitting$.next(true);

    const request: ResetPasswordCompleteReq = this.form.getRawValue()

    this.authService.resetPasswordComplete(request).pipe(
      tap(() => {
        this.router.navigate(['/auth/login']);
      }),
      catchError((err) => {
        this.backendErrors$.next(err)
        return of()
      }),
      finalize(() => {
        this.isSubmitting$.next(false);
      })
    ).subscribe();
  }
}

