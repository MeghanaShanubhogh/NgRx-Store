import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { Observable } from 'rxjs';
import { isAuthenticated } from '../../../auth/state/auth.selector';
import { logOut } from '../../../auth/state/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  isAuthenticated$ : Observable<boolean> = new Observable<boolean>();
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(isAuthenticated);
  }
  onLogOut(event: Event){
    event.preventDefault();
    this.store.dispatch(logOut());
  }
}
