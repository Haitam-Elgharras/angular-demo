import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  // create a subject to hold the loading state it behaves like an observable
  public isLoading$ = new Subject<boolean>();

  constructor() { }

  // the next will emit the value to all the subscribers
  showLoadingSpinner() {
    this.isLoading$.next(true);
  }

  hideLoadingSpinner() {
    this.isLoading$.next(false);
  }

}
