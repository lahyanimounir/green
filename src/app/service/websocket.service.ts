import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
  temperature:any =[];
  humidity:any =[];
  N:any =[];
  P:any =[];
  K:any =[];
  ph:any =[];
  rainfall:any =[];
  socket = new WebSocket('ws://ec2-44-201-240-129.compute-1.amazonaws.com:3000');
  constructor() {
     // Connection opened
      this.socket.addEventListener('open',  (event) => {
     
        this.sendMessage('Hello From Client1!');
        this.getMessage()
        //
    });
   }

   changeMessage(message: string) {
    this.messageSource.next(message)
  }
 
  sendMessage(message:any){
      // this.socket.send('Hello From Client1!');
      this.socket.send(message);
  }
  temperaturetoShow:any=[0];
  getMessage(){
    this.socket.addEventListener('message',  (event:any)=> {
      if(!event.data || event.data == 'Welcome New Client!')
      return
     
      let mydta = JSON.parse(event.data)
      this.temperature.push(mydta['temperature'])
      this.humidity.push(mydta['humidity'])
      this.N.push(mydta['N'])
      this.P.push(mydta['P'])
      this.K.push(mydta['K'])
      this.ph.push(mydta['ph'])
      this.rainfall.push(mydta['rainfall'])
      console.log(this.temperature)
      this.changeMessage('111')
      
  });
  }
  // Listen for messages
  // socket.addEventListener('message', function (event) {
  //     console.log('Message from server ', event.data);
  // });

}
