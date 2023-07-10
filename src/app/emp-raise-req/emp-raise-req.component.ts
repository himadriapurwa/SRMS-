import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

// import 'sweetalert2/src/sweetalert2.scss';
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
  category_data: any=[];
  data1: any={};
  userData: any=[];
  userName: any;
  userEmail: any;
  userPhoneNumber: any;
  constructor(private hs: HeroService,private toastr: ToastrService) {}
  ngOnInit(): void {
    this.data1=this.hs._get('loggedInuser')
    // this.hs._set('loggedInuser', this.data1);
    this.hs
    .ajax(
      'GetUserDetails',
      'http://schemas.cordys.com/UserManagement/1.0/User',
      {}
    )
    .then((resp: any) => {
      this.userData = this.hs.xmltojson(resp, 'User');
      console.log('userDetails', this.userData);
      this.userName = this.userData.UserName;
      console.log('userName', this.userName);
      this.userEmail = this.userData.ContactInformation.email;
      console.log('userEmail', this.userEmail);
      this.userPhoneNumber = this.userData.ContactInformation.phone;


    });


    this.hs
      .ajax('Get_max_id', 'http://schemas.cordys.com/himadri_srmWSP', {})

      .then((resp: any) => {
        this.maxId = this.hs.xmltojson(resp, 'himadri_request');
        let req_id = this.maxId.request_id;
        let year = new Date().getFullYear();
        let srid = 'SR_' + year + '_' + req_id;
        this.sr_id = srid;
      });
      this.hs.ajax('GetAllCategoryDetails','http://schemas.cordys.com/himadri_srmWSP',{ })
      .then((resp: any) => {this.category_data = this.hs.xmltojson(resp, 'himadri_category');});
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

      this.hs
      .ajax(
        'empRequestRaisedBPM',
        "http://schemas.cordys.com/default",
        {sr_id:this.sr_id}
      )
      .then((resp: any) => {
        // this.data.table = this.hs.xmltojson(resp, 'himadri_request');
        console.log("empBpmTriggered for sr_id",this.sr_id)
      });
      // Swal.fire('New Request has been raised')
      this.toastr.success('New Request Raised Successfully.');
    }
    else
    {
      this.toastr.warning('Please Enter Correct Details');
    // alert("enter correct details");
    }}}
