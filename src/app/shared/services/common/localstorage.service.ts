import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({providedIn: 'root'})
export class LocalStorageService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  public setValue(key: string, data: any) {
    if (isPlatformBrowser(this.platformId)) { 
      let jsonData = JSON.stringify(data);
      localStorage.setItem(key, jsonData);
    }
  }

  public getValue<T>(key: string): T{
    if (isPlatformBrowser(this.platformId)) { 
      let jsonData = localStorage.getItem(key);
      return JSON.parse(jsonData);
    }
  }

  public clearValue(key: string) {
    if (isPlatformBrowser(this.platformId)) { 
      localStorage.removeItem(key);
    }
  }
}
