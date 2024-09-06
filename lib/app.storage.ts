
/**
 Usage example
const storedUserData = Storage.get<UserData>('userData', { id: 0, email: 'unknown' });

if (storedUserData) {
  console.log(`Retrieved user data: ${storedUserData.id}, ${storedUserData.email}`);
} else {
  console.log('No user data found in session storage.');
}
*/
import { UserData } from '@/lib/models'

export class AppStorage {
  static getUserData():UserData {
    let data = AppStorage.get<UserData | null>('UserData', null);
    if (data == null) {
      throw "Error user not found";
    }
    return data
  }

  static isUserLog() {
    return false;
  }

  static setUserData(data:UserData) {
    AppStorage.save('UserData',data);

  }

  static logOutUser(){
    AppStorage.clearKey('bearearToken');
    AppStorage.clearKey('UserData');
  }

  static getBearerToken() {
    return window.localStorage.getItem('bearearToken');
  }
  static setBearerToken(data:string) {
    return window.localStorage.save('bearearToken', data);
  }

  static get<T>(key: string, defaultValue: T): T {
    const dataString = window.localStorage.getItem(key);
    if (!dataString) return defaultValue;
    try {
      return JSON.parse(dataString) as T;
    } catch (error) {
      console.error(`Error parsing data from session storage for key "${key}":`, error);
      return defaultValue;
    }
  }

  static save<T>(key: string, data: T): void {
    window.localStorage.setItem(key, JSON.stringify(data));
  }

  static clearKey(key: string): void {
    window.localStorage.setItem(key, '');
  }
}
