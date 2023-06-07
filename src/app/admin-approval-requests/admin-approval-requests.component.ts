import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';

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

  dataModal: any = {
    email: '',
    number: '',
    category: '',
    l1_attendee:'',
    l2_attendee:'',
  };
  sr_id: any;
  requester_name: any;
  number: any;
  email: any;
  category: any;
  priority: any;
  issue_with: any;

    constructor(private hs: HeroService){ }
    submit() {
      console.log('submit data', this.dataModal);
   }
  //  category_change() {
  // //  l1 attendee list
  // this.hs
  // .ajax(
  //   'GetL1AttendeesListByCataegory',
  //   'http://schemas.cordys.com/himadri_srmWSP',
  //   {
  //     category_name: this.dataModal.l1_attendee,
  //   }
  // )
  // .then((resp: any) => {
  //    this.l1_attendee_data = this.hs.xmltojson(resp, 'himadri_attendee');
  //   console.log('l1Attendee: ',this.l1_attendee_data)
    
  // });

  //  }
      
   someClickHandler(info: any): void {
    this.sr_id = info.sr_id;
    this.requester_name = info.himadri_request.requester_name
    this.number = info.himadri_request.mobile_number
    this.email = info.himadri_request.email
    this.category= info.category
    this.issue_with= info.himadri_request.request_info
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
              console.log('Data = ', that.data);
            });
        },
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).off('click');
          $('td', row).on('click', () => {
            self.CopyData(data);
            self.someClickHandler(data);
            console.log(data)
            $('#exampleModal').modal('show');
            console.log(index,'index');
          });
          return row;
        },
        columns: [
          {
            title: 'REQUEST ID',
            data: 'sr_id',
          },
          {
            title: 'STATUS',
            data: 'status',
          },
          
          
          {
            title: 'CATEGORY',
            data: 'category',
          },
         
          {
            title: 'DESCRIPTION',
            data: 'resolution_description',
          },
        ],
      };

// DROPDOWN FOR CATEGORY
this.hs
      .ajax(
        'GetAllCategoryDetails',
        'http://schemas.cordys.com/himadri_srmWSP',
        {
        }
      )
      .then((resp: any) => {
         this.category_data = this.hs.xmltojson(resp, 'himadri_category');
        console.log('category: ',this.category_data)
        
      });

      this.hs
      .ajax(
        'GetAllPriorities',
        'http://schemas.cordys.com/himadri_srmWSP',
        {
        }
      )
      .then((resp: any) => {
         this.priority_data = this.hs.xmltojson(resp, 'himadri_priority_table');
        console.log('priority: ',this.priority_data)
        
      });
      
  }
  
  CopyData(data: Object | any[]) {
  }
  }
