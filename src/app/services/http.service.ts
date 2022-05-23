import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from './loading.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export abstract class HttpService<T> {
  constructor(
    private http: HttpClient,
    private loadingService: LoadingService
  ) {}

  public getOne(url: string): Observable<T> {
    /*
    this.loadingService.start();
    return timer(2000).pipe(
      switchMap((num) =>
        this.http.get<T>(url).pipe(finalize(() => this.loadingService.stop()))
      )
    );
    */
    return this.http.get<T>(environment.API_PATH + url);
  }

  public getAll(url: string): Observable<T[]> {
    return this.http.get<T[]>(environment.API_PATH + url);
  }

  public postOne(url: string, body: T): Observable<T> {
    return this.http.post<T>(environment.API_PATH + url, body);
  }

  public putOne(url: string, body: T): Observable<T> {
    return this.http.put<T>(environment.API_PATH + url, body);
  }

  public deleteOne(url: string, body: T): Observable<T> {
    return this.http.delete<T>(environment.API_PATH + url, body);
  }
}
