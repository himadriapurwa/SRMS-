import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import Swal from 'sweetalert2'; 
import { ToastrService } from 'ngx-toastr';
declare var $:any;

@Component({
  selector: 'app-admin-approval-requests',
  templateUrl: './admin-approval-requests.component.html',
  styleUrls: ['./admin-approval-requests.component.css']
})
export class AdminApprovalRequestsComponent implements OnInit{
  dtOptions: DataTables.Settings = {};

  data: any={
    table:[],
  };

  priority_data: any=[];
  category_data: any=[];
  l1_attendee_data: any=[];
  l2_attendee_data:any=[];
  l2:any = [];

  dataModal: any = {
    email: '',
    number: '',
    category: '',
    l1_attendee:'',
    l2_attendee:'',
    issue_with:'',
  };

  sr_id: any;
  requester_name: any;
  number: any;
  email: any;
  category: any;
  priority: any;
  issue_with: any;
  changed_category:any;
  req_id: any;
  req_id_approval: any;
    constructor(private hs: HeroService, private toastr: ToastrService){ }



    submit() {

      console.log('submit data', this.dataModal);
// get REQUEST ID (PRIMARY KEY ) FOR UPDATION

      this.hs
      .ajax(
        'UpdateHimadri_request_approval',
        'http://schemas.cordys.com/himadri_srmWSP',
        {
          tuple: {
            old:{ himadri_request_approval :{
              request_id:this.req_id_approval
            }
            },
            new: {
              himadri_request_approval : {
                category: this.dataModal.category,
                priority: this.dataModal.priority,
                status : 'Initiated',
                l1_attendee: this.dataModal.l1_attendee,
                l2_attendee:this.dataModal.l2_attendee,
              },
            },
          },
        }
      )
      .then((resp: any) => {
        this.data.table = this.hs.xmltojson(resp, 'himadri_request_approval');
      });
      

// BPM 
this.hs
      .ajax(
        'angular_Bpm',
        "http://schemas.cordys.com/default",
        {
          sr_id:this.sr_id
        }
      )
      .then((resp: any) => {
       console.log("bpm triggered")
       this.toastr.success('Request Approved.');
      });

      $('#approval_table').DataTable().ajax.reload();
      $('#exampleModal').modal('hide');
   }
   category_change(event:any) {
  //  l1 attendee list
  this.changed_category =  event;
 console.log("a", this.changed_category)
  this.hs
  .ajax(
    'GetL1AttendeesListByCataegory',
    'http://schemas.cordys.com/himadri_srmWSP',
    {
      category_name: this.changed_category,
    }
  )
  .then((resp: any) => {
     this.l1_attendee_data = this.hs.xmltojson(resp, 'himadri_attendee');
     this.l1_attendee_data = Array.isArray(this.l1_attendee_data) ? this.l1_attendee_data : [this.l1_attendee_data];
     console.log(this.l1_attendee_data.length)
  });
   }


   l1_attendee_change(event:any){
    let changed_l1_attendee =  event;
    this.hs.ajax(
    'GetL2AttendeesListByCategory',
    'http://schemas.cordys.com/himadri_srmWSP',
    {category_name: this.changed_category, attendee: changed_l1_attendee})
  .then((resp: any) => {
     this.l2 = this.hs.xmltojson(resp, 'himadri_attendee');
     this.l2 = Array.isArray(this.l2) ? this.l2 : [this.l2];
    });

   }   


   someClickHandler(info: any): void {
    this.sr_id = info.sr_id;
    this.requester_name = info.himadri_request.requester_name
    this.number = info.himadri_request.mobile_number
    this.email = info.himadri_request.email
    this.category= info.category
    this.issue_with= info.himadri_request.request_info
    this.req_id_approval=info.request_id
    this.req_id=info.himadri_request.request_id
    console.log("inofo",  this.req_id)
    console.log("inofo",  this.issue_with)
    console.log("inofo1",  this.req_id_approval)
    console.log("inofo2", info)
  }

    ngOnInit(): void {
      let that = this;
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 5,
        lengthMenu: [5, 10, 15],
        processing: true,
  
        ajax: (dataTablesParameters: any, callback) => {
          that.hs
            .ajax(
              'GetRequestsForApprovalOfAdmin',
              'http://schemas.cordys.com/himadri_srmWSP',
              {})
        
            .then((resp:any) => {
              that.data = that.hs.xmltojson(resp, 'himadri_request_approval');
              that.data = Array.isArray(that.data)
            ? that.data
            : [that.data];
              callback({
                recordsTotal: that.data.length,
                recordsFiltered: that.data.length,
                data: that.data,
              });
            });
        },
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).off('click');
          $('td', row).on('click', () => {
            self.CopyData(data);
            self.someClickHandler(data);
            $('#exampleModal').modal('show');
          });
          return row;
        },
        columns: [
          {
            title: 'Request Id',
            data: 'sr_id',
          },
          {
            title: 'Status',
            data: 'status',
          },
          
          
          {
            title: 'Category',
            data: 'category',
          },
         
          {
            title: 'Description',
            data: 'resolution_description',
          },
          {
            title: 'Action',
          render:function() {
            return `<button type="button" class="btn btn-link p-0" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fas fa-edit icon"></i></button>`;
           

          }}
        ],
      };

// DROPDOWN FOR CATEGORY
this.hs.ajax('GetAllCategoryDetails','http://schemas.cordys.com/himadri_srmWSP',{ })
      .then((resp: any) => {this.category_data = this.hs.xmltojson(resp, 'himadri_category');});
      this.hs
      .ajax(
        'GetAllPriorities',
        'http://schemas.cordys.com/himadri_srmWSP',
        {
        }
      )
      .then((resp: any) => {
         this.priority_data = this.hs.xmltojson(resp, 'himadri_priority_table');
      });
  }
  
  CopyData(data: Object | any[]) {
  }
  }
