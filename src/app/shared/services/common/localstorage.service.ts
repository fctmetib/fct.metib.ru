import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class LocalStorageService {
  constructor() { }

  public setValue(key: string, data: any) {
    let jsonData = JSON.stringify(data);
    localStorage.setItem(key, jsonData);
  }

  public getValue<T>(key: string): T{
    let jsonData = localStorage.getItem(key);
    return JSON.parse(jsonData);
  }

  public clearValue(key: string) {
    localStorage.removeItem(key);
  }
}
