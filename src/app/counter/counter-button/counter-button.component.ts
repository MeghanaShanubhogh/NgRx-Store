import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { decrement, increment, reset } from '../state/counter.actions';
import { CounterState } from '../state/counter.state';
import { AppState } from '../../store/app.state';

@Component({
  selector: 'app-counter-button',
  templateUrl: './counter-button.component.html',
  styleUrl: './counter-button.component.css'
})
export class CounterButtonComponent implements OnInit{
  constructor(private store: Store<AppState>){}
  ngOnInit(): void {
    
  }
  onClickIncrement(){
    this.store.dispatch(increment());
  }
  onClickDecrement(){
    this.store.dispatch(decrement());
  }
  onClickReset(){
    this.store.dispatch(reset());
  }
}
