
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
    return AppStorage.get<UserData>('UserData', {
      id: 1,
      email: 'motamendez@gmail.com',
    });
  }

  static get<T>(key: string, defaultValue: T): T {
    const dataString = window.sessionStorage.getItem(key);
    if (!dataString) return defaultValue;
    try {
      return JSON.parse(dataString) as T;
    } catch (error) {
      console.error(`Error parsing data from session storage for key "${key}":`, error);
      return defaultValue;
    }
  }

  static save<T>(key: string, data: T): void {
    window.sessionStorage.setItem(key, JSON.stringify(data));
  }
}
