import { BehaviorSubject, Observable, catchError, finalize, of, tap } from 'rxjs';
import { Component } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ResetPasswordCompleteRequestInterface } from '../../types/reset-password/resetPasswordCompleteRequest.interface';
import CustomValidators from '../../tools/confirmPassword.tool';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-confirm-password-page',
  templateUrl: './confirm-password-page.component.html',
  styleUrls: ['./confirm-password-page.component.scss'],
})
export class ConfirmPasswordPageComponent {
  form: FormGroup;

  isSubmitting$= new BehaviorSubject<boolean>(false);
  backendErrors$ = new BehaviorSubject<string>(null);
  confirmationCode$= new BehaviorSubject<string>(null);

  completionCode: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    this.initializeForm();

    this.route.params.subscribe((params: Params) => {
      this.completionCode = params['id'];
    });
  }

  public initializeForm(): void {
    this.form = new FormGroup({
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('')
    }, [CustomValidators.confirmedValidator('password', 'confirmPassword')])
  }

  public onSubmit(): void {
    this.isSubmitting$.next(true);

    const request: ResetPasswordCompleteRequestInterface = {
      CompletionCode: this.completionCode,
      Password: this.form.value.password
    };

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

