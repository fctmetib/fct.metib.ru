import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TransferState, makeStateKey, StateKey } from '@angular/platform-browser';
import { isPlatformServer } from '@angular/common';

const ICONS_KEY: StateKey<{ [key: string]: string }> = makeStateKey<{ [key: string]: string }>('icons');

import iconsJson from 'src/assets/icons/icons.json';

@Injectable({
  providedIn: 'root'
})
export class RefIconService {
  private icons: { [key: string]: string } = {};
  private loadingIconsPromise: Promise<void> | null = null;

  constructor(
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (!this.isServer()) {
      const initialIcons = this.transferState.get(ICONS_KEY, null);
      if (initialIcons) {
        this.icons = initialIcons;
      }
    }
  }

  public async getIcon(name: string): Promise<string> {
    if (this.icons[name]) {
      return this.icons[name];
    }

    await this.loadAllIconsOnce();
    return this.icons[name] || '<svg></svg>';
  }

  private async loadAllIconsOnce(): Promise<void> {
    if (this.loadingIconsPromise) {
      return this.loadingIconsPromise;
    }

    this.loadingIconsPromise = this.loadAllIcons();
    await this.loadingIconsPromise;
  }

  private async loadAllIcons(): Promise<void> {
	try {
	  const isDevMode = !this.isServer();
	  console.log('Dev mode:', isDevMode);
  
	  this.icons = iconsJson;
	  this.transferState.set(ICONS_KEY, this.icons);
	  console.log('ICONS', this.icons["vk"]);
	} catch (error) {
	  console.error('Failed to load icons:', error);
	}
  }  

  private isServer(): boolean {
    return isPlatformServer(this.platformId);
  }
}
