import { IconsService } from '../services/icons.servcie'
import {AuthService} from '../../auth/services/auth.service';

export function appInitializer(iconsService: IconsService, authService: AuthService): () => Promise<any> {
	return async () => {
		await iconsService.initIcons()
    authService.initCurrentUser().subscribe()
	}
}
