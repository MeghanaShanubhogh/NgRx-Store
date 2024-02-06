import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterState } from '../state/counter.state';
import { Observable, Subscription } from 'rxjs';
import { getChannelName, getCounter } from '../state/counter.selectors';
import { AppState } from '../../store/app.state';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrl: './counter-output.component.css'
})
export class CounterOutputComponent implements OnInit,OnDestroy {
  // counter:number=0;
  counter$: Observable<number> = new Observable<number>;
  channelName$: Observable<string> = new Observable<string>;
  // counterSubscription: Subscription = new Subscription();
  constructor(
        private store:Store<AppState>)
        {}
  ngOnInit(): void {
    //as we are using counter obersavble we can remove subscription
    // this.counterSubscription = this.store.select("counter").subscribe(res=>{
    //   this.counter = res.counter;
    // })
    this.counter$ =  this.store.select(getCounter);
    this.channelName$ =  this.store.select(getChannelName);
  }
  ngOnDestroy(): void {
    // this.counterSubscription.unsubscribe();
  }
}
