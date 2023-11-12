import { IconsService } from '../services/icons.servcie'

export function appInitializer(iconsService: IconsService): () => Promise<any> {
	return async () => {
		await iconsService.initIcons()
	}
}
