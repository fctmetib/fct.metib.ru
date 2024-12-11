import { IconsService } from '../services/icons.servcie'
import {AuthService} from '../../auth/services/auth.service';

export function appInitializer(iconsService: IconsService, authService: AuthService): () => Promise<any> {
	return async () => {
	  try {
		// await iconsService.initIcons();
		await authService.initCurrentUser().toPromise();
	  } catch (e) {
		console.error('App initialization failed:', e);
	  }
	};
  }
  