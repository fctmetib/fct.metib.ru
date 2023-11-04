import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({providedIn: 'root'})
export class LocalStorageService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  public setValue(key: string, data: any) {
    let jsonData = JSON.stringify(data);
    if (isPlatformBrowser(this.platformId)) { 
      localStorage.setItem(key, jsonData);
    }
  }

  public getValue<T>(key: string): T{
    let jsonData = localStorage.getItem(key);
    if (isPlatformBrowser(this.platformId)) { 
      return JSON.parse(jsonData);
    }
  }

  public clearValue(key: string) {
    if (isPlatformBrowser(this.platformId)) { 
      localStorage.removeItem(key);
    }
  }
}
