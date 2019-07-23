import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public smartSessionStore: any;
  constructor() {
    if (!sessionStorage) {
      throw new Error('Current browser does not support Local Storage');
    }
    this.smartSessionStore = sessionStorage;
  }
  // session操作
  public smartSessionSetObject(key: string, value: any): void {
    this.smartSessionStore.setItem(key, JSON.stringify(value));
  }
  public smartSessionGetObject(key: string): any {
    return JSON.parse(this.smartSessionStore.getItem(key) || 0);
  }
  public smartSessionRemove(key: string): any {
    this.smartSessionStore.removeItem(key);
  }
  public smartSessionPlaceDel(): any {
    this.smartSessionStore.clear();
  }
}
