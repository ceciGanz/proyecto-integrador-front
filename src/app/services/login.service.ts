import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly KEY_SAVE_SESSION: string = 'SESSION';

  private $loggedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isLogged());
  constructor() {
    window.addEventListener('storage', ($event) => {
      this.$loggedSubject.next(this.isLogged());
    });
  }

  //Modificar luego este metodo, cuerpo y encabezado
  public login(user: string, password: string): Observable<boolean> {
    if (user == 'ceci' && password == '1234') {
      localStorage.setItem(
        this.KEY_SAVE_SESSION,
        JSON.stringify({ user: user, candidato: 1 })
      );
      this.$loggedSubject.next(true);
      return of(true);
    } else {
      return of(false);
    }
  }

  public logout(): void {
    localStorage.setItem(this.KEY_SAVE_SESSION, '');
    this.$loggedSubject.next(false);
  }

  public isLogged(): boolean {
    const session: string | null = localStorage.getItem(this.KEY_SAVE_SESSION);
    return session != null && session != '';
  }

  public getSession(): Object {
    return JSON.parse(localStorage.getItem(this.KEY_SAVE_SESSION) as string);
  }

  public loggedSubject(): BehaviorSubject<boolean> {
    return this.$loggedSubject;
  }
}