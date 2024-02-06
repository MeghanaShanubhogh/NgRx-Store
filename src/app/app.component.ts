import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from './store/app.state';
import { getErrorMessage, getIsError, getLoading } from './store/shared/shared.selectors';
import { autoLogin } from './auth/state/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ngrx-counter';
  showLoading$: Observable<boolean> = new Observable<boolean>();
  errorMessage$: Observable<string> = new Observable<string>();
  isError$: Observable<boolean> = of(false);
  constructor(private store: Store<AppState>){}
  ngOnInit(): void {
    this.showLoading$ = this.store.select(getLoading);
    this.errorMessage$ = this.store.select(getErrorMessage);
    this.isError$ = this.store.select(getIsError);
    this.store.dispatch(autoLogin());
  }
}
