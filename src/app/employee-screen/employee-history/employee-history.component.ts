import { Component, OnInit } from '@angular/core';
import { HeroService } from "../../hero.service"

@Component({
  selector: 'app-employee-history',
  templateUrl: './employee-history.component.html',
  styleUrls: ['./employee-history.component.css']
})

export class EmployeeHistoryComponent implements OnInit{
  
  data: any={
    table:[],
  }
    constructor(private hs: HeroService){ }
    ngOnInit(): void {
    this.hs.ajax('GetEmployeeHistoryByEmail', 'http://schemas.cordys.com/himadri_srmWSP', {email:'mridulp@adnatesolutions.com'}).then((resp:any)=>{
      console.log('display => ', resp);
      let dt = this.hs.xmltojson(resp, 'himadri_request_approval');
      console.log('response ', dt);
      this.data.table = dt;
    })
  }
  }

