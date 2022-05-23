import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private $loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {}

  public loadingSubject(): BehaviorSubject<boolean> {
    return this.$loadingSubject;
  }

  public start() {
    this.$loadingSubject.next(true);
  }

  public stop() {
    this.$loadingSubject.next(false);
  }
}
