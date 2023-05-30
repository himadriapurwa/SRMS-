import { Component, OnInit } from '@angular/core';
import { HeroService } from "../../hero.service"
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
data: any={
  drop:[],
  drop_selected:"",
  table:[],
}
  constructor(private hs: HeroService){ }
  ngOnInit(): void {
  // this.hs
  // .ajax('GetBSA_allCadrecodes', 'http://schemas.cordys.com/bsaWsApp', {}).then((resp:any)=>{
  //   console.log('display => ', resp);
  //   let dt = this.hs.xmltojson(resp, 'bsa_cadre_master');
  //   console.log('response ', dt);
  //   this.data.drop = dt;
  // })
} 

  getbsa_headerdetailsxml(){
    this.hs.ajax('GetBSA_HeaderDetailsXML','http://schemas.cordys.com/bsaWsApp',{Search: '',})
    .then((resp:any)=>{
      console.log("response from api : ", resp);
      this.data.table = this.hs.xmltojson(resp, 'bsa_project_header_details');
    })
  }
}
