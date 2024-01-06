import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth/services/auth.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {merge, tap} from 'rxjs';
import {AutoUnsubscribeService} from './shared/services/auto-unsubscribe.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AutoUnsubscribeService]
})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private au: AutoUnsubscribeService
  ) {
  }
  //
  // public changingOverlayDamageMitigation: boolean = false;
  //
  public ngOnInit(): void {
  //   this.authService.initCurrentUser().pipe().subscribe();
  //   this.dialog.afterOpened.pipe(
  //     tap(dialogRef => {
  //       this.updateBackdropStyles();
  //       this.subscribeToDialogClose(dialogRef);
  //     }),
  //     takeUntil(this.au.destroyer)
  //   ).subscribe();
  }
  //
  // subscribeToDialogClose(dialogRef: MatDialogRef<any>) {
  //   dialogRef.afterClosed().pipe(takeUntil(this.au.destroyer)).subscribe(() => {
  //     // Вызываем обновление стилей при каждом закрытии модального окна
  //     this.updateBackdropStyles()
  //   });
  // }
  //
  // updateBackdropStyles() {
  //   // Получаем все элементы с классом .cdk-overlay-backdrop
  //   const backdrops = document.querySelectorAll('.cdk-overlay-backdrop');
  //
  //   // Применяем стиль --overlay-quaternary ко всем, кроме последнего, и удаляем transition
  //   backdrops.forEach((backdrop, index) => {
  //     if (index !== backdrops.length - 1) {
  //       (backdrop as HTMLElement).style.background = 'var(--overlay-quaternary)';
  //     } else {
  //       // Возвращаем transition для последнего оверлея
  //       (backdrop as HTMLElement).style.transition = '';
  //     }
  //   });
  //
  //   // Применяем стиль --overlay-primary к последнему элементу
  //   if (backdrops.length > 0) {
  //     (backdrops[backdrops.length - 1] as HTMLElement).style.background = 'var(--overlay-primary)';
  //   }
  // }
}
