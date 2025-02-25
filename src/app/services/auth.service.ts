import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = false;

  constructor() {
    // Aqui você pode verificar se há um token no localStorage ou outra lógica
    this.loggedIn = !!localStorage.getItem('token');
  }

  login(register: string, password: string): boolean {
    if (register === '000000001' && password === 'admin123') {
      localStorage.setItem('token', 'your-token-here'); // Simulando token
      this.loggedIn = true;
      return this.loggedIn;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedIn = false;
  }

  isAuthenticated(): boolean {
    return this.loggedIn;
  }
}
