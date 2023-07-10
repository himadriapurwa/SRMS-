import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Chart from 'chart.js/auto';
import { HeroService } from '../hero.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  data: any=[];
  constructor(private hs: HeroService) { }
  ngOnInit(): void {this.hs.ajax('GetStatusAndCount','http://schemas.cordys.com/himadri_srmWSP',{ })
  .then((resp: any) =>
   {
    this.data = this.hs.xmltojson(resp, 'himadri_request_approval');
    // this.data=resp;
   console.log("resp",resp)
   const labels = this.data.map((entry: { label: any; }) => entry.label);
      const values = this.data.map((entry: { value: any; }) => entry.value);
   console.log("response",this.data)
  }
   );
    this.createChart();
  }
  public chart: any;

  createChart(){
  
    this.chart = new Chart("MyChart", {
type: 'bar',
      data: {// values on X-Axis
        // labels: data.map((_, index) => `Label ${index + 1}`),
        labels: ["Initiated", 'Pending with L2 Attendee', 'Pending with Admin','Rejected',
								 'Initiated', 'Transferred to Attendee', 'Resolved','Pending with L1 Attendee','Inprogress With L1 Attendee' ], 
	       datasets: [
          {
            label: "Requests",
            data: ['1','58', '22', '12', '12',
								 '1', '2', '16', '1', '36'],
            backgroundColor: 'rgb(53, 15, 90)'
          },
          
        ]
      },
      options: {
        aspectRatio:4.5
      }
      
    });
  }
}


