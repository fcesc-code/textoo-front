import { Injectable } from '@angular/core';
import { UserData } from '../interfaces/globalUser';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  set(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  get(key: string): string | null {
    return localStorage.getItem(key);
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }
}
