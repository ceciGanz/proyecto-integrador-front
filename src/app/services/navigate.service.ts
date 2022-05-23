import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, from, lastValueFrom, switchMap, timer } from 'rxjs';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class NavigateService {
  constructor(private router: Router, private loadingService: LoadingService) {}

  private navigate(commands: any[], delay: number = 0): Promise<boolean> {
    this.loadingService.start();
    return lastValueFrom(
      timer(delay).pipe(
        switchMap((num) =>
          from(this.router.navigate(commands)).pipe(
            finalize(() => this.loadingService.stop())
          )
        )
      )
    );
  }

  public goPortfolio(): Promise<boolean> {
    return this.navigate(['/portfolio'], 1000);
    //return this.router.navigate(["/portfolio"]);
  }

  public goLogin(): Promise<boolean> {
    return this.navigate(['/login'], 1000);
    //return this.router.navigate(["/login"]);
  }
}
