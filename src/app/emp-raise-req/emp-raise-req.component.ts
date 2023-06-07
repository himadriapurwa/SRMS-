import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
@Component({
  selector: 'app-emp-raise-req',
  templateUrl: './emp-raise-req.component.html',
  styleUrls: ['./emp-raise-req.component.css'],
})
export class EmpRaiseReqComponent implements OnInit {
  maxId: any = {};
  sr_id: any = '';
  data: any = {
    name: '',
    email: '',
    number: '',
    category: '',
    issue_with: '',
    sr_id: '',
  };

  constructor(private hs: HeroService) {}
  ngOnInit(): void {
    this.hs
      .ajax('Get_max_id', 'http://schemas.cordys.com/himadri_srmWSP', {})

      .then((resp: any) => {
        this.maxId = this.hs.xmltojson(resp, 'himadri_request');
        let req_id = this.maxId.request_id;
        let year = new Date().getFullYear();
        let srid = 'SR_' + year + '_' + req_id;
        this.sr_id = srid;
      });
  }

  submit() {
    if(((this.data.number.match("^[0-9]{10}$")))
    &&
    ((this.data.email.match("^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-z]{2,4}$")))
    &&
    ((this.data.issue_with))&&(this.data.name)
    &&(this.data.number)&&(this.data.email)&&(this.data.category)
    &&
    ((this.data.name).match("^[a-zA-z ]+$"))){
    this.hs
      .ajax(
        'UpdateHimadri_request',
        'http://schemas.cordys.com/himadri_srmWSP',
        {
          tuple: {
            new: {
              himadri_request: {
                requester_name: this.data.name,
                email: this.data.email,
                mobile_number: this.data.number,
                category: this.data.category,
                request_info: this.data.issue_with,
                sr_id: this.sr_id,
              },
            },
          },
        }
      )
      .then((resp: any) => {
        this.data.table = this.hs.xmltojson(resp, 'himadri_request');
      });

      this.hs
      .ajax(
        'UpdateHimadri_request_approval',
        'http://schemas.cordys.com/himadri_srmWSP',
        {
          tuple: {
            new: {
              himadri_request_approval : {
                sr_id: this.sr_id,
                status: 'Pending with Admin',
                category: this.data.category,
                issue_with: this.data.issue_with,
                document1: "N/A"
              },
            },
          },
        }
      )
      .then((resp: any) => {
        this.data.table = this.hs.xmltojson(resp, 'himadri_request_approval');
      });

    }
    else
    {
    alert("enter correct details");
    }



}}
