import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterState } from '../state/counter.state';
import { addCustomValue, changeChannelName } from '../state/counter.actions';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrl: './custom-counter-input.component.css'
})
export class CustomCounterInputComponent {
  value:number=0;
  channelName:string="";
  constructor(private store:Store<{counter: CounterState}>){}
  onClickAdd(){
      this.store.dispatch(addCustomValue({value:+this.value}));
  }
  onClickChangeChannel(){
      this.store.dispatch(changeChannelName({channel:this.channelName}))
  }
}
