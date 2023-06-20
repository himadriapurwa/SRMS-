import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { HeroService } from '../hero.service';
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  data: any;
i:any;
  constructor(private hs: HeroService) { }
  public chart: any;

  // processChartData(apiData: any) {
  //   const labels: string[] = [];
  //   const values: number[] = [];
  
  //   // Assuming the API response is an array of objects with 'x' and 'y' properties
  //   for (const item of this.data) {
  //     labels.push(item.count);
  //     values.push(item.status);
  //   }
  
  //   return { labels, values };
  // }



  ngOnInit(): void {
    // this.hs.ajax('GetStatusAndCount','http://schemas.cordys.com/himadri_srmWSP',{ })
    //   .then((resp: any) =>
    //    {
    //     this.data = this.hs.xmltojson(resp, 'himadri_request_approval');
    //     // this.data=resp;
    //    console.log("resp",resp)}
    //    );
       
    this.createChart();
  }
  
  createChart(){
    // const { labels, values } = this.processChartData(this.data);
    
    // console.log(labels, values)
    this.chart = new Chart("MyChart", {
      type: 'polarArea', //this denotes the type of chart

      data: {// values on X-Axis

        labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
								 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
      // labels: [],
	       datasets: [
          {
            label: "Sales",
            data: ['467','576', '572', '79', '92',
								 '574', '573', '576'],
            backgroundColor:  [
              '#28262C',
              '#37123C',
              '#D4C2FC',
              '#F9F5FF',
              '#D0393B'
            ]
          },
          // {
          //   label: "Profit",
          //   data: ['542', '542', '536', '327', '17',
					// 				 '0.00', '538', '541'],
          //   backgroundColor: 'limegreen'
          // }  
        ]
      },
      options: {
        aspectRatio:3
      }
      
    });
  }
}
