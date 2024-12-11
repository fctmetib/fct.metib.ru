import { lastValueFrom } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { isPlatformServer } from '@angular/common';

export function appInitializer(
  authService: AuthService,
  platformId: Object
): () => Promise<any> {
  return async () => {
    try {
      if (!isPlatformServer(platformId)) {
		// await iconsService.initIcons();
        await lastValueFrom(authService.initCurrentUser());
      }
    } catch (e) {
      // console.error('App initialization failed:', e);
    }
  };
}
