import { Component, OnInit, ViewChild } from '@angular/core';
import { WebsocketService } from '../service/websocket.service';

import Chart from 'chart.js/auto';
@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss']
})
export class DashbordComponent implements OnInit {
  lat : number = 32.398516;
  lon : number = -5.422077;
  lon2 : number = -3.422077;

  canvas: any;
  ctx: any;
  temperatureCanvas: any;
  humidityCanvas: any;
  NCanvas: any;
  PCanvas: any;
  KCanvas: any;
  phCanvas: any;
  rainfallCanvas: any;
  constructor(private websocketService:WebsocketService) {
   
    
    
  }



  temperatureToShow = [];
  humidityToShow = [];
  NToShow = [];
  PToShow = [];
  KToShow = [];
  phToShow = [];
  rainfallToShow = [];

  ngOnInit() {
   
    let mychart:any;
    let humiditymychart:any;
    let Nmychart:any;
    let Pmychart:any;
    let Kmychart:any;
    let phmychart:any;
    let rainfallmychart:any;

    this.websocketService.currentMessage.subscribe((data) => {
   
      // this.websocketService.getMessage()
    
    
      if(this.websocketService.temperature.length > 5){
        this.temperatureToShow = this.websocketService.temperature.slice(this.websocketService.temperature.length - 5 , this.websocketService.temperature.length)        
        this.humidityToShow = this.websocketService.humidity.slice(this.websocketService.humidity.length - 5 , this.websocketService.humidity.length)
        this.NToShow = this.websocketService.N.slice(this.websocketService.N.length - 5 , this.websocketService.N.length)
        this.PToShow = this.websocketService.P.slice(this.websocketService.P.length - 5 , this.websocketService.P.length)
        this.KToShow = this.websocketService.K.slice(this.websocketService.K.length - 5 , this.websocketService.K.length)
        this.phToShow = this.websocketService.ph.slice(this.websocketService.ph.length - 5 , this.websocketService.ph.length)
        this.rainfallToShow = this.websocketService.rainfall.slice(this.websocketService.rainfall.length - 5 , this.websocketService.rainfall.length)
      if(this.websocketService.temperature.length == 6){

        this.temperatureCanvas = document.getElementById('temperature');
        this.humidityCanvas = document.getElementById('humidity');
        this.NCanvas = document.getElementById('N');
        this.PCanvas = document.getElementById('P');
        this.KCanvas = document.getElementById('K');
        this.phCanvas = document.getElementById('ph');
        this.rainfallCanvas = document.getElementById('rainfall');
        
        mychart = this.initChart(this.temperatureCanvas,this.temperatureToShow);
        humiditymychart = this.initChart(this.humidityCanvas,this.humidityToShow);
        Nmychart = this.initChart(this.NCanvas,this.NToShow);
        Pmychart = this.initChart(this.PCanvas,this.PToShow);
        Kmychart = this.initChart(this.KCanvas,this.KToShow);
        phmychart = this.initChart(this.phCanvas,this.phToShow);
        rainfallmychart = this.initChart(this.rainfallCanvas,this.rainfallToShow);
      }
      this.updateBarGraph(mychart,this.temperatureToShow,this.temperatureToShow)
      this.updateBarGraph(humiditymychart,this.humidityToShow,this.humidityToShow)
      this.updateBarGraph(Nmychart,this.NToShow,this.NToShow)
      this.updateBarGraph(Pmychart,this.PToShow,this.PToShow)
      this.updateBarGraph(Kmychart,this.KToShow,this.KToShow)
      this.updateBarGraph(phmychart,this.phToShow,this.phToShow)
      this.updateBarGraph(rainfallmychart,this.rainfallToShow,this.rainfallToShow)
      }
      console.log(this.temperatureToShow)
      // let label = myvar.length ? myvar : this.websocketService.temperature ;
      // let thData =  myvar.length ? myvar : this.websocketService.temperature ;
    
    
   
  })

  }

   updateBarGraph(chart: any, label: any, data: any) {
    chart.data.datasets.pop();
    chart.data.labels = label


    
    chart.data.datasets.push({
        label: label,
        // backgroundColor: color,
        data: data
    });
    chart.update('none');
  }

  

  initChart(canvas:any,thoShow:any){
    this.ctx = canvas.getContext('2d');
    const myChart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: thoShow,
        datasets: [{
          label: 'Temperature',
          data: thoShow,
          //  backgroundColor: ['red'],
          borderWidth: 1
        }]
      },
      options: {
        // legend: {
        //   display: false
        // },
        responsive: false,
        // display: true
      }
    });
    return myChart;
  }



}
